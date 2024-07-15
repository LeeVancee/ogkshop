/* import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
 */

import prismadb from '@/lib/prismadb';
import { Billboard, Product } from '@/types';

export default async function getProduct(productId: string): Promise<Product | null> {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: {
          include: {
            billboard: true,
          },
        },
        size: true,
        color: true,
      },
    });

    if (!product) {
      return null;
    }

    // Format the Prisma data to match the Product type
    const formattedProduct: Product = {
      id: product.id,
      name: product.name,
      price: Number(product.price), // Assuming Prisma returns Decimal, convert to number
      images: product.images,
      size: product.size,
      color: product.color,
      isFeatured: product.isFeatured,
      category: {
        id: product.category.id,
        name: product.category.name,
        billboard: product.category.billboard as Billboard, // Ensure billboard matches Billboard type
      },
    };

    return formattedProduct;
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return null;
  }
}
