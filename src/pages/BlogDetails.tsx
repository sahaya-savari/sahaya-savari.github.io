import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  BookOpen,
  List,
  Copy,
  Check,
} from 'lucide-react';
import Container from '../components/Container';
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import Newsletter from '../components/Newsletter';
import LoadingSpinner from '../components/LoadingSpinner';
import ReadingProgress from '../components/ReadingProgress';
import GeoSchema from '../components/GeoSchema';
import { blogPosts, postComponents } from '../lib/data';
import { formatDate } from '../utils/helpers';
import { resolveBlogFallbackCover, resolveChapterEmoji } from '../utils/blogImages';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const ARTICLE_SCROLL_OFFSET_FALLBACK = 120;
let suppressHashUpdatesUntil = 0;

function getArticleScrollOffset(): number {
  if (typeof window === 'undefined') return ARTICLE_SCROLL_OFFSET_FALLBACK;

  const navbar = document.querySelector('header');
  const navbarRect = navbar?.getBoundingClientRect();
  const navbarBottom = navbarRect ? Math.max(navbarRect.bottom, 72) : 72;
  return Math.ceil(navbarBottom + 24);
}

function slugifyHeading(value: string): string {
  return value
    .replace(/^[^A-Za-z0-9]+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeHeadingText(value: string): string {
  return value.replace(/^[^A-Za-z0-9]+/, '').toLowerCase().trim();
}

function shouldExcludeTocItem(item: TocItem, normalizedPostTitle?: string): boolean {
  const normalizedText = normalizeHeadingText(item.text);
  return normalizedText === normalizedPostTitle || normalizedText === 'table of contents';
}

function scrollToHeading(id: string, historyMode: 'push' | 'replace' = 'push') {
  const target = document.getElementById(id);
  if (!target) return;

  suppressHashUpdatesUntil = Date.now() + 1400;

  if (window.location.hash !== `#${id}`) {
    const historyMethod = historyMode === 'replace' ? 'replaceState' : 'pushState';
    window.history[historyMethod](null, '', `#${id}`);
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(targetTop - getArticleScrollOffset(), 0),
    behavior: 'smooth',
  });
}

function copyHeadingLink(id: string) {
  if (typeof window === 'undefined') return;
  const link = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(link).catch(() => {});
}

function scrollToArticleTop() {
  if (typeof window === 'undefined') return;

  suppressHashUpdatesUntil = Date.now() + 1000;
  window.history.replaceState(null, '', window.location.pathname);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function HeadingWithAnchor({
  level,
  className,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { level: 2 | 3 | 4 }) {
  const Tag = `h${level}` as const;
  const headingText = typeof children === 'string' ? children : 'this heading';
  const mergedStyle: React.CSSProperties = {
    ...props.style,
    scrollMarginTop: `${getArticleScrollOffset()}px`,
  };

  return (
    <div className="group relative">
      <Tag className={className} id={id} {...props} style={mergedStyle}>
        {children}
      </Tag>
      {id ? (
        <button
          type="button"
          onClick={() => copyHeadingLink(id)}
          aria-label={`Copy link to ${headingText}`}
          className="mt-1 inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-primary/40 hover:text-primary text-sm font-semibold transition-all sm:absolute sm:right-0 sm:top-1 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        >
          #
        </button>
      ) : null}
    </div>
  );
}

const CustomPre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const code = preRef.current?.querySelector("code")?.textContent ?? "";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative my-8 max-w-full min-w-0">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 min-h-[44px] min-w-[44px] px-2 md:px-3 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-md flex items-center justify-center gap-1.5 text-xs font-semibold backdrop-blur-sm transition-all z-10 border border-primary/10"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
      <pre
        ref={preRef}
        className="rounded-xl overflow-x-auto border border-primary/20 !my-0"
        style={{ padding: 'clamp(0.875rem, 2.5vw, 1.25rem)', paddingTop: '3.75rem', fontSize: 'clamp(0.75rem, 2.8vw, 0.875rem)', lineHeight: 1.6 }}
        {...props}
      />
    </div>
  );
};

/* ── MDX Component Map ───────────────────────────────────────────────── */
/* These override MDX-rendered elements with our design tokens.          */
/* The prose-custom CSS class on the wrapper is the source of truth for  */
/* base styling; these add interactive features (scroll-mt, etc).        */

const mdxComponents = {
  // Headings — rehype-slug adds the id automatically
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor level={2} className="font-display text-section-h3 text-primary mt-10 md:mt-12 mb-4 uppercase break-word pr-0 sm:pr-10" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor level={2} className="font-display text-section-h3 text-primary mt-10 md:mt-12 mb-4 uppercase break-word pr-0 sm:pr-10" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor level={3} className="font-display text-2xl text-primary mt-8 mb-3 uppercase break-word pr-0 sm:pr-10" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor level={4} className="font-display text-xl text-primary mt-6 mb-2 uppercase break-word pr-0 sm:pr-10" {...props} />
  ),

  // Paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-body-lg text-primary/80 leading-relaxed mb-6 break-word" {...props} />
  ),

  // Blockquote — children already contains a <p> rendered by MDX, don't add another
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gold bg-cream p-4 sm:p-6 rounded-r-xl my-8 font-serif italic text-lg sm:text-xl text-primary break-word"
      {...props}
    />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 space-y-2" style={{ listStyle: 'none', paddingLeft: 0 }} {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 sm:pl-6 mb-6 space-y-2 font-body text-body-lg text-primary/80 break-word" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="font-body text-body-lg text-primary/80 flex items-start gap-3 min-w-0 break-word">
      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" aria-hidden="true" />
      <span>{props.children}</span>
    </li>
  ),

  // Code blocks — pre wraps code; let Prism theme control colors
  pre: CustomPre,
  // Inline code vs code inside pre
  code: (props: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      // Inside pre — let Prism handle everything
      return <code {...props} />;
    }
    // Inline code
    return (
      <code
        className="bg-cream text-primary px-2 py-0.5 rounded-md font-mono text-sm border-ref border-primary/20"
        {...props}
      />
    );
  },

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:decoration-primary transition-all"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  // Images
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className="rounded-xl border-ref border-primary shadow-brutal my-8 w-full h-auto object-cover"
      loading="lazy"
      decoding="async"
      sizes="(min-width: 1280px) 760px, 100vw"
      {...props}
    />
  ),

  // Tables — wrapped for horizontal scrolling
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="max-w-full overflow-x-auto my-8 border-ref border-primary rounded-xl shadow-brutal bg-cream">
      <table className="w-full min-w-[560px] sm:min-w-[640px] text-left border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-primary text-cream border-b-2 border-primary" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-primary/20" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-primary/5 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-3 sm:px-4 py-3 font-display font-semibold text-sm uppercase tracking-wide" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-3 sm:px-4 py-3 font-body text-primary/85 text-sm align-top" {...props} />
  ),

  // Horizontal rule
  hr: () => <hr className="border-primary/20 my-10" />,

  // Strong / em
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-primary" {...props} />
  ),
};

