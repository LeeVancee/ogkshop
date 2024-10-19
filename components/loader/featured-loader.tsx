import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="group cursor-pointer rounded-xl border p-3 space-y-4">
          <div className="aspect-square rounded-xl relative">
            <Skeleton className="absolute inset-0 rounded-md" />
            <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
              <div className="flex gap-x-6 justify-center">
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
