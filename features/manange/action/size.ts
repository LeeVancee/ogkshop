'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';

export async function getSize(sizeId: string) {
  if (!sizeId) {
    throw new Error('Size id is required');
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return size;
}

export async function createSize(storeId: string, data: { name: string; value: string }) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, value } = data;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!value) {
    throw new Error('Value is required');
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

  const size = await prismadb.size.create({
    data: {
      name,
      value,
      storeId,
    },
  });

  revalidatePath(`/dashboard/${storeId}/sizes`);
  return size;
}

export async function updateSize(sizeId: string, storeId: string, data: { name: string; value: string }) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { name, value } = data;

  if (!name) {
    throw new Error('Name is required');
  }

  if (!value) {
    throw new Error('Value is required');
  }

  if (!sizeId) {
    throw new Error('Size id is required');
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

  const size = await prismadb.size.update({
    where: {
      id: sizeId,
    },
    data: {
      name,
      value,
    },
  });

  revalidatePath(`/dashboard/${storeId}/sizes`);
  return size;
}

export async function deleteSize(sizeId: string, storeId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!sizeId) {
    throw new Error('Size id is required');
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

  const size = await prismadb.size.delete({
    where: {
      id: sizeId,
    },
  });

  revalidatePath(`/dashboard/${storeId}/sizes`);
  return size;
}
