import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <Link to="/" className={styles.brand}>
          <span className={styles.brandText}>Sahaya Savari</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            end
          >
            Blog
          </NavLink>
          <NavLink
            to="/blog/react"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            React
          </NavLink>
          <NavLink
            to="/blog/python"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Python
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Theme Toggle & Hamburger */}
        <div className={styles.navActions}>
          <ThemeToggle />

          {/* Hamburger Menu Button */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/blog"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
          end
        >
          Blog
        </NavLink>
        <NavLink
          to="/blog/react"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
        >
          React
        </NavLink>
        <NavLink
          to="/blog/python"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
        >
          Python
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
