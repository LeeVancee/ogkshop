import { useQuery } from '@tanstack/react-query';
import { getFeatured } from '../actions';

export const useGetFeatured = () => {
  const query = useQuery({
    queryKey: ['featured'],
    queryFn: async () => await getFeatured(),
  });
  return query;
};