import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; 
import { currentUser } from '@clerk/nextjs/server'; // Import Clerk's currentUser function

export async function POST(request: NextRequest) {
  try {
    // Extract the current user from Clerk using currentUser
    const user = await currentUser(); // This gets the current authenticated user from Clerk

    if (!user) {
      // If the user is not authenticated, return unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the required data from the request body
    const { content, blogPostTitle } = await request.json();

    if (!content || !blogPostTitle) {
      // Check if content and blogPostTitle are provided in the request
      return NextResponse.json({ error: 'Missing content or blogPostTitle' }, { status: 400 });
    }

    // Check if the user exists in the database by clerkId
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id, // Use the Clerk user ID to find the user in your database
      },
    });

    if (!existingUser) {
      // If the user doesn't exist, return an error
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    // Create a new comment, regardless of whether one already exists
    const newComment = await db.blogComment.create({
      data: {
        content,
        userId: existingUser.id, // Use the userId from the database
        blogPostTitle,
      },
    });

    return NextResponse.json(newComment, { status: 201 }); // Return the newly created comment
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
