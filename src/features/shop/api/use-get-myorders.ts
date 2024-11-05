import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../queries';

export const useGetMyOrders = () => {
  return useQuery({ queryKey: ['orders'], queryFn: getMyOrders });
};
