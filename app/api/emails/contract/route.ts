import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Endpoint pentru trimiterea emailului
export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    // Verificăm dacă există comanda
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order || !order.user.email) {
      return NextResponse.json({ error: "Comanda sau utilizatorul nu există" }, { status: 404 });
    }

    // Citim contractul PDF din public/assets
    const contractPath = path.join(process.cwd(), "public/assets/Contract_LL_Lashes.pdf");
    const pdfBuffer = await fs.readFile(contractPath);

    // Trimitem e-mailul
    await transporter.sendMail({
      from: `"LL Lashes" <${process.env.MAIL_USER}>`,
      to: order.user.email,
      subject: "Confirmare achiziție - LL Lashes",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 10px; text-align: center; font-family: Arial, sans-serif; border: 2px solid #f4d4e2;">
          <h2 style="color: #d63384;">🎉 Mulțumim pentru achiziția ta! 🎉</h2>
          <p style="font-size: 16px; color: #444;">Ai achiziționat: <strong>${order.course}</strong></p>
          <p style="font-size: 16px; color: #444;">Suma plătită: <strong>${order.advance} RON</strong></p>
          <p style="font-size: 16px; color: #444;">Statusul comenzii: <strong>${order.status}</strong></p>
          <p style="font-size: 16px; color: #444;">Poți descărca contractul atașat acestui e-mail.</p>
          <p style="font-size: 16px; color: #444;">Dacă ai întrebări, ne poți contacta la <a href="mailto:mail@ll-lashes.ro" style="color: #d63384;">mail@ll-lashes.ro</a>.</p>
          <p style="font-size: 16px; color: #444;"><strong>Ne vedem curând! 💕</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: "Contract_LL_Lashes.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ success: true, message: "E-mail trimis cu succes!" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Eroare la trimiterea e-mailului" }, { status: 500 });
  }
}
