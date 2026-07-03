import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import BlogGrid from '../components/BlogGrid';
import Pagination from '../components/Pagination';
import { blogPosts, categories } from '../lib/data';
import { formatDateShort, paginate, getTotalPages } from '../utils/helpers';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Featured posts
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
    <div className="bg-background">
      {/* ── Hero Header ── */}
      <header className="py-16 md:py-24 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <span className="section-label">From the Travelog</span>
            <h1 className="font-display text-5xl md:text-7xl text-primary mt-2">
              Blog
            </h1>
            <p className="text-center text-primary/60 mt-4 max-w-2xl">
              Dive into our latest literary expeditions and discoveries
            </p>
          </motion.div>
        </Container>
      </header>

      {/* ── Featured Posts ── */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-background" aria-label="Featured posts">
          <Container>
            <span className="section-label">Featured Posts</span>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="card-brutal card-brutal-hover overflow-hidden group block"
                    aria-label={`Read ${post.title}`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-64 w-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 badge-brutal">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl text-primary leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-primary/60 line-clamp-2 mt-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 text-xs text-primary/50">
                        <span className="font-medium text-primary/80">{post.author}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>{formatDateShort(post.date)}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {post.readingTime} min
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Search + Filter + Grid ── */}
      <section className="py-12 bg-cream" aria-label="All blog posts">
        <Container>
          {/* Search */}
          <div className="mb-8">
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
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Grid + Pagination */}
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-primary flex items-center justify-center mb-6 shadow-brutal-sm">
                <span className="font-display text-3xl text-primary">!</span>
              </div>
              <h3 className="font-display text-2xl text-primary mb-2">
                No posts found
              </h3>
              <p className="text-sm text-primary/60 max-w-sm">
                No posts found. Try a different search or category.
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
