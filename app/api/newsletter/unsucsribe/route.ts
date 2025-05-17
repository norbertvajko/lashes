export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Emailul nu este furnizat" },
        { status: 400 }
      );
    }

    // Delete the user's subscription from the database
    const subscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "Acest e-mail nu este abonat la newsletter." },
        { status: 404 }
      );
    }

    await db.newsletterSubscription.delete({
      where: { email },
    });

    return NextResponse.json(
      { success: true, message: "Te-ai dezabonat cu succes!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { success: false, error: "A apărut o eroare internă. Te rugăm să încerci din nou mai târziu." },
      { status: 500 }
    );
  }
}
