'use client';

import { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/components/backside/modals/alert-modal';

import { ColorColumn } from './columns';
import { useActionDeleteColor } from '@/features/manange/mutation/color';

interface CellActionProps {
  data: ColorColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const { mutate: deleteColor, isPending } = useActionDeleteColor();

  const onConfirm = async () => {
    deleteColor(data.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Color ID copied to clipboard.');
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={isPending} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/dashboard/${params.storeId}/colors/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
