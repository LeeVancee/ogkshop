import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { deleteOrder } from '../action/order';

export const useActionDeleteOrder = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      return deleteOrder(orderId);
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
