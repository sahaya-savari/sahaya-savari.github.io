import { useState, useEffect, useMemo } from 'react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({ contentHtml }) => {
    const [activeId, setActiveId] = useState('');

    const headings = useMemo(() => {
        if (!contentHtml) return [];
        const regex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/gi;
        const results = [];
        let match;
        while ((match = regex.exec(contentHtml)) !== null) {
            results.push({
                level: parseInt(match[1]),
                id: match[2],
                text: match[3].replace(/<[^>]*>/g, ''),
            });
        }
        return results;
    }, [contentHtml]);

    useEffect(() => {
        if (headings.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
        );
        headings.forEach(h => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 3) return null;

    return (
        <nav className={styles.toc} aria-label="Table of Contents">
            <h4 className={styles.tocTitle}>On this page</h4>
            <ul className={styles.tocList}>
                {headings.map(h => (
                    <li key={h.id} className={`${styles.tocItem} ${h.level === 3 ? styles.sub : ''} ${activeId === h.id ? styles.active : ''}`}>
                        <a href={`#${h.id}`} className={styles.tocLink}>{h.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
