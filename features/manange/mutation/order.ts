import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export const useActionDeleteOrder = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await ky.delete(`/api/${params.storeId}/orders/${params.orderId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', params.storeId] });
      toast.success('Order deleted.');
    },
    onError: () => {
      toast.error('Failed to delete order');
    },
  });
};
