import { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconButton = ({ onClick, icon, className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full flex items-center justify-center  border shadow-md p-2 hover:scale-110 transition dark:bg-white bg-white',
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
