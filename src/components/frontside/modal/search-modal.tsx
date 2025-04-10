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
import { Search } from 'lucide-react';
import { useGetProducts } from '@/features/shop/api/use-get-products';
import { DialogTitle } from '@/components/ui/dialog';

interface SearchModalProps {
  products: Product[];
}

const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { data: products, isLoading } = useGetProducts({ storeId: STORE_ID });

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
    ? products?.filter((product) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().replace(/[^a-z0-9 ]/gi, '');
        const normalizedProductName = product.name.toLowerCase().replace(/[^a-z0-9 ]/gi, '');
        return normalizedProductName.includes(normalizedSearchTerm);
      })
    : [];

  return (
    <div className="flex flex-1">
      <Button variant="outline" onClick={() => setOpen(true)} className="h-9 w-9 p-0" aria-label="Search">
        <Search className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search Product..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="h-12 text-lg"
          />
          <CommandList className="max-h-[70vh] overflow-y-auto p-4">
            <CommandEmpty className="text-lg py-6 text-center">No results found.</CommandEmpty>
            <CommandGroup>
              {filteredProducts?.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelect(product.id)}
                  className="flex items-center space-x-4  hover:bg-gray-100 rounded-md "
                >
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{product.name}</span>
                    <span className="text-sm text-gray-500">${product.price.toFixed(2)}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
