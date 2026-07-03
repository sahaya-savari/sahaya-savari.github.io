interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className="marquee-container bg-primary text-white py-3 overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee-content">
        {doubled.map((item, index) => (
          <span key={index} className="flex items-center whitespace-nowrap">
            <span className="font-display text-2xl text-white tracking-wider px-4">
              {item}
            </span>
            <span className="text-yellow text-xl select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
