'use client';

import { ColorForm } from './components/color-form';
import { use } from 'react';
import { useGetColor } from '@/features/manange/api/use-get-color';
import HomeLoader from '@/components/loader/home-loader';
interface ColorPageProps {
  params: Promise<{ colorId: string }>;
}

const ColorPage = ({ params }: ColorPageProps) => {
  const { colorId } = use(params);

  const { data: color, isLoading } = useGetColor(colorId);

  if (isLoading || !color) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
