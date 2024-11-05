import { useQuery } from '@tanstack/react-query';

import { getColor, getColors } from '../queries';

export const useGetColor = (colorId: string) => {
  return useQuery({
    queryKey: ['color', colorId],
    queryFn: () => getColor(colorId),
  });
};

export const useGetColors = (storeId: string) => {
  return useQuery({
    queryKey: ['colors', storeId],
    queryFn: () => getColors(storeId),
  });
};
