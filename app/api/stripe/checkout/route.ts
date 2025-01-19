import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's server utility

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const body = await request.json();

    const { userId } = getAuth(request); 

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const baseUrl = process.env.NODE_ENV === "production"
        ? "https://ll-lashes.ro"
        : "http://localhost:3000";

        try {
            const session = await stripe.checkout.sessions.create({
                success_url: `${baseUrl}/payment/success`,
                client_reference_id: userId,
                line_items: [
                    {
                        price_data: {
                            currency: "RON",
                            product_data: {
                                name: body.name,
                                images: [body.image],
                            },
                            unit_amount: body.price,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                payment_method_types: ["card"],
                metadata: {
                    totalAmount: body.totalAmount, 
                },
            });
    
            return NextResponse.json(session);
        } catch (error) {
            console.error("Stripe API error:", error);
            return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
        }
}
