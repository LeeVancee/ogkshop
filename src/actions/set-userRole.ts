'use server';
import prismadb from '@/lib/prismadb';
import { getSession } from './getSession';

export const setUserRole = async (email: string, role: string) => {
  const user = await prismadb.user.update({
    where: {
      email: email,
    },
    data: {
      role: role,
    },
  });
  return { success: true, user };
};
