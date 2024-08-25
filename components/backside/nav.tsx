'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { LayoutDashboard, Kanban, Cylinder, Ruler, Palette, Package, ShoppingBag, Settings, User } from 'lucide-react';

const iconMap = {
  dashboard: LayoutDashboard,
  kanban: Kanban,
  cylinder: Cylinder,
  ruler: Ruler,
  palette: Palette,
  package: Package,
  shoppingBag: ShoppingBag,
  settings: Settings,
  profile: User,
};

export default function Nav() {
  const params = useParams();
  const storeId = params.storeId as string;

  const routes = [
    {
      title: 'Overview',
      href: `/dashboard/${storeId}`,
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      title: 'Billboards',
      href: `/dashboard/${storeId}/billboards`,
      label: 'Billboards',
      icon: 'kanban',
    },
    {
      title: 'Categories',
      href: `/dashboard/${storeId}/categories`,
      label: 'Categories',
      icon: 'cylinder',
    },
    {
      title: 'Sizes',
      href: `/dashboard/${storeId}/sizes`,
      label: 'Sizes',
      icon: 'ruler',
    },
    {
      title: 'Colors',
      href: `/dashboard/${storeId}/colors`,
      label: 'Colors',
      icon: 'palette',
    },
    {
      title: 'Products',
      href: `/dashboard/${storeId}/products`,
      label: 'Products',
      icon: 'package',
    },
    {
      title: 'Orders',
      href: `/dashboard/${storeId}/orders`,
      label: 'Orders',
      icon: 'shoppingBag',
    },
    {
      title: 'Settings',
      href: `/dashboard/${storeId}/settings`,
      label: 'Settings',
      icon: 'settings',
    },
    {
      title: 'Profile',
      href: `/dashboard/${storeId}/profile`,
      label: 'Profile',
      icon: 'profile',
    },
  ];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {routes.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <Link
            key={item.title}
            href={item.href}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
