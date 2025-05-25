import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
    const { orderId } = params;
    const body = await req.json();
    const paymentAmount = Number(body.amount);

    try {
        const order = await db.order.findUnique({
            where: { id: Number(orderId) },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Verifică dacă plata a fost deja finalizată
        if (order.status === "Plata finalizata") {
            return NextResponse.json({ success: true, order }, { status: 200 });
        }

        const updatedAdvance = order.advance + paymentAmount;
        const remainingAmount = order.total - updatedAdvance;

        let updatedStatus = order.status;
        let newRateNumber = order.rateNumber ?? 0;

        if (order.hasRates) {
            if (remainingAmount <= 0 || newRateNumber >= 3) {
                updatedStatus = "Plata finalizata";
                newRateNumber = 3; // asigurăm că rămâne la 3
            } else {
                newRateNumber = newRateNumber + 1;
                updatedStatus = `Rata ${newRateNumber} din 3 achitata`;
            }
        } else {
            updatedStatus = remainingAmount <= 0 ? "Plata finalizata" : "Avans platit";
        }

        const updatedOrder = await db.order.update({
            where: { id: Number(orderId) },
            data: {
                advance: updatedAdvance,
                status: updatedStatus,
                rateNumber: order.hasRates ? newRateNumber : null,
                hasPromoCode: order.hasPromoCode,
            },
        });

        return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });

    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}