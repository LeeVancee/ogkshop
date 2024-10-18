import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import ky from 'ky';
import { toast } from 'sonner';

export const useCreateColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.post(`/api/${params.storeId}/colors`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color created.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: () => {
      toast.error('Failed to create color');
    },
  });
};

export const useUpdateColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await ky.patch(`/api/${params.storeId}/colors/${params.colorId}`, { json: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color updated.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: () => {
      toast.error('Failed to update color');
    },
  });
};

export const useDeleteColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color deleted.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: () => {
      toast.error('Failed to delete color');
    },
  });
};

export const useActionDeleteColor = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await ky.delete(`/api/${params.storeId}/colors/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] });
      toast.success('Color deleted.');
      router.push(`/dashboard/${params.storeId}/colors`);
    },
    onError: () => {
      toast.error('Failed to delete color');
    },
  });
};
