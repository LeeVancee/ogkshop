import { Suspense } from 'react';
import Billboard from '@/components/frontside/billboard';
import Container from '@/components/ui/container';
import BillboardLoader from '@/components/loader/billboard-loader';
import FeaturedLoader from '@/components/loader/featured-loader';
import FeaturedList from '@/components/frontside/featured-list';

const HomePage = async () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Suspense fallback={<BillboardLoader />}>
          <Billboard />
        </Suspense>

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<FeaturedLoader />}>
            <FeaturedList title="Featured Products" />
          </Suspense>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
