import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyOrder } from '../queries';
import toast from 'react-hot-toast';

export const useDeleteMyOrders = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      return deleteMyOrder(orderId);
    },
    onSuccess: () => {
      toast.success('Order deleted.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
