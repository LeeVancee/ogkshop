import FeaturedList from '@/components/frontside/featured-list';
import ProductInfo from '@/components/frontside/product-info';
import FeaturedLoader from '@/components/loader/featured-loader';
import ProductInfoLoader from '@/components/loader/productInfo-loader';
import Container from '@/components/ui/container';
import { Suspense } from 'react';

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}
const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductInfoLoader />}>
          <ProductInfo productId={productId} />
        </Suspense>
        <hr className="my-10" />
        <Suspense fallback={<FeaturedLoader />}>
          <FeaturedList title="Related Items" />
        </Suspense>
      </div>
    </Container>
  );
};

export default ProductPage;
