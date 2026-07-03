import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import BlogGrid from '../components/BlogGrid';
import Newsletter from '../components/Newsletter';
import { blogPosts } from '../lib/data';

const marqueeItems = [
  'Read. Post. Repeat.',
  'Chart the Unseen Worlds',
  'Every Book a Journey',
  'Explore. Discover. Read.',
  'Literary Adventures Await',
];

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section
        className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Decorative book images */}
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a7d85c5b?w=400&h=520&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-64 object-cover border-2 border-primary rounded-2xl shadow-brutal hidden md:block"
        />
        <img
          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=520&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-64 object-cover border-2 border-primary rounded-2xl shadow-brutal hidden md:block"
        />
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=420&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute bottom-8 right-8 w-72 h-48 object-cover border-2 border-primary rounded-2xl shadow-brutal hidden md:block"
        />

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className="absolute top-24 left-6 md:left-20 badge-brutal animate-float hidden md:inline-flex"
        >
          Exclusive Interviews
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          className="absolute top-24 right-6 md:right-20 badge-brutal animate-float-delayed hidden md:inline-flex"
        >
          Hot Recommendations
        </motion.div>

        <Container className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-primary leading-[0.85] tracking-tight max-w-5xl mx-auto"
          >
            CHART THE UNSEEN WORLDS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-body text-lg md:text-xl text-primary/60 max-w-xl mx-auto mt-6"
          >
            Your compass to literary adventures that transport and transform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="mt-10"
          >
            <Button variant="white" to="/about" ariaLabel="Start Now">
              Start Now
            </Button>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          aria-hidden="true"
        >
          <span className="text-xs uppercase tracking-widest text-primary/40 mb-1">Scroll</span>
          <ChevronDown className="w-6 h-6 text-primary/40 animate-bounce-slow" />
        </div>
      </section>

      {/* ===== Marquee Section ===== */}
      <Marquee items={marqueeItems} />

      {/* ===== About Section ===== */}
      <section
        id="about-blogger"
        className="py-20 md:py-28 bg-background"
        aria-label="About the blogger"
      >
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="section-label">About the Blogger</span>
              <h2 className="font-display text-4xl md:text-5xl text-primary mt-4">
                Meet Your Fellow Voyager
              </h2>
              <p className="font-body text-lg text-primary/60 mt-2">
                I'm Taylor Vance, your guide through the vast landscapes of literature
              </p>
              <p className="text-primary/70 mt-4 leading-relaxed">
                I believe every book is a journey waiting to be taken. Here at Nomad Tome,
                we don't just read stories; we inhabit them, exploring the worlds they create
                and the new perspectives they offer.
              </p>
              <div className="mt-8">
                <Button variant="outline" to="/about" ariaLabel="The Story So Far">
                  The Story So Far
                </Button>
              </div>
            </motion.div>

            {/* Right: portrait */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop"
                alt="Taylor Vance, literary blogger"
                loading="lazy"
                className="rounded-3xl border-2 border-primary shadow-brutal w-full max-w-md mx-auto object-cover"
              />
              <div className="absolute -top-6 -left-6 w-28 h-28 bg-yellow border-2 border-primary rounded-full flex items-center justify-center shadow-brutal animate-float">
                <span className="font-display text-xs text-primary text-center leading-tight">
                  Read.<br />Post.<br />Repeat.
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Blog Highlights ===== */}
      <section className="py-20 md:py-28 bg-cream" aria-label="Blog highlights">
        <Container>
          <div className="text-center">
            <span className="section-label">From the Travelog</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-2">
              Blog Highlights
            </h2>
            <p className="text-primary/60 mt-2">
              Dive into our latest literary expeditions and discoveries
            </p>
          </div>
        </Container>
        <BlogGrid posts={blogPosts.slice(0, 6)} />
        <div className="text-center mt-12">
          <Button variant="yellow" to="/blog" ariaLabel="View All Posts">
            View All Posts
          </Button>
        </div>
      </section>

      {/* ===== Genre Spotlight ===== */}
      <section className="py-20 md:py-28 bg-background" aria-label="Genre spotlight">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: book image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=700&fit=crop"
                alt="Books representing various genres"
                loading="lazy"
                className="rounded-3xl border-2 border-primary shadow-brutal w-full object-cover"
              />
            </motion.div>

            {/* Right: text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="section-label">Genre Spotlight</span>
              <h2 className="font-display text-4xl md:text-5xl text-primary mt-4">
                REALMS OF WONDER
              </h2>
              <p className="font-serif italic text-lg text-primary/60 mt-2">
                Chart your next escape
              </p>
              <p className="text-primary/70 mt-4 leading-relaxed">
                From sweeping historical sagas to mind-bending sci-fi, we treat every genre
                as a new territory to be explored. Discover stories that don't just fill
                pages—they build worlds that stay with you long after the journey ends.
              </p>
              <div className="mt-8">
                <Button variant="primary" to="/categories" ariaLabel="Explore Genres">
                  Explore Genres
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Newsletter Section ===== */}
      <div className="bg-background">
        <Newsletter />
      </div>
    </>
  );
}
