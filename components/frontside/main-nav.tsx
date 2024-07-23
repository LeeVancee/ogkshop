'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface MainNavProps {
  data: Category[];
}

const MainNav = ({ data }: MainNavProps) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.name}`,
    label: route.name,
    active: pathname === `/category/${route.name}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors',
            route.active
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
