import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import { timelineEvents, skills, achievements, testimonials } from '../lib/data';

export default function About() {
  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section
        className="relative py-20 md:py-32 bg-background flex items-center justify-center text-center overflow-hidden"
        aria-label="About hero"
      >
        {/* Decorative book images */}
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a7d85c5b?w=300&h=400&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-52 object-cover border-2 border-primary rounded-2xl shadow-brutal hidden md:block"
        />
        <img
          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-52 object-cover border-2 border-primary rounded-2xl shadow-brutal hidden md:block"
        />

        <Container className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="section-label block mb-4"
          >
            About
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-5xl md:text-7xl text-primary leading-[0.9] mb-6"
          >
            CHART THE UNSEEN WORLDS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-lg md:text-xl text-primary/60 max-w-2xl mx-auto mb-10"
          >
            Your compass to literary adventures that transport and transform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          >
            <Button variant="primary" to="/blog" ariaLabel="Start Exploring">
              Start Exploring
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ===== Philosophy Section ===== */}
      <section className="py-20 md:py-28 bg-background" aria-label="Philosophy">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="section-label">My Philosophy</span>
              <h2 className="font-display text-4xl md:text-5xl text-primary mt-4 mb-6">
                Every Book a New Horizon
              </h2>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed">
                For me, reading has always been the purest form of exploration. It's a
                dialogue with the past, a glimpse into the future, and a deep dive into
                the human condition. This blog is my map of those journeys.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop"
                alt="Taylor Vance portrait"
                loading="lazy"
                className="rounded-3xl border-2 border-primary shadow-brutal w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Behind the Pages ===== */}
      <section className="py-20 md:py-28 bg-cream" aria-label="Behind the pages">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-primary">
              Behind the Pages
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="card-brutal p-8"
            >
              <h3 className="font-display text-2xl text-primary mb-4">The Library Chart</h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                I'm Taylor Vance, and our journey began in the hushed aisles of a small-town
                library. We believe that every book is a portal—a compass pointing toward
                unseen worlds. My lifelong passion for tales of adventure was sparked not by
                travel, but by the quiet power of a story well told, which eventually called
                us to cross every continent in search of the extraordinary.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="card-brutal p-8"
            >
              <h3 className="font-display text-2xl text-primary mb-4">Beyond the Horizon</h3>
              <p className="text-sm text-primary/70 leading-relaxed">
                Our philosophy is that reading is the purest form of exploration. It's a
                dialogue with the past and a map for the human spirit. Nomad Tome was founded
                to share that sense of wonder, connecting us with fellow explorers who hear
                the call of distant lands and deep narratives. Together, we trace the
                intersections of place and prose.
              </p>
            </motion.div>
          </div>
          <div className="text-center">
            <Button variant="primary" to="/blog" ariaLabel="Join our Voyage">
              Join our Voyage
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== Mission, Vision, Values ===== */}
      <section className="py-20 md:py-28 bg-background" aria-label="Mission, vision, and values">
        <Container>
          <div className="text-center mb-12">
            <span className="section-label">Core Principles</span>
            <h2 className="font-display text-4xl text-primary mt-2">
              What Drives Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Mission',
                description: 'To make every reader feel like an explorer.',
              },
              {
                icon: <Eye className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Vision',
                description: 'A world where books are maps to infinite worlds.',
              },
              {
                icon: <Heart className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Values',
                description: 'Curiosity, empathy, and the courage to read widely.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                className="card-brutal p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-yellow border-2 border-primary flex items-center justify-center mx-auto shadow-brutal-sm">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl text-primary mt-4">{item.heading}</h3>
                <p className="text-sm text-primary/70 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Journey Timeline ===== */}
      <section className="py-20 md:py-28 bg-cream" aria-label="Journey timeline">
        <Container>
          <div className="text-center mb-12">
            <span className="section-label">The Journey</span>
            <h2 className="font-display text-4xl text-primary mt-2">
              From Then to Now
            </h2>
          </div>
          <Timeline events={timelineEvents} />
        </Container>
      </section>

      {/* ===== Skills ===== */}
      <section className="py-20 md:py-28 bg-background" aria-label="Skills and expertise">
        <Container>
          <div className="text-center mb-12">
            <span className="section-label">Toolkit</span>
            <h2 className="font-display text-4xl text-primary mt-2">
              Skills &amp; Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-primary">{skill.name}</span>
                  <span className="font-display text-sm text-primary/60">{skill.level}%</span>
                </div>
                <div className="h-3 bg-cream rounded-full border border-primary/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Achievements ===== */}
      <section className="py-20 md:py-28 bg-yellow/20" aria-label="Achievements">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="text-center"
              >
                <p className="font-display text-5xl text-primary">{achievement.value}</p>
                <h3 className="text-sm font-semibold text-primary mt-2">{achievement.title}</h3>
                <p className="text-xs text-primary/60 mt-1">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-20 md:py-28 bg-background" aria-label="Reader testimonials">
        <Container>
          <div className="text-center mb-12">
            <span className="section-label">Reader Voices</span>
            <h2 className="font-display text-4xl text-primary mt-2">
              What Readers Say
            </h2>
          </div>
          <Testimonials testimonials={testimonials} />
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-background" aria-label="Call to action">
        <Container>
          <div className="bg-primary text-white rounded-3xl mx-auto max-w-4xl p-12 md:p-16 text-center border-2 border-primary shadow-brutal">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-3xl md:text-5xl text-white"
            >
              Ready to Begin Your Journey?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="mt-8"
            >
              <Button variant="yellow" to="/blog" ariaLabel="Start Reading">
                Start Reading
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
