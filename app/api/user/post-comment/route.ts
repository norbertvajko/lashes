import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server'; // Importă funcția pentru autentificare

export async function POST(request: NextRequest) {
  try {
    // Obține sesiunea utilizatorului din Clerk
    const { userId } = getAuth(request); // Extrage userId din sesiunea Clerk

    if (!userId) {
      // Dacă nu există un userId, înseamnă că utilizatorul nu este autentificat
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verifică dacă utilizatorul există deja în baza de date
    let user = await db.user.findUnique({
      where: { clerkUserId: userId }, // presupunând că ai un câmp `clerkUserId` în modelul User
    });

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
        userId: userId, // Folosește id-ul utilizatorului creat sau găsit
        blogPostTitle,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
