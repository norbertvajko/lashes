import { db } from "./db";

export async function validatePromoCodeAndUpdateOrder(orderId: number, promoCode: string): Promise<boolean> {
    // Look up the promo code in the PromoCode table
    const promo = await db.promoCode.findUnique({
        where: { code: promoCode },
    });

    if (!promo || promo.expired) return false;

    // Update the Order with the promo code
    await db.order.update({
        where: { id: orderId },
        data: {
            promoCode,
            hasPromoCode: true,
        },
    });

    return true;
}