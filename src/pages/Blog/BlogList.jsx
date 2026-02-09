import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import styles from './BlogList.module.css';

const BlogList = () => {
  return (
    <div className={styles.blogList}>
      <div className="container-narrow">
        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>
            <span className="gradient-text">Blog Posts</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Thoughts, learnings, and insights on AI, ML, web development, and tech.
          </p>
        </div>

        {/* Blog Topics Grid */}
        {/* Choose a Topic */}
        <div className={styles.postsContainer}>
          <Link to="/blog/react" className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚛️</div>
            <h2>React & Web Dev</h2>
            <p style={{ margin: '1rem 0' }}>Modern UI, Hooks, and Frontend Performance</p>
            <span className="btn">View React Posts</span>
          </Link>

          <Link to="/blog/python" className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐍</div>
            <h2>Python & AI</h2>
            <p style={{ margin: '1rem 0' }}>Machine Learning, Data, and Core Concepts</p>
            <span className="btn">View Python Posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
