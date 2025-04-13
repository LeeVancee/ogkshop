/* import { Size } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getSizes; */

import prismadb from '@/lib/prismadb';
import { Size } from '@/types';

export default async function getSizes(storeId: string) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const formattedSizes: Size[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    storeId: size.storeId,
    value: size.value,
  }));

  return formattedSizes;
}
