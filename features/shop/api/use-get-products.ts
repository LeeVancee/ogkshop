import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '../queries';

interface Query {
  storeId?: string;
  categoryId?: string;
  colorName?: string;
  sizeName?: string;
  isFeatured?: boolean | undefined;
  categoryName?: string;
}

export const useGetProducts = (querys: Query) => {
  const query = useQuery({
    queryKey: ['products', querys],
    queryFn: async () => await getProducts(querys),
  });
  return query;
};
