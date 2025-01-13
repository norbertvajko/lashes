// continue

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { origin } = new URL(req.url);
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?canceled=true`,
      line_items: [
        {
          price: 'prod_QQQ1WSfsOmZ47l', // Replace with your price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'acss_debit'],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
