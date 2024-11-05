'use client';
import Image from 'next/image';
import { useGetBillboard } from '@/features/shop/api/use-get-billboard';
import { useGetFeatured } from '@/features/shop/api/use-get-featured';
import HomeLoader from '../loader/home-loader';
import ProductCard from './product-card';
import FeaturedLoader from '../loader/featured-loader';
const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;
export default function HomepageClient() {
  // const { data: billboard, isLoading: billboardLoading } = useGetBillboard(billboardId!);
  const { data: products, isLoading: productsLoading } = useGetFeatured();

  if (productsLoading) {
    return <FeaturedLoader />;
  }
  if (!products) {
    return null;
  }

  // 只取前五个产品
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h3 className="font-bold text-3xl">Featured Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredProducts.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
