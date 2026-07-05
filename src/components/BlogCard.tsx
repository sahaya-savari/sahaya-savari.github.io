import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import type { BlogPost } from '../types';
import { formatDateShort } from '../utils/helpers';

export default function BlogCard({ post }: { post: BlogPost }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="card-brutal card-brutal-hover flex flex-col h-full overflow-hidden group"
        aria-label={`Read ${post.title}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0">
          {imgError ? (
            /* Fallback placeholder */
            <div className="w-full h-52 bg-cream flex items-center justify-center rounded-t-3xl border-b-ref border-border-muted">
              <BookOpen className="w-12 h-12 text-primary/30" aria-hidden="true" />
            </div>
          ) : (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {/* Category badge */}
          <span className="absolute top-4 left-4 badge-brutal">
            {post.category}
          </span>
        </div>

        {/* Content — flex-grow ensures all cards stretch to same height */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-display text-xl text-primary line-clamp-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-sm text-primary/60 line-clamp-3 mt-2 flex-grow">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-4 text-xs text-primary/50">
            <img
              src={post.authorAvatar}
              alt={post.author}
              loading="lazy"
              className="w-7 h-7 rounded-full border-ref border-primary/20 object-cover flex-shrink-0"
            />
            <span className="font-medium truncate">{post.author}</span>
            <span aria-hidden="true">•</span>
            <span className="whitespace-nowrap">{formatDateShort(post.date)}</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {post.readingTime} min
            </span>
          </div>

          {/* Read More */}
          <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

