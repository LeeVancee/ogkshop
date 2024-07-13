'use client';
import { OrderColumn } from '@/types';
import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import useCart from '@/hooks/use-cart';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface OrderListProps {
  orders: OrderColumn[];
}

export default function OrderList({ orders }: OrderListProps) {
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  return (
    <div className="flex flex-col gap-y-4 p-6">
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
