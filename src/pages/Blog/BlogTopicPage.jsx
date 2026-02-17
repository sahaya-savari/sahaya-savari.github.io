import { Link } from 'react-router-dom';
import { blogPosts, getReadingTime, getViewCount, formatViews } from '../../data/blogPosts';
import styles from './BlogTopicPage.module.css';

const BlogTopicPage = ({ title, topicKey, description }) => {
    // Filter posts using category field (reliable match)
    const posts = blogPosts.filter(post => post.category === topicKey);

    return (
        <div className={styles.blogTopicPage}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        <span className="gradient-text">{title}</span>
                    </h1>
                    <p className={styles.description}>{description}</p>
                </header>

                <div className={styles.postsGrid}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article
                                key={post.slug}
                                className={styles.postCard}
                                data-category={post.category}
                            >
                                <header className={styles.postHeader}>
                                    <div className={styles.postMeta}>
                                        <time className={styles.date}>{post.date}</time>
                                        <span className={styles.dot}>·</span>
                                        <span className={styles.readTime}>⏱ {getReadingTime(post.content)} min</span>
                                        <span className={styles.dot}>·</span>
                                        <span className={styles.views}>👁 {formatViews(getViewCount(post.date))}</span>
                                    </div>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                </header>

                                <p className={styles.excerpt}>{post.excerpt}</p>

                                {post.tags && (
                                    <div className={styles.tags}>
                                        {post.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    to={`/blog/${post.slug}`}
                                    className={styles.viewPostBtn}
                                >
                                    Read Full Post →
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className={styles.postCard} style={{ textAlign: 'center' }}>
                            <p>No posts found for this topic yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogTopicPage;
