'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter = ({ data, name, valueKey }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: name,
    };

    if (current[valueKey] === name) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.name} className="flex items-center">
            <Button
              variant="outline"
              className={cn('rounded-md text-sm  p-2  ', selectedValue === filter.name && ' border-2')}
              onClick={() => onClick(filter.name)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
