import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.post('/api/stores', { json: data });
      return response.json();
    },
    onSuccess: (data: any) => {
      toast.success('Store created successfully');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.push(`/dashboard/${data.id}`);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};

export const useUpdateStore = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.patch(`/api/stores/${params.storeId}`, { json: data });
      if (!response.ok) {
        throw new Error('Failed to update store');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Store updated.');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to update store');
    },
  });
};

export const useDeleteStore = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/stores/${params.storeId}`);
      if (!response.ok) {
        throw new Error('Failed to delete store');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Store deleted.');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to delete store');
    },
  });
};
