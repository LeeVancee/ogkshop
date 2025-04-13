import prismadb from '@/lib/prismadb';
import { Color } from '@/types';

/* const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getColors;
 */

export default async function getColors(storeId: string) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  const formattedColors: Color[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    storeId: color.storeId,
    value: color.value,
  }));

  return formattedColors;
}
