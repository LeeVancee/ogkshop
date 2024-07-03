import { type Billboard } from '@/types';
import Image from 'next/image';

interface BillboardProps {
  data: Billboard;
}

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative h-full rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover ">
        <Image
          src={data?.imageUrl}
          alt={data?.label}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="rounded-xl"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-y-8  bg-opacity-50">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {/* {data?.label} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
