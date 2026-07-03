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
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
    <form onSubmit={handleSubmit} className="space-y-6 w-full" noValidate>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-gold border-ref border-primary"
            role="status"
          >
            <CheckCircle2 className="w-6 h-6 text-primary" aria-hidden="true" />
            <p className="font-semibold text-primary text-sm">
              Message sent! We'll get back to you soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-name" className="font-body text-sm font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className="input-ref"
          style={{ height: '41.6px' }}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs font-semibold text-primary pl-4 mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className="font-body text-sm font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="input-ref"
          style={{ height: '41.6px' }}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs font-semibold text-primary pl-4 mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-subject" className="font-body text-sm font-medium text-primary">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={handleChange('subject')}
          placeholder="What is this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className="input-ref"
          style={{ height: '41.6px' }}
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-xs font-semibold text-primary pl-4 mt-1" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="font-body text-sm font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={handleChange('message')}
          placeholder="Tell me more..."
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="input-ref resize-none py-3"
          style={{ height: '120px', borderRadius: '16px' }}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs font-semibold text-primary pl-4 mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#C1E5E7] text-primary font-body font-medium hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer mt-4"
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
  );
}
