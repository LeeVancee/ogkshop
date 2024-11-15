'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/features/auth/getSession';
import prismadb from '@/lib/prismadb';

export async function getColor(colorId: string) {
  if (!colorId) {
    throw new Error('Color id is required');
  }

  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return color;
}

export async function createColor(storeId: string, data: { name: string; value: string }) {
  const session = await getSession();
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

  const color = await prismadb.color.create({
    data: {
      name,
      value,
      storeId,
    },
  });

  revalidatePath(`/dashboard/${storeId}/colors`);
  return color;
}

export async function updateColor(colorId: string, storeId: string, data: { name: string; value: string }) {
  const session = await getSession();
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

  if (!colorId) {
    throw new Error('Color id is required');
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

  const color = await prismadb.color.update({
    where: {
      id: colorId,
    },
    data: {
      name,
      value,
    },
  });

  revalidatePath(`/dashboard/${storeId}/colors`);
  return color;
}

export async function deleteColor(colorId: string, storeId: string) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!colorId) {
    throw new Error('Color id is required');
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

  const color = await prismadb.color.delete({
    where: {
      id: colorId,
    },
  });

  revalidatePath(`/dashboard/${storeId}/colors`);
  return color;
}
