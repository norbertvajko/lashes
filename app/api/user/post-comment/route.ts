import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function POST(request: NextRequest) {
  const { content, userId, blogPostTitle } = await request.json();

  try {
    const newComment = await db.blogComment.create({
      data: {
        content,
        userId,
        blogPostTitle
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}