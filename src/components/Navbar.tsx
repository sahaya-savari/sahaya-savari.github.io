import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-body text-body-lg text-primary relative transition-colors duration-200 py-1 ${
      isActive
        ? 'font-medium underline underline-offset-4 decoration-2 decoration-primary'
        : 'hover:opacity-80'
    }`;

  return (
    <header className="absolute top-navbar-top left-0 w-full z-50 px-4 md:px-page-x flex justify-center">
      {/* Navbar Container Pill */}
      <div 
        className="w-full max-w-navbar bg-white border-ref border-border-muted rounded-navbar flex items-center justify-between px-2 py-1.5 transition-all duration-300"
        style={{
          boxShadow: '8px 8px 0px 0px #652929',
          height: '67.46px',
        }}
      >
        {/* Logo Badge */}
        <Link
          to="/"
          className="flex items-center justify-center bg-primary rounded-full select-none hover:opacity-90 transition-opacity"
          style={{ width: '57px', height: '57px', marginLeft: '6px' }}
          aria-label="Nomad Tome home"
        >
          <span className="text-white font-display text-[32px] leading-none mb-1">N</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block" style={{ marginRight: '6px' }}>
          <Button
            variant="gold"
            to="/blog"
            ariaLabel="Start Exploring"
            style={{
              width: '242.625px',
              height: '51.9625px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px', // Text styled larger and cleaner for modern reading
              fontWeight: '500',
              color: '#000000',
            }}
          >
            Start Exploring
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-3 text-primary"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white md:hidden flex flex-col p-6"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-primary/10">
              <Link
                to="/"
                className="flex items-center justify-center bg-primary rounded-full select-none"
                style={{ width: '57px', height: '57px' }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-white font-display text-[32px] leading-none mb-1">N</span>
              </Link>
              <button
                className="p-3 text-primary"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            {/* Menu items in Drawer */}
            <div className="flex flex-col gap-8 mt-12 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-display text-4xl text-primary tracking-wide ${
                      isActive ? 'underline underline-offset-8 decoration-4' : 'opacity-70'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Drawer CTA button */}
            <div className="mt-auto w-full pb-8">
              <Button
                variant="gold"
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-center items-center py-4 text-xl font-medium"
              >
                Start Exploring
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
