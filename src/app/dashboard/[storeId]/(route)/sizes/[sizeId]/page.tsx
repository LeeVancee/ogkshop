'use client';

import { SizeForm } from './components/size-form';
import { use } from 'react';
import { useGetSize } from '@/features/manange/api/use-get-size';
import HomeLoader from '@/components/loader/home-loader';

interface SizePageProps {
  params: Promise<{ sizeId: string }>;
}

const SizePage = ({ params }: SizePageProps) => {
  const { sizeId } = use(params);

  const { data: size, isLoading } = useGetSize(sizeId);

  if (isLoading) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size!} />
      </div>
    </div>
  );
};

export default SizePage;
