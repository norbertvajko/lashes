import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { CONST_ADVANCE_PAYMENT_PRICE } from "@/constants/courses/data";

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
        console.log((err as Error).message);
        return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const clerkUserId = session.client_reference_id!; // Clerk user ID from the Stripe session
        const totalAmountFromMetadata = session.metadata?.totalAmount; // Fetch totalAmount from metadata

        if (!totalAmountFromMetadata) {
            console.log("Total amount is missing in metadata.");
            return NextResponse.json({ error: "Missing totalAmount in metadata" }, { status: 400 });
        }

        const totalAmount = parseFloat(totalAmountFromMetadata) / 100;

        // Fetch the user from the database using clerkUserId to get the corresponding id
        const user = await db.user.findUnique({
            where: { clerkUserId },
        });

        if (!user) {
            console.log("User does not exist. Cannot create order.");
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const userId = user.id; // Use the id from the User table

        // Fetch the full session from Stripe to get line_items
        try {
            const stripeSession = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ["line_items"], // Expands the line_items field
            });

            const lineItems = stripeSession.line_items?.data;
            const productItem = lineItems && lineItems[0];

            if (productItem && productItem.price?.unit_amount) {
                const price = productItem.price.unit_amount / 100; // Convert to RON (if Stripe stores smallest unit)
                let productName: string;

                if (typeof productItem.price.product === "string") {
                    const product = await stripe.products.retrieve(productItem.price.product);
                    productName = product.name;
                } else {
                    const product = productItem.price.product;

                    if (product.deleted) {
                        console.log("The product has been deleted, cannot save order.");
                        return NextResponse.json({ error: "Product is deleted" }, { status: 400 });
                    }

                    productName = product.name;
                }

                const status = price !== CONST_ADVANCE_PAYMENT_PRICE ? "Plata finalizata" : "Avans platit";

                // Create the order using the product name and totalAmount
                const order = await db.order.create({
                    data: {
                        userId,
                        course: productName,
                        advance: price, // Use the price extracted from line_items
                        total: totalAmount, // Ensure total is a float
                        status: status,
                    },
                });

                console.log("Order saved:", order);

                //trimititere mail cu, contractul
                await fetch(`${baseUrl}/api/emails/contract`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: order.id }),
                });
                
            } else {
                console.log("Price or product name not found in line items.");
                return NextResponse.json({ error: "Price or product name not found" }, { status: 400 });
            }
        } catch (dbError) {
            console.log("Error saving order:", dbError);
            return NextResponse.json({ error: "Error saving order" }, { status: 500 });
        }
    }

    return NextResponse.json("Webhook processed successfully");
}
