'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useGetCategories } from '@/features/shop/api/use-get-categories';
import { Category } from '@prisma/client';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const handleLinkClick = () => {
    setOpen(false);
  };

  const { data: categories, isLoading } = useGetCategories();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="focus:outline-hidden" aria-label="Open categories">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="px-0!">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Categories</h2>
              <div className="space-y-1">
                {categories?.map((category: Category) => (
                  <Link
                    href={`/category/${category.name}`}
                    key={category.id}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={handleLinkClick}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
