import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BlogGrid from '../components/BlogGrid';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import { blogPosts, categories } from '../lib/data';
import { paginate, getTotalPages } from '../utils/helpers';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Derive selected category from URL param directly
  const selectedCategory = useMemo(() => {
    if (!categoryParam) return 'All';
    const match = categories.find((c) => c.slug.toLowerCase() === categoryParam.toLowerCase());
    return match ? match.name : 'All';
  }, [categoryParam]);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleSelectCategory = (category: string) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      const match = categories.find(
        (c) =>
          c.slug.toLowerCase() === category.toLowerCase() ||
          c.name.toLowerCase() === category.toLowerCase()
      );
      if (match) {
        setSearchParams({ category: match.slug });
      }
    }
  };

  // Featured posts (up to 2)
  const featuredPosts = useMemo(() => blogPosts.filter((p) => p.featured).slice(0, 2), []);

  // Filter logic: case-insensitive search on title + excerpt, category filter
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (selectedCategory !== 'All') {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  const totalPages = getTotalPages(filteredPosts.length, POSTS_PER_PAGE);
  const paginatedPosts = paginate(filteredPosts, currentPage, POSTS_PER_PAGE);

  const categoryNames = categories.map((c) => c.name);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ── Hero Header ── */}
      <header className="pt-8 pb-10 sm:pt-10 md:pt-12 md:pb-16 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center min-w-0"
          >
            <span className="section-label">From the Travelog</span>
            <h1 className="font-display text-section-h2 text-primary mt-3 leading-[0.98] lg:leading-none break-word">
              Blog
            </h1>
            <p className="text-center text-primary/60 mt-3 max-w-xl font-body text-body-lg break-word">
              Dive into our latest literary expeditions and discoveries
            </p>
          </motion.div>
        </Container>
      </header>

      {/* ── Featured Posts ── */}
      {featuredPosts.length > 0 && (
        <section className="pb-10 bg-background" aria-label="Featured posts">
          <Container>
            <span className="section-label">Featured Posts</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-6 min-w-0">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Search + Filter + Grid ── */}
      <section className="py-8 md:py-10 bg-cream overflow-hidden" aria-label="All blog posts">
        <Container>
          {/* Search */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search articles by title or excerpt..."
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              categories={categoryNames}
              selectedCategory={selectedCategory}
              onSelect={handleSelectCategory}
            />
          </div>

          {/* Grid + Pagination */}
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-primary flex items-center justify-center mb-6 shadow-brutal">
                <span className="font-display text-3xl text-primary">!</span>
              </div>
              <h3 className="font-display text-2xl text-primary mb-2">
                No posts found
              </h3>
              <p className="text-sm text-primary/60 max-w-sm font-body">
                No posts matched your search. Try a different query or category.
              </p>
            </div>
          ) : (
            <>
              <BlogGrid posts={paginatedPosts} />
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
