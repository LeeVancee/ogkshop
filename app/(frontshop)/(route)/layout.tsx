import Footer from '@/components/frontside/footer';
import Navbar from '@/components/frontside/navbar';
import PreviewModalProvider from '@/providers/preview-modal-provider';
import { ToastProvider } from '@/providers/toast-provider';
import React from 'react';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewModalProvider />
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-4rem-1px)]">{children}</main>
      <Footer />
    </>
  );
}
