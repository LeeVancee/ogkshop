import prismadb from '@/lib/prismadb';
import { Billboard } from '@/types';

const getBillboard = async (id: string): Promise<Billboard | null> => {
  if (!id) return null;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: id,
    },
  });

  return billboard;
};

export default getBillboard;
