import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../queries';

export const useGetProduct = ({ productId }: { productId: string }) => {
  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => await getProduct(productId),
  });
  return query;
};
