'use client';
import { OrderColumn } from '@/types';
import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import useCart from '@/hooks/use-cart';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface OrderListProps {
  initialOrders: OrderColumn[];
}

export default function OrderList({ initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState<OrderColumn[]>(initialOrders);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();

  // 确保客户端和服务器端渲染一致
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  // 在客户端渲染前不显示任何内容
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <div className="flex justify-center items-center h-full pt-20">
          <p className="text-xl">No Orders!</p>
        </div>
      )}
    </div>
  );
}
