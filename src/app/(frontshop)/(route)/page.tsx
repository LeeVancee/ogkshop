import Container from '@/components/ui/container';
import Image from 'next/image';
import FeaturedList from '@/components/frontside/featured-list';

const HomePage = () => {
  return (
    <Container>
      <div className="space-y-10 pb-10 pt-8">
        <section className="rounded-xl bg-neutral-100">
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-12 px-8 sm:px-16 md:grid-cols-2 min-h-[550px]">
            <div className="max-w-md space-y-6">
              <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">OGK</h2>
              <p className="text-pretty text-lg text-neutral-600">
                {'Discover unique items that blend style and functionality.'}
              </p>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/billboard.webp"
                alt="billboard"
                width={550}
                height={550} // 添加一个合适的高度值
                className="rounded-lg object-cover w-full h-auto" // 修改 className
                priority
              />
            </div>
          </div>
        </section>

        <FeaturedList title="Featured Product" />
      </div>
    </Container>
  );
};

export default HomePage;
