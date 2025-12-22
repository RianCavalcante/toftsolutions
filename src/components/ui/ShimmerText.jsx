import React from 'react';
import { cn } from '../../lib/utils';

const ShimmerText = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(110deg,#9ca3af,45%,#ffffff,55%,#9ca3af)] bg-[length:200%_100%] bg-clip-text text-transparent transform translate-z-0',
        className
      )}
      style={{ animation: 'shimmer 3s linear infinite' }}
    >
      {children}
    </span>
  );
};

export default ShimmerText;
