import { auth } from '@/auth';
import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
import React from 'react';
import OrderCard from './components/OrderCard';
import { OrderColumn } from '@/types';

export default async function OrdersPage() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null; // 或者重定向到登录页
  }

  const orders = await prismadb.order.findMany({
    where: {
      userId: userId, // 添加 userId 作为查询条件
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
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-y-4">
        {formattedOrders.length > 0 ? (
          formattedOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              phone={order.phone}
              address={order.address}
              products={order.products}
              totalPrice={order.totalPrice}
              isPaid={order.isPaid}
              createdAt={order.createdAt}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full pt-20">
            <p className="text-xl">No Orders!</p>
          </div>
        )}
      </div>
    </Container>
  );
}
