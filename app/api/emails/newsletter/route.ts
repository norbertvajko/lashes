import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer transporter
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
      const { email } = await req.json();
  
      if (!email) {
        return NextResponse.json(
          { success: false, error: "Te rugăm să introduci un e-mail valid." },
          { status: 400 }
        );
      }
  
      // Check if email already exists
      const existingSubscription = await db.newsletterSubscription.findUnique({
        where: { email },
      });
  
      if (existingSubscription) {
        return NextResponse.json(
          { success: false, error: "Acest e-mail este deja abonat la newsletter-ul nostru. 💌" },
          { status: 409 } // Conflict status code
        );
      }
  
      // Save new subscription
      await db.newsletterSubscription.create({
        data: { email },
      });
  
      // Send confirmation email
      await transporter.sendMail({
        from: `"LL Lashes" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Bine ai venit! Newsletter-ul nostru vine în curând ✨",
        html: `
          <div style="max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 10px; text-align: center; font-family: Arial, sans-serif; border: 2px solid #f4d4e2;">
            <h2 style="color: #d63384;">💖 Bine ai venit în comunitatea LL Lashes! 💖</h2>
            <p style="font-size: 16px; color: #444;">Mulțumim că te-ai abonat la newsletter-ul nostru! Vei primi cele mai noi oferte, sfaturi exclusive și promoții speciale direct în inbox-ul tău.</p>
            <p style="font-size: 16px; color: #444;">Pregătește-te pentru <strong>cele mai bune oferte</strong> la produsele cursurile mele pentru gene!</p>
            <p style="font-size: 16px; color: #444;">Dacă ai întrebări, ne poți scrie oricând la <a href="mailto:mail@ll-lashes.ro" style="color: #d63384; text-decoration: none;">mail@ll-lashes.ro</a>.</p>
            <p style="font-size: 16px; color: #444;"><strong>Ne vedem curând! 💕</strong></p>
            <a href="https://ll-lashes.ro/courses" style="display: inline-block; background: #d63384; color: white; padding: 12px 24px; font-size: 16px; border-radius: 5px; text-decoration: none; margin-top: 10px;">Vizitează cursurile</a>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">Dacă nu dorești să mai primești emailuri, te poți dezabona oricând.</p>
          </div>
        `,
      });
  
      return NextResponse.json(
        { success: true, message: "Te-ai abonat cu succes! 🎉 Vei primi cele mai noi oferte în curând." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { success: false, error: "A apărut o eroare internă. Te rugăm să încerci din nou mai târziu." },
        { status: 500 }
      );
    }
  }
  