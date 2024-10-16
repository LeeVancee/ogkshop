import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '../actions';

export const useGetProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
  });
};

export const useGetProducts = (storeId: string) => {
  return useQuery({
    queryKey: ['products', storeId],
    queryFn: () => getProducts(storeId),
  });
};
