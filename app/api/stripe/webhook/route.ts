import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_EXCLUSIVE_COURSE_RATE_PRICE, CONST_STANDARD_COURSE_RATE_PRICE } from "@/constants/courses/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error("Stripe webhook verification error:", (err as Error).message);
        return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        await handleCheckoutSessionCompleted(event);
    } else if (event.type === "charge.succeeded") {
        await handleChargeSucceeded(event);
    }

    return NextResponse.json("Webhook processed successfully");
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;

    const clerkUserId = session.client_reference_id!;
    const totalAmountFromMetadata = session.metadata?.totalAmount;
    const hasRatesFromMetadata = session.metadata?.hasRates === "true";
    const rateNumberFromMetadata = session.metadata?.rateNumber;

    if (!totalAmountFromMetadata) {
        console.log("Total amount is missing in metadata.");
        return NextResponse.json({ error: "Missing totalAmount in metadata" }, { status: 400 });
    }

    const totalAmount = parseFloat(totalAmountFromMetadata) / 100;

    const user = await db.user.findUnique({
        where: { clerkUserId },
    });

    if (!user) {
        console.log("User not found.");
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const userId = user.id;

    try {
        const stripeSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ["line_items"],
        });

        const lineItems = stripeSession.line_items?.data;
        const productItem = lineItems && lineItems[0];

        if (!productItem || !productItem.price?.unit_amount) {
            console.log("Price or product name not found in line items.");
            return NextResponse.json({ error: "Price or product name not found" }, { status: 400 });
        }

        const price = productItem.price.unit_amount / 100;
        let productName: string;
        let productImage: string;

        if (typeof productItem.price.product === "string") {
            const product = await stripe.products.retrieve(productItem.price.product);
            productName = product.name;
            productImage = product.images.length > 0 ? product.images[0] : '';
        } else {
            const product = productItem.price.product;
            if (product.deleted) {
                console.log("The product has been deleted.");
                return NextResponse.json({ error: "Product is deleted" }, { status: 400 });
            }
            productName = product.name;
            productImage = product.images.length > 0 ? product.images[0] : '';
        }

        const isAdvance = price === CONST_ADVANCE_PAYMENT_PRICE;
        const isInstallment = price === CONST_EXCLUSIVE_COURSE_RATE_PRICE || price === CONST_STANDARD_COURSE_RATE_PRICE;

        if (isInstallment) {
            await handleInstallmentOrder(userId, price, productName, productImage, totalAmount, hasRatesFromMetadata, rateNumberFromMetadata);
        } else {
            await handleAdvancePayment(userId, price, productName, productImage, totalAmount, hasRatesFromMetadata, rateNumberFromMetadata);
        }
    } catch (err) {
        console.error("Error processing order:", err);
        return NextResponse.json({ error: "Error processing order" }, { status: 500 });
    }
}

async function handleInstallmentOrder(userId: string, price: number, productName: string, productImage: string, totalAmount: number, hasRates: boolean, rateNumberFromMetadata: string | undefined) {
    const existingOrder = await db.order.findFirst({
        where: {
            userId,
            hasRates: true,
        },
    });

    if (!existingOrder) {
        console.log("No existing order found for installment update.");
        return NextResponse.json({ error: "No existing order found for installment" }, { status: 400 });
    }

    let currentRateNumber = existingOrder.rateNumber ?? 0;
    let updatedStatus;

    if (existingOrder.status === "Avans platit") {
        updatedStatus = `Rata 1 din 3 achitata`;
        currentRateNumber = 1;
    } else if (existingOrder.status === "Rata 1 din 3 achitata") {
        updatedStatus = `Rata 2 din 3 achitata`;
        currentRateNumber = 2;
    } else if (existingOrder.status === "Rata 2 din 3 achitata") {
        updatedStatus = `Rata 3 din 3 achitata`;
        currentRateNumber = 3;
    } else {
        updatedStatus = "Plata finalizata"; // Cazul în care am ajuns la plata finală
    }

    await db.order.update({
        where: { id: existingOrder.id },
        data: {
            advance: existingOrder.advance + price,
            rateNumber: currentRateNumber,  // Actualizăm numărul ratei
            status: updatedStatus,          // Actualizăm statusul
        },
    });

    if (currentRateNumber === 3) {
        await sendContractEmail(existingOrder.id);
    }
}

async function handleAdvancePayment(userId: string, price: number, productName: string, productImage: string, totalAmount: number, hasRates: boolean, rateNumberFromMetadata: string | undefined) {
    const status = price === CONST_ADVANCE_PAYMENT_PRICE ? "Avans platit" : "Plata finalizata";
    const rateNumber = hasRates ? parseInt(rateNumberFromMetadata ?? "1", 10) : 1;

    const order = await db.order.create({
        data: {
            userId,
            course: productName,
            image: productImage,
            advance: price,
            total: totalAmount,
            status,
            hasRates,
            rateNumber,
        },
    });

    await sendContractEmail(order.id);
}

async function handleChargeSucceeded(event: Stripe.Event) {
    const charge = event.data.object as Stripe.Charge;
    const orderId = charge.metadata?.orderId;

    if (!orderId) {
        console.log("Order ID missing from charge metadata.");
        return NextResponse.json({ error: "Order ID missing from metadata" }, { status: 400 });
    }

    const order = await db.order.findUnique({
        where: { id: Number(orderId) },
    });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let updatedStatus = "";
    let currentRateNumber = order.rateNumber ?? 0;

    if (order.status === "Avans platit") {
        updatedStatus = "Rata 1 din 3 achitata";
        currentRateNumber = 0;
    } else if (order.status === "Rata 1 din 3 achitata") {
        updatedStatus = "Rata 2 din 3 achitata";
        currentRateNumber = 1;
    } else if (order.status === "Rata 2 din 3 achitata") {
        updatedStatus = "Plata finalizata";
        currentRateNumber = 2;
    } else {
        updatedStatus = "Plata finalizata";
    }

    await db.order.update({
        where: { id: order.id },
        data: {
            advance: order.advance + charge.amount / 100,
            rateNumber: currentRateNumber,
            status: updatedStatus,
        },
    });

    if (currentRateNumber === 3) {
        await sendContractEmail(order.id);
    }
}

async function sendContractEmail(orderId: number) {
    await fetch(`${baseUrl}/api/emails/contract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
    });
}
