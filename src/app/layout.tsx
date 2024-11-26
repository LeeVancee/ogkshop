import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import './globals.css';
import React from 'react';
import { QueryProvider } from '@/providers/query-provider';
import { StoreModal } from '@/components/backside/modals/store-modal';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'OGKSHOP',
  description: 'explore the world of digital goods',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster />
        <QueryProvider>
          <StoreModal />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
