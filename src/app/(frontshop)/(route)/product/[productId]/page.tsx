import FeaturedList from '@/components/frontside/featured-list';
import ProductInfo from '@/components/frontside/product-info';
import Container from '@/components/ui/container';

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
        <ProductInfo productId={productId} />

        <hr className="my-10" />

        <FeaturedList title="Related Items" />
      </div>
    </Container>
  );
};

export default ProductPage;
