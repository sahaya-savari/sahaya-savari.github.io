import { motion } from 'framer-motion';
import type { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-8 md:pl-0" aria-label="Timeline of events">
      {/* Connecting line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-1/2"
        aria-hidden="true"
      />

      <div className="space-y-0">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={`${event.year}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`relative mb-12 ${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'}`}
            >
              {/* Year badge */}
              <div
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-3 z-10"
              >
                <span className="inline-block bg-yellow border-2 border-primary rounded-full px-4 py-1.5 font-display text-lg shadow-brutal-sm">
                  {event.year}
                </span>
              </div>

              {/* Content card */}
              <div className="card-brutal p-6 mt-8">
                <h3 className="font-display text-xl text-primary">{event.title}</h3>
                <p className="text-sm text-primary/70 mt-2 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
