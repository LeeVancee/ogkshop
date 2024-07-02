'use server';

import prismadb from '@/lib/prismadb';

export async function createUser(userId: string, email_address: string, name: string) {
  if (!userId && !email_address) {
    throw new Error('Invalid user data');
  }

  const existingUser = await prismadb.user.findFirst({
    where: { id: userId },
  });

  if (!existingUser) {
    await prismadb.user.create({
      data: {
        id: userId,
        email: email_address,
        name: name,
      },
    });
  }

  return { success: true };
}
