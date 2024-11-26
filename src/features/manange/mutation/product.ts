import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createProduct, updateProduct, deleteProduct } from '../action/product';

export const useCreateProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      return createProduct(params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product created.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      return updateProduct(params.productId as string, params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product updated.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return deleteProduct(params.productId as string, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product deleted.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
};

export const useActionDeleteProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteProduct(id, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product deleted.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
};
