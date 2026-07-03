import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className = '', wide = false }: ContainerProps) {
  return (
    <div className={`${wide ? 'container-wide' : 'container-custom'} ${className}`}>
      {children}
    </div>
  );
}
