import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.post(`/api/${params.storeId}/billboards`, { json: data });
      if (!response.ok) {
        throw new Error('Failed to create billboard');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Billboard created.');
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: () => {
      toast.error('Failed to create billboard');
    },
  });
};

export const useUpdateBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, { json: data });
      if (!response.ok) {
        throw new Error('Failed to update billboard');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Billboard updated.');
      queryClient.invalidateQueries({ queryKey: ['billboards', params.storeId] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: () => {
      toast.error('Failed to update billboard');
    },
  });
};

export const useDeleteBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      if (!response.ok) {
        throw new Error('Failed to delete billboard');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Billboard deleted.');
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
      router.push(`/dashboard/${params.storeId}/billboards`);
    },
    onError: () => {
      toast.error('Failed to delete billboard');
    },
  });
};

export const useActionDeleteBillboard = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (billboardId: string) => {
      const response = await ky.delete(`/api/${params.storeId}/billboards/${billboardId}`);
      if (!response.ok) {
        throw new Error('Failed to delete billboard');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
    },
  });
};
