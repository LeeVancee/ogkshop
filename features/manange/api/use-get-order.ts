import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../actions';

export const useGetOrders = (storeId: string) => {
  return useQuery({
    queryKey: ['orders', storeId],
    queryFn: () => getOrders(storeId),
  });
};
