import { useQuery } from '@tanstack/react-query';

import { getSize, getSizes } from '../queries';

export const useGetSize = (sizeId: string) => {
  return useQuery({
    queryKey: ['size', sizeId],
    queryFn: () => getSize(sizeId),
  });
};

export const useGetSizes = (storeId: string) => {
  return useQuery({
    queryKey: ['sizes', storeId],
    queryFn: () => getSizes(storeId),
  });
};
