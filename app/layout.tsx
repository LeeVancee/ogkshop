import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'OGKSHOP',
  description: 'explore the world of digital goods',
};

const recursive = localFont({
  src: '../fonts/Recursive-Medium.ttf',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={recursive.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
