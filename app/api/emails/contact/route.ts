import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server"; // Importing NextRequest and NextResponse for Next.js 13+ API

// Create a transporter instance with your Zoho SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.eu", // Zoho SMTP host
  port: 465, // SSL Port
  secure: true, // Use SSL
  auth: {
    user: process.env.MAIL_USER, // Your Zoho email (should be set in environment variables)
    pass: process.env.MAIL_PASSWORD, // Your Zoho email password or app-specific password
  },
});

// Handle POST request for sending emails
export async function POST(req: NextRequest) {
  const { name, email, telefon, message } = await req.json(); // Parsing request body

  // Validate required fields
  if (!name || !email || !telefon || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields in the request body" },
      { status: 400 }
    );
  }

  try {
    // Send the email using Nodemailer
    await transporter.sendMail({
      from: "mail@ll-lashes.ro", 
      to: "mail@ll-lashes.ro", 
      subject: `Ai primit un mesaj nou de la ${name}`,
      text: `Ai primit un nou mesaj de la ${name} (${email})\nTelefon: ${telefon}\n\nMesaj: ${message}`, 
      html: `
        <p><strong>Destinatar: ${name}</strong></p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `, // HTML version
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    const typedError = error as Error; // Type assertion for better error handling
    console.error("Error sending email:", typedError.message);
    return NextResponse.json({ success: false, error: typedError.message }, { status: 500 });
  }
}
