/* import { Category } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getCategories;

 */

import { Category } from '@/types';
import prismadb from '@/lib/prismadb';

interface GetCategoriesProps {
  storeId: string;
}

const getCategories = async ({ storeId }: GetCategoriesProps): Promise<Category[]> => {
  try {
    if (!storeId) {
      console.error('Store id is required');
      return [];
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        billboard: true, // 假设Category类型包含billboard
      },
    });

    // 转换prisma返回的数据以匹配Category类型
    const formattedCategories: Category[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      billboard: {
        id: category.billboard.id,
        label: category.billboard.label,
        imageUrl: category.billboard.imageUrl,
        storeId: category.billboard.storeId,
      },
    }));

    return formattedCategories;
  } catch (error) {
    console.error('[CATEGORIES_GET]', error);
    return [];
  }
};

export default getCategories;
