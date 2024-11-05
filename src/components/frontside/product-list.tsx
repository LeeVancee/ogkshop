'use client';
import React from 'react';
import ProductCard from './product-card';
import { useGetProducts } from '@/features/shop/api/use-get-products';
import ProductListLoader from '../loader/productlist-loader';

interface ProductListProps {
  categoryName: string;
  colorName: string;
  sizeName: string;
}

export default function ProductList({ categoryName, colorName, sizeName }: ProductListProps) {
  const { data: products, isLoading } = useGetProducts({
    categoryName: categoryName,
    colorName: colorName,
    sizeName: sizeName,
  });

  if (isLoading) {
    return <ProductListLoader />;
  }

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
