import { getBillboard } from '../actions';

import { useQuery } from '@tanstack/react-query';

export const useGetBillboard = (billboardId: string) => {
  const query = useQuery({
    queryKey: ['billboard'],
    queryFn: async () => await getBillboard(billboardId!),
  });

  return query;
};