/* ── Page Component ───────────────────────────────────────────────────── */

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const pendingHashScrollRef = useRef<string | null>(null);

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);
  const heroFallbackImage = useMemo(() => {
    if (!post) return '';
    return resolveBlogFallbackCover(post);
  }, [post]);
  const [heroImage, setHeroImage] = useState(heroFallbackImage);

  // TOC state
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    let isActive = true;

    setHeroImage(heroFallbackImage);
    setToc([]);
    setActiveId('');
    pendingHashScrollRef.current = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : null;

    if (!post?.image || post.image === heroFallbackImage) {
      return () => {
        isActive = false;
      };
    }

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (isActive) {
        setHeroImage(post.image);
      }
    };
    image.onerror = () => {
      if (isActive) {
        setHeroImage(heroFallbackImage);
      }
    };
    image.src = post.image;

    return () => {
      isActive = false;
    };
  }, [heroFallbackImage, post?.image, post?.slug]);

  // Build TOC from rendered DOM after MDX mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = articleRef.current;
      if (!article) return;
      const headings = Array.from(article.querySelectorAll('h2, h3, h4'));
      const normalizedPostTitle = post?.title
        ? normalizeHeadingText(post.title)
        : undefined;
      const extractedToc = headings.map((h) => {
        const text = h.textContent || '';
        const id = h.id || slugifyHeading(text);
        h.id = id;
        return {
          id,
          text,
          level: h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : 4,
        };
      }).filter((item) => !shouldExcludeTocItem(item, normalizedPostTitle));
      setToc(extractedToc);
    }, 150); // Small delay to ensure MDX has fully rendered
    return () => clearTimeout(timer);
  }, [slug, post]);

  useEffect(() => {
    if (toc.length === 0 || !pendingHashScrollRef.current) return;

    const hashId = pendingHashScrollRef.current;
    pendingHashScrollRef.current = null;

    window.setTimeout(() => {
      scrollToHeading(hashId, 'replace');
    }, 50);
  }, [toc]);

  // Scroll-spy: highlight active TOC entry using IntersectionObserver
  useEffect(() => {
    if (toc.length === 0) return;

    const headingEls = toc
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    if (!activeId) return;
    if (Date.now() < suppressHashUpdatesUntil) return;
    if (window.location.hash !== `#${activeId}`) {
      window.history.replaceState(null, '', `#${activeId}`);
    }
  }, [activeId]);

  useEffect(() => {
    const updateProgress = () => {
      const article = articleRef.current;
      if (!article) return;

      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(articleHeight - viewportHeight, 1);
      const progress = ((window.scrollY - articleTop + viewportHeight * 0.15) / totalScrollable) * 100;
      setReadingProgress(Math.max(0, Math.min(100, progress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [post?.slug]);

  const PostContent = useMemo(() => {
    if (!post) return null;
    return postComponents[post.slug] || null;
  }, [post]);



  // Related posts (same category, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];

    const sameCategoryPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id);
    const fallbackPosts = blogPosts.filter(
      (p) => p.id !== post.id && !sameCategoryPosts.some((sameCategoryPost) => sameCategoryPost.id === p.id)
    );

    return [...sameCategoryPosts, ...fallbackPosts].slice(0, 3);
  }, [post]);

  // Prev / Next posts (wrap around)
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    const index = blogPosts.findIndex((p) => p.id === post.id);
    const prevIndex = index > 0 ? index - 1 : blogPosts.length - 1;
    const nextIndex = index < blogPosts.length - 1 ? index + 1 : 0;
    return {
      prevPost: blogPosts[prevIndex],
      nextPost: blogPosts[nextIndex],
    };
  }, [post]);

  // Share URL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post ? post.title : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  };

  const socialShares = [
    {
      icon: Share2,
      label: 'Copy link',
      onClick: handleCopyLink,
      href: undefined as string | undefined,
    },
    {
      icon: Twitter,
      label: 'Share on Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: Facebook,
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: Linkedin,
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const chapterItems = toc.filter((item) => item.level === 2);

  const onHeroImageError = () => {
    if (!post) return;
    setHeroImage(heroFallbackImage);
  };

  const renderSectionLinks = (items: TocItem[], dense = false) => (
    <nav aria-label="Article sections">
      <ul className={`flex flex-col ${dense ? 'gap-1' : 'gap-0.5'}`}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`
                w-full text-left block text-sm py-2 px-2 rounded-lg transition-all duration-150 border-l-2 min-h-[44px] break-word
                ${item.level === 3 ? 'pl-5' : item.level === 4 ? 'pl-8 text-xs' : 'pl-2'}
                ${
                  activeId === item.id
                    ? 'text-primary font-semibold bg-gold/20 border-l-primary'
                    : 'text-primary/50 hover:text-primary hover:bg-primary/5 border-l-transparent'
                }
              `}
              onClick={() => scrollToHeading(item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Not found
  if (!post) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-cream border-ref border-primary flex items-center justify-center shadow-brutal">
              <BookOpen className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary">
              Post Not Found
            </h1>
            <p className="text-primary/70 max-w-md font-body">
              The article you're looking for may have been moved or doesn't exist.
            </p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <article className="bg-background overflow-x-hidden">
      <ReadingProgress />
      <GeoSchema post={post} url={shareUrl || `https://blog.sahayasavari.me/blog/${slug}`} />

      {/* ── Hero Image ── */}
      <div
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url("${heroFallbackImage}")` }}
      >
        <img
          src={heroImage || heroFallbackImage}
          alt={post.title}
          className="w-full h-56 sm:h-64 md:h-[28rem] object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          width={1200}
          height={675}
          sizes="100vw"
          onError={onHeroImageError}
        />
        {/* Dark overlay gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      {/* ── Article Layout ── */}
      <Container>
        <section className="py-8 md:py-14">
          <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-8 xl:gap-16 items-start min-w-0">

            {/* ── Main article column ── */}
            <div className="min-w-0">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Breadcrumbs Navigation */}
                <nav aria-label="Breadcrumb" className="mb-4 text-xs font-body text-primary/60 flex items-center gap-1.5 flex-wrap">
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>/</span>
                  <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                  <span>/</span>
                  <span className="text-primary font-medium">{post.category}</span>
                </nav>

                {/* Back link */}
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary/70 hover:text-primary transition-colors mb-6 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to Blog
                </Link>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="badge-brutal">{post.category}</span>
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary leading-tight text-balance break-word">
                  {post.title}
                </h1>

                {/* Author row */}
                <div className="flex items-center gap-4 mt-6 min-w-0">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full border-ref border-primary/20 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-primary">{post.author}</span>
                    <div className="flex items-center gap-x-2 gap-y-1 text-sm text-primary/50 flex-wrap min-w-0">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social share */}
                <div className="flex flex-wrap gap-3 mt-6" role="group" aria-label="Share this article">
                  {socialShares.map(({ icon: Icon, label, href, onClick }) =>
                    onClick ? (
                      <button
                        key={label}
                        onClick={onClick}
                        aria-label={label}
                        className="w-11 h-11 rounded-full border-ref border-primary bg-white flex items-center justify-center hover:bg-gold transition-all cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </button>
                    ) : (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-11 h-11 rounded-full border-ref border-primary bg-white flex items-center justify-center hover:bg-gold transition-all"
                      >
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </a>
                    )
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between gap-4 mb-3 min-w-0">
                    <span className="font-body text-xs uppercase tracking-[0.18em] sm:tracking-[0.24em] text-primary/55 break-word">Reading progress</span>
                    <span className="font-display text-sm text-primary">{Math.round(readingProgress)}%</span>
                  </div>
                  <div className="h-3 rounded-full border-ref border-primary bg-cream overflow-hidden">
                    <div
                      className="h-full bg-primary transition-[width] duration-200 ease-out"
                      style={{ width: `${readingProgress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </motion.div>

              {chapterItems.length > 0 && (
                <section className="mt-10 mb-10 card-brutal bg-white p-4 md:p-6 min-w-0" aria-label="Chapter table">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
                    <div>
                      <span className="section-label">Quick navigation</span>
                      <h2 className="font-display text-2xl text-primary mt-3 break-word">Chapter Table</h2>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToArticleTop}
                      className="btn-primary self-start md:self-auto"
                      aria-label="Back to top"
                    >
                      Back to top
                    </button>
                  </div>

                  <div className="grid gap-3 md:hidden">
                    {chapterItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border-ref border-primary bg-cream p-3 flex items-center gap-3 min-w-0"
                      >
                        <span className="w-8 h-8 rounded-full bg-white border-ref border-primary flex items-center justify-center shrink-0 font-display text-sm text-primary">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-body text-xs uppercase tracking-[0.12em] text-primary/50">
                            {resolveChapterEmoji(item.text, item.level, index)}
                          </p>
                          <p className="font-body text-sm font-semibold text-primary break-word">
                            {item.text}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => scrollToHeading(item.id)}
                          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-badge border-ref border-primary bg-gold px-4 py-2 font-body text-sm font-semibold text-primary"
                          aria-label={`Go to ${item.text}`}
                        >
                          Go
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="hidden max-w-full overflow-x-auto md:block">
                    <table className="w-full min-w-[560px] sm:min-w-[680px] border-collapse">
                      <thead>
                        <tr className="bg-primary text-cream">
                          <th className="px-4 py-3 text-left font-display text-sm uppercase tracking-wide">#</th>
                          <th className="px-4 py-3 text-left font-display text-sm uppercase tracking-wide">Emoji</th>
                          <th className="px-4 py-3 text-left font-display text-sm uppercase tracking-wide">Chapter</th>
                          <th className="px-4 py-3 text-right font-display text-sm uppercase tracking-wide">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chapterItems.map((item, index) => (
                          <tr key={item.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                            <td className="px-4 py-3 font-body text-body-md text-primary">{index + 1}</td>
                            <td className="px-4 py-3 font-body text-body-md text-primary">{resolveChapterEmoji(item.text, item.level, index)}</td>
                            <td className="px-4 py-3 font-body text-body-md text-primary">{item.text}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => scrollToHeading(item.id)}
                                className="inline-flex min-h-[44px] items-center justify-center rounded-badge border-ref border-primary bg-gold px-4 py-2 font-body text-sm font-semibold text-primary hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
                                aria-label={`Go to ${item.text}`}
                              >
                                Go
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <details className="xl:hidden mt-8 card-brutal bg-white p-4 md:p-6 rounded-2xl min-w-0">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3 min-h-[44px] min-w-0">
                  <span className="font-display text-lg text-primary uppercase">On this page</span>
                  <span className="font-body text-sm text-primary/50 shrink-0">Tap to expand</span>
                </summary>
                <div className="mt-4">
                  {renderSectionLinks(toc, true)}
                </div>
              </details>

              {/* Article Content */}
              <div ref={articleRef} className="prose-custom mt-10 min-w-0">
                {PostContent ? (
                  <Suspense fallback={<LoadingSpinner />}>
                    <PostContent components={mdxComponents} />
                  </Suspense>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <BookOpen className="w-12 h-12 text-primary/30 mb-4" aria-hidden="true" />
                    <p className="text-primary/60 font-body">Article content is not available.</p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t-2 border-primary/20">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge-brutal"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <span className="section-label">Related Posts</span>
                  <h2 className="font-display text-3xl text-primary mt-3 mb-6 break-word">
                    Keep Reading
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 min-w-0">
                    {relatedPosts.map((rp) => (
                      <BlogCard key={rp.id} post={rp} />
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="mt-16">
                <CommentSection postId={post.id} />
              </div>

              {/* Newsletter CTA */}
              <div className="mt-16">
                <Newsletter />
              </div>

              {/* Prev/Next Navigation */}
              <nav
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12"
                aria-label="Previous and next post navigation"
              >
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="card-brutal card-brutal-hover p-5 flex flex-col gap-2 group min-w-0"
                    aria-label={`Previous post: ${prevPost.title}`}
                  >
                    <span className="flex items-center gap-1 text-xs font-bold text-primary/60">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Previous Post
                    </span>
                    <span className="font-display text-base text-primary line-clamp-2 leading-tight">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div /> // Placeholder to keep grid alignment
                )}

                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="card-brutal card-brutal-hover p-5 flex flex-col gap-2 group text-left sm:text-right min-w-0"
                    aria-label={`Next post: ${nextPost.title}`}
                  >
                    <span className="flex items-center gap-1 text-xs font-bold text-primary/60 justify-end">
                      Next Post
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-base text-primary line-clamp-2 leading-tight">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>

            {/* ── Sidebar: sticky TOC (hidden below lg) ── */}
            <aside className="hidden xl:block" aria-label="Table of contents">
              <div className="sticky" style={{ top: `${getArticleScrollOffset()}px` }}>
                {toc.length > 0 && (
                  <div className="card-brutal p-5 rounded-2xl">
                    {/* TOC Header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-primary/10">
                      <List className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="font-display text-sm uppercase tracking-wide text-primary">
                        On this page
                      </span>
                    </div>

                    {renderSectionLinks(toc)}
                  </div>
                )}
              </div>
            </aside>

          </div>
        </section>
      </Container>
    </article>
  );
}
