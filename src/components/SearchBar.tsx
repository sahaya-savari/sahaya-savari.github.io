import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search articles...' }: SearchBarProps) {
  return (
    <div className="relative w-full">
      {/* Search icon */}
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 pointer-events-none"
        aria-hidden="true"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
        className="input-brutal pl-12 rounded-full"
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
