import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    // Get authentication details
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: 'User not found in Clerk' }, { status: 404 });
    }

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;

    // Check if the user exists in your database
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: id },
    });

    if (existingUser) {
      // Update the image URL if it has changed
      if (existingUser.image !== imageUrl) {
        console.log('Updating image URL in the database...');
        await db.user.update({
          where: { clerkUserId: id },
          data: {
            image: imageUrl || '', // Ensure imageUrl is not null
            name: `${firstName} ${lastName}`
          },
        });
      }

      // Return the existing user
      return NextResponse.json(existingUser);
    }

    // Create the user in the database if they don't exist
    const createdUser = await db.user.create({
      data: {
        clerkUserId: id,
        name: `${firstName} ${lastName}`,
        email: emailAddresses[0]?.emailAddress || '',
        image: imageUrl || '',
        role: UserRole.USER,
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        accounts: { create: [] },
        comments: { create: [] },
        payments: { create: [] },
        favoriteCourses: { create: [] },
        cartCourses: { create: [] },
        termsAccepted: "",
      },
    });

    console.log(createdUser);

    return NextResponse.json(createdUser, { status: 201 });
  } catch (err) {
    console.error('Error checking user or creating user:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
