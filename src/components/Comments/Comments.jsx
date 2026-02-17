import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Comments.module.css';

const Comments = () => {
    const containerRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous giscus instance
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'sahaya-savari/sahaya-savari.github.io');
        script.setAttribute('data-repo-id', ''); // TODO: Replace with your repo ID from giscus.app
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', ''); // TODO: Replace with your category ID from giscus.app
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        containerRef.current.appendChild(script);
    }, [theme]);

    return (
        <section className={styles.comments}>
            <h3 className={styles.heading}>💬 Discussion</h3>
            <p className={styles.hint}>Leave a comment using your GitHub account</p>
            <div ref={containerRef} />
        </section>
    );
};

export default Comments;
