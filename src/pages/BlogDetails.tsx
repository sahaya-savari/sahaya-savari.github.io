import { useState, useMemo, useEffect, type ReactNode } from 'react';
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
} from 'lucide-react';
import Container from '../components/Container';
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import Newsletter from '../components/Newsletter';
import { blogPosts } from '../lib/data';
import { formatDate } from '../utils/helpers';

/* ── Markdown-to-JSX Renderer ─────────────────────────────────────────── */

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Parse inline markdown: **bold**, *italic*, [text](url), ![alt](url) */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const boldRegex = /\*\*([^*]+)\*\*/;
  const italicRegex = /\*([^*]+)\*/;

  while (remaining.length > 0) {
    const candidates: { regex: RegExp; type: string }[] = [
      { regex: imageRegex, type: 'image' },
      { regex: linkRegex, type: 'link' },
      { regex: boldRegex, type: 'bold' },
      { regex: italicRegex, type: 'italic' },
    ];

    let earliestMatch: RegExpExecArray | null = null;
    let earliestType = '';
    let earliestStart = remaining.length;

    for (const candidate of candidates) {
      const match = candidate.regex.exec(remaining);
      if (match && match.index < earliestStart) {
        earliestStart = match.index;
        earliestMatch = match;
        earliestType = candidate.type;
      }
    }

    if (!earliestMatch) {
      if (remaining.length > 0) {
        nodes.push(<span key={`${keyPrefix}-text-${keyIdx}`}>{remaining}</span>);
      }
      break;
    }

    if (earliestMatch.index > 0) {
      nodes.push(
        <span key={`${keyPrefix}-text-${keyIdx}`}>{remaining.slice(0, earliestMatch.index)}</span>
      );
      keyIdx++;
    }

    const key = `${keyPrefix}-${earliestType}-${keyIdx}`;
    keyIdx++;

    if (earliestType === 'image') {
      nodes.push(
        <img
          key={key}
          src={earliestMatch[2]}
          alt={earliestMatch[1]}
          loading="lazy"
          className="rounded-xl border-2 border-primary my-4 w-full h-auto object-cover"
        />
      );
    } else if (earliestType === 'link') {
      nodes.push(
        <a
          key={key}
          href={earliestMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold underline decoration-2 underline-offset-2 hover:text-primary/70"
        >
          {earliestMatch[1]}
        </a>
      );
    } else if (earliestType === 'bold') {
      nodes.push(
        <strong key={key} className="font-bold text-primary">
          {earliestMatch[1]}
        </strong>
      );
    } else if (earliestType === 'italic') {
      nodes.push(
        <em key={key} className="italic">
          {earliestMatch[1]}
        </em>
      );
    }

    remaining = remaining.slice(earliestMatch.index + earliestMatch[0].length);
  }

  return nodes;
}

