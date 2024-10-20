import { useQuery } from '@tanstack/react-query';
import { getCategories, getColors } from '../queries';

export const useGetColors = ({ storeId }: { storeId: string }) => {
  const query = useQuery({
    queryKey: ['colors'],
    queryFn: async () => await getColors(storeId),
  });
  return query;
};
