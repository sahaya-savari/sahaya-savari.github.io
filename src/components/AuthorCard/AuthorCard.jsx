import styles from './AuthorCard.module.css';

const AuthorCard = () => {
    return (
        <div className={styles.authorCard}>
            <div className={styles.avatar}>
                <span className={styles.avatarText}>SS</span>
            </div>
            <div className={styles.info}>
                <p className={styles.writtenBy}>Written by</p>
                <h4 className={styles.name}>Sahaya Savari</h4>
                <p className={styles.bio}>Developer & Lifelong Learner • MSc AI Student</p>
            </div>
        </div>
    );
};

export default AuthorCard;
