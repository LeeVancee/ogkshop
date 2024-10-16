import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../actions';

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
  });
  return query;
};
