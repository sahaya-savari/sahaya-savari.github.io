import { motion } from 'framer-motion';
import { Mail, Github, Globe, Linkedin, ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import ContactForm from '../components/ContactForm';
import SectionLabel from '../components/SectionLabel';
import GridBackground from '../components/GridBackground';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/sahaya-savari' },
  { icon: Globe, label: 'Portfolio', href: 'https://sahayasavari.me' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Contact() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section
        className="bg-background flex flex-col items-center justify-center text-center overflow-hidden w-full border-b-ref border-primary"
        style={{ minHeight: 'clamp(300px, 40vh, 360px)', paddingTop: 'clamp(130px, 15vw, 160px)', paddingBottom: 'clamp(30px, 5vw, 60px)' }}
        aria-labelledby="contact-hero-heading"
      >
        <Container className="flex flex-col items-center gap-6">
          <SectionLabel>Contact</SectionLabel>
          <motion.h1
            id="contact-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-section-h2 text-primary uppercase text-center leading-[0.98] lg:leading-none"
          >
            Send a Dispatch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-subtitle text-primary text-center max-w-[700px]"
          >
            For collaborations, questions, or to share your own learning journey.
          </motion.p>
        </Container>
      </section>

      {/* ===== Contact Info + Form Split Layout ===== */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border-b-ref border-primary relative"
        style={{ minHeight: 'clamp(500px, 80vh, 790.5px)' }}
        aria-labelledby="contact-info-heading"
      >
        {/* Left Column - White Background + Grid Paper */}
        <GridBackground className="p-6 md:p-col-pad flex flex-col justify-center border-r-ref border-primary">
          <div className="max-w-[550px] mx-auto md:ml-auto md:mr-0 flex flex-col gap-8 items-start">
            <SectionLabel>Let's Connect</SectionLabel>
            
            <h2
              id="contact-info-heading"
              className="font-display text-section-h2 text-primary uppercase leading-[0.98] lg:leading-none"
            >
              Have a learning query or collaboration idea?
            </h2>
            
            <p className="font-body text-body-lg text-primary/80 leading-relaxed">
              I'm always eager to connect with fellow learners, developers, and educators. Reach out for projects or technical writing opportunities.
            </p>

            {/* Email Contact Detail Card */}
            <div className="card-brutal bg-white p-6 w-full flex items-center gap-4 border-ref border-primary" style={{ boxShadow: '8px 8px 0px 0px #652929' }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold border-ref border-primary shrink-0">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-sm font-semibold text-primary/60 uppercase">Email</span>
                <a href="mailto:contact@sahayasavari.me" className="font-body text-body-lg font-bold text-primary hover:underline">
                  contact@sahayasavari.me
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Sahaya Savari on ${social.label}`}
                  className="flex items-center justify-center w-12 h-12 rounded-full border-ref border-primary bg-white hover:bg-gold transition-all"
                  style={{ boxShadow: '4px 4px 0px 0px #652929' }}
                >
                  <social.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </GridBackground>

        {/* Right Column - Gold Background with Form */}
        <div className="bg-gold p-6 md:p-col-pad flex flex-col justify-center min-h-[500px] md:min-h-0">
          <div className="max-w-[550px] mx-auto md:mr-auto md:ml-0 w-full flex flex-col gap-6">
            <SectionLabel>Send Message</SectionLabel>
            <div className="card-brutal bg-white p-6 md:p-8 w-full border-ref border-primary" style={{ boxShadow: '8px 8px 0px 0px #652929' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
