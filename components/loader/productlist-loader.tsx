import React from 'react';
import Skeleton from '../ui/skeleton';

export default function ProductListLoader() {
  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
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
    </div>
  );
}
