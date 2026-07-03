import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import type { BlogPost } from '../types';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  showSectionHeader?: boolean;
}

export default function BlogGrid({ posts, title, showSectionHeader = false }: BlogGridProps) {
  return (
    <section className="container-custom py-12" aria-label={title || 'Blog posts'}>
      {showSectionHeader && (
        <div className="mb-8 flex flex-col gap-2">
          <span className="section-label">The Blog</span>
          {title && <h2 className="font-display text-3xl md:text-4xl text-primary">{title}</h2>}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="w-16 h-16 text-primary/30" aria-hidden="true" />
          <h3 className="font-display text-2xl text-primary mt-4">Check back soon</h3>
          <p className="text-sm text-primary/50 mt-2 max-w-sm">
            Once posts are published, you'll see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
