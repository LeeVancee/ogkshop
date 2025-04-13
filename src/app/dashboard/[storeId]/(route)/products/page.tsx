import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { ProductsClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async (props: { params: Promise<{ storeId: string }> }) => {
  const params = await props.params;
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(Number(item.price)),
    category: item.category.name,
    size: item.sizes.map((size) => size.name).join(', '),
    color: item.colors.map((color) => color.name).join(', '),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
