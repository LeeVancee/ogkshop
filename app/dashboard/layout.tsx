import { StoreModalProvider } from '@/providers/store-modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import NextTopLoader from 'nextjs-toploader';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NextTopLoader />
      <StoreModalProvider />
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}
