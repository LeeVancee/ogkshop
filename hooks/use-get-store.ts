import { getStore } from '@/actions/get-store';
import { useQuery } from '@tanstack/react-query';

export const useGetStore = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['store'],
    queryFn: async () => await getStore(),
  });
  return { data, isLoading };
};
