import { useQuery } from '@tanstack/react-query';
import { getCategories, getColors } from '../actions';

export const useGetColors = ({ storeId }: { storeId: string }) => {
  const query = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getColors(storeId),
  });
  return query;
};
