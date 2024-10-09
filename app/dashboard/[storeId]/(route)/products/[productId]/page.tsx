import prismadb from '@/lib/prismadb';

import { ProductForm } from './components/product-form';

interface ProductPageProps {
  params: Promise<{
    productId: string;
    storeId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { storeId, productId } = await params;
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      sizes: true,
      colors: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} colors={colors} sizes={sizes} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
