'use client';

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/backside/modals/store-modal';

export const StoreModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
