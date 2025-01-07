import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
    const { userId } = await request.json();

    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ error: 'userId parameter is missing or invalid' }, { status: 400 });
    }

    try {
        const favoriteItems = await db.favoriteCourses.findMany({
            where: { userId },
        });
        return NextResponse.json(favoriteItems, { status: 200 });
    } catch (error) {
        console.error('Error fetching favoriteItems:', error);
        return NextResponse.json({ error: 'Failed to fetch favoriteItems' }, { status: 500 });
    }
}
