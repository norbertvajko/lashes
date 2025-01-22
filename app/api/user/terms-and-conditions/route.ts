import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server"; // For Clerk authentication
import { serialize } from "cookie"; // To set cookies
import { NextRequest } from "next/server";

// POST method to handle the terms acceptance
export async function POST(req: NextRequest) {
  try {
    // Extract Clerk user information
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    // If no Clerk user exists, save termsAccepted in cookies
    const termsAcceptedDate = new Date().toISOString();

    // If user is not authenticated, store the terms acceptance date in cookies
    if (!clerkUserId) {
      return new Response(
        JSON.stringify({
          message: "Terms accepted date saved in cookies",
          termsAccepted: termsAcceptedDate,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": serialize("termsAccepted", termsAcceptedDate, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 7 days
            }),
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check if the Clerk user exists in the database
    const user = await db.user.findUnique({
      where: { clerkUserId },
    });

    // If user is not found in the database, treat this case as storing terms in cookies only
    if (!user) {
      // Save the termsAccepted in cookies, even if the user is not found in the database
      return new Response(
        JSON.stringify({
          message: "Terms accepted date saved in cookies, user not found in database",
          termsAccepted: termsAcceptedDate,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": serialize("termsAccepted", termsAcceptedDate, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 7 days
            }),
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Update the termsAccepted field in the database if user exists
    const updatedUser = await db.user.update({
      where: { clerkUserId },
      data: { termsAccepted: new Date().toISOString() }, 
    });

    return new Response(
      JSON.stringify({
        message: "Termenii au fost acceptați cu succes",
        user: updatedUser,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "A aparut o eroare la validarea termenilor si conditiilor.";

    console.error("Eroare:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
