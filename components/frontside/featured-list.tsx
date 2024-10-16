'use client';
import { useGetFeatured } from '@/features/shop/api/use-get-featured';
import ProductCard from './product-card';
import FeaturedLoader from '../loader/featured-loader';

interface FeaturedListProps {
  title: string;
}

const FeaturedList = ({ title }: FeaturedListProps) => {
  const { data: featuredProducts, isLoading } = useGetFeatured();

  if (isLoading) {
    return <FeaturedLoader />;
  }

  if (!featuredProducts) {
    return <div className="flex justify-center items-center mt-6 lg:col-span-4 lg:mt-0">No Products</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;
