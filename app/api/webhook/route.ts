import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { registerPayment } from "@/actions/registerPayment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const res = JSON.parse(payload);

    const sig = req.headers.get("Stripe-Signature");

    const dateTime = new Date(res?.created * 1000).toLocaleString();
    const timeString = new Date(res?.created * 1000).toLocaleString();

    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        // charge succeeded
        // payment_intent.succeeded
        // payment_intent.created

        const resp: any = await registerPayment(
            res?.data?.object?.billing_details?.email,
            res?.data?.object.amount,
            JSON.stringify(res),
            res?.type,
            String(timeString),
            String(dateTime),
            res?.data?.object?.receipt_email,
            res?.data?.object?.receipt_url,
            JSON.stringify(res?.data?.object?.payment_method_details),
            JSON.stringify(res?.data?.object?.billing_details),
            res?.data?.object?.currency,
        ) 

        console.log(resp);

        return NextResponse.json({ status: "Success", event: event.type });


    } catch (error) {
         return NextResponse.json({ status: "Failed", error });
    }
}