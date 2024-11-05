'use client';
import Image from 'next/image';

import { useGetBillboard } from '@/features/shop/api/use-get-billboard';
import BillboardLoader from '../loader/billboard-loader';

const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;

const Billboard = () => {
  const { data: billboard, isLoading } = useGetBillboard(billboardId!);

  /*  if (isLoading) {
    return <BillboardLoader />;
  } */

  if (!billboard) {
    console.error('Billboard not found');
    return null;
  }

  return (
    <section className="rounded-xl bg-neutral-100 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-12 px-8 sm:px-16 md:grid-cols-2 min-h-[550px]">
        <div className="max-w-md space-y-6">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{billboard.label}</h2>
          <p className="text-pretty text-lg text-neutral-600">
            {'Discover unique items that blend style and functionality.'}
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={billboard.imageUrl}
            alt={billboard.label}
            width={550}
            height={550} // 添加一个合适的高度值
            className="rounded-lg object-cover w-full h-auto" // 修改 className
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Billboard;
