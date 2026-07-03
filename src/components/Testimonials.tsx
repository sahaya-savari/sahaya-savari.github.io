import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import type { Testimonial as TestimonialType } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialType[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}
          className="card-brutal p-8"
        >
          {/* Quote icon */}
          <Quote className="w-8 h-8 text-yellow mb-4" aria-hidden="true" />

          {/* Content */}
          <p className="font-serif italic text-lg text-primary/80 leading-relaxed">
            "{testimonial.content}"
          </p>

          {/* Stars */}
          <div className="flex gap-1 mt-4" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? 'fill-yellow text-yellow'
                    : 'fill-none text-primary/20'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mt-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              loading="lazy"
              className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
            />
            <div>
              <p className="font-semibold text-sm text-primary">{testimonial.name}</p>
              <p className="text-xs text-primary/50">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
