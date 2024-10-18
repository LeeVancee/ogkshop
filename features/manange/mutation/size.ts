import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import ky from 'ky';
import { toast } from 'sonner';

export const useCreateSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.post(`/api/${params.storeId}/sizes`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size created.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: () => {
      toast.error('Failed to create size');
    },
  });
};

export const useUpdateSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size updated.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: () => {
      toast.error('Failed to update size');
    },
  });
};

export const useDeleteSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size deleted.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: () => {
      toast.error('Failed to delete size');
    },
  });
};

export const useActionDeleteSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sizeId: string) => {
      const response = await ky.delete(`/api/${params.storeId}/sizes/${sizeId}`);
      if (!response.ok) {
        throw new Error('Failed to delete size');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size deleted.');
    },
    onError: () => {
      toast.error('Failed to delete size');
    },
  });
};
