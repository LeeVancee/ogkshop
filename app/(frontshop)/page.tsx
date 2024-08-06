import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import ProductList from '@/components/frontside/product-list';
import Billboard from '@/components/frontside/billboard';
import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';
import { getFeatured } from '@/actions/get-featured';

const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;

const HomePage = async () => {
  const billboard = await getBillboard(billboardId!);
  // const products = await getProducts({ isFeatured: true });
  const featuredProducts = await getFeatured();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard ? (
          <Billboard data={billboard} />
        ) : (
          <div className="hidden lg:block">
            <Skeleton className="w-full h-[500px] rounded-xl" />
          </div>
        )}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={featuredProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
