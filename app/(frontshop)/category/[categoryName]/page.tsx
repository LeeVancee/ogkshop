import ProductList from '@/components/frontside/product-list';
import { Suspense } from 'react';
import ProductListLoader from '@/components/loader/productlist-loader';

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
  return (
    <Suspense fallback={<ProductListLoader />}>
      <ProductList
        categoryName={params.categoryName}
        colorName={searchParams.colorName}
        sizeName={searchParams.sizeName}
      />
    </Suspense>
  );
};

export default CategoryPage;
