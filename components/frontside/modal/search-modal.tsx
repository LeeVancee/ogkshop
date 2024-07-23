'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';

interface SearchModalProps {
  products: Product[];
}

export function SearchModal({ products }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check if the 'Shift' key is pressed and 'k' is pressed
      if (e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (productId: string) => {
    router.push(`/product/${productId}`);
    setOpen(false);
  };

  const filteredProducts = searchTerm
    ? products.filter((product) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().replace(/[^a-z0-9 ]/gi, '');
        const normalizedProductName = product.name.toLowerCase().replace(/[^a-z0-9 ]/gi, '');
        return normalizedProductName.includes(normalizedSearchTerm);
      })
    : [];

  return (
    <div className="flex flex-1">
      <Button
        variant={'outline'}
        size={'lg'}
        onClick={() => setOpen(true)}
        className="h-9 w-full whitespace-nowrap px-4"
      >
        <p className="text-sm text-muted-foreground">
          Search Product...
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-200 dark:bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-gray-700 dark:text-gray-300 opacity-100 md:ml-28">
            <span className="text-xs">Shift + K</span>
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search Product..." value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredProducts.map((product) => (
                <CommandItem key={product.id} onSelect={() => handleSelect(product.id)}>
                  <Image src={product.images[0].url} alt={product.name} width={16} height={16} className="mr-2" />

                  <span>
                    {product.name} - ${product.price.toFixed(2)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
