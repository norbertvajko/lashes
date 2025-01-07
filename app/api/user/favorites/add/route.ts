import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

//for production
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    const { userId, item } = await request.json();

    try {
        const newFavoriteItem = await db.favoriteCourses.create({
            data: {
                userId,
                title: item.title,
                price: item.price,
                description: item.description,
                link: item.link
            },
        });
        return NextResponse.json(newFavoriteItem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }
}