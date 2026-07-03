import React from 'react';

interface ScrollIndicatorProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollIndicator({ onClick, className = '', style }: ScrollIndicatorProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const nextSection = document.getElementById('about-blogger');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to content"
      className={`relative flex items-center justify-center bg-gold border-ref border-primary rounded-navbar hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[8px] active:translate-y-[8px] transition-all duration-200 group ${className}`}
      style={{
        width: '60.825px',
        height: '60.1125px',
        boxShadow: '-8px -8px 0px 0px #652929',
        transform: 'rotate(180deg)',
        ...style,
      }}
    >
      {/* Down arrow pointing up because of 180deg rotation */}
      <svg
        width="30.8"
        height="30.8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#652929"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:translate-y-[-2px] transition-transform duration-200"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </button>
  );
}
