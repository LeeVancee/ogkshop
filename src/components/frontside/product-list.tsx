import React from 'react';
import ProductCard from './product-card';
import getProducts from '@/actions/get-products';

interface ProductListProps {
  categoryName: string;
  colorName: string;
  sizeName: string;
}

export default async function ProductList({ categoryName, colorName, sizeName }: ProductListProps) {
  const products = await getProducts({
    categoryName: categoryName,
    colorName: colorName,
    sizeName: sizeName,
  });

  if (products?.length === 0) {
    return <div className="flex justify-center items-center mt-6 lg:col-span-4 lg:mt-0">No Products</div>;
  }

  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products?.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
