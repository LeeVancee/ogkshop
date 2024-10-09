import ProductList from '@/components/frontside/product-list';
import { Suspense } from 'react';
import ProductListLoader from '@/components/loader/productlist-loader';

interface CategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
  searchParams: Promise<{
    colorName: string;
    sizeName: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { categoryName } = await params;
  const { colorName, sizeName } = await searchParams;

  return (
    <Suspense fallback={<ProductListLoader />}>
      <ProductList categoryName={categoryName} colorName={colorName} sizeName={sizeName} />
    </Suspense>
  );
};

export default CategoryPage;
