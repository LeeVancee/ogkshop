import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getSession } from '@/actions/getSession';

export async function GET(req: Request, props: { params: Promise<{ productId: string }> }) {
  const params = await props.params;
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
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
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ productId: string; storeId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ productId: string; storeId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();
    const userId = session?.user.id;

    const body = await req.json();

    const { name, price, categoryId, images, colorIds, sizeIds, isFeatured, isArchived, quantity } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        quantity,
        images: {
          deleteMany: {},
        },
        sizes: {
          set: [],
          connect: sizeIds.map((id: string) => ({ id })),
        },
        colors: {
          set: [],
          connect: colorIds.map((id: string) => ({ id })),
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
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
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
