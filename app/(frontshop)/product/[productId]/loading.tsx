import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image Gallery Skeleton */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-5 gap-6" role="tablist">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-md" />
                ))}
              </div>
            </div>
            <div className="aspect-square w-full">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-px w-full my-4" />

            {/* Size and Color Options */}
            {['Size', 'Color'].map((option) => (
              <div key={option} className="flex flex-col gap-y-2 my-4">
                <Skeleton className="h-6 w-16" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex flex-col gap-y-2 my-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-32 rounded-full" />
            </div>

            {/* Add to Cart Button */}
            <div className="mt-10">
              <Skeleton className="h-10 w-full max-w-xs rounded-md" />
            </div>
          </div>
        </div>

        {/* Related Items Skeleton */}
        <Skeleton className="h-px w-full my-10" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
