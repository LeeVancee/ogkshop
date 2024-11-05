import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../queries';

export const useGetOrders = (storeId: string) => {
  return useQuery({
    queryKey: ['orders', storeId],
    queryFn: () => getOrders(storeId),
  });
};
