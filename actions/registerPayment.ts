import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerPayment(
  userId: string,
  amount: number,
  rawData: string,
  eventType: string,
  timeString: string,
  dateTime: string,
  receiptEmail: string | null,
  receiptUrl: string | null,
  paymentMethodDetails: string,
  billingDetails: string,
  currency: string | null
) {
  try {
    const payment = await db.payment.create({
      data: {
        userId,
        amount,
        rawData,
        eventType,
        timeString,
        dateTime,
        receiptEmail,
        receiptUrl,
        paymentMethodDetails,
        billingDetails,
        currency,
      },
    });
    return payment;
  } catch (error) {
    throw new Error(`Error registering payment: ${error}`);
  }
}
