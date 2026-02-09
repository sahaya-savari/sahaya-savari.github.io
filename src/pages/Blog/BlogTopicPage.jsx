import { useState } from 'react';
import { blogPosts } from '../../data/blogPosts';

const BlogTopicPage = ({ title, topicKey, description }) => {
    const [expandedSlug, setExpandedSlug] = useState(null);

    // Filter posts based on the topicKey (searches in title, slug, and content)
    const posts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(topicKey.toLowerCase()) ||
        post.slug.toLowerCase().includes(topicKey.toLowerCase()) ||
        post.content.toLowerCase().includes(topicKey.toLowerCase())
    );

    const toggleExpand = (slug) => {
        setExpandedSlug(expandedSlug === slug ? null : slug);
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            <div className="container-narrow">
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ marginBottom: '1rem' }}>
                        <span className="gradient-text">{title}</span>
                    </h1>
                    <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>{description}</p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post.slug}
                                className="glass-card"
                                style={{
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <header style={{ marginBottom: '1rem' }}>
                                    <time style={{ fontSize: '0.875rem', opacity: 0.6 }}>{post.date}</time>
                                    <h2 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>{post.title}</h2>
                                </header>

                                <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>{post.excerpt}</p>

                                {expandedSlug === post.slug && (
                                    <div
                                        style={{
                                            marginTop: '2rem',
                                            paddingTop: '2rem',
                                            borderTop: '1px solid rgba(255,255,255,0.1)',
                                            lineHeight: '1.8'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                )}

                                <button
                                    className="btn"
                                    onClick={() => toggleExpand(post.slug)}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.75rem 1.5rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {expandedSlug === post.slug ? 'Show Less' : 'Read Full Post →'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <p>No posts found for this topic yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogTopicPage;
