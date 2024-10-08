import {ShoppingCartIcon} from 'lucide-react';

export default function OpenCart({className, quantity}: { className?: string; quantity?: number }) {
    return (
        <div
            className="relative flex h-10 w-10 items-center justify-center rounded-md  text-black transition-colors dark:border-neutral-700 dark:text-white">
            <ShoppingCartIcon className='h-4 w-4'/>

            {quantity ? (
                <div
                    className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
                    {quantity}
                </div>
            ) : null}
        </div>
    );
}
