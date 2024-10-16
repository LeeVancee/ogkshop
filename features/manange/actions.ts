'use server';
import prismadb from '@/lib/prismadb';

export const getBillboard = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return billboard;
};
