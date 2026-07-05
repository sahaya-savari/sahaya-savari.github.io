import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '../types';
import { formatDateShort } from '../utils/helpers';
import { resolveBlogFallbackCover } from '../utils/blogImages';

export default function BlogCard({ post }: { post: BlogPost }) {
  const fallbackImage = useMemo(() => resolveBlogFallbackCover(post), [post]);
  const [imageSrc, setImageSrc] = useState(fallbackImage);

  useEffect(() => {
    let isActive = true;

    setImageSrc(fallbackImage);

    if (!post.image || post.image === fallbackImage) {
      return () => {
        isActive = false;
      };
    }

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (isActive) {
        setImageSrc(post.image);
      }
    };
    image.onerror = () => {
      if (isActive) {
        setImageSrc(fallbackImage);
      }
    };
    image.src = post.image;

    return () => {
      isActive = false;
    };
  }, [fallbackImage, post.image, post.slug]);

  const handleImageError = () => {
    setImageSrc(fallbackImage);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="card-brutal card-brutal-hover flex flex-col h-full overflow-hidden group min-w-0"
        aria-label={`Read ${post.title}`}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${fallbackImage}")` }}
        >
          <img
            src={imageSrc}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width={1200}
            height={675}
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 100vw"
            onError={handleImageError}
            className="w-full h-48 sm:h-52 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
          {/* Category badge */}
          <span className="absolute top-4 left-4 badge-brutal">
            {post.category}
          </span>
        </div>

        {/* Content — flex-grow ensures all cards stretch to same height */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow min-w-0">
          <h3 className="font-display text-xl text-primary line-clamp-2 leading-tight break-word">
            {post.title}
          </h3>
          <p className="text-sm text-primary/60 line-clamp-3 mt-2 flex-grow break-word">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-x-2 gap-y-2 mt-4 text-xs text-primary/50 flex-wrap min-w-0">
            <img
              src={post.authorAvatar}
              alt={post.author}
              loading="lazy"
              decoding="async"
              className="w-7 h-7 rounded-full border-ref border-primary/20 object-cover flex-shrink-0"
            />
            <span className="font-medium truncate max-w-[9rem]">{post.author}</span>
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

