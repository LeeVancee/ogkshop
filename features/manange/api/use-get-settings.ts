import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../queries';

export const useGetSettings = (storeId: string) => {
  return useQuery({
    queryKey: ['settings', storeId],
    queryFn: () => getSettings(storeId),
  });
};
