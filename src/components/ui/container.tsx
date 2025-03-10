import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Optional className prop to pass additional classes
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`mx-auto max-w-(--breakpoint-xl) ${className}`}>{children}</div>;
};

export default Container;
