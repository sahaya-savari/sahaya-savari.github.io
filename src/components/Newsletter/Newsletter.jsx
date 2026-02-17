import styles from './Newsletter.module.css';

const Newsletter = () => {
    return (
        <section className={styles.newsletter}>
            <div className={styles.content}>
                <h3 className={styles.heading}>📧 Stay Updated</h3>
                <p className={styles.text}>Enjoyed this post? Get new articles straight to your inbox.</p>
                <a
                    href="https://substack.com/@sahayasavari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.subscribeBtn}
                >
                    Subscribe on Substack →
                </a>
            </div>
        </section>
    );
};

export default Newsletter;
