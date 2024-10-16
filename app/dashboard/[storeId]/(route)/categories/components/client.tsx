'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/backside/data-table';
import { Heading } from '@/components/backside/heading';
import { Separator } from '@/components/ui/separator';

import { columns } from './columns';
import { ApiList } from '@/components/backside/api/api-list';
import { useGetCategories } from '@/features/manange/api/use-get-category';
import HomeLoader from '@/components/loader/home-loader';

export const CategoriesClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetCategories(params.storeId as string);

  if (isLoading || !data) {
    return <HomeLoader />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <Button onClick={() => router.push(`/dashboard/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
