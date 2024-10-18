import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useParams, useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

export const useCreateProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.post(`/api/${params.storeId}/products`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product created.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.patch(`/api/${params.storeId}/products/${params.productId}`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product updated.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/products/${params.productId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product deleted.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
};

export const useActionDeleteProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await ky.delete(`/api/${params.storeId}/products/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', params.storeId] });
      toast.success('Product deleted.');
      router.push(`/dashboard/${params.storeId}/products`);
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
};
