import { getStore, getStores } from '@/features/manange/actions';
import { useQuery } from '@tanstack/react-query';

export const useGetStore = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['store'],
    queryFn: async () => await getStore(),
  });
  return { data, isLoading };
};

export const useGetStores = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => await getStores(),
  });
  return { data, isLoading };
};
