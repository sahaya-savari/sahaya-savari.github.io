import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Code, GitBranch, List } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';

const benefits = [
  {
    icon: Code,
    title: 'Weekly Coding Tutorials',
    description: 'Get deep-dives on Python, React, and DB systems',
  },
  {
    icon: GitBranch,
    title: 'Git & GitHub Workflows',
    description: 'Master version control and team collaborations',
  },
  {
    icon: List,
    title: 'Curated Tech Resources',
    description: 'Helpful libraries, roadmaps, and cheat sheets',
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!agreed) {
      setCheckboxError('You must agree to subscribe');
      valid = false;
    } else {
      setCheckboxError('');
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setEmail('');
    setAgreed(false);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="bg-background flex flex-col items-center justify-center text-center overflow-hidden w-full border-b-ref border-primary"
        style={{ minHeight: 'clamp(300px, 40vh, 360px)', paddingTop: 'clamp(90px, 12vw, 120px)', paddingBottom: 'clamp(30px, 5vw, 60px)' }}
        aria-labelledby="newsletter-hero-heading"
      >
        <Container className="flex flex-col items-center gap-6">
          <SectionLabel>Newsletter</SectionLabel>
          <motion.h1
            id="newsletter-hero-heading"
            className="font-display text-section-h2 text-primary uppercase text-center"
          >
            JOIN THE EXPEDITION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-subtitle text-primary text-center max-w-[700px]"
          >
            Get new coding tutorials and curated reading lists delivered straight to your inbox.
          </motion.p>
        </Container>
      </section>

      {/* Form Card */}
      <section className="bg-background py-8 md:py-12" aria-labelledby="newsletter-form-heading">
        <Container>
          <h2 id="newsletter-form-heading" className="sr-only">
            Newsletter Sign Up Form
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card-brutal p-6 md:p-12 bg-white" style={{ border: '0.8px solid #7C4844', boxShadow: '8px 8px 0px 0px #652929' }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center py-8"
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                      className="flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-16 h-16 text-primary" aria-hidden="true" />
                    </motion.div>
                    <h3 className="font-display text-3xl text-primary mb-3">Welcome aboard!</h3>
                    <p className="text-sm text-primary/60 font-body">
                      Check your inbox for a confirmation email.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="newsletter-email" className="block text-sm font-semibold text-primary">
                        Email Address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="you@example.com"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? 'newsletter-email-error' : undefined}
                        className="input-ref"
                        style={{ height: '41.6px' }}
                      />
                      {emailError && (
                        <p id="newsletter-email-error" className="text-primary font-semibold text-sm pl-4" role="alert">
                          {emailError}
                        </p>
                      )}
                    </div>

                    {/* Checkbox */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => {
                            setAgreed(e.target.checked);
                            if (checkboxError) setCheckboxError('');
                          }}
                          className="mt-1 w-[15.6px] h-[15.6px] accent-primary border-ref border-primary rounded"
                          aria-invalid={!!checkboxError}
                          aria-describedby={checkboxError ? 'newsletter-checkbox-error' : undefined}
                        />
                        <span className="text-sm text-primary/70 font-body select-none">
                          Yes, subscribe me to your newsletter.
                        </span>
                      </label>
                      {checkboxError && (
                        <p id="newsletter-checkbox-error" className="text-primary font-semibold text-sm pl-8 mt-1" role="alert">
                          {checkboxError}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-body font-medium hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer mt-4"
                      style={{
                        height: '42.8px',
                        borderRadius: '100px',
                        fontSize: '16px',
                        border: '0.8px solid #652929',
                      }}
                    >
                      Subscribe Now
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-cream py-8 md:py-12" aria-labelledby="benefits-heading">
        <Container>
          <h2 id="benefits-heading" className="sr-only">
            Newsletter Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-brutal p-8 text-center bg-white"
                style={{ border: '0.8px solid #7C4844', boxShadow: '8px 8px 0px 0px #652929' }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold border-ref border-primary mx-auto">
                  <benefit.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-primary mt-4">{benefit.title}</h3>
                <p className="text-sm text-primary/60 mt-2 font-body">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
