'use client';
import Image from 'next/image';
import { useGetBillboard } from '@/features/shop/api/use-get-billboard';
import { useGetFeatured } from '@/features/shop/api/use-get-featured';
import HomeLoader from '../loader/home-loader';
import ProductCard from './product-card';
const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;
export default function HomepageClient() {
  const { data: billboard, isLoading: billboardLoading } = useGetBillboard(billboardId!);
  const { data: products, isLoading: productsLoading } = useGetFeatured();
  const isLoading = billboardLoading || productsLoading;

  if (isLoading) {
    return <HomeLoader />;
  }

  if (!billboard || !products) {
    console.error('Billboard or products not found');
    return null;
  }

  return (
    <div className="space-y-10 pb-10 pt-8">
      <section className="rounded-xl bg-neutral-100">
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

      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
