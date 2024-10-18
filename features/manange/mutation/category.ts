import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateCategory = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: any) => {
      const response = await ky.post(`/api/${params.storeId}/categories`, { json: category });
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Category created.');
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: () => {
      toast.error('Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (category: any) => {
      const response = await ky.patch(`/api/${params.storeId}/categories/${params.categoryId}`, { json: category });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category updated.');
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: () => {
      toast.error('Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category deleted.');
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });
};

export const useActionDeleteCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await ky.delete(`/api/${params.storeId}/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category deleted.');
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });
};
