import NextImage from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image } from '@/types';

interface GalleryTabProps {
  image: Image;
}

const GalleryTab = ({ image }: GalleryTabProps) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md ">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <NextImage
              fill
              src={image.url}
              sizes="(max-width: 768px) 100vw, 768px"
              alt="gallery"
              className="object-cover object-center"
              priority
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent'
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
