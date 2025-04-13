'use client';

import * as React from 'react';
import { ChevronDown, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  items: Record<string, any>[];
}

export function ShopSwitcher({ items = [] }: Props) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems?.find((item) => item.value === params.storeId);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/dashboard/${store.value}`);
  };
  console.log(currentStore?.label);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary ">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback>{currentStore?.label?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <span className="truncate font-semibold">{currentStore?.label || 'Select a store'}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-lg" align="start" side="right" sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Select a store</DropdownMenuLabel>
            {formattedItems?.map((item, index) => (
              <DropdownMenuItem key={item.value} onSelect={() => onStoreSelect(item)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback>{item?.label?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                {item.label}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => storeModal.onOpen()}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add a new store</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
