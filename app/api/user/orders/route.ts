import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = await db.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
    include: { orders: true },
  });

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!userData.orders || userData.orders.length === 0) {
    return NextResponse.json({ message: "No orders found" }, { status: 200 });
  }

  return NextResponse.json(userData.orders);
}
