'use client';
import { useState } from 'react';
import { DashboardNav } from '@/components/backside/dashboard-nav';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { useParams } from 'next/navigation';
import { NavItem } from '@/types';
import { ChevronLeft } from 'lucide-react';
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const params = useParams();

  const routes: NavItem[] = [
    {
      title: 'Overview',
      href: `/dashboard/${params.storeId}`,
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      title: 'Billboards',
      href: `/dashboard/${params.storeId}/billboards`,
      label: 'Billboards',
      icon: 'kanban',
    },
    {
      title: 'Categories',
      href: `/dashboard/${params.storeId}/categories`,
      label: 'Categories',
      icon: 'cylinder',
    },
    {
      title: 'Sizes',
      href: `/dashboard/${params.storeId}/sizes`,
      label: 'Sizes',
      icon: 'ruler',
    },
    {
      title: 'Colors',
      href: `/dashboard/${params.storeId}/colors`,
      label: 'Colors',
      icon: 'palette',
    },
    {
      title: 'Products',
      href: `/dashboard/${params.storeId}/products`,
      label: 'Products',
      icon: 'package',
    },
    {
      title: 'Orders',
      href: `/dashboard/${params.storeId}/orders`,
      label: 'Orders',
      icon: 'shoppingBag',
    },
    {
      title: 'Settings',
      href: `/dashboard/${params.storeId}/settings`,
      label: 'Settings',
      icon: 'settings',
    },
  ];

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={routes} />
          </div>
        </div>
      </div>
    </nav>
  );
}
