interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  const allCategories = ['All', ...categories];

  return (
    <div
      className="flex flex-wrap gap-2"
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
            className={`rounded-full px-4 py-2 text-sm font-semibold border-2 border-primary transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-cream'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
