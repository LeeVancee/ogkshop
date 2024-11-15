'use server';

import { getSession } from '@/features/auth/getSession';
import prismadb from '@/lib/prismadb';

export async function getBillboard(billboardId: string) {
  if (!billboardId) {
    throw new Error('Billboard id is required');
  }

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return billboard;
}

export async function createBillboard(storeId: string, data: { label: string; imageUrl: string }) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { label, imageUrl } = data;

  if (!label) {
    throw new Error('Label is required');
  }

  if (!imageUrl) {
    throw new Error('Image URL is required');
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

  const billboard = await prismadb.billboard.create({
    data: {
      label,
      imageUrl,
      storeId,
    },
  });

  return billboard;
}

export async function deleteBillboard(billboardId: string, storeId: string) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!billboardId) {
    throw new Error('Billboard id is required');
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

  const billboard = await prismadb.billboard.delete({
    where: {
      id: billboardId,
    },
  });

  return billboard;
}

export async function updateBillboard(billboardId: string, storeId: string, data: { label: string; imageUrl: string }) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  const { label, imageUrl } = data;

  if (!label) {
    throw new Error('Label is required');
  }

  if (!imageUrl) {
    throw new Error('Image URL is required');
  }

  if (!billboardId) {
    throw new Error('Billboard id is required');
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

  const billboard = await prismadb.billboard.update({
    where: {
      id: billboardId,
    },
    data: {
      label,
      imageUrl,
    },
  });

  return billboard;
}
