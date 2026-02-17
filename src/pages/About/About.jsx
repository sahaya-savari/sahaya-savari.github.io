import { blogPosts } from '../../data/blogPosts';
import styles from './About.module.css';

const About = () => {
  // Compute stats
  const totalPosts = blogPosts.length;
  const totalTopics = new Set(blogPosts.map(p => p.category)).size;
  const allTags = new Set();
  blogPosts.forEach(p => (p.tags || []).forEach(t => allTags.add(t)));

  // Dynamic learning days (from Jan 1, 2026)
  const startDate = new Date('2026-01-01');
  const daysLearning = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.about}>
      <div className={styles.container}>

        {/* Profile Section */}
        <section className={`glass-card ${styles.profileSection}`}>
          <div className={styles.profileContent}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>SS</span>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>Sahaya Savari F</h1>
              <p className={styles.title}>MSc Artificial Intelligence Student</p>
              <p className={styles.bio}>
                Passionate learner exploring AI, Machine Learning, and Data Science.
                Building projects, sharing knowledge, and growing through experimentation.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <a
              href="https://github.com/sahaya-savari?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              View Projects
            </a>
            <a
              href="https://sahayasavari.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Resume
            </a>
          </div>
        </section>

        {/* Achievements Section */}
        <section className={`glass-card ${styles.achievementsSection}`}>
          <h2 className={styles.sectionTitle}>🏆 Learning Stats</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{totalPosts}</span>
              <span className={styles.statLabel}>Blog Posts</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{totalTopics}</span>
              <span className={styles.statLabel}>Topics Covered</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{allTags.size}</span>
              <span className={styles.statLabel}>Tags Used</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{daysLearning}+</span>
              <span className={styles.statLabel}>Days Learning</span>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className={`glass-card ${styles.contentSection}`}>
          <h2 className={styles.sectionTitle}>About This Space</h2>
          <div className={styles.content}>
            <p>
              This blog is my personal learning journal where I document my journey through
              artificial intelligence, machine learning, data science, and software development.
              Each post represents a step in my continuous learning process.
            </p>
            <p>
              I believe in learning by building and sharing knowledge with others. Through this
              platform, I explore complex concepts, experiment with new technologies, and reflect
              on what I learn along the way.
            </p>
            <p>
              Whether you're here to learn something new or to see what I'm working on, I hope
              you find something valuable. Feel free to reach out if you'd like to connect!
            </p>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className={`glass-card ${styles.contactSection}`}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>

          <div className={styles.contactGrid}>
            {/* Email Card */}
            <a
              href="mailto:sahayasavari@gmail.com"
              className={styles.contactCard}
              aria-label="Email"
            >
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h3>Email</h3>
                <p>sahayasavari@gmail.com</p>
              </div>
            </a>

            {/* Location Card */}
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h3>Location</h3>
                <p>Trichy, India</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Connect</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/sahaya-savari"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sahayasavari"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://sahayasavari.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Portfolio"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>Portfolio</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
