import getCategories from '@/actions/get-categories';
import { useQuery } from '@tanstack/react-query';

export const useGetSizes = ({ storeId }: { storeId: string }) => {
  const query = useQuery({
    queryKey: ['sizes'],
    queryFn: async () => await getCategories({ storeId }),
  });
  return query;
};
