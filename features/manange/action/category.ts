'use server';

import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';

export async function getCategory(categoryId: string) {
  if (!categoryId) {
    throw new Error('Category id is required');
  }

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      billboard: true,
    },
  });

  return category;
}

export async function createCategory(storeId: string, data: { name: string; billboardId: string }) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, billboardId } = data;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!billboardId) {
    throw new Error('Billboard ID is required');
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

  const category = await prismadb.category.create({
    data: {
      name,
      billboardId,
      storeId,
    },
  });

  return category;
}

export async function updateCategory(categoryId: string, storeId: string, data: { name: string; billboardId: string }) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, billboardId } = data;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!billboardId) {
    throw new Error('Billboard ID is required');
  }

  if (!categoryId) {
    throw new Error('Category id is required');
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

  const category = await prismadb.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
      billboardId,
    },
  });

  return category;
}

export async function deleteCategory(categoryId: string, storeId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!categoryId) {
    throw new Error('Category id is required');
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

  const category = await prismadb.category.delete({
    where: {
      id: categoryId,
    },
  });

  return category;
}
