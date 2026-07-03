import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, BookOpen, Users, List } from 'lucide-react';
import Container from '../components/Container';

const benefits = [
  {
    icon: BookOpen,
    title: 'Weekly Book Recommendations',
    description: 'Get curated picks delivered every week',
  },
  {
    icon: Users,
    title: 'Exclusive Author Interviews',
    description: 'Read conversations with your favorite authors',
  },
  {
    icon: List,
    title: 'Curated Reading Lists',
    description: 'Thematic lists for every mood and genre',
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
      <section className="bg-background py-16 md:py-24" aria-labelledby="newsletter-hero-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="section-label">Newsletter</span>
            <h1
              id="newsletter-hero-heading"
              className="display-text font-display text-5xl md:text-7xl text-primary mt-4"
            >
              JOIN THE EXPEDITION
            </h1>
            <p className="text-lg md:text-xl text-primary/60 mt-4 font-body max-w-lg mx-auto">
              Get new book journeys and curated reading lists delivered straight to your inbox.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Form Card */}
      <section className="bg-background py-12" aria-labelledby="newsletter-form-heading">
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
            <div className="card-brutal p-8 md:p-12">
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
                    <div>
                      <label htmlFor="newsletter-email" className="block text-sm font-semibold text-primary mb-2">
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
                        className="input-brutal rounded-full text-lg py-4"
                      />
                      {emailError && (
                        <p id="newsletter-email-error" className="text-red-600 text-sm mt-1" role="alert">
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
                          className="mt-1 w-5 h-5 accent-primary border-2 border-primary rounded"
                          aria-invalid={!!checkboxError}
                          aria-describedby={checkboxError ? 'newsletter-checkbox-error' : undefined}
                        />
                        <span className="text-sm text-primary/70 font-body">
                          Yes, subscribe me to your newsletter.
                        </span>
                      </label>
                      {checkboxError && (
                        <p id="newsletter-checkbox-error" className="text-red-600 text-sm mt-1" role="alert">
                          {checkboxError}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn-yellow w-full py-4">
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
      <section className="bg-cream py-12" aria-labelledby="benefits-heading">
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
                className="card-brutal p-8 text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow border-2 border-primary mx-auto">
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
