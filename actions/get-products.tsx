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
import { Billboard, Product } from '@/types';

interface Query {
  storeId?: string;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean | undefined;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const products = await prismadb.product.findMany({
      where: {
        storeId: query.storeId,
        categoryId: query.categoryId,
        colorId: query.colorId,
        sizeId: query.sizeId,
        isFeatured: query.isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: {
          include: {
            billboard: true, // 包含billboard数据
          },
        },
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 转换Prisma返回的数据以匹配Product类型
    const formattedProducts: Product[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price, // 假设Prisma返回的是Decimal，需要转换为number
      isFeatured: product.isFeatured,
      size: product.size,
      color: product.color,
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
