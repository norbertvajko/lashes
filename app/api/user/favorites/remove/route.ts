import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    const { userId, title } = await request.json();

    try {
        const deletedFavoriteItem = await db.favoriteCourses.deleteMany({
            where: {
                userId,
                title,
            },
        });
        return NextResponse.json(deletedFavoriteItem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
    }
}