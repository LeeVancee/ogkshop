import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const sourseSan = localFont({
  src: '../fonts/SourceHanSansSC-VF.otf.woff2',
});
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
    <html lang="en">
      <SessionProvider>
        <body className={sourseSan.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
