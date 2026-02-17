import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import styles from './RelatedPosts.module.css';

const RelatedPosts = ({ currentSlug, tags = [], category }) => {
    const related = useMemo(() => {
        return blogPosts
            .filter(p => p.slug !== currentSlug)
            .map(p => {
                let score = 0;
                if (p.category === category) score += 2;
                (p.tags || []).forEach(t => { if (tags.includes(t)) score += 1; });
                return { ...p, score };
            })
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }, [currentSlug, tags, category]);

    if (related.length === 0) return null;

    return (
        <section className={styles.relatedSection}>
            <h3 className={styles.heading}>You might also like</h3>
            <div className={styles.cardsGrid}>
                {related.map(post => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.card}>
                        <time className={styles.date}>{post.date}</time>
                        <h4 className={styles.cardTitle}>{post.title}</h4>
                        <div className={styles.tags}>
                            {(post.tags || []).slice(0, 2).map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
