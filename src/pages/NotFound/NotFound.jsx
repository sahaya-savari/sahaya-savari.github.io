import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <svg viewBox="0 0 32 32" width="80" height="80">
                        <rect width="32" height="32" rx="6" fill="var(--bg-tertiary)" />
                        <polyline points="10,9 4,16 10,23" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="22,9 28,16 22,23" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="19" y1="8" x2="13" y2="24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>

                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.message}>Oops! This page got lost in the code</h2>
                <p className={styles.description}>
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <Link to="/" className={styles.homeBtn}>
                    ← Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