/** Parse full markdown content into JSX elements and extract TOC headings */
function renderMarkdown(content: string): { jsx: ReactNode[]; toc: TocItem[] } {
  const lines = content.split('\n');
  const jsx: ReactNode[] = [];
  const toc: TocItem[] = [];
  let keyIdx = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Code block: ```lang ... ```
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      jsx.push(
        <pre
          key={`code-${keyIdx}`}
          className="bg-primary text-cream rounded-xl p-4 overflow-x-auto my-6 font-mono text-sm border-2 border-primary"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      keyIdx++;
      continue;
    }

    // H2: ## Heading
    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      const id = slugifyHeading(text);
      toc.push({ id, text, level: 2 });
      jsx.push(
        <h2
          key={`h2-${keyIdx}`}
          id={id}
          className="font-display text-2xl md:text-3xl text-primary mt-10 mb-4 scroll-mt-24"
        >
          {renderInline(text, `h2-${keyIdx}`)}
        </h2>
      );
      keyIdx++;
      i++;
      continue;
    }

    // H3: ### Heading
    if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      const id = slugifyHeading(text);
      toc.push({ id, text, level: 3 });
      jsx.push(
        <h3
          key={`h3-${keyIdx}`}
          id={id}
          className="font-display text-xl md:text-2xl text-primary mt-8 mb-3 scroll-mt-24"
        >
          {renderInline(text, `h3-${keyIdx}`)}
        </h3>
      );
      keyIdx++;
      i++;
      continue;
    }

    // Blockquote: > text
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      jsx.push(
        <blockquote
          key={`quote-${keyIdx}`}
          className="border-l-4 border-primary bg-yellow/20 pl-6 pr-4 py-4 my-6 rounded-r-xl"
        >
          <p className="font-serif text-lg italic text-primary/90">
            {renderInline(quoteLines.join(' '), `quote-${keyIdx}`)}
          </p>
        </blockquote>
      );
      keyIdx++;
      continue;
    }

    // Bullet list: - item
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      jsx.push(
        <ul
          key={`ul-${keyIdx}`}
          className="list-none space-y-2 my-6"
        >
          {items.map((item, idx) => (
            <li
              key={`li-${keyIdx}-${idx}`}
              className="flex items-start gap-3 text-primary/80"
            >
              <span
                className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0"
                aria-hidden="true"
              />
              <span>{renderInline(item, `li-${keyIdx}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );
      keyIdx++;
      continue;
    }

    // Regular paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].trim().startsWith('```')
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    jsx.push(
      <p
        key={`p-${keyIdx}`}
        className="text-primary/80 leading-relaxed my-4"
      >
        {renderInline(paraLines.join(' '), `p-${keyIdx}`)}
      </p>
    );
    keyIdx++;
  }

  return { jsx, toc };
}

/* ── Page Component ───────────────────────────────────────────────────── */

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  const { renderedContent, toc } = useMemo(() => {
    if (!post) return { renderedContent: [] as ReactNode[], toc: [] as TocItem[] };
    const { jsx, toc: tocItems } = renderMarkdown(post.content);
    return { renderedContent: jsx, toc: tocItems };
  }, [post]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  const socialShares = [
    {
      icon: Share2,
      label: 'Copy link',
      href: '#',
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
            <div className="w-20 h-20 rounded-full bg-cream border-2 border-primary flex items-center justify-center shadow-brutal-sm">
              <BookOpen className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary">
              Post Not Found
            </h1>
            <p className="text-primary/70 max-w-md">
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
      <div className="relative w-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-b-3xl border-b-2 border-primary"
        />
      </div>

      {/* ── Article Layout ── */}
      <Container>
        <section className="py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main article column */}
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
                <span className="badge-brutal">{post.category}</span>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-5xl text-primary mt-4 leading-tight text-balance">
                  {post.title}
                </h1>

                {/* Author row */}
                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    loading="lazy"
                    className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-primary">{post.author}</span>
                    <div className="flex items-center gap-2 text-sm text-primary/50">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social share */}
                <div className="flex gap-3 mt-6">
                  {socialShares.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href !== '#' ? '_blank' : undefined}
                      rel={href !== '#' ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center hover:bg-yellow transition-all"
                    >
                      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Article Content */}
              <div className="prose-custom mt-10">
                {renderedContent}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t-2 border-primary/20">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-cream border-2 border-primary text-xs font-bold text-primary"
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
                  <h2 className="font-display text-3xl text-primary mt-2">
                    Keep Reading
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-6 mt-8">
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
                className="grid grid-cols-2 gap-6 mt-16"
                aria-label="Previous and next post navigation"
              >
                {prevPost && (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="card-brutal card-brutal-hover p-6 flex flex-col gap-2 group"
                    aria-label={`Previous post: ${prevPost.title}`}
                  >
                    <span className="flex items-center gap-1 text-xs font-bold text-primary/60">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Previous Post
                    </span>
                    <span className="font-display text-lg text-primary line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                )}

                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="card-brutal card-brutal-hover p-6 flex flex-col gap-2 group text-right"
                    aria-label={`Next post: ${nextPost.title}`}
                  >
                    <span className="flex items-center gap-1 text-xs font-bold text-primary/60 justify-end">
                      Next Post
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg text-primary line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </nav>
            </div>

            {/* Sidebar — sticky TOC (hidden below lg) */}
            <aside className="hidden lg:block">
              {toc.length > 0 && (
                <div className="sticky top-24">
                  <span className="section-label block mb-4">Table of Contents</span>
                  <nav aria-label="Table of contents">
                    <ul className="flex flex-col">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`text-sm text-primary/60 hover:text-primary cursor-pointer py-1 block transition-colors ${
                              item.level === 3 ? 'pl-4' : ''
                            }`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </aside>
          </div>
        </section>
      </Container>
    </article>
  );
}
