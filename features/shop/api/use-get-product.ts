import getCategories from '@/actions/get-categories';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../actions';

export const useGetProduct = ({ productId }: { productId: string }) => {
  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => await getProduct(productId),
  });
  return query;
};
