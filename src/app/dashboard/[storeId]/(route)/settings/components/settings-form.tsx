'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/backside/heading';
import { AlertModal } from '@/components/backside/modals/alert-modal';
import { ApiAlert } from '@/components/backside/api/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useGetSettings } from '@/features/manange/api/use-get-settings';
import { useDeleteStore, useUpdateStore } from '@/features/manange/mutation/store';

const formSchema = z.object({
  name: z.string().min(2),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm = () => {
  const params = useParams();
  const origin = useOrigin();
  const { data: initialData, isLoading } = useGetSettings(params.storeId as string);
  const [open, setOpen] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { mutate: updateStore, isPending: isUpdating } = useUpdateStore();
  const { mutate: deleteStore, isPending: isDeleting } = useDeleteStore();
  const router = useRouter();
  const loading = isUpdating || isDeleting;

  const onSubmit = async (data: SettingsFormValues) => {
    updateStore(data);
  };

  const onDelete = async () => {
    deleteStore(undefined, {
      onSuccess: () => {
        setOpen(false);
        router.push('/dashboard');
      },
    });
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title="Store settings" description="Manage store preferences" />
        <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" variant="public" description={`${origin}/api/${params.storeId}`} />
    </>
  );
};
