import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteOrder } from '../action/order';

export const useActionDeleteOrder = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return deleteOrder(params.orderId as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', params.storeId] });
      toast.success('Order deleted.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete order');
    },
  });
};
