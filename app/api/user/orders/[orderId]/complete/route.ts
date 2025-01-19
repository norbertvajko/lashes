import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
    const { orderId } = params;

    try {
        const order = await db.order.findUnique({
            where: { id: Number(orderId) },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const remainingAmount = order.total - order.advance;

        if (remainingAmount <= 0) {
            const updatedOrder = await db.order.update({
                where: { id: Number(orderId) },
                data: {
                    status: "Plata finalizată",
                },
            });

            return NextResponse.json(updatedOrder, { status: 200 });
        } else {
            return NextResponse.json({ error: "Plata finală nu a fost efectuată." }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
