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
} from 'lucide-react';
import Container from '../components/Container';
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import Newsletter from '../components/Newsletter';
import LoadingSpinner from '../components/LoadingSpinner';
import { blogPosts, postComponents } from '../lib/data';
import { formatDate } from '../utils/helpers';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/* ── MDX Component Map ───────────────────────────────────────────────── */
/* These override MDX-rendered elements with our design tokens.          */
/* The prose-custom CSS class on the wrapper is the source of truth for  */
/* base styling; these add interactive features (scroll-mt, etc).        */

const mdxComponents = {
  // Headings — rehype-slug adds the id automatically
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-section-h3 text-primary mt-12 mb-4 scroll-mt-28 uppercase" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-section-h3 text-primary mt-12 mb-4 scroll-mt-28 uppercase" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-2xl text-primary mt-8 mb-3 scroll-mt-28 uppercase" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="font-display text-xl text-primary mt-6 mb-2 scroll-mt-28 uppercase" {...props} />
  ),

  // Paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-body-lg text-primary/80 leading-relaxed mb-6" {...props} />
  ),

  // Blockquote — children already contains a <p> rendered by MDX, don't add another
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gold bg-cream p-6 rounded-r-xl my-8 font-serif italic text-xl text-primary"
      {...props}
    />
  ),

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 space-y-2" style={{ listStyle: 'none', paddingLeft: 0 }} {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 font-body text-body-lg text-primary/80" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="font-body text-body-lg text-primary/80 flex items-start gap-3">
      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" aria-hidden="true" />
      <span>{props.children}</span>
    </li>
  ),

  // Code blocks — pre wraps code; let Prism theme control colors
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="rounded-xl overflow-x-auto my-8 border-ref border-primary shadow-brutal"
      style={{ padding: '1.5rem', fontSize: '0.875rem', lineHeight: 1.7 }}
      {...props}
    />
  ),
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
      className="rounded-xl border-ref border-primary shadow-brutal my-8 w-full h-auto"
      loading="lazy"
      {...props}
    />
  ),

  // Tables — wrapped for horizontal scrolling
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 border-ref border-primary rounded-xl shadow-brutal bg-cream">
      <table className="w-full text-left border-collapse" {...props} />
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
    <th className="px-4 py-3 font-display font-semibold text-sm uppercase tracking-wide" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 font-body text-primary/85 text-sm" {...props} />
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

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  // TOC state
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Build TOC from rendered DOM after MDX mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const article = articleRef.current;
      if (!article) return;
      const headings = Array.from(article.querySelectorAll('h2, h3'));
      const extractedToc = headings.map((h) => {
        const text = h.textContent || '';
        const id = h.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!h.id) h.id = id;
        return {
          id,
          text,
          level: h.tagName === 'H2' ? 2 : 3,
        };
      });
      setToc(extractedToc);
    }, 150); // Small delay to ensure MDX has fully rendered
    return () => clearTimeout(timer);
  }, [slug, post]);

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

  const PostContent = useMemo(() => {
    if (!post) return null;
    return postComponents[post.slug] || null;
  }, [post]);



  // Related posts (same category, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
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
    <article className="bg-background">
      {/* ── Hero Image ── */}
      <div className="relative w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-[28rem] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Dark overlay gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      {/* ── Article Layout ── */}
      <Container>
        <section className="py-10 md:py-14">
          <div className="grid lg:grid-cols-[1fr_260px] gap-10 xl:gap-16 items-start">

            {/* ── Main article column ── */}
            <div className="min-w-0">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back link */}
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary/70 hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to Blog
                </Link>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="badge-brutal">{post.category}</span>
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary leading-tight text-balance">
                  {post.title}
                </h1>

                {/* Author row */}
                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    loading="lazy"
                    className="w-12 h-12 rounded-full border-ref border-primary/20 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-primary">{post.author}</span>
                    <div className="flex items-center gap-2 text-sm text-primary/50 flex-wrap">
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
                <div className="flex gap-3 mt-6" role="group" aria-label="Share this article">
                  {socialShares.map(({ icon: Icon, label, href, onClick }) =>
                    onClick ? (
                      <button
                        key={label}
                        onClick={onClick}
                        aria-label={label}
                        className="w-10 h-10 rounded-full border-ref border-primary bg-white flex items-center justify-center hover:bg-gold transition-all cursor-pointer"
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
                        className="w-10 h-10 rounded-full border-ref border-primary bg-white flex items-center justify-center hover:bg-gold transition-all"
                      >
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </a>
                    )
                  )}
                </div>
              </motion.div>

              {/* Article Content */}
              <div ref={articleRef} className="prose-custom mt-10">
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
                  <h2 className="font-display text-3xl text-primary mt-3 mb-6">
                    Keep Reading
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-6">
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
                className="grid grid-cols-2 gap-4 mt-12"
                aria-label="Previous and next post navigation"
              >
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="card-brutal card-brutal-hover p-5 flex flex-col gap-2 group"
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
                    className="card-brutal card-brutal-hover p-5 flex flex-col gap-2 group text-right"
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
            <aside className="hidden lg:block" aria-label="Table of contents">
              <div className="sticky top-28">
                {toc.length > 0 && (
                  <div className="card-brutal p-5 rounded-2xl">
                    {/* TOC Header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-primary/10">
                      <List className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="font-display text-sm uppercase tracking-wide text-primary">
                        On this page
                      </span>
                    </div>

                    <nav aria-label="Article sections">
                      <ul className="flex flex-col gap-0.5">
                        {toc.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`
                                block text-sm py-1.5 px-2 rounded-lg transition-all duration-150 border-l-2
                                ${item.level === 3 ? 'pl-5' : 'pl-2'}
                                ${
                                  activeId === item.id
                                    ? 'text-primary font-semibold bg-gold/20 border-l-primary'
                                    : 'text-primary/50 hover:text-primary hover:bg-primary/5 border-l-transparent'
                                }
                              `}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
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
