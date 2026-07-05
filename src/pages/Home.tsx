import { motion } from 'framer-motion';
import Container from '../components/Container';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import BlogGrid from '../components/BlogGrid';
import Newsletter from '../components/Newsletter';
import SectionLabel from '../components/SectionLabel';
import ScrollIndicator from '../components/ScrollIndicator';
import GridBackground from '../components/GridBackground';
import {
  ClosedBookIllustration,
  OpenBookIllustrationLeft,
  OpenBookIllustrationRight,
} from '../components/BookIllustrations';
import { blogPosts } from '../lib/data';

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
        <section
          className="relative bg-background flex items-center overflow-hidden select-none w-full pt-28 md:pt-20 lg:pt-[67.46px]"
          style={{ minHeight: 'clamp(500px, 100vh, 840.3px)' }}
          aria-label="Hero"
        >
        {/* SVG Book Illustrations */}
        <ClosedBookIllustration
          className="absolute hidden lg:block opacity-45 pointer-events-none"
          style={{
            left: '24.125px',
            top: '227.199px',
            width: '298.75px',
            height: '388.46px',
          }}
        />
        <OpenBookIllustrationLeft
          className="absolute hidden lg:block opacity-45 pointer-events-none"
          style={{
            left: '582.4px',
            top: '423.91px',
            width: '286.91px',
            height: '388.85px',
          }}
        />
        <OpenBookIllustrationRight
          className="absolute hidden lg:block opacity-45 pointer-events-none"
          style={{
            left: '948.27px',
            top: '275.6px',
            width: '514.4px',
            height: '364.06px',
          }}
        />

        {/* Floating Badges */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute hidden lg:flex badge-pill items-center gap-2"
          style={{ left: '566.86px', top: '510.83px', width: '249.4px', height: '49.4px' }}
        >
          <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
          <span className="font-body text-body-lg text-primary">AI & Data Science</span>
        </motion.div>
        
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute hidden lg:flex badge-pill items-center gap-2"
          style={{ left: '1092.54px', top: '368.42px', width: '286.9px', height: '50px' }}
        >
          <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
          <span className="font-body text-body-lg text-primary">Python & Git Guides</span>
        </motion.div>

        {/* Hero Content Container */}
        <div className="w-full px-4 md:px-page-x relative z-10 flex flex-col justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-hero text-primary uppercase select-none text-left text-balance"
          >
            CHART THE UNSEEN WORLDS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-body text-subtitle text-primary text-left mt-6 md:mt-10 max-w-[551.5px]"
          >
            A technical notebook on Python, Databases, Git, and Machine Learning by Sahaya Savari.
          </motion.p>
        </div>

        {/* Scroll Indicator button positioned bottom-right */}
        <ScrollIndicator
          className="absolute hidden lg:block"
          style={{
            left: '1403.63px',
            top: '672.73px',
          }}
        />
      </section>

      {/* ===== Marquee Section ===== */}
      <Marquee />

      {/* ===== About Section ===== */}
      <section
        id="about-blogger"
        className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-b-ref border-primary relative"
        style={{ minHeight: 'clamp(500px, 80vh, 790.5px)' }}
        aria-label="About the blogger"
      >
        {/* Left Column - Yellow Background */}
        <div className="bg-gold p-6 md:p-col-pad flex flex-col justify-center relative min-h-[400px] md:min-h-0">
          <div className="max-w-[550px] mx-auto md:ml-auto md:mr-0 flex flex-col gap-6 items-start">
            <SectionLabel>About the Blogger</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase leading-[0.98] lg:leading-none">
              Meet Your Fellow Voyager
            </h2>
            <p className="font-body text-subtitle text-primary">
              I'm Sahaya Savari, your guide through Python programming and data engineering.
            </p>
            <p className="font-body text-body-lg text-primary/80 leading-relaxed">
              I am an AI & Data Analytics Student and Aspiring AI Engineer. This blog is my public repository where I break down complex algorithms, database systems, and software engineering workflows into simple, visual, and highly readable guides.
            </p>
          </div>
        </div>

        {/* Right Column - White Background + Grid Paper */}
        <GridBackground className="p-6 md:p-col-pad flex items-center justify-center min-h-[500px] md:min-h-0">
          {/* Photo Frame Wrapper */}
          <div
            className="card-brutal bg-white p-4 select-none relative flex items-center justify-center photo-frame"
            style={{
              border: '0.8px solid #7C4844',
              boxShadow: '8px 8px 0px 0px #652929',
            }}
          >
            <img
              src="https://github.com/sahaya-savari.png?size=512"
              alt="Sahaya Savari portrait"
              loading="lazy"
              decoding="async"
              className="block object-cover border-ref border-border-muted"
              style={{
                width: 'min(470.67px, calc(100% - 2rem))',
                aspectRatio: '470.67 / 490.7',
                height: 'auto',
              }}
            />
          </div>
        </GridBackground>

        {/* Circular overlapping CTA button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <Button
            variant="white-circle"
            to="/about"
            ariaLabel="The Story So Far"
          >
            <span className="font-body text-body-lg text-primary text-center leading-tight">
              The Story<br />So Far
            </span>
          </Button>
        </div>
      </section>

      {/* ===== Blog Highlights ===== */}
      <section className="py-12 md:py-28 bg-cream-bg border-b-ref border-primary" aria-label="Blog highlights">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center mb-16">
            <SectionLabel>Blog Highlights</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase leading-[0.98] lg:leading-none">
              From the Travelog
            </h2>
            <p className="font-body text-subtitle text-primary">
              Dive into our latest coding expeditions and discoveries
            </p>
          </div>

          {/* Grid display of latest 3 posts */}
          <BlogGrid posts={blogPosts.slice(0, 3)} />

          <div className="text-center mt-16">
            <Button
              variant="blue"
              to="/blog"
              ariaLabel="View All Posts"
            >
              View All Posts
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== Genre Spotlight ===== */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-b-ref border-primary"
        style={{ minHeight: 'clamp(500px, 80vh, 789.6px)' }}
        aria-label="Genre spotlight"
      >
        {/* Left Column - Graphic/Illustration */}
        <div className="relative min-h-[400px] md:min-h-0 bg-[#C1E5E7] flex items-center justify-center overflow-hidden border-r-ref border-primary">
          <img
            src="https://static.wixstatic.com/media/c837a6_0870ba3496964f5d9955b0a02e4b9ffd~mv2.jpg/v1/fill/w_768,h_790,al_c,q_85,enc_auto/c837a6_0870ba3496964f5d9955b0a02e4b9ffd~mv2.jpg"
            alt="3D book stack illustration"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Column - Yellow Background */}
        <div className="bg-gold p-6 md:p-col-pad flex flex-col justify-center min-h-[400px] md:min-h-0">
          <div className="max-w-[550px] mx-auto md:mr-auto md:ml-0 flex flex-col gap-6 items-start">
            <SectionLabel>Genre Spotlight</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase leading-[0.98] lg:leading-none">
              Realms of Wonder
            </h2>
            <p className="font-body text-subtitle text-primary">
              Chart your next escape
            </p>
            <p className="font-body text-body-lg text-primary/80 leading-relaxed">
              From the clean syntax of Python to the logic of neural networks, we treat every subject as a new territory to be charted. Discover guides that build mental models that stay with you long after the compiler exits.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Newsletter Section ===== */}
      <Newsletter />
    </>
  );
}
