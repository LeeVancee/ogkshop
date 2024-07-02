import { auth } from '@/auth';
import Footer from '@/components/frontside/footer';
import Navbar from '@/components/frontside/navbar';
import PreviewModalProvider from '@/providers/preview-modal-provider';
import { ToastProvider } from '@/providers/toast-provider';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div>
      <ToastProvider />
      <PreviewModalProvider />
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-4rem-1px)]">{children}</main>
      <Footer />
    </div>
  );
}
