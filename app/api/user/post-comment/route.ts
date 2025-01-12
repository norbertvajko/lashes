import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server'; // Importă funcția pentru autentificare
import { useSession } from '@clerk/nextjs';
import { UserRole } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    // Obține sesiunea utilizatorului din Clerk
    const { userId } = getAuth(request); // Extrage userId din sesiunea Clerk

    const session = useSession();
    const clerkUser = session.session?.user;

    if (!userId) {
      // Dacă nu există un userId, înseamnă că utilizatorul nu este autentificat
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verifică dacă utilizatorul există deja în baza de date
    let user = await db.user.findUnique({
      where: { clerkUserId: userId }, // presupunând că ai un câmp `clerkUserId` în modelul User
    });

    let newUser = null;
    // Dacă utilizatorul nu există, îl creează
    if (!user) {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          name: clerkUser?.fullName,
          image: clerkUser?.imageUrl,
          role: UserRole.USER,
          email: clerkUser?.emailAddresses[0].emailAddress,
          // Câmpul clerkUserId ar trebui să fie prezent în schema ta Prisma
          // Alte câmpuri de utilizator pot fi adăugate aici (de exemplu, name, email, etc.)
        },
      });
    }

    newUser = user;

    // Preia datele din request (comentariul și blogPostTitle)
    const { content, blogPostTitle } = await request.json();

    if (!content || !blogPostTitle) {
      // Verifică dacă toate câmpurile necesare au fost trimise
      return NextResponse.json({ error: 'Missing content or blogPostTitle' }, { status: 400 });
    }

    // Crează un nou comentariu în baza de date
    const newComment = await db.blogComment.create({
      data: {
        content,
        userId: user.id, // Folosește id-ul utilizatorului creat sau găsit
        blogPostTitle,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
