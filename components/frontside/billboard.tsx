import getBillboard from '@/actions/get-billboard';
import { type Billboard } from '@/types';
import Image from 'next/image';

const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;

const Billboard = async () => {
  const billboard: Billboard | null = await getBillboard(billboardId!);

  if (!billboard) {
    console.error('Billboard not found');
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative h-full rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
        <Image
          src={billboard.imageUrl}
          alt={billboard.label}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="rounded-xl"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-y-8 bg-opacity-50">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {/* {billboard.label} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
