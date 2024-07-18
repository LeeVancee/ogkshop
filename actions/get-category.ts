/* import { Category } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCategory;
 */

import { Category } from '@/types';
import prismadb from '@/lib/prismadb';

interface GetCategoryProps {
  categoryId: string;
}

const getCategory = async ({ categoryId }: GetCategoryProps): Promise<Category | null> => {
  try {
    if (!categoryId) {
      console.error('Category id is required');
      return null;
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    if (!category) {
      return null;
    }

    // 确保返回的数据结构符合Category类型
    const formattedCategory: Category = {
      id: category.id,
      name: category.name,
      billboard: {
        id: category.billboard.id,
        label: category.billboard.label,
        imageUrl: category.billboard.imageUrl,
        storeId: category.billboard.storeId,
      },
    };

    return formattedCategory;
  } catch (error) {
    console.error('[CATEGORY_GET]', error);
    return null;
  }
};

export default getCategory;
