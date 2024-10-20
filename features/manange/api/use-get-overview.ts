import { useQuery } from '@tanstack/react-query';
import { getGraphRevenue, getSalesCount, getStockCount, getTotalRevenue } from '../queries';

export const useGetTotalRevenue = (storeId: string) => {
  return useQuery({
    queryKey: ['totalRevenue', storeId],
    queryFn: () => getTotalRevenue(storeId),
  });
};

export const useGetGraphRevenue = (storeId: string) => {
  return useQuery({
    queryKey: ['graphRevenue', storeId],
    queryFn: () => getGraphRevenue(storeId),
  });
};

export const useGetSalesCount = (storeId: string) => {
  return useQuery({
    queryKey: ['salesCount', storeId],
    queryFn: () => getSalesCount(storeId),
  });
};

export const useGetStockCount = (storeId: string) => {
  return useQuery({
    queryKey: ['stockCount', storeId],
    queryFn: () => getStockCount(storeId),
  });
};
