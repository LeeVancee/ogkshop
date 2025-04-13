import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getSession } from '@/actions/getSession';

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();
    const userId = session?.user.id;

    const body = await req.json();

    const { name, price, categoryId, colorIds, sizeIds, images, isFeatured, isArchived, quantity } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    if (!colorIds || colorIds.length === 0) {
      return new NextResponse('At least one color id is required', { status: 400 });
    }

    if (!sizeIds || sizeIds.length === 0) {
      return new NextResponse('At least one size id is required', { status: 400 });
    }

    if (!quantity) {
      return new NextResponse('Quantity is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        quantity: quantity || 1,
        categoryId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        sizes: {
          connect: sizeIds.map((id: string) => ({ id })),
        },
        colors: {
          connect: colorIds.map((id: string) => ({ id })),
        },
      },
      include: {
        images: true,
        category: true,
        sizes: true,
        colors: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
  const params = await props.params;
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colors: colorId
          ? {
              some: {
                id: colorId,
              },
            }
          : undefined,
        sizes: sizeId
          ? {
              some: {
                id: sizeId,
              },
            }
          : undefined,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        colors: true,
        sizes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
