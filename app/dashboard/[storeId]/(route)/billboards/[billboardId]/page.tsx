'use client';
import { use } from 'react';
import { BillboardForm } from './components/billboard-form';
import HomeLoader from '@/components/loader/home-loader';
import { useGetBillboard } from '@/features/manange/api/use-get-billboard';

export default function BillboardPage({ params }: { params: Promise<{ billboardId: string }> }) {
  const { billboardId } = use(params);
  const { data: billboard, isLoading } = useGetBillboard(billboardId);

  if (isLoading) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard!} />
      </div>
    </div>
  );
}
