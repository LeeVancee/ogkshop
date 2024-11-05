import { useQuery } from '@tanstack/react-query';
import { getBillboard, getBillboards } from '../queries';

export const useGetBillboard = (billboardId: string) => {
  const query = useQuery({
    queryKey: ['billboard', billboardId],
    queryFn: async () => await getBillboard(billboardId),
  });
  return query;
};

export const useGetBillboards = (storeId: string) => {
  const query = useQuery({
    queryKey: ['billboards', storeId],
    queryFn: async () => await getBillboards(storeId),
  });
  return query;
};
