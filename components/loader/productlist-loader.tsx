import React from 'react';
import Grid from '../grid';

export default function ProductListLoader() {
  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <Grid className="grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 12 }, (_, index) => (
          <Grid.Item key={`loading-item-${index}`} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />
        ))}
      </Grid>
    </div>
  );
}
