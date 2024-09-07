import React from 'react';
import Gallery from './gallery';
import getProduct from '@/actions/get-product';
import Info from './info';

export default async function ProductInfo({ productId }: { productId: string }) {
  const product = await getProduct(productId);

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
