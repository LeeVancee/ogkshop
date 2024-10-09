import prismadb from '@/lib/prismadb';

import { ColorForm } from './components/color-form';
interface ColorPageProps {
  params: Promise<{ colorId: string }>;
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const { colorId } = await params;
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
