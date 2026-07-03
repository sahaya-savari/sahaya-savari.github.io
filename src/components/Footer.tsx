import { Link } from 'react-router-dom';
import { Github, Globe, Instagram, Facebook, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Categories', path: '/categories' },
];

const exploreLinks = [
  { label: 'Newsletter', path: '/newsletter' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Accessibility', path: '/accessibility' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/sahaya-savari' },
  { icon: Globe, label: 'Portfolio', href: 'https://sahayasavari.me' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Brand + Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-3xl text-white tracking-tight uppercase">
              Sahaya Savari
            </h3>
            <p className="font-body text-sm text-white/60 mt-2">Read. Post. Repeat.</p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white transition-all duration-200 hover:bg-gold hover:text-primary hover:border-gold"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="flex flex-col gap-3" aria-label="Quick links">
            <h4 className="font-display text-lg text-gold">Quick Links</h4>
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 3: Explore */}
          <nav className="flex flex-col gap-3" aria-label="Explore links">
            <h4 className="font-display text-lg text-gold">Explore</h4>
            {exploreLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 4: Get in Touch */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-lg text-gold">Get in Touch</h4>
            <a
              href="mailto:contact@sahayasavari.me"
              className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              contact@sahayasavari.me
            </a>
            <p className="font-body text-sm text-white/70">
              AI & Data Analytics Student
            </p>
            <p className="font-body text-sm text-white/70">
              Aspiring AI Engineer
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-white/50">
            © 2026 Sahaya Savari. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/50">
            Built with ♥ for developers & learners
          </p>
        </div>
      </div>
    </footer>
  );
}
