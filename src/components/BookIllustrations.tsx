import React from 'react';

// Left Closed Book stack / tilted book representation
export function ClosedBookIllustration({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Outer book cover */}
      <rect
        x="30"
        y="40"
        width="220"
        height="320"
        rx="8"
        stroke="#652929"
        strokeWidth="3"
        fill="#FCFAF3"
      />
      {/* Spine highlights */}
      <path d="M30 40V360" stroke="#652929" strokeWidth="6" />
      <path d="M45 40V360" stroke="#652929" strokeWidth="1.5" strokeDasharray="6 6" />
      
      {/* Inside paper edges visible at top/bottom/right */}
      <path d="M250 50H260V350H250" stroke="#652929" strokeWidth="2" fill="#FFFFFF" />
      <line x1="255" y1="60" x2="255" y2="340" stroke="#652929" strokeWidth="1" />
      
      {/* Cover text & minimal ornament */}
      <text
        x="140"
        y="160"
        textAnchor="middle"
        fill="#652929"
        fontFamily="Impact, sans-serif"
        fontSize="32"
        letterSpacing="2"
      >
        NOMAD
      </text>
      <text
        x="140"
        y="200"
        textAnchor="middle"
        fill="#652929"
        fontFamily="Impact, sans-serif"
        fontSize="32"
        letterSpacing="2"
      >
        TOME
      </text>
      <circle cx="140" cy="245" r="8" stroke="#652929" strokeWidth="2" />
      <path d="M110 245H132M148 245H170" stroke="#652929" strokeWidth="2" />
    </svg>
  );
}

// Middle open book representation
export function OpenBookIllustrationLeft({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Left page outline */}
      <path
        d="M150 360C110 360 40 330 40 330V80C40 80 110 110 150 110"
        stroke="#652929"
        strokeWidth="3"
        fill="#FCFAF3"
      />
      {/* Right page outline */}
      <path
        d="M150 360C190 360 260 330 260 330V80C260 80 190 110 150 110"
        stroke="#652929"
        strokeWidth="3"
        fill="#FCFAF3"
      />
      {/* Spine lines */}
      <path d="M150 110V360" stroke="#652929" strokeWidth="4" />
      <path d="M150 360C110 375 40 345 40 345" stroke="#652929" strokeWidth="3" />
      <path d="M150 360C190 375 260 345 260 345" stroke="#652929" strokeWidth="3" />
      
      {/* Line page markings on left side */}
      <line x1="60" y1="130" x2="130" y2="130" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="160" x2="130" y2="160" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="190" x2="130" y2="190" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="220" x2="130" y2="220" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="250" x2="130" y2="250" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="280" x2="130" y2="280" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      
      {/* Line page markings on right side */}
      <line x1="170" y1="130" x2="240" y2="130" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="160" x2="240" y2="160" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="190" x2="240" y2="190" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="220" x2="240" y2="220" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="250" x2="240" y2="250" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="280" x2="240" y2="280" stroke="#652929" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

// Right open book representation
export function OpenBookIllustrationRight({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 500 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Left Page (perspective) */}
      <path
        d="M250 320C170 320 50 280 50 280V60C50 60 170 100 250 100"
        stroke="#652929"
        strokeWidth="3.5"
        fill="#FCFAF3"
      />
      {/* Right Page (perspective) */}
      <path
        d="M250 320C330 320 450 280 450 280V60C450 60 330 100 250 100"
        stroke="#652929"
        strokeWidth="3.5"
        fill="#FCFAF3"
      />
      {/* Center binder */}
      <path d="M250 100V320" stroke="#652929" strokeWidth="5" />
      
      {/* Flowing pages background lines */}
      <path d="M250 320C170 338 50 298 50 298" stroke="#652929" strokeWidth="3.5" />
      <path d="M250 320C330 338 450 298 450 298" stroke="#652929" strokeWidth="3.5" />

      {/* Pages content simulation */}
      <path d="M80 120 H220" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M80 150 H220" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M80 180 H220" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M80 210 H180" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M80 240 H200" stroke="#652929" strokeWidth="2" opacity="0.7" />

      <path d="M280 120 H420" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M280 150 H420" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M280 180 H420" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M280 210 H380" stroke="#652929" strokeWidth="2" opacity="0.7" />
      <path d="M280 240 H400" stroke="#652929" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}
