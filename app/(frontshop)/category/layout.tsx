import Container from '@/components/ui/container';
import React from 'react';
import MobileFilters from './[categoryId]/components/mobile-filters';
import Filter from './[categoryId]/components/filter';
import getColors from '@/actions/get-colors';
import getSizes from '@/actions/get-sizes';

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  const sizes = await getSizes();
  const colors = await getColors();
  return (
    <Container>
      <div className="p-6 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
          {children}
        </div>
      </div>
    </Container>
  );
}
