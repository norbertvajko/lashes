import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH pentru completarea plății
export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
    const { orderId } = params;

    try {
        // Căutăm comanda în baza de date
        const order = await db.order.findUnique({
            where: { id: Number(orderId) },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const remainingAmount = order.total - order.advance;

        if (remainingAmount <= 0) {
            // Actualizăm comanda pentru a marca plata ca fiind finalizată
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
