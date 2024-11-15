'use server';

import prismadb from '@/lib/prismadb';
import { getSession } from '@/features/auth/getSession';

export async function createStore(data: { name: string }) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!data.name) {
    throw new Error('Name is required');
  }

  const store = await prismadb.store.create({
    data: {
      name: data.name,
      adminId: userId,
    },
  });

  return store;
}

export async function updateStore(storeId: string, data: { name: string }) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!data.name) {
    throw new Error('Name is required');
  }

  if (!storeId) {
    throw new Error('Store id is required');
  }

  const store = await prismadb.store.updateMany({
    where: {
      id: storeId,
      adminId: userId,
    },
    data: {
      name: data.name,
    },
  });

  return store;
}

export async function deleteStore(storeId: string) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!storeId) {
    throw new Error('Store id is required');
  }

  const store = await prismadb.store.deleteMany({
    where: {
      id: storeId,
      adminId: userId,
    },
  });

  return store;
}
