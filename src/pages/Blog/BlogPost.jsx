import { useParams, Link, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { getPostBySlug, getReadingTime, getViewCount, formatViews } from '../../data/blogPosts';
import ReadingProgress from '../../components/ReadingProgress/ReadingProgress';
import AuthorCard from '../../components/AuthorCard/AuthorCard';
import ShareButton from '../../components/ShareButton/ShareButton';
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';
import Newsletter from '../../components/Newsletter/Newsletter';
import Comments from '../../components/Comments/Comments';
import TableOfContents from '../../components/TableOfContents/TableOfContents';
import styles from './BlogPost.module.css';

// Configure marked for GitHub-style anchors and GFM
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Use a custom extension to generate GitHub-compatible heading IDs
// and secure external links with rel="noopener noreferrer"
marked.use({
  renderer: {
    heading(item) {
      const text = item.text;
      const level = item.depth;
      const raw = item.raw;

      const id = raw
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      return `<h${level} id="${id}">${text}</h${level}>`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : '';
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    }
  }
});

const BlogPost = () => {
  const { slug } = useParams();

  const isValidSlug = useMemo(() => {
    return slug && /^[a-z0-9-]+$/i.test(slug);
  }, [slug]);

  const post = useMemo(() => {
    return isValidSlug ? getPostBySlug(slug) : null;
  }, [slug, isValidSlug]);

  const sanitizedContent = useMemo(() => {
    if (!post) return '';
    const htmlContent = marked.parse(post.content);
    return DOMPurify.sanitize(htmlContent, {
      ADD_ATTR: ['target', 'rel'],
    });
  }, [post]);

  const readingTime = useMemo(() => post ? getReadingTime(post.content) : 0, [post]);
  const viewCount = useMemo(() => post ? formatViews(getViewCount(post.date)) : '0', [post]);

  if (!isValidSlug || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <ReadingProgress />
      <div className={styles.blogPost} data-category={post.category}>
        <div className={styles.postLayout}>
          {/* Main content */}
          <div className={styles.postMain}>
            <div className="container-narrow">
              <Link to="/blog" className={styles.backLink}>
                ← Back to Blog
              </Link>

              <article className={styles.article}>
                <header className={styles.header}>
                  <h1 className={styles.title}>{post.title}</h1>
                  <div className={styles.meta}>
                    <time className={styles.date}>{post.date}</time>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.readTime}>⏱ {readingTime} min read</span>
                    <span className={styles.metaDot}>·</span>
                    <span className={styles.views}>👁 {viewCount} views</span>
                  </div>
                  {post.tags && (
                    <div className={styles.tags}>
                      {post.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </header>

                <div
                  className={`glass-card ${styles.content}`}
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              </article>

              <AuthorCard />
              <ShareButton title={post.title} />
              <Newsletter />
              <RelatedPosts currentSlug={post.slug} tags={post.tags || []} category={post.category} />
              <Comments />

              <div className={styles.postNavigation}>
                <Link to="/blog" className="btn">
                  View All Posts
                </Link>
              </div>
            </div>
          </div>

          {/* Table of Contents sidebar */}
          <aside className={styles.tocSidebar}>
            <TableOfContents contentHtml={sanitizedContent} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
