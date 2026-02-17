import { useState, useEffect } from 'react';
import styles from './ReadingProgress.module.css';

const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className={styles.progressBar} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
            <div className={styles.progressFill} style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
    );
};

export default ReadingProgress;
