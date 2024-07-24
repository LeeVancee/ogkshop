import ProductCard from '@/components/frontside/product-card';
import getProducts from '@/actions/get-products';
import Grid from '@/components/grid';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    colorName: string;
    sizeName: string;
  };
}

const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {
  const products = await getProducts({
    categoryName: params.categoryName,
    colorName: searchParams.colorName,
    sizeName: searchParams.sizeName
  });

  if (products.length === 0) {
    return (
      <div className=" flex justify-center items-center mt-6 lg:col-span-4 lg:mt-0">
        No Products
      </div>
    );
  }

  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item}/>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
