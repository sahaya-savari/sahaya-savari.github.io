import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Search,
  Rocket,
  Scroll,
  User,
  Feather,
  Heart,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import { categories } from '../lib/data';

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Sparkles,
  Search,
  Rocket,
  Scroll,
  User,
  Feather,
  Heart,
  BookOpen,
};

export default function Categories() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background py-8 md:py-16" aria-labelledby="categories-hero-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="section-label">Browse by Genre</span>
            <h1
              id="categories-hero-heading"
              className="display-text font-display text-section-h2 text-primary mt-4"
            >
              Explore Genres
            </h1>
            <p className="text-subtitle text-primary/60 mt-4 font-body">
              Chart your next literary adventure by genre
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Category Grid */}
      <section className="bg-background py-8 md:py-20" aria-labelledby="categories-grid-heading">
        <Container>
          <h2 id="categories-grid-heading" className="sr-only">
            Category Grid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || BookOpen;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    to={`/blog?category=${category.slug}`}
                    className="card-brutal card-brutal-hover p-8 group block"
                    aria-label={`Explore ${category.name} category`}
                  >
                    {/* Colored top bar */}
                    <div
                      className="h-2 rounded-full mb-6"
                      style={{ backgroundColor: category.color }}
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/30 border-2 border-primary">
                      <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                    </div>

                    {/* Category name */}
                    <h3 className="font-display text-2xl text-primary mt-4">{category.name}</h3>

                    {/* Description */}
                    <p className="text-sm text-primary/60 mt-2 font-body">{category.description}</p>

                    {/* Post count badge */}
                    <span className="badge-brutal mt-4">
                      {category.postCount} posts
                    </span>

                    {/* Explore link */}
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all mt-6 font-body">
                      Explore {category.name}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-cream py-8 md:py-12" aria-labelledby="categories-cta-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 id="categories-cta-heading" className="font-display text-2xl text-primary">
              Can't find your genre?
            </h2>
            <div className="mt-6">
              <Button variant="primary" to="/blog" ariaLabel="Browse all blog posts">
                Browse All Posts
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
