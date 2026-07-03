import { motion } from 'framer-motion';
import Container from '../components/Container';

export default function AccessibilityStatement() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background py-12 md:py-16" aria-labelledby="a11y-hero-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              id="a11y-hero-heading"
              className="display-text font-display text-4xl md:text-6xl text-primary"
            >
              Accessibility Statement
            </h1>
            <p className="text-sm text-primary/50 mt-2 font-body">Last updated: January 2026</p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-background py-8" aria-labelledby="a11y-content-heading">
        <Container className="max-w-4xl">
          <h2 id="a11y-content-heading" className="sr-only">
            Accessibility Statement Content
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose-custom"
          >
            <h2>Our Commitment</h2>
            <p>
              At Nomad Tome, we believe that every reader deserves equal access to great literature and the
              stories that shape our world. We are committed to making our website accessible to all
              visitors, regardless of ability or assistive technology. Accessibility is not an afterthought
              — it is woven into the fabric of our design and development process from the very beginning.
            </p>

            <h2>Standards We Follow</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These
              guidelines explain how to make web content more accessible for people with disabilities and
              user-friendly for everyone. Our team regularly audits the site against these standards and
              works to remediate any issues identified during testing.
            </p>

            <h2>Features We Implement</h2>
            <p>
              To ensure a smooth and inclusive experience, we have implemented the following accessibility
              features:
            </p>
            <ul>
              <li>
                <strong>Keyboard Navigation:</strong> All interactive elements — links, buttons, forms,
                and menus — are fully operable using keyboard alone, with no reliance on a mouse.
              </li>
              <li>
                <strong>ARIA Labels:</strong> Where additional context is needed, we provide ARIA labels
                and roles to ensure that assistive technology users understand the purpose of each element.
              </li>
              <li>
                <strong>Semantic HTML:</strong> We use proper HTML5 semantic elements so that screen
                readers and assistive technologies can accurately interpret our page structure.
              </li>
              <li>
                <strong>Focus States:</strong> Visible focus indicators are present on all focusable
                elements so that keyboard users always know where they are on the page.
              </li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we work hard to ensure full accessibility, we acknowledge that some areas of the site
              may still present challenges. Third-party embedded content — such as Google Maps or social
              media widgets — may not fully conform to our accessibility standards. We actively monitor
              these integrations and work with their providers to improve compatibility. If you encounter
              an accessibility barrier, please let us know so we can address it.
            </p>

            <h2>Feedback</h2>
            <p>
              Your feedback is invaluable in helping us improve. If you have experienced any difficulty
              accessing content on Nomad Tome, or if you have suggestions for how we can make the site more
              inclusive, we want to hear from you. Please reach out through our contact form or email us
              directly — every piece of feedback helps us build a better experience for all readers.
            </p>

            <h2>Contact</h2>
            <p>
              For accessibility-related questions or concerns, please contact us at{' '}
              <a href="mailto:info@nomadtome.com">info@nomadtome.com</a>. We are committed to responding to
              accessibility inquiries within two business days and working with you to resolve any issues
              as quickly as possible.
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
