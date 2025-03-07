'use client';

import { SidebarIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const params = useParams();
  const pathname = usePathname();

  // Extract the path segments
  const pathSegments = pathname.split('/').filter(Boolean);

  // Determine what to display as the current page
  let currentPage;
  if (pathSegments.length > 2) {
    // When URL has segments beyond dashboard/[storeId], like .../billboards
    currentPage = pathSegments[pathSegments.length - 1];
    currentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  } else if (pathSegments.length === 2 && pathSegments[0] === 'dashboard') {
    // When URL is just dashboard/[storeId]
    currentPage = 'Overview';
  }

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">OGKSHOP</BreadcrumbLink>
            </BreadcrumbItem>

            {currentPage && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
