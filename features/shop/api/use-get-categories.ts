import getCategories from '@/actions/get-categories';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = ({ storeId }: { storeId: string }) => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories({ storeId }),
  });
  return query;
};
