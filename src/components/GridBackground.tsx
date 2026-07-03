import React from 'react';

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function GridBackground({ children, className = '' }: GridBackgroundProps) {
  return (
    <div className={`relative grid-paper w-full h-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
