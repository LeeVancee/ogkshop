'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/backside/data-table';
import { Heading } from '@/components/backside/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/backside/api/api-list';

import { columns, BillboardColumn } from './columns';
import { useGetBillboards } from '@/features/manange/api/use-get-billboard';
import HomeLoader from '@/components/loader/home-loader';

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useGetBillboards(params.storeId as string);

  if (isLoading) {
    return <HomeLoader />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
        <Button onClick={() => router.push(`/dashboard/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
