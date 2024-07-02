import { StoreModalProvider } from '@/providers/store-modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StoreModalProvider />
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}
