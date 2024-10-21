'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import OrderCard from './OrderCard';
import useCart from '@/hooks/use-cart';
import { useGetMyOrders } from '@/features/shop/api/use-get-myorders';
import HomeLoader from '@/components/loader/home-loader';

export default function OrderList() {
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  const { data: orders, isLoading, isError } = useGetMyOrders();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  if (isLoading) {
    return <HomeLoader />;
  }
  if (orders && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <p className="text-xl">No Orders!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      {orders && orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
}
