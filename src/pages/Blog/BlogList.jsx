import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, getAllTags, getReadingTime, getViewCount, formatViews } from '../../data/blogPosts';
import { ScrollReveal } from '../../utils/scrollReveal';
import SearchBar from '../../components/SearchBar/SearchBar';
import TagFilter from '../../components/TagFilter/TagFilter';
import styles from './BlogList.module.css';

const BlogList = () => {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const allTags = useMemo(() => getAllTags(), []);

  const handleTagToggle = (tag) => {
    if (tag === null) {
      setActiveTags([]);
    } else {
      setActiveTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    }
  };

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by active tags
    if (activeTags.length > 0) {
      posts = posts.filter(p =>
        (p.tags || []).some(t => activeTags.includes(t))
      );
    }

    return posts;
  }, [search, activeTags]);

  const showResults = search.trim() || activeTags.length > 0;

  return (
    <div className={styles.blogList}>
      <div className="container">
        {/* Page Header */}
        <ScrollReveal>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Explore Topics</h1>
            <p className={styles.pageSubtitle}>
              Dive into specialized articles and walkthroughs on the technologies and concepts I'm currently exploring.
            </p>
          </header>
        </ScrollReveal>

        {/* Search & Filter */}
        <SearchBar value={search} onChange={setSearch} resultCount={filteredPosts.length} />
        <TagFilter tags={allTags} activeTags={activeTags} onToggle={handleTagToggle} />

        {/* Show search/filter results */}
        {showResults && (
          <div className={styles.searchResults}>
            {filteredPosts.length === 0 ? (
              <div className={styles.noResults}>
                <p>😔 No posts found. Try different keywords or tags.</p>
              </div>
            ) : (
              <div className={styles.resultsGrid}>
                {filteredPosts.map(post => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.resultCard}>
                    <div className={styles.resultMeta}>
                      <time>{post.date}</time>
                      <span>·</span>
                      <span>⏱ {getReadingTime(post.content)} min</span>
                      <span>·</span>
                      <span>👁 {formatViews(getViewCount(post.date))}</span>
                    </div>
                    <h3 className={styles.resultTitle}>{post.title}</h3>
                    <p className={styles.resultExcerpt}>{post.excerpt}</p>
                    <div className={styles.resultTags}>
                      {(post.tags || []).map(tag => (
                        <span key={tag} className={styles.resultTag}>{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Topics Grid — always visible */}
        <h2 className={styles.sectionTitle}>Browse by Topic</h2>
        <div className={styles.postsContainer}>
          <ScrollReveal delay={100}>
            <Link to="/blog/python" className={styles.topicCard} data-category="python">
              <div className={styles.topicIcon}>🐍</div>
              <h2 className={styles.topicTitle}>Python & AI</h2>
              <p className={styles.topicDescription}>
                Core learning: Neural networks, machine learning frameworks, and Python core concepts.
              </p>
              <span className={styles.viewBtn}>
                View Collection
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link to="/blog/github" className={styles.topicCard} data-category="github">
              <div className={styles.topicIcon}>🔧</div>
              <h2 className={styles.topicTitle}>Git & GitHub</h2>
              <p className={styles.topicDescription}>
                Complete practical guide: staging, committing, pushing, and collaborating with Git & GitHub.
              </p>
              <span className={styles.viewBtn}>
                View Collection
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
