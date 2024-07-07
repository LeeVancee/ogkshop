'use client';
import { DashboardNav } from '@/components/backside/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavItem } from '@/types';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
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
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Overview</h2>
              <div className="space-y-1">
                <DashboardNav items={routes} isMobileNav={true} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
