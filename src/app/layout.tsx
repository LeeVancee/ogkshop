import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import './globals.css';
import '@uploadthing/react/styles.css';
import { ThemeProvider } from '@/providers/theme-provider';
import React from 'react';
import { ToastProvider } from '@/providers/toast-provider';
import { QueryProvider } from '@/providers/query-provider';
import { StoreModal } from '@/components/backside/modals/store-modal';

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
        <ToastProvider />
        <ThemeProvider attribute="class" defaultTheme="system">
          <QueryProvider>
            <StoreModal />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
