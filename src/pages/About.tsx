import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import SectionLabel from '../components/SectionLabel';
import GridBackground from '../components/GridBackground';
import { timelineEvents, skills, achievements, testimonials } from '../lib/data';

export default function About() {
  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section
        className="relative bg-background flex flex-col items-center justify-center text-center overflow-hidden w-full"
        style={{ minHeight: '480px', paddingTop: '120px', paddingBottom: '80px' }}
        aria-label="About hero"
      >
        <Container className="relative z-10 flex flex-col items-center gap-6">
          <SectionLabel>About</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-primary leading-none text-center"
            style={{ fontSize: '76.05px', letterSpacing: '-1.521px', maxWidth: '900px' }}
          >
            CHART THE UNSEEN WORLDS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="font-body text-primary font-medium text-center"
            style={{ fontSize: '33.2719px', lineHeight: '36.5991px', letterSpacing: '-0.665438px', maxWidth: '700px' }}
          >
            A notebook mapping algorithms, data structures, and learning paths.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="mt-6"
          >
            <Button variant="primary" to="/blog" ariaLabel="Start Exploring">
              Start Exploring
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ===== Philosophy Section ===== */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-t-ref border-b-ref border-primary relative"
        style={{ minHeight: '790.5px' }}
        aria-label="Philosophy"
      >
        {/* Left Column - Yellow Background */}
        <div className="bg-gold p-8 md:p-col-pad flex flex-col justify-center min-h-[400px] md:min-h-0">
          <div className="max-w-[550px] mx-auto md:ml-auto md:mr-0 flex flex-col gap-6 items-start">
            <SectionLabel>My Philosophy</SectionLabel>
            <h2
              className="font-display text-primary uppercase leading-none"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              Every Line a New Horizon
            </h2>
            <p
              className="font-body text-primary font-medium"
              style={{ fontSize: '33.2719px', lineHeight: '36.5991px', letterSpacing: '-0.665438px' }}
            >
              For me, coding has always been the purest form of exploration and building.
            </p>
            <p className="font-body text-body-lg text-primary/80 leading-relaxed">
              Every programming concept is a map of a different system, a tool to mold data and logic. This blog records those journeys, explaining the patterns of code, algorithms, database logic, and technical writing.
            </p>
          </div>
        </div>

        {/* Right Column - White Background + Grid Paper */}
        <GridBackground className="p-8 md:p-col-pad flex items-center justify-center min-h-[500px] md:min-h-0">
          {/* Photo Frame Wrapper */}
          <div
            className="card-brutal bg-white p-4 select-none relative flex items-center justify-center"
            style={{
              width: '509.56px',
              height: '607.91px',
              border: '0.8px solid #7C4844',
              boxShadow: '8px 8px 0px 0px #652929',
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/104449853?v=4"
              alt="Sahaya Savari portrait"
              loading="lazy"
              className="object-cover border-ref border-border-muted"
              style={{
                width: '470.67px',
                height: '490.7px',
              }}
            />
          </div>
        </GridBackground>
      </section>

      {/* ===== Behind the Pages ===== */}
      <section className="py-20 md:py-28 bg-cream-bg border-b-ref border-primary" aria-label="Behind the pages">
        <Container>
          <div className="text-center mb-16">
            <h2
              className="font-display text-primary uppercase"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              Behind the Pages
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="card-brutal p-8 bg-white"
              style={{ boxShadow: '8px 8px 0px 0px #652929' }}
            >
              <h3 className="font-display text-2xl text-primary mb-4">The Development Path</h3>
              <p className="font-body text-body-md text-primary/70 leading-relaxed">
                Our journey began inside code editors and documentation pages. I believe that every library and utility is a portal — a roadmap pointing towards new logical architectures. My passion for AI and engineering was sparked by the quiet challenge of complex debugging sessions and logic design, leading me to explore modern web stacks and technical writing.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="card-brutal p-8 bg-white"
              style={{ boxShadow: '8px 8px 0px 0px #652929' }}
            >
              <h3 className="font-display text-2xl text-primary mb-4">Beyond the Horizon</h3>
              <p className="font-body text-body-md text-primary/70 leading-relaxed">
                Our core philosophy is that reading and coding are pure forms of active learning. It is a dialogue with structural patterns and a map for technical execution. This site was founded to share that clarity, connecting with fellow developers and students who build and learn. Together, we track the intersection of logic and execution.
              </p>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <Button variant="primary" to="/blog" ariaLabel="Join our Voyage">
              Explore Tutorials
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== Mission, Vision, Values ===== */}
      <section className="py-20 md:py-28 bg-white border-b-ref border-primary" aria-label="Mission, vision, and values">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Core Principles</SectionLabel>
            <h2
              className="font-display text-primary uppercase"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              What Drives Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Mission',
                description: 'To simplify complex coding concepts and make them accessible.',
              },
              {
                icon: <Eye className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Vision',
                description: 'A space where software tutorials act as maps to advanced systems.',
              },
              {
                icon: <Heart className="w-8 h-8 text-primary" aria-hidden="true" />,
                heading: 'Values',
                description: 'Curiosity, precise engineering, and sharing open knowledge.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                className="card-brutal p-8 text-center bg-white"
                style={{
                  border: '0.8px solid #7C4844',
                  boxShadow: '8px 8px 0px 0px #652929',
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gold border-ref border-primary flex items-center justify-center mx-auto shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl text-primary mt-6">{item.heading}</h3>
                <p className="font-body text-body-md text-primary/70 mt-3">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Journey Timeline ===== */}
      <section className="py-20 md:py-28 bg-cream-bg border-b-ref border-primary" aria-label="Journey timeline">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>The Journey</SectionLabel>
            <h2
              className="font-display text-primary uppercase"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              From Then to Now
            </h2>
          </div>
          <Timeline events={timelineEvents} />
        </Container>
      </section>

      {/* ===== Skills ===== */}
      <section className="py-20 md:py-28 bg-white border-b-ref border-primary" aria-label="Skills and expertise">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Toolkit</SectionLabel>
            <h2
              className="font-display text-primary uppercase"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              Skills &amp; Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-body-lg font-medium text-primary">{skill.name}</span>
                  <span className="font-display text-body-lg text-primary/60">{skill.level}%</span>
                </div>
                <div className="h-4 bg-cream rounded-full border-ref border-primary/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Achievements ===== */}
      <section className="py-20 bg-gold border-b-ref border-primary" aria-label="Achievements">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="text-center flex flex-col items-center"
              >
                <p className="font-display text-primary leading-none" style={{ fontSize: '76.05px' }}>{achievement.value}</p>
                <h3 className="font-body text-body-lg font-bold text-primary mt-3">{achievement.title}</h3>
                <p className="font-body text-body-md text-primary/70 mt-1">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-20 md:py-28 bg-white border-b-ref border-primary" aria-label="Reader testimonials">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Reader Voices</SectionLabel>
            <h2
              className="font-display text-primary uppercase"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
            >
              What Readers Say
            </h2>
          </div>
          <Testimonials testimonials={testimonials} />
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-white" aria-label="Call to action">
        <Container>
          <div
            className="bg-primary text-white rounded-navbar mx-auto max-w-4xl p-12 md:p-16 text-center border-ref border-primary shadow-brutal flex flex-col items-center gap-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-white uppercase text-center leading-none"
              style={{ fontSize: '76.05px', lineHeight: '72.2475px' }}
            >
              Ready to Begin Your Journey?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <Button variant="gold" to="/blog" ariaLabel="Start Reading">
                Start Reading
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
