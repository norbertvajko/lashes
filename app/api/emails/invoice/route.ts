import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.eu",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

export async function POST(req: NextRequest) {
    try {
        const { invoiceId } = await req.json();

        if (!invoiceId) {
            return NextResponse.json({ error: "invoiceId is required" }, { status: 400 });
        }

        // Retrieve invoice details from Stripe
        const invoice = await stripe.invoices.retrieve(invoiceId);

        if (!invoice.customer_email) {
            return NextResponse.json({ error: "Invoice is missing customer email" }, { status: 400 });
        }

        // Fetch invoice PDF
        const invoicePdfUrl = invoice.invoice_pdf;
        if (!invoicePdfUrl) {
            return NextResponse.json({ error: "Invoice PDF not available" }, { status: 400 });
        }

        // Fetch order using metadata or email
        const order = await db.order.findFirst({
            where: {
                user: { email: invoice.customer_email },
            },
            include: { user: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Download PDF from Stripe
        const response = await fetch(invoicePdfUrl);
        const pdfBuffer = await response.arrayBuffer();

        // Send the invoice via email
        await transporter.sendMail({
            from: `"LL Lashes" <${process.env.MAIL_USER}>`,
            to: [invoice.customer_email, "mail@ll-lashes.ro"],
            subject: "Factura ta LL Lashes 💸",
            html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 10px; font-family: Arial, sans-serif; border: 2px solid #f4d4e2;">
          <h2 style="color: #d63384;">📄 Factura LL Lashes</h2>
          <p style="font-size: 16px; color: #444;">Salut! Atașăm factura aferentă achiziției tale:</p>
          <ul style="font-size: 16px; color: #444;">
            <li><strong>Curs:</strong> ${order.course}</li>
            <li><strong>Suma plătită:</strong> ${order.advance} RON</li>
            <li><strong>Status:</strong> ${order.status}</li>
          </ul>
          <p style="font-size: 16px; color: #444;">Factura este atașată în format PDF.</p>
          <p style="font-size: 16px; color: #444;">Pentru întrebări, scrie-ne la <a href="mailto:mail@ll-lashes.ro" style="color: #d63384;">mail@ll-lashes.ro</a></p>
        </div>
      `,
            attachments: [
                {
                    filename: `Factura_LL_Lashes_${invoice.number}.pdf`,
                    content: Buffer.from(pdfBuffer),
                    contentType: "application/pdf",
                },
            ],
        });

        return NextResponse.json({ success: true, message: "Factura trimisă cu succes!" });
    } catch (error) {
        console.error("Error sending invoice email:", error);
        return NextResponse.json({ error: "Eroare la trimiterea facturii" }, { status: 500 });
    }
}
