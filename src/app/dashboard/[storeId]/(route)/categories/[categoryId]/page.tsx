'use client';

import { CategoryForm } from './components/category-form';
import { use } from 'react';
import { useGetBillboards } from '@/features/manange/api/use-get-billboard';
import { useGetCategory } from '@/features/manange/api/use-get-category';
import HomeLoader from '@/components/loader/home-loader';

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
    storeId: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { storeId, categoryId } = use(params);
  const { data: category, isLoading: isLoadingCategory } = useGetCategory(categoryId);
  const { data: billboards, isLoading: isLoadingBillboards } = useGetBillboards(storeId);

  const isLoading = isLoadingCategory || isLoadingBillboards;
  if (isLoading) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards!} initialData={category!} />
      </div>
    </div>
  );
};

export default CategoryPage;
