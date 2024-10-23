'use client';

import NextImage from 'next/image';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { Image } from '@/types';

import GalleryTab from './gallery-tab';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface GalleryProps {
  images: Image[];
}

const Gallery = ({ images = [] }: GalleryProps) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
        <TabList className="grid grid-cols-5  gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative sm:rounded-lg overflow-hidden">
              <Zoom>
                <NextImage fill src={image.url} alt="Image" priority className="object-cover" />
              </Zoom>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
