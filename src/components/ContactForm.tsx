import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-brutal p-6 md:p-8 space-y-5" noValidate>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-yellow border-2 border-primary"
            role="status"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="w-6 h-6 text-primary" aria-hidden="true" />
            </motion.div>
            <p className="font-semibold text-primary text-sm">
              Message sent! We'll get back to you soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-primary mb-1">
          Name <span className="text-primary">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className="input-brutal"
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs text-red-600 mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-primary mb-1">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="input-brutal"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-red-600 mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-primary mb-1">
          Subject <span className="text-primary">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={handleChange('subject')}
          placeholder="What is this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className="input-brutal"
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-xs text-red-600 mt-1" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-primary mb-1">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={handleChange('message')}
          placeholder="Tell me more..."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="input-brutal resize-y"
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-red-600 mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full md:w-auto">
        Send Message
      </button>
    </form>
  );
}
