'use client';

import { Loader } from '@/components/backside/loader';
import { useGetStore } from '@/hooks/use-get-store';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: store, isLoading } = useGetStore();
  const { onOpen, isOpen } = useStoreModal();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (store) {
      router.push(`/dashboard/${store.id}`);
    } else if (!isOpen) {
      onOpen();
    }
  }, [store, onOpen, router, isLoading, isOpen]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}
