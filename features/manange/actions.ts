'use server';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

export const getBillboard = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return billboard;
};

export const getBillboards = async (storeId: string) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return formattedBillboards;
};
