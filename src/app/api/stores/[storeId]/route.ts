import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

import { getSession } from '@/actions/getSession';

export async function PATCH(req: Request, props: { params: Promise<{ orderId: string; storeId: string }> }) {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const body = await req.json();
    const params = await props.params;

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
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

export async function DELETE(req: Request, props: { params: Promise<{ orderId: string; storeId: string }> }) {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const params = await props.params;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
