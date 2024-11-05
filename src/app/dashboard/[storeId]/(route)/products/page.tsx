import { ProductsClient } from './components/client';

const ProductsPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient />
      </div>
    </div>
  );
};

export default ProductsPage;
