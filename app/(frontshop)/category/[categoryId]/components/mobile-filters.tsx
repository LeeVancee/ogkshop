'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import IconButton from '@/components/frontside/icon-button';
import { Button } from '@/components/ui/button';
import { Color, Size } from '@/types';

import Filter from './filter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters = ({ sizes, colors }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
          Filters
          <Plus size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="!px-0">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Filters</h2>
            <div className="space-y-1">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
