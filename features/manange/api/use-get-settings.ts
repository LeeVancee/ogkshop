import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../actions';

export const useGetSettings = (storeId: string) => {
  return useQuery({
    queryKey: ['settings', storeId],
    queryFn: () => getSettings(storeId),
  });
};
