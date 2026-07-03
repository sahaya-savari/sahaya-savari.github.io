import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle } from 'lucide-react';

interface FormErrors {
  email?: string;
  checkbox?: string;
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!agreed) {
      newErrors.checkbox = 'Please check the box to subscribe';
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
    if (errors.checkbox) setErrors((prev) => ({ ...prev, checkbox: undefined }));
  };

  return (
    <section className="container-custom py-20 md:py-28" aria-label="Newsletter signup">
      <div className="relative overflow-hidden bg-yellow/20 border-2 border-primary rounded-3xl p-8 md:p-12 shadow-brutal">
        {/* Decorative BookOpen icon */}
        <BookOpen
          className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/5 pointer-events-none"
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-center justify-center text-center py-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <CheckCircle className="h-16 w-16 text-primary" strokeWidth={2.5} />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl text-primary mb-2">
                Welcome aboard!
              </h3>
              <p className="font-body text-base text-primary/70 max-w-md">
                Welcome aboard! Check your inbox.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="section-label mb-4">Newsletter</span>
              <h2 className="font-display text-4xl md:text-5xl text-primary mb-4 display-text">
                JOIN THE EXPEDITION
              </h2>
              <p className="font-body text-base text-primary/70 max-w-lg mb-8">
                Get new book journeys and curated reading lists delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-4"
                noValidate
              >
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your@email.com"
                    className="input-brutal rounded-full"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="font-body text-sm text-primary font-semibold pl-4">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-5 w-5 shrink-0 border-2 border-primary rounded accent-primary"
                      aria-invalid={!!errors.checkbox}
                      aria-describedby={errors.checkbox ? 'checkbox-error' : undefined}
                    />
                    <span className="font-body text-sm text-primary/70">
                      Yes, subscribe me to your newsletter.
                    </span>
                  </label>
                  {errors.checkbox && (
                    <p id="checkbox-error" className="font-body text-sm text-primary font-semibold pl-8">
                      {errors.checkbox}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  Submit
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
