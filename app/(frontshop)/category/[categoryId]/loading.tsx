import Grid from '@/components/grid';

export default function Loading() {
  return (
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <Grid className="grid-cols-2 md:grid-cols-4">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return <Grid.Item key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />;
          })}
      </Grid>
    </div>
  );
}
