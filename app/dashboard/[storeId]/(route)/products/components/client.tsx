'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/backside/data-table';
import { Heading } from '@/components/backside/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/backside/api/api-list';
import { columns, ProductColumn } from './columns';
import { useGetProducts } from '@/features/manange/api/use-get-product';
import HomeLoader from '@/components/loader/home-loader';

export const ProductsClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetProducts(params.storeId as string);

  if (isLoading || !data) {
    return <HomeLoader />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
        <Button onClick={() => router.push(`/dashboard/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
