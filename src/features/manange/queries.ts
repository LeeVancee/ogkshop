'use server';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import {
  BillboardColumn,
  CategoryColumn,
  ColorColumn,
  GraphData,
  OrderColumn,
  ProductColumn,
  SizeColumn,
} from './type';
import { Billboard, Category } from '@/types';
import { formatter } from '@/lib/utils';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const getBillboard = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return billboard;
};

export const getBillboards = async (storeId: string) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: Billboard[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    storeId: item.storeId,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return formattedBillboards;
};

export const getCategory = async (categoryId: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return category;
};

export const getCategories = async (storeId: string) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return formattedCategories;
};

export const getColors = async (storeId: string) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return formattedColors;
};

export const getColor = async (colorId: string) => {
  const color = await prismadb.color.findUnique({
    where: { id: colorId },
  });
  return color;
};

export const getSizes = async (storeId: string) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return formattedSizes;
};

export const getSize = async (sizeId: string) => {
  const size = await prismadb.size.findUnique({
    where: { id: sizeId },
  });
  return size;
};

export const getProducts = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(Number(item.price)),
    category: item.category.name,
    size: item.sizes.map((size) => size.name).join(', '),
    color: item.colors.map((color) => color.name).join(', '),
    images: item.images.map((image) => image.url).join(', '),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return formattedProducts;
};

export const getProduct = async (productId: string) => {
  const product = await prismadb.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      sizes: true,
      colors: true,
    },
  });
  return product;
};

export const getOrders = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, orderItem) => {
        return total + orderItem.product.price * orderItem.quantity;
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return formattedOrders;
};

export const getSettings = async (storeId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  const store = await prismadb.store.findUnique({
    where: { id: storeId, adminId: userId },
  });
  if (!store) {
    redirect('/');
  }
  return store;
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

export const getStores = async () => {
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

  const stores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });

  return stores;
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

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
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

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price * item.quantity;
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
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
