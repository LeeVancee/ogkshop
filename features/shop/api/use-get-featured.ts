import { useQuery } from '@tanstack/react-query';
import { getFeatured } from '../queries';

export const useGetFeatured = () => {
  const query = useQuery({
    queryKey: ['featured'],
    queryFn: async () => await getFeatured(),
  });
  return query;
};
