import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

//for production
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const comments = await db.blogComment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        email: true,
                    },
                },
            },
        });
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}
