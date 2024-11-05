'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';

import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/backside/heading';
import { AlertModal } from '@/components/backside/modals/alert-modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/backside/image-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from '@/components/multiple-select';
import { Category, Color, Image, Product, Size } from '@/types';
import { CategoryColumn } from '@/features/manange/type';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/features/manange/mutation/product';
const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeIds: z.array(z.string()).min(1, 'At least one size must be selected'),
  colorIds: z.array(z.string()).min(1, 'At least one color must be selected'),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  quantity: z.coerce.number().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        sizes: Size[];
        colors: Color[];
        quantity: number;
      })
    | null;
  categories: CategoryColumn[];
  colors: Color[];
  sizes: Size[];
}

export const ProductForm = ({ initialData, categories, sizes, colors }: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
        quantity: parseInt(String(initialData?.quantity)),
        sizeIds: initialData.sizes.map((size) => size.id),
        colorIds: initialData.colors.map((color) => color.id),
      }
    : {
        name: '',
        images: [],
        price: 0,
        categoryId: '',
        sizeIds: [],
        colorIds: [],
        isFeatured: false,
        isArchived: false,
        quantity: 1,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { mutate: createProduct, isPending: isCreatePending } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdatePending } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeletePending } = useDeleteProduct();
  const isPending = isCreatePending || isUpdatePending || isDeletePending;

  const onSubmit = async (data: ProductFormValues) => {
    if (initialData) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  const onDelete = async () => {
    deleteProduct();
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isPending} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <MultiSelect
                    options={sizes.map((size) => ({ label: size.name, value: size.id }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select sizes"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <MultiSelect
                    options={colors.map((color) => ({ label: color.name, value: color.id }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select colors"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <Input {...field} type="number" placeholder="Enter product quantity" disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>This product will appear on the home page</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>This product will not appear anywhere in the store.</FormDescription>
                  </div>
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
