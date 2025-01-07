import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// for production
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    const { userId, item } = await request.json();

    try {
        // Check if user exists
        const user = await db.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create new cart item
        const newCartItem = await db.cartCourses.create({
            data: {
                userId,
                title: item.title,
                price: item.price,
                description: item.description,
                link: item.link
            },
        });
        return NextResponse.json(newCartItem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }
}
