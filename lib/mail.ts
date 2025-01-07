import { Resend } from "resend";
import logo from "../assets/images/logo-white.png";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

const emailTemplate = (content: string, subject: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center; padding-bottom: 20px;">
      <img src="${logo.src}/logo.png" alt="LL Lashes" style="max-width: 150px;" />
    </div>
    <h2 style="color: #333; text-align: center;">${subject}</h2>
    <div style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;"> <!-- Am adaugat text-align:center aici -->
      ${content}
    </div>
    <div style="margin-top: 30px; text-align: center;">
      <p style="color: #777; font-size: 14px;">LL Lashes © ${new Date().getFullYear()}</p>
    </div>
  </div>
`;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`
  })
}


// Folosită pentru emailuri de confirmare
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const content = `<p>Click <a href="${confirmLink}">aici</a> pentru confirmare.</p>`;
    const subject = "LL Lashes - Mail de confirmare";

    await resend.emails.send({
        from: "LL LASHES <onboarding@resend.dev>",
        to: email,
        subject: subject,
        html: emailTemplate(content, subject)
    });
}

// Folosită pentru resetarea parolei
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    const content = `<p>Click <a href="${resetLink}">aici</a> pentru a reseta parola.</p>`;
    const subject = "LL Lashes - Reseteaza parola";

    await resend.emails.send({
        from: "LL LASHES <onboarding@resend.dev>",
        to: email,
        subject: subject,
        html: emailTemplate(content, subject)
    });
}