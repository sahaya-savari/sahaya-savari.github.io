import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
} from 'lucide-react';
import Container from '../components/Container';
import ContactForm from '../components/ContactForm';

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Youtube, label: 'Youtube', href: 'https://youtube.com' },
];

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '123-456-7890', href: 'tel:123-456-7890' },
  { icon: Mail, label: 'Email', value: 'info@nomadtome.com', href: 'mailto:info@nomadtome.com' },
  { icon: MapPin, label: 'Location', value: '123 Literary Lane, Bookville', href: undefined },
];

const faqItems = [
  {
    question: 'How often do you publish new content?',
    answer: 'I publish new blog posts every week, usually on Tuesdays and Fridays.',
  },
  {
    question: 'Can I suggest a book for you to review?',
    answer: 'Absolutely! Use the contact form above or send me an email. I love hearing from readers.',
  },
  {
    question: 'Do you accept guest posts?',
    answer: 'Yes, I occasionally accept guest posts from fellow literary enthusiasts. Reach out with your pitch.',
  },
  {
    question: 'How can I subscribe to the newsletter?',
    answer: 'You can subscribe using the newsletter form on the home page or visit the newsletter page directly.',
  },
  {
    question: 'Are your reviews sponsored?',
    answer: 'No. All reviews are my honest opinions. I do not accept payment for reviews.',
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="bg-background py-16 md:py-24" aria-labelledby="contact-hero-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="section-label">CONTACT</span>
            <h1
              id="contact-hero-heading"
              className="display-text font-display text-5xl md:text-7xl text-primary mt-4"
            >
              Send a Dispatch
            </h1>
            <p className="text-lg md:text-xl text-primary/60 mt-4 font-body max-w-2xl mx-auto">
              For collaborations, questions, or to share your own reading journey
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block mt-8"
            >
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop"
                alt="Stack of books on a wooden surface"
                className="rounded-3xl border-2 border-primary shadow-brutal mx-auto max-w-md w-full"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-cream py-12 md:py-20" aria-labelledby="contact-info-heading">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">LET'S CONNECT</span>
              <h2
                id="contact-info-heading"
                className="font-display text-3xl text-primary mt-4"
              >
                Have a book recommendation that will change my world?
              </h2>
              <p className="text-primary/70 mt-2 font-body">
                I'm always eager to hear from fellow explorers.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">
                {contactDetails.map((detail) => {
                  const content = (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary shrink-0">
                        <detail.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="font-body text-lg text-primary">{detail.value}</span>
                    </div>
                  );
                  return detail.href ? (
                    <a
                      key={detail.label}
                      href={detail.href}
                      className="block hover:opacity-70 transition-opacity"
                      aria-label={`${detail.label}: ${detail.value}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={detail.label} aria-label={`${detail.label}: ${detail.value}`}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Nomad Tome on ${social.label}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary bg-white hover:bg-yellow transition-all"
                  >
                    <social.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-brutal p-8">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Google Map */}
      <section className="bg-background py-12" aria-labelledby="map-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="map-heading" className="font-display text-3xl text-primary mb-6">
              Find Me Here
            </h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123456789!2d-73.988!3d40.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzUzJzEuMCJX!5e0!3m2!1sen!2sus!4v123456789"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map showing Nomad Tome location"
              className="w-full h-80 rounded-3xl border-2 border-primary shadow-brutal"
            />
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-12 md:py-20" aria-labelledby="faq-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 id="faq-heading" className="font-display text-4xl text-primary">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="card-brutal overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-semibold text-primary font-body">{item.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5 text-primary" aria-hidden="true" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="p-6 pt-0 text-sm text-primary/70 font-body">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
