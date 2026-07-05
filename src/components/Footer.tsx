import { Link } from 'react-router-dom';
import { Github, Globe, Instagram, Facebook, Youtube, Mail, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Categories', path: '/categories' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
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
    <footer className="bg-primary text-white border-t-4 border-primary" aria-label="Site footer">
      <div className="container-custom py-10 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-9 sm:gap-10 lg:gap-12 min-w-0">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group w-fit max-w-full min-h-[44px]"
              aria-label="Sahaya Savari – home"
            >
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-display text-xl leading-none">S</span>
              </div>
              <h2 className="font-display text-2xl text-white tracking-tight group-hover:text-gold transition-colors">
                Sahaya Savari
              </h2>
            </Link>

            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs break-word">
              A technical notebook on Python, Databases, Git, and Machine Learning. Built for developers, learners, and curious minds.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 transition-all duration-200 hover:bg-gold hover:text-primary hover:border-gold hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="flex flex-col gap-1 min-w-0" aria-label="Quick navigation links">
            <h3 className="font-display text-base text-gold mb-3 uppercase tracking-wide">
              Quick Links
            </h3>
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-sm text-white/60 hover:text-white py-2 transition-colors duration-150 hover:translate-x-0.5 inline-flex min-h-[44px] items-center w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 3: Explore */}
          <nav className="flex flex-col gap-1 min-w-0" aria-label="Explore links">
            <h3 className="font-display text-base text-gold mb-3 uppercase tracking-wide">
              Explore
            </h3>
            {exploreLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-sm text-white/60 hover:text-white py-2 transition-colors duration-150 hover:translate-x-0.5 inline-flex min-h-[44px] items-center w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Column 4: Get in Touch */}
          <div className="flex flex-col gap-4 min-w-0">
            <h3 className="font-display text-base text-gold uppercase tracking-wide">
              Get in Touch
            </h3>

            <a
              href="mailto:contact@sahayasavari.me"
              className="flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors group w-fit max-w-full min-h-[44px] break-all"
            >
              <Mail className="w-4 h-4 flex-shrink-0 group-hover:text-gold transition-colors" aria-hidden="true" />
              contact@sahayasavari.me
            </a>

            <p className="font-body text-sm text-white/50">
              AI &amp; Data Analytics Student
            </p>

            {/* Newsletter CTA */}
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-gold hover:text-white transition-colors group min-h-[44px] w-fit max-w-full"
            >
              Subscribe to Newsletter
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="font-body text-xs text-white/40">
              © 2026 Sahaya Savari. All rights reserved.
            </p>
            <p className="font-body text-xs text-white/40">
              Built with ♥ for developers &amp; learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
