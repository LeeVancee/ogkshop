'use client';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { Expand } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Currency from './currency';
import IconButton from './icon-button';
import usePreviewModal from '@/hooks/use-preview-modal';
import { Product } from '@/types';

interface ProductCard {
  data: Product;
}

const ProductCard = ({ data }: ProductCard) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  return (
    <div onClick={handleClick} className=" group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image & actions */}
      <div className="aspect-square rounded-xl relative">
        <Image
          src={data.images?.[0]?.url}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-square object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600" />} />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Review */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
