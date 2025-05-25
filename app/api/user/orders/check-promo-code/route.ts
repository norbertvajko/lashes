import { NextResponse } from 'next/server';

const coduriValide: Record<string, number> = {
  'LASHY10': 10,
  'LASHY20': 20,
};

export async function POST(req: Request) {
  const body = await req.json();
  const promoCode = body.promoCode;

  if (!promoCode || typeof promoCode !== 'string') {
    return NextResponse.json(
      { valid: false, message: 'Codul promoțional este necesar și trebuie să fie un text.' },
      { status: 400 }
    );
  }

  const discount = coduriValide[promoCode.toUpperCase()];

  if (discount) {
    return NextResponse.json({ valid: true, discount }, { status: 200 });
  } else {
    return NextResponse.json(
      { valid: false, message: 'Cod invalid' },
      { status: 400 }
    );
  }
}
