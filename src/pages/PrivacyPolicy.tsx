import { motion } from 'framer-motion';
import Container from '../components/Container';

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background py-12 md:py-16" aria-labelledby="privacy-hero-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              id="privacy-hero-heading"
              className="display-text font-display text-4xl md:text-6xl text-primary"
            >
              Privacy Policy
            </h1>
            <p className="text-sm text-primary/50 mt-2 font-body">Last updated: January 2026</p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-background py-8" aria-labelledby="privacy-content-heading">
        <Container className="max-w-4xl">
          <h2 id="privacy-content-heading" className="sr-only">Privacy Policy Content</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose-custom"
          >
            <h2>Introduction</h2>
            <p>
              At Sahaya Savari, we are committed to protecting your privacy and ensuring that your personal
              information is handled in a safe and responsible manner. This Privacy Policy explains how we
              collect, use, and safeguard your information when you visit our website or subscribe to our
              newsletter. By using Sahaya Savari, you agree to the practices described in this policy.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect the following types of information when you interact with our website:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Your name and email address when you subscribe to
                our newsletter or submit a contact form.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you navigate our site, including pages
                visited, time spent on pages, and referring links.
              </li>
              <li>
                <strong>Device Information:</strong> Basic details about your device, such as browser
                type, operating system, and screen resolution.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>The information we collect is used for the following purposes:</p>
            <ul>
              <li>To deliver and improve our newsletter and blog content.</li>
              <li>To respond to your inquiries and messages sent through our contact form.</li>
              <li>To analyze website traffic and user behavior to enhance your reading experience.</li>
              <li>To send periodic updates about new blog posts, curated reading lists, and special features.</li>
            </ul>
            <p>
              We will never sell or rent your personal information to third parties. Your trust is the
              foundation of our literary community.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are small text files
              stored on your device that help us remember your preferences, analyze site traffic, and
              understand how you use our content. You can choose to disable cookies through your browser
              settings, though some features of the site may not function properly without them.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access,
              alteration, or disclosure. This includes using secure servers, encrypting sensitive data,
              and limiting access to personal information to authorized personnel only. However, no method
              of transmission over the internet is completely secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may use third-party services such as email delivery providers and analytics tools to
              operate our website and newsletter. These providers have their own privacy policies and are
              responsible for the data they process on our behalf. We only work with services that
              demonstrate a strong commitment to data protection and privacy.
            </p>

            <h2>Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You can ask us to correct any inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information from our records.</li>
              <li>
                <strong>Opt-Out:</strong> You can unsubscribe from our newsletter at any time using the
                unsubscribe link in any email.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@nomadtome.com">info@nomadtome.com</a>.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              legal requirements. When we make significant changes, we will notify you through our website
              or via email. We encourage you to review this page periodically to stay informed about how we
              protect your information.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please
              do not hesitate to reach out. You can email us at{' '}
              <a href="mailto:info@nomadtome.com">info@nomadtome.com</a> or use the contact form on our
              Contact page. We are committed to addressing your inquiries promptly and transparently.
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
