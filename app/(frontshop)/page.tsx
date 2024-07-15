import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/frontside/product-list';
import Billboard from '@/components/frontside/billboard';
import Container from '@/components/ui/container';

const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;

const HomePage = async () => {
  const [products, billboard] = await Promise.all([getProducts({ isFeatured: true }), getBillboard(billboardId!)]);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard ? (
          <Billboard data={billboard} />
        ) : (
          <div>No billboard available</div> // 或者其他备用内容
        )}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
