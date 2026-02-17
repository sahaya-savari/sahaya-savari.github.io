import styles from './TagFilter.module.css';

const TagFilter = ({ tags, activeTags, onToggle }) => {
    return (
        <div className={styles.filterWrapper}>
            <button
                className={`${styles.tag} ${activeTags.length === 0 ? styles.active : ''}`}
                onClick={() => onToggle(null)}
            >
                All
            </button>
            {tags.map(tag => (
                <button
                    key={tag}
                    className={`${styles.tag} ${activeTags.includes(tag) ? styles.active : ''}`}
                    onClick={() => onToggle(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
