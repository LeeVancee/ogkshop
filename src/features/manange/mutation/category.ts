import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCategory, updateCategory, deleteCategory } from '../action/category';

export const useCreateCategory = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: { name: string; billboardId: string }) => {
      return createCategory(params.storeId as string, category);
    },
    onSuccess: () => {
      toast.success('Category created.');
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (category: { name: string; billboardId: string }) => {
      return updateCategory(params.categoryId as string, params.storeId as string, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category updated.');
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return deleteCategory(params.categoryId as string, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category deleted.');
      router.push(`/dashboard/${params.storeId}/categories`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
};

export const useActionDeleteCategory = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: string) => {
      return deleteCategory(categoryId, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', params.storeId] });
      toast.success('Category deleted.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
};
