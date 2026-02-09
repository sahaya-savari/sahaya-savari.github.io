import { useParams, Link, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { getPostBySlug } from '../../data/blogPosts';
import styles from './BlogPost.module.css';

// Configure marked for GitHub-style anchors and GFM
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Use a custom extension to generate GitHub-compatible heading IDs
marked.use({
  renderer: {
    heading(item) {
      const text = item.text;
      const level = item.depth;
      const raw = item.raw;

      // GitHub-compatible ID generation:
      // 1. Lowercase
      // 2. Remove non-alphanumeric/spaces/hyphens
      // 3. Trim
      // 4. Replace spaces with hyphens
      const id = raw
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  }
});

const BlogPost = () => {
  const { slug } = useParams();

  // Validate slug parameter (alphanumeric and hyphens only)
  const isValidSlug = useMemo(() => {
    return slug && /^[a-z0-9-]+$/i.test(slug);
  }, [slug]);

  const post = useMemo(() => {
    return isValidSlug ? getPostBySlug(slug) : null;
  }, [slug, isValidSlug]);

  // Transform Markdown to HTML and Sanitize
  const sanitizedContent = useMemo(() => {
    if (!post) return '';
    const htmlContent = marked.parse(post.content);
    return DOMPurify.sanitize(htmlContent);
  }, [post]);

  // If post not found or invalid slug, redirect to blog list
  if (!isValidSlug || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className={styles.blogPost} data-category={post.category}>
      <div className="container-narrow">
        {/* Back Link */}
        <Link to="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        {/* Article Header */}
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <time className={styles.date}>{post.date}</time>
            </div>
          </header>

          {/* Article Content - Sanitized to prevent XSS */}
          <div
            className={`glass-card ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </article>

        {/* Navigation to other posts */}
        <div className={styles.postNavigation}>
          <Link to="/blog" className="btn">
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
