import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange, resultCount }) => {
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
                <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search posts by title, description, or tag..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label="Search blog posts"
                />
                {value && (
                    <button className={styles.clearBtn} onClick={() => onChange('')} aria-label="Clear search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>
            {value && (
                <p className={styles.resultCount}>{resultCount} {resultCount === 1 ? 'result' : 'results'} found</p>
            )}
        </div>
    );
};

export default SearchBar;
