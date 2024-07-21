import ProductCard from './product-card';
import { Product } from '@/types';
import Grid from '../grid';

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && (
        <Grid className="grid-cols-2 md:grid-cols-5">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return <Grid.Item key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />;
            })}
        </Grid>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
