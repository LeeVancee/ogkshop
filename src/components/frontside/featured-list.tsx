import ProductCard from './product-card';

import prismadb from '@/lib/prismadb';

interface FeaturedListProps {
  title: string;
}

const FeaturedList = async ({ title }: FeaturedListProps) => {
  const featured = await prismadb.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
      /* category: {
            include: {
              billboard: true,
            },
          }, */
      colors: true,
      sizes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // 只取前五个产品
  const displayProducts = featured.slice(0, 5);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayProducts.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;
