import ProductCard from './product-card';
import { getFeatured } from '@/actions/get-featured';

interface FeaturedListProps {
  title: string;
}

const FeaturedList = async ({ title }: FeaturedListProps) => {
  const featuredProducts = await getFeatured();
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
