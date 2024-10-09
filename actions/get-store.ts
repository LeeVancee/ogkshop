'use server';

import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

export const getStore = async () => {
  const session = await auth();
  const adminId = session?.user.id;

  // 检查用户是否已登录，以及是否是 admin 用户
  const user = await prismadb.user.findUnique({
    where: {
      id: adminId,
      roles: 'ADMIN',
    },
  });

  if (!user) {
    redirect('/');
  }

  const store = await prismadb.store.findFirst({
    where: {
      adminId: adminId,
    },
  });

  return store;
};
