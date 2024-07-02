import { Product } from '@/types';
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

export default getProducts;
