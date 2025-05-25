import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { promoCode, discount } = await req.json();

        if (!promoCode) {
            return NextResponse.json({ error: "Missing promoCode" }, { status: 400 });
        }

        const clerkUser = await currentUser();

        if (!clerkUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Find user in your DB by clerkUserId field (which stores Clerk's user ID)
        const dbUser = await db.user.findUnique({
            where: { clerkUserId: clerkUser.id },
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
        }

        // Use dbUser.id when creating promo code
        const createdPromo = await db.promoCode.upsert({
            where: { code: promoCode },
            update: {
                userId: dbUser.id,
                discount: discount ?? null,
            },
            create: {
                code: promoCode,
                discount: discount ?? null,
                userId: dbUser.id,
            },
        });

        return NextResponse.json({ success: true, promoCode: createdPromo });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Eroare la aplicarea codului promo. Te rugam sa incerci mai tarziu." }, { status: 500 });
    }
}