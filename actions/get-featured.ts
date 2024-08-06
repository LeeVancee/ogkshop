import prismadb from '@/lib/prismadb';

import { Size, Color, Billboard, Product } from '@/types';

export const getFeatured = async () => {
  const featured = await prismadb.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
      /* category: {
        include: {
          billboard: true,
        },
      }, */
      colors: true,
      sizes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedFeatured: Product[] = featured.map((product) => ({
    id: product.id,
    name: product.name,
    price: parseFloat(product.price.toString()), // 假设Prisma返回的是Decimal，需要转换为number
    isFeatured: product.isFeatured,
    sizes: product.sizes as Size[], // 假设Size类型匹配
    colors: product.colors as Color[], // 假设Color类型匹配
    images: product.images,
    /*  category: {
      id: product.category.id,
      name: product.category.name,
      billboard: product.category.billboard as Billboard, // 假设billboard数据结构匹配
    }, */
  }));

  return formattedFeatured;
};
