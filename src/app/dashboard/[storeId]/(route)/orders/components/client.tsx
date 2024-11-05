'use client';

import { DataTable } from '@/components/backside/data-table';
import { Heading } from '@/components/backside/heading';
import { Separator } from '@/components/ui/separator';

import { columns, OrderColumn } from './columns';
import { useGetOrders } from '@/features/manange/api/use-get-order';
import { useParams } from 'next/navigation';
import HomeLoader from '@/components/loader/home-loader';
interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = () => {
  const params = useParams();
  const { data, isLoading } = useGetOrders(params.storeId as string);

  if (!data || isLoading) {
    return <HomeLoader />;
  }

  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
