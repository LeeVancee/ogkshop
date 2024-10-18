'use client';

import { ProductForm } from './components/product-form';
import { use } from 'react';
import { useGetProduct } from '@/features/manange/api/use-get-product';
import { useGetCategories } from '@/features/manange/api/use-get-category';
import { useGetColors } from '@/features/manange/api/use-get-color';
import { useGetSizes } from '@/features/manange/api/use-get-size';
import HomeLoader from '@/components/loader/home-loader';

interface ProductPageProps {
  params: Promise<{
    productId: string;
    storeId: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { storeId, productId } = use(params);
  const { data: product, isLoading: productLoading } = useGetProduct(productId);
  const { data: categories, isLoading: categoriesLoading } = useGetCategories(storeId);
  const { data: colors, isLoading: colorsLoading } = useGetColors(storeId);
  const { data: sizes, isLoading: sizesLoading } = useGetSizes(storeId);

  if (productLoading || categoriesLoading || colorsLoading || sizesLoading) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm categories={categories!} colors={colors!} sizes={sizes!} initialData={product!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
