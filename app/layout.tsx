import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'OGKSHOP',
  description: 'explore the world of digital goods',
};

const font = localFont({
  src: '../fonts/Poppins-Medium.ttf',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={font.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
