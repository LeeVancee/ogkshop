'use server';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { CategoryColumn, ColorColumn } from './type';
import { Billboard } from '@/types';

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
