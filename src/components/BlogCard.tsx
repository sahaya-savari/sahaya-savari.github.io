import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '../types';
import { formatDateShort } from '../utils/helpers';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="card-brutal card-brutal-hover block h-full overflow-hidden group"
        aria-label={`Read ${post.title}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
          {/* Category badge */}
          <span className="absolute top-4 left-4 badge-brutal bg-yellow border-2 border-primary rounded-full px-3 py-1 text-xs font-bold uppercase">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl text-primary line-clamp-2 mt-3 leading-tight">
            {post.title}
          </h3>
          <p className="text-sm text-primary/60 line-clamp-3 mt-2">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-4 text-xs text-primary/50">
            <img
              src={post.authorAvatar}
              alt={post.author}
              loading="lazy"
              className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover"
            />
            <span className="font-medium">{post.author}</span>
            <span aria-hidden="true">•</span>
            <span>{formatDateShort(post.date)}</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1">
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
