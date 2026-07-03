import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionLabel from './SectionLabel';

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
    <section
      className="relative bg-background border-t-ref border-b-ref border-primary flex items-center justify-center overflow-hidden grid-paper w-full"
      style={{ minHeight: '759px' }}
      aria-label="Newsletter signup"
    >
      <div className="w-full max-w-content px-page-x py-16 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="mb-6"
              >
                <CheckCircle className="h-16 w-16 text-primary" strokeWidth={2.5} />
              </motion.div>
              <h3 className="font-display text-4xl text-primary mb-4">
                Welcome aboard!
              </h3>
              <p className="font-body text-body-lg text-primary/70 max-w-md">
                You are now subscribed to the newsletter. Check your inbox for updates.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <SectionLabel className="mb-6">Newsletter</SectionLabel>
              
              <h2
                className="font-display text-primary leading-none uppercase mb-6"
                style={{ fontSize: '76.05px', lineHeight: '72.2475px', letterSpacing: '-1.521px' }}
              >
                JOIN THE EXPEDITION
              </h2>
              
              <p
                className="font-body text-primary font-medium mb-12"
                style={{ fontSize: '33.2719px', lineHeight: '36.5991px', maxWidth: '730.5px' }}
              >
                Get new coding tutorials and curated reading lists delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[754px] flex flex-col gap-6 text-left"
                noValidate
              >
                {/* Email Label + Input */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="newsletter-email" className="font-body text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your@email.com"
                    className="input-ref w-full bg-white border-ref border-primary text-primary placeholder:text-primary/40 focus:outline-none"
                    style={{
                      height: '41.6px',
                      borderRadius: '24px',
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="font-body text-sm text-primary font-semibold pl-4">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex flex-col gap-1 w-full mt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={handleCheckboxChange}
                      className="h-[15.6px] w-[15.6px] border-ref border-primary rounded accent-primary bg-white cursor-pointer"
                      style={{
                        outline: 'none',
                      }}
                      aria-invalid={!!errors.checkbox}
                      aria-describedby={errors.checkbox ? 'checkbox-error' : undefined}
                    />
                    <span className="font-body text-body-sm text-primary select-none">
                      Yes, subscribe me to your newsletter.
                    </span>
                  </label>
                  {errors.checkbox && (
                    <p id="checkbox-error" className="font-body text-sm text-primary font-semibold pl-8 mt-1">
                      {errors.checkbox}
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
