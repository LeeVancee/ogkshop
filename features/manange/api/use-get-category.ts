import { useQuery } from '@tanstack/react-query';
import { getCategory, getCategories } from '../queries';

export const useGetCategory = (categoryId: string) => {
  const query = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => await getCategory(categoryId),
  });
  return query;
};

export const useGetCategories = (storeId: string) => {
  const query = useQuery({
    queryKey: ['categories', storeId],
    queryFn: async () => await getCategories(storeId),
  });
  return query;
};
