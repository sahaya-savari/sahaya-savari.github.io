interface MarqueeProps {
  items?: string[];
}

export default function Marquee({ items = ['Read. Post. Repeat.'] }: MarqueeProps) {
  // Repeated items to ensure smooth infinite loop
  const repeated = Array(12).fill(items).flat();

  return (
    <div
      className="marquee-container bg-white text-primary border-t-ref border-b-ref border-primary overflow-hidden select-none"
      aria-hidden="true"
      style={{ minHeight: 'clamp(80px, 12vw, 166.26px)', display: 'flex', alignItems: 'center' }}
    >
      <div className="marquee-content flex items-center gap-8 md:gap-12">
        {repeated.map((item, index) => (
          <span key={index} className="flex items-center gap-8 md:gap-12 whitespace-nowrap">
            <span className="font-display text-[clamp(1.2rem,3vw,33.2719px)] font-medium uppercase tracking-wide">
              {item}
            </span>
            {/* Arrow separator SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary flex-shrink-0"
              style={{ width: 'clamp(20px, 2.5vw, 32px)', height: 'clamp(20px, 2.5vw, 32px)' }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
