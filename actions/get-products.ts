/* import { Product } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = res.json(); // 等待解析 JSON 数据

    return products; // 返回解析后的数据
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts; */
import prismadb from '@/lib/prismadb';
import { Billboard, Product, Size, Color } from '@/types';

interface Query {
  storeId?: string;
  categoryId?: string;
  colorName?: string;
  sizeName?: string;
  isFeatured?: boolean | undefined;
  categoryName?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    // 查找 categoryId
    // 查找 categoryId
    const category = await prismadb.category.findFirst({
      where: { name: query.categoryName },
      select: { id: true },
    });

    if (!category) {
      return [];
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: query.storeId,
        categoryId: category.id,
        colors: query.colorName
          ? {
              some: {
                name: query.colorName,
              },
            }
          : undefined,
        sizes: query.sizeName
          ? {
              some: {
                name: query.sizeName,
              },
            }
          : undefined,
        isFeatured: query.isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: {
          include: {
            billboard: true,
          },
        },
        colors: true,
        sizes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 转换Prisma返回的数据以匹配Product类型
    const formattedProducts: Product[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.toString()), // 假设Prisma返回的是Decimal，需要转换为number
      isFeatured: product.isFeatured,
      sizes: product.sizes as Size[], // 假设Size类型匹配
      colors: product.colors as Color[], // 假设Color类型匹配
      images: product.images,
      category: {
        id: product.category.id,
        name: product.category.name,
        billboard: product.category.billboard as Billboard, // 假设billboard数据结构匹配
      },
    }));

    return formattedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts;
