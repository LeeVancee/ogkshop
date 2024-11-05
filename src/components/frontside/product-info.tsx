'use client';
import React from 'react';
import Gallery from './gallery';
import Info from './info';
import { useGetProduct } from '@/features/shop/api/use-get-product';
import ProductInfoLoader from '../loader/productInfo-loader';

export default function ProductInfo({ productId }: { productId: string }) {
  const { data: product, isLoading } = useGetProduct({ productId });

  if (isLoading) {
    return <ProductInfoLoader />;
  }

  if (!product) {
    return null;
  }
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <Gallery images={product.images} />
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <Info data={product} />
      </div>
    </div>
  );
}
