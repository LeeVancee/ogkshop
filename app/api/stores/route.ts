import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const { name } = body;

    const store = await prismadb.store.create({
      data: {
        name,
        adminId: userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
