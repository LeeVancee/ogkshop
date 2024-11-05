import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createColor, updateColor, deleteColor } from '../action/color';

export const useCreateColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name: string; value: string }) => {
      return createColor(params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color created.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create color');
    },
  });
};

export const useUpdateColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name: string; value: string }) => {
      return updateColor(params.colorId as string, params.storeId as string, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color updated.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update color');
    },
  });
};

export const useDeleteColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return deleteColor(params.colorId as string, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color deleted.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete color');
    },
  });
};

export const useActionDeleteColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteColor(id, params.storeId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color deleted.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete color');
    },
  });
};
