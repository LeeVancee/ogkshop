import type {Metadata} from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-sc';
import './globals.css';
import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from '@/providers/theme-provider';
import React from "react";

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
        <SessionProvider>
            <body>
            <ThemeProvider attribute="class" defaultTheme="system">
                {children}
            </ThemeProvider>
            </body>
        </SessionProvider>
        </html>
    );
}
