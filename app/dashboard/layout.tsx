import {StoreModalProvider} from '@/providers/store-modal-provider';
import {ToastProvider} from '@/providers/toast-provider';
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <NextTopLoader/>
            <StoreModalProvider/>
            <ToastProvider/>
            {children}
        </>
    );
}
