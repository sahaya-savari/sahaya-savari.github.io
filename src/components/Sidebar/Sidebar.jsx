import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button (Mobile/Tablet) */}
      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.open : ''}`}></span>
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={closeSidebar}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') closeSidebar(); }}
          role="button"
          aria-label="Close navigation menu"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          {/* Brand */}
          <div className={styles.brand}>
            <h1 className={styles.brandTitle}>Learning Journal</h1>
            <p className={styles.brandSubtitle}>Notes & Experiments</p>
          </div>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            <NavLink
              to="/"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/blog"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Blog</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>About</span>
            </NavLink>
          </nav>

          {/* Theme Toggle */}
          <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
