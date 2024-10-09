import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    const { storeId } = await params;
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        adminId: userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const { storeId } = await params;
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        adminId: userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
