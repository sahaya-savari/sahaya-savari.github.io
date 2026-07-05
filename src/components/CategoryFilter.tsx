interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div
      className="flex flex-wrap gap-2.5 min-w-0"
      role="group"
      aria-label="Filter posts by category"
    >
      {allCategories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`min-h-[44px] rounded-badge px-4 sm:px-5 py-2.5 text-sm font-semibold border-ref border-primary transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-cream'
            }`}
            style={{
              boxShadow: isActive ? '4px 4px 0px 0px #652929' : 'none',
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
