import ProductCard from '@/components/frontside/product-card';
import NoResults from '@/components/frontside/no-results';
import getProducts from '@/actions/get-products';
import Grid from '@/components/grid';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    colorName: string;
    sizeName: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const products = await getProducts({
    categoryName: params.categoryName,
    colorName: searchParams.colorName,
    sizeName: searchParams.sizeName,
  });

  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      {products.length === 0 && (
        <Grid className="grid-cols-2 md:grid-cols-4">
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return <Grid.Item key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />;
            })}
        </Grid>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
