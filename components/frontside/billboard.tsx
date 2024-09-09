import Image from 'next/image';
import Link from 'next/link';
import { type Billboard } from '@/types';
import getBillboard from '@/actions/get-billboard';

const billboardId = process.env.NEXT_PUBLIC_BILLBOARD_ID;

const Billboard = async () => {
  const billboard: Billboard | null = await getBillboard(billboardId!);

  if (!billboard) {
    console.error('Billboard not found');
    return null;
  }

  return (
    <section className="rounded-xl bg-neutral-100 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-12 px-8 sm:px-16 md:grid-cols-2 min-h-[550px]">
        <div className="max-w-md space-y-6">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{billboard.label}</h2>
          <p className="text-pretty text-lg text-neutral-600">
            {'Discover unique items that blend style and functionality.'}
          </p>
          {/* <Link
            href="/category/accessories"
            className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-2 focus:ring-neutral-950"
          >
            Shop Now
          </Link> */}
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={billboard.imageUrl}
            alt={billboard.label}
            width={550}
            height={550}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Billboard;
