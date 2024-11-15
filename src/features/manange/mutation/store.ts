import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createStore, updateStore, deleteStore } from '../action/store';
import { useStoreModal } from '@/hooks/use-store-modal';

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { onClose } = useStoreModal();
  return useMutation({
    mutationFn: async (data: { name: string }) => {
      return createStore(data);
    },
    onSuccess: (data: any) => {
      toast.success('Store created successfully');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      onClose();
      router.push(`/dashboard/${data.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong');
    },
  });
};

export const useUpdateStore = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { name: string }) => {
      return updateStore(params.storeId as string, data);
    },
    onSuccess: () => {
      toast.success('Store updated.');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update store');
    },
  });
};

export const useDeleteStore = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return deleteStore(params.storeId as string);
    },
    onSuccess: () => {
      toast.success('Store deleted.');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete store');
    },
  });
};
