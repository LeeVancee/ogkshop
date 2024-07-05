'use client';
import { OrderColumn } from '@/types';
import React from 'react';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: OrderColumn[];
}
export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            phone={order.phone}
            address={order.address}
            products={order.products}
            totalPrice={order.totalPrice}
            isPaid={order.isPaid}
            createdAt={order.createdAt}
            image={order.image}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-full pt-20">
          <p className="text-xl">No Orders!</p>
        </div>
      )}
    </div>
  );
}
