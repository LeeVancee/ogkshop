import { Skeleton } from '@/components/ui/skeleton';

export default function BillboardLoader() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative h-full rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-y-8">
          <Skeleton className="h-8 w-3/4 max-w-xs sm:max-w-xl" />
        </div>
      </div>
    </div>
  );
}
