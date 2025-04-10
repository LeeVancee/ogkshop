'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Category } from '@/types';
import { useGetCategories } from '@/features/shop/api/use-get-categories';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function MainNav() {
  const pathname = usePathname();
  const { data, isLoading } = useGetCategories();

  const routes =
    data?.map((route: Category) => ({
      href: `/category/${route.name}`,
      label: route.name,
      active: pathname === `/category/${route.name}`,
    })) || [];

  return (
    <nav className="mx-6 flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Collection</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[200px] p-3">
                {isLoading ? (
                  <li className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </li>
                ) : routes.length > 0 ? (
                  routes.map((route) => (
                    <li key={route.href} className="mb-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href={route.href}
                          className={cn(
                            'flex items-center justify-between rounded-md p-2 text-sm font-medium leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            route.active
                              ? 'bg-accent text-accent-foreground'
                              : 'text-gray-800 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                          )}
                        >
                          {route.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-sm text-gray-500">No categories available</li>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
