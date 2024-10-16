import { useQuery } from '@tanstack/react-query';
import { getBillboard } from './actions';

export const useGetBillboard = (billboardId: string) => {
  const query = useQuery({
    queryKey: ['billboard', billboardId],
    queryFn: async () => await getBillboard(billboardId),
  });
  return query;
};
