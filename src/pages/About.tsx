import { motion } from 'framer-motion';
import {
  BookOpen,
  BrainCircuit,
  Code2,
  Database,
  Eye,
  Github,
  Heart,
  MonitorSmartphone,
  PenTool,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import SectionLabel from '../components/SectionLabel';
import GridBackground from '../components/GridBackground';
import { blogPosts, categories, timelineEvents, testimonials } from '../lib/data';

const profileImageSrc = 'https://github.com/sahaya-savari.png?size=512';

type SkillGroup = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

type StatCard = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: 'The syntax I reach for first when turning ideas into working code.',
    icon: Code2,
    items: ['Python', 'SQL', 'JavaScript'],
  },
  {
    title: 'Frontend',
    description: 'Interface tools for clean, readable, and responsive client-side work.',
    icon: MonitorSmartphone,
    items: ['React', 'Tailwind', 'Vite'],
  },
  {
    title: 'Backend',
    description: 'Data, APIs, and services that keep the blog stack moving.',
    icon: Database,
    items: ['Firebase', 'Node', 'REST APIs'],
  },
  {
    title: 'AI & Analysis',
    description: 'Core libraries for data exploration, learning, and model experiments.',
    icon: BrainCircuit,
    items: ['NumPy', 'Pandas', 'Scikit-Learn'],
  },
];

const stats: StatCard[] = [
  {
    title: 'Articles Published',
    value: `${blogPosts.length}`,
    description: 'Long-form posts currently in the library.',
    icon: PenTool,
  },
  {
    title: 'Content Categories',
    value: `${categories.length}`,
    description: 'Focused tracks across Python, React, and web development.',
    icon: BookOpen,
  },
  {
    title: 'GitHub Repos',
    value: '30+',
    description: 'Personal and academic code projects.',
    icon: Github,
  },
  {
    title: 'Years Learning',
    value: '3+',
    description: 'AI, data analytics, and web development practice.',
    icon: Sparkles,
  },
];

export default function About() {
  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section
        className="relative bg-background flex flex-col items-center justify-center text-center overflow-hidden w-full"
        style={{ minHeight: 'clamp(350px, 50vh, 480px)', paddingTop: 'clamp(130px, 15vw, 160px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}
        aria-label="About hero"
      >
        <Container className="relative z-10 flex flex-col items-center gap-6">
          <SectionLabel>About</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-section-h2 text-primary leading-[0.98] lg:leading-none text-center max-w-[900px]"
          >
            CHART THE UNSEEN WORLDS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="font-body text-subtitle text-primary text-center max-w-[700px]"
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
        style={{ minHeight: 'clamp(500px, 80vh, 790.5px)' }}
        aria-label="Philosophy"
      >
        {/* Left Column - Yellow Background */}
        <div className="bg-gold p-8 md:p-col-pad flex flex-col justify-center min-h-[400px] md:min-h-0">
          <div className="max-w-[550px] mx-auto md:ml-auto md:mr-0 flex flex-col gap-6 items-start">
            <SectionLabel>My Philosophy</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase leading-[0.98] lg:leading-none">
              Every Line a New Horizon
            </h2>
            <p className="font-body text-subtitle text-primary">
              For me, coding has always been the purest form of exploration and building.
            </p>
            <p className="font-body text-body-lg text-primary/80 leading-relaxed">
              Every programming concept is a map of a different system, a tool to mold data and logic. This blog records those journeys, explaining the patterns of code, algorithms, database logic, and technical writing.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Python', 'GitHub', 'Learning Notes'].map((item) => (
                <span key={item} className="badge-brutal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - White Background + Grid Paper */}
        <GridBackground className="p-8 md:p-col-pad flex items-center justify-center min-h-[500px] md:min-h-0">
          {/* Photo Frame Wrapper */}
          <div
            className="card-brutal bg-white p-4 select-none relative flex flex-col items-stretch gap-3 photo-frame"
            style={{
              border: '0.8px solid #7C4844',
              boxShadow: '8px 8px 0px 0px #652929',
            }}
          >
            <div className="flex items-center justify-between gap-3 px-2 pt-1">
              <span className="font-body text-[12px] uppercase tracking-[0.24em] text-primary/60">
                GitHub Profile
              </span>
              <Github className="w-5 h-5 text-primary/60" aria-hidden="true" />
            </div>
            <div className="flex-1 overflow-hidden border-ref border-border-muted bg-cream">
              <img
                src={profileImageSrc}
                alt="Sahaya Savari portrait"
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
                style={{ aspectRatio: '470.67 / 490.7' }}
              />
            </div>
          </div>
        </GridBackground>
      </section>

      {/* ===== Behind the Pages ===== */}
      <section className="py-12 md:py-28 bg-cream-bg border-b-ref border-primary" aria-label="Behind the pages">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-section-h2 text-primary uppercase">
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
      <section className="py-12 md:py-28 bg-white border-b-ref border-primary" aria-label="Mission, vision, and values">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Core Principles</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase">
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
                <h3 className="font-display text-2xl text-primary mt-6 leading-[1.05] lg:leading-none">{item.heading}</h3>
                <p className="font-body text-body-md text-primary/70 mt-3">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Journey Timeline ===== */}
      <section className="py-12 md:py-28 bg-cream-bg border-b-ref border-primary" aria-label="Journey timeline">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>The Journey</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase">
              From Then to Now
            </h2>
          </div>
          <Timeline events={timelineEvents} />
        </Container>
      </section>

      {/* ===== Skills ===== */}
      <section className="py-12 md:py-28 bg-white border-b-ref border-primary" aria-label="Skills and expertise">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Toolkit</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase">
              Skills &amp; Expertise
            </h2>
            <p className="font-body text-body-lg text-primary/70 max-w-2xl text-balance">
              A compact view of the languages, frameworks, and data tools I use most often.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {skillGroups.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                className="card-brutal p-6 bg-white h-full flex flex-col gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gold border-ref border-primary flex items-center justify-center shrink-0 shadow-sm">
                    <skill.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-primary leading-[1.02]">{skill.title}</h3>
                    <p className="font-body text-sm text-primary/70 mt-1 leading-relaxed">{skill.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item) => (
                    <span key={item} className="badge-brutal">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Achievements ===== */}
      <section className="py-12 md:py-20 bg-gold border-b-ref border-primary" aria-label="Achievements">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="card-brutal bg-white p-6 flex flex-col gap-4 h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-section-h2 text-primary leading-[0.98] lg:leading-none">{stat.value}</p>
                  <div className="w-12 h-12 rounded-full bg-gold border-ref border-primary flex items-center justify-center shrink-0 shadow-sm">
                    <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-body text-body-lg font-bold text-primary">{stat.title}</h3>
                  <p className="font-body text-body-md text-primary/70">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-12 md:py-28 bg-white border-b-ref border-primary" aria-label="Reader testimonials">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <SectionLabel>Reader Voices</SectionLabel>
            <h2 className="font-display text-section-h2 text-primary uppercase">
              What Readers Say
            </h2>
          </div>
          <Testimonials testimonials={testimonials} />
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 md:py-20 bg-white" aria-label="Call to action">
        <Container>
          <div
            className="bg-primary text-white rounded-navbar mx-auto max-w-4xl p-8 md:p-16 text-center border-ref border-primary shadow-brutal flex flex-col items-center gap-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-section-h2 text-white uppercase text-center leading-[0.98] lg:leading-none"
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
