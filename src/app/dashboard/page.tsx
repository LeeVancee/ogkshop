'use client';

import HomeLoader from '@/components/loader/home-loader';
import { useGetStore } from '@/features/manange/api/use-get-store';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: store, isLoading } = useGetStore();
  const { onOpen, isOpen } = useStoreModal();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!store) {
        onOpen();
      } else {
        router.push(`/dashboard/${store.id}`);
      }
    }
  }, [isLoading, store, router, onOpen]);

  return (
    <div className="flex items-center justify-center h-screen">
      <HomeLoader />
    </div>
  );
}
