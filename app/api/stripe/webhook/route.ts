import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { registerPayment } from "@/actions/registerPayment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    const payload = await req.text(); // Obține textul brut din request
    const sig = req.headers.get("Stripe-Signature"); // Obține semnătura Stripe

    try {
        // Construiți evenimentul folosind semnătura și secretul webhook-ului
        const event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        // Verificați tipul de eveniment (ex. charge.succeeded)
        if (event.type === "charge.succeeded") {
            const charge = event.data.object as Stripe.Charge; 

            const dateTime = new Date(charge.created * 1000).toLocaleString();
            const timeString = new Date(charge.created * 1000).toLocaleString();

            // Apelarea funcției `registerPayment` cu informațiile necesare
            const resp: any = await registerPayment(
                charge.billing_details.email!, // Emailul clientului
                charge.amount, // Suma plătită
                JSON.stringify(charge), // Obiectul complet
                event.type, // Tipul evenimentului
                timeString, // Ora formatată
                dateTime, // Ora formatată
                charge.receipt_email, // Emailul pentru chitanță
                charge.receipt_url, // URL-ul chitanței
                JSON.stringify(charge.payment_method_details), // Detalii metodă de plată
                JSON.stringify(charge.billing_details), // Detalii facturare
                charge.currency // Moneda
            );

            console.log(resp);

            return NextResponse.json({ status: "Success", event: event.type });
        }

        // Returnați răspuns pentru alte tipuri de evenimente
        return NextResponse.json({ status: "Ignored", event: event.type });

    } catch (error) {
        console.error("Error handling Stripe webhook:", error);
        return NextResponse.json({ status: "Failed", error });
    }
}
