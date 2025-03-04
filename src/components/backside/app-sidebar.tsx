'use client';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';
import { LayoutDashboard, Image, ListTree, Ruler, Palette, Package, ShoppingCart, Settings, User } from 'lucide-react';
import StoreSwitcher from './store-switcher';
import Link from 'next/link';
import { NavUser } from './nav-user';
import { ShopSwitcher } from './shop-switcher';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const params = useParams();

  const data = {
    navMain: [
      {
        title: 'Menu',
        url: '#',
        items: [
          {
            url: `/dashboard/${params.storeId}`,
            title: 'Overview',
            icon: LayoutDashboard,
          },
          {
            url: `/dashboard/${params.storeId}/billboards`,
            title: 'Billboards',
            icon: Image,
          },
          {
            url: `/dashboard/${params.storeId}/categories`,
            title: 'Categories',
            icon: ListTree,
          },
          {
            url: `/dashboard/${params.storeId}/sizes`,
            title: 'Sizes',
            icon: Ruler,
          },
          {
            url: `/dashboard/${params.storeId}/colors`,
            title: 'Colors',
            icon: Palette,
          },
          {
            url: `/dashboard/${params.storeId}/products`,
            title: 'Products',
            icon: Package,
          },
          {
            url: `/dashboard/${params.storeId}/orders`,
            title: 'Orders',
            icon: ShoppingCart,
          },
          {
            url: `/dashboard/${params.storeId}/settings`,
            title: 'Settings',
            icon: Settings,
          },
          {
            url: `/dashboard/${params.storeId}/profile`,
            title: 'Profile',
            icon: User,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/*   <StoreSwitcher /> */}
        <ShopSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-muted-foreground font-bold">{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={pathname === item.url}>
                      {item.icon && <item.icon size={20} className="mr-2" />}
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
