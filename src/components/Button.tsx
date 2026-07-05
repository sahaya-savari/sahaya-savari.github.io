import type { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'gold' | 'blue' | 'white-circle';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  blue: 'btn-blue',
  'white-circle': 'btn-white-circle',
};

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  style,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`;
  const wrapperClassName = className.includes('w-full') ? 'w-full' : 'inline-block';

  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.98 }} className={wrapperClassName}>
        <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel} style={style}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.98 }} className={wrapperClassName}>
        <a
          href={href}
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
        >
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.98 }} className={wrapperClassName}>
      <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel} style={style}>
        {children}
      </button>
    </motion.div>
  );
}
