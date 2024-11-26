import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createBillboard, updateBillboard, deleteBillboard } from '../action/billboard';

export const useCreateBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { label: string; imageUrl: string }) => {
      return createBillboard(params.storeId as string, data);
    },
    onSuccess: () => {
      toast.success('Billboard created.');
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create billboard');
    },
  });
};

export const useUpdateBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { label: string; imageUrl: string }) => {
      return updateBillboard(params.billboardId as string, params.storeId as string, data);
    },
    onSuccess: () => {
      toast.success('Billboard updated.');
      queryClient.invalidateQueries({ queryKey: ['billboards', params.storeId] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update billboard');
    },
  });
};

export const useDeleteBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return deleteBillboard(params.billboardId as string, params.storeId as string);
    },
    onSuccess: () => {
      toast.success('Billboard deleted.');
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete billboard');
    },
  });
};

export const useActionDeleteBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (billboardId: string) => {
      return deleteBillboard(billboardId, params.storeId as string);
    },
    onSuccess: () => {
      toast.success('Billboard deleted.');
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete billboard');
    },
  });
};
