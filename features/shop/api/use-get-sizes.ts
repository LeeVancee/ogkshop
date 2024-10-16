import { useQuery } from '@tanstack/react-query';
import { getSizes } from '../actions';

export const useGetSizes = ({ storeId }: { storeId: string }) => {
  const query = useQuery({
    queryKey: ['sizes'],
    queryFn: async () => await getSizes(storeId),
  });
  return query;
};
