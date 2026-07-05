import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Comment } from '../types';
import { comments as initialComments } from '../lib/data';
import { formatDate } from '../utils/helpers';

interface CommentSectionProps {
  postId: string;
}

interface FormData {
  name: string;
  email: string;
  content: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  content?: string;
}

export default function CommentSection({ postId: _postId }: CommentSectionProps) {
  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', content: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.content.trim()) newErrors.content = 'Comment is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newComment: Comment = {
      id: `new-${Date.now()}`,
      name: formData.name.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name.trim())}`,
      date: new Date().toISOString().split('T')[0],
      content: formData.content.trim(),
    };

    setCommentList((prev) => [newComment, ...prev]);
    setFormData({ name: '', email: '', content: '' });
    setErrors({});
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="mt-12" aria-label="Comments section">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl text-primary">Comments</h2>
        <span className="bg-yellow rounded-full px-3 py-0.5 text-xs font-bold text-primary border-2 border-primary">
          {commentList.length}
        </span>
      </div>

      {/* Comment list */}
      <div className="space-y-6 mb-8">
        <AnimatePresence initial={false}>
          {commentList.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4"
            >
              <img
                src={comment.avatar}
                alt={comment.name}
                loading="lazy"
                className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-primary">{comment.name}</span>
                  <span className="text-xs text-primary/50">{formatDate(comment.date)}</span>
                </div>
                <p className="text-sm text-primary/70 mt-2 leading-relaxed">{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="card-brutal p-6 mt-8 space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-semibold text-primary mb-1">
              Name
            </label>
            <input
              id="comment-name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'comment-name-error' : undefined}
              className="input-ref"
            />
            {errors.name && (
              <p id="comment-name-error" className="text-xs text-red-600 mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="comment-email" className="block text-sm font-semibold text-primary mb-1">
              Email
            </label>
            <input
              id="comment-email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'comment-email-error' : undefined}
              className="input-ref"
            />
            {errors.email && (
              <p id="comment-email-error" className="text-xs text-red-600 mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="comment-content" className="block text-sm font-semibold text-primary mb-1">
            Comment
          </label>
          <textarea
            id="comment-content"
            value={formData.content}
            onChange={handleChange('content')}
            placeholder="Share your thoughts..."
            rows={4}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? 'comment-content-error' : undefined}
            className="input-ref resize-y"
          />
          {errors.content && (
            <p id="comment-content-error" className="text-xs text-red-600 mt-1" role="alert">
              {errors.content}
            </p>
          )}
        </div>
        <button type="submit" className="btn-primary">
          Post Comment
        </button>
      </form>
    </section>
  );
}
