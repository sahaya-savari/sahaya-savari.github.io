import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen } from 'lucide-react';
import Container from '../components/Container';

export default function NotFound() {
  return (
    <section
      className="bg-background min-h-[70vh] flex items-center justify-center"
      aria-labelledby="not-found-heading"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
        >
          {/* 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 120 }}
            className="font-display text-[clamp(5rem,20vw,12rem)] text-primary leading-none"
          >
            404
          </motion.h1>

          {/* Custom illustration: Compass with overlapping BookOpen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative my-8 flex items-center justify-center"
            aria-hidden="true"
          >
            <Compass className="w-24 h-24 text-primary/30" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            id="not-found-heading"
            className="font-display text-3xl text-primary mt-4"
          >
            Page Not Found
          </motion.h2>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-primary/60 mt-2 font-body"
          >
            The page you are looking for has wandered off the map.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <Link to="/" className="btn-primary" aria-label="Go back to the home page">
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
