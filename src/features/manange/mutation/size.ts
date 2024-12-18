import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createSize, updateSize, deleteSize } from '../action/size';

export const useCreateSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name: string; value: string }) => {
      return createSize(params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size created.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create size');
    },
  });
};

export const useUpdateSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name: string; value: string }) => {
      return updateSize(params.sizeId as string, params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size updated.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update size');
    },
  });
};

export const useDeleteSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return deleteSize(params.sizeId as string, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size deleted.');
      router.push(`/dashboard/${params.storeId}/sizes`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete size');
    },
  });
};

export const useActionDeleteSize = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sizeId: string) => {
      return deleteSize(sizeId, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes', params.storeId] });
      toast.success('Size deleted.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete size');
    },
  });
};
