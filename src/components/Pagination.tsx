import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers with ellipsis logic
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
  }

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className="flex items-center gap-2 justify-center flex-wrap"
      aria-label="Pagination navigation"
    >
      {/* Previous */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary bg-white text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream transition-colors"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-primary/50 font-body"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <motion.button
            key={page}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(page as number)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary font-body text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-primary hover:bg-cream'
            }`}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Next */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-primary bg-white text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream transition-colors"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </nav>
  );
}
