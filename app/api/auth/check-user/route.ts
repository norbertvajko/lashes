import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;

    // Verifică dacă utilizatorul există deja în baza de date
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: id },
    });

    if (existingUser) {
      // Dacă utilizatorul există și imageUrl s-a schimbat, îl actualizezi
      if (existingUser.image !== imageUrl) {
        console.log('Updating image URL in the database...');
        await db.user.update({
          where: { clerkUserId: id },
          data: {
            image: imageUrl || '', // Asigură-te că imageUrl nu este null
          },
        });
      } else { }
      // Returnează utilizatorul existent
      return NextResponse.json(existingUser);
    }

    // Creează utilizatorul în baza de date dacă nu există
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
      },
    });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (err) {
    console.error('Error checking user or creating user:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
