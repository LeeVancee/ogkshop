'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/backside/heading';
import { AlertModal } from '@/components/backside/modals/alert-modal';
import ImageUpload from '@/components/backside/image-upload';
import { Billboard } from '@/types';
import { useCreateBillboard, useDeleteBillboard, useUpdateBillboard } from '@/features/manange/mutation/billboard';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;
interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
  const action = initialData ? 'Save changes' : 'Create';

  const { mutate: createBillboard, isPending: isCreatePending } = useCreateBillboard();
  const { mutate: updateBillboard, isPending: isUpdatePending } = useUpdateBillboard();
  const { mutate: deleteBillboard, isPending: isDeletePending } = useDeleteBillboard();

  const isPending = isCreatePending || isUpdatePending || isDeletePending;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = (data: BillboardFormValues) => {
    if (initialData) {
      updateBillboard(data);
    } else {
      createBillboard(data);
    }
  };

  const onDelete = async () => {
    deleteBillboard();
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isPending} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={isPending} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Billboard label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
