import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      include: {
        promoCodes: {
          where: { expired: false },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const promoCode = dbUser.promoCodes.length > 0 ? dbUser.promoCodes[0] : null;

    return NextResponse.json({ promoCode });
  } catch (error) {
    console.error("Error fetching promo code:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}