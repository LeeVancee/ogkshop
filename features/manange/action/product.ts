'use server';

import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';

export async function getProduct(productId: string) {
  if (!productId) {
    throw new Error('Product id is required');
  }

  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      category: true,
      sizes: true,
      colors: true,
    },
  });

  return product;
}

export async function createProduct(storeId: string, data: any) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, price, categoryId, images, colorIds, sizeIds, isFeatured, isArchived, quantity } = data;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!images || !images.length) {
    throw new Error('Images are required');
  }

  if (!price) {
    throw new Error('Price is required');
  }

  if (!categoryId) {
    throw new Error('Category id is required');
  }

  if (!colorIds || colorIds.length === 0) {
    throw new Error('At least one color id is required');
  }

  if (!sizeIds || sizeIds.length === 0) {
    throw new Error('At least one size id is required');
  }

  if (!quantity) {
    throw new Error('Quantity is required');
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: {
      id: storeId,
      adminId: userId,
    },
  });

  if (!storeByUserId) {
    throw new Error('Unauthorized');
  }

  const product = await prismadb.product.create({
    data: {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      storeId,
      quantity: quantity || 1,
      sizes: {
        connect: sizeIds.map((id: string) => ({ id })),
      },
      colors: {
        connect: colorIds.map((id: string) => ({ id })),
      },
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });

  return product;
}

export async function updateProduct(productId: string, storeId: string, data: any) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, price, categoryId, images, colorIds, sizeIds, isFeatured, isArchived, quantity } = data;

  if (!productId) {
    throw new Error('Product id is required');
  }

  if (!name) {
    throw new Error('Name is required');
  }

  if (!images || !images.length) {
    throw new Error('Images are required');
  }

  if (!price) {
    throw new Error('Price is required');
  }

  if (!categoryId) {
    throw new Error('Category id is required');
  }

  if (!colorIds || colorIds.length === 0) {
    throw new Error('At least one color id is required');
  }

  if (!sizeIds || sizeIds.length === 0) {
    throw new Error('At least one size id is required');
  }

  if (!quantity) {
    throw new Error('Quantity is required');
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: {
      id: storeId,
      adminId: userId,
    },
  });

  if (!storeByUserId) {
    throw new Error('Unauthorized');
  }

  await prismadb.product.update({
    where: {
      id: productId,
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
      id: productId,
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

  return product;
}

export async function deleteProduct(productId: string, storeId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!productId) {
    throw new Error('Product id is required');
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: {
      id: storeId,
      adminId: userId,
    },
  });

  if (!storeByUserId) {
    throw new Error('Unauthorized');
  }

  const product = await prismadb.product.delete({
    where: {
      id: productId,
    },
  });

  return product;
}
