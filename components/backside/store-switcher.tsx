'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';
import { useGetStores } from '@/features/manange/api/use-get-store';

export default function StoreSwitcher() {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: items } = useGetStores();

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems?.find((item) => item.value === params.storeId);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/dashboard/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn('w-full justify-between text-left font-normal', !currentStore && 'text-muted-foreground')}
        >
          <Store className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{currentStore?.label || 'Select a store'}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." className="h-9" />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores" className="max-h-[300px] overflow-y-auto">
              {formattedItems?.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm flex items-center"
                >
                  <Store className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{store.label}</span>
                  <Check
                    className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                className="text-sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
