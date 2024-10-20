'use server';
import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { Billboard, Category, Color, Size, Product } from '@/types';
import { redirect } from 'next/navigation';

export const getBillboard = async (id: string): Promise<Billboard | null> => {
  if (!id) return null;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: id,
    },
  });

  return billboard;
};

interface GetCategoriesProps {
  storeId: string;
}
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
export const getCategories = async (): Promise<Category[]> => {
  try {
    if (!STORE_ID) {
      console.error('Store id is required');
      return [];
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: STORE_ID,
      },
      include: {
        billboard: true, // 假设Category类型包含billboard
      },
    });

    // 转换prisma返回的数据以匹配Category类型
    const formattedCategories: Category[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      storeId: category.storeId,
      billboardId: category.billboardId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
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

export const getColors = async (storeId: string) => {
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
};

export const getSizes = async (storeId: string) => {
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
};

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
  }));

  return formattedFeatured;
};

export const getProduct = async (productId: string): Promise<Product | null> => {
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
        sizes: true,
        colors: true,
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
      sizes: product.sizes as Size[], // Assuming Size type matches
      colors: product.colors as Color[], // Assuming Color type matches
      isFeatured: product.isFeatured,
      category: {
        id: product.category.id,
        name: product.category.name,
        storeId: product.category.storeId,
        billboardId: product.category.billboardId,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      },
    };

    return formattedProduct;
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return null;
  }
};

interface Query {
  storeId?: string;
  categoryId?: string;
  colorName?: string;
  sizeName?: string;
  isFeatured?: boolean | undefined;
  categoryName?: string;
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    let category;
    if (query.categoryName) {
      category = await prismadb.category.findFirst({
        where: { name: query.categoryName },
        select: { id: true },
      });

      if (!category) {
        return [];
      }
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: query.storeId,
        categoryId: category?.id,
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
        storeId: product.category.storeId,
        billboardId: product.category.billboardId,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
        billboard: product.category.billboard as Billboard,
      },
    }));

    return formattedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price * item.quantity;
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};

export const getStore = async () => {
  const session = await auth();
  const adminId = session?.user.id;

  // 检查用户是否已登录，以及是否是 admin 用户
  const user = await prismadb.user.findUnique({
    where: {
      id: adminId,
      roles: 'ADMIN',
    },
  });

  if (!user) {
    redirect('/');
  }

  const store = await prismadb.store.findFirst({
    where: {
      adminId: adminId,
    },
  });

  return store;
};
