# Project Context: Sahaya Savari Blog

This document serves as a comprehensive, production-grade documentation of the **Sahaya Savari Blog** platform. It consolidates all system architecture, configuration details, setup guides, and workflows. This file is intended to provide a complete context for any incoming developer or AI agent to understand, build, test, and maintain the repository without requiring external guidance.

---

## 1. Project Overview

- **Project Name:** Sahaya Savari Blog
- **Purpose:** A high-fidelity, high-performance personal learning blog and professional portfolio website sharing practical guides on Python, Databases, Git, and Web Development.
- **Author:** Sahaya Savari F
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router DOM v6.
- **Deployment Platform:** GitHub Pages (custom domain: `blog.sahayasavari.me`).
- **Repository Purpose:** Compile and serve static built assets of the React application via automated workflows.

---

## 2. Project Goals

1. **Ultra-fast Performance:** Minimize initial page load times and bundle sizes to achieve near 100% PageSpeed performance.
2. **Resilient Architecture:** Leverage a database-free static local data structure to ensure 100% uptime, offline availability, and sub-millisecond client-side routing.
3. **Immersive Brutalist UX:** Deliver an eye-catching, high-contrast Neo-Brutalist aesthetic that separates the blog from typical generic layouts.
4. **Automated CI/CD:** Establish a reliable build-and-deploy pipeline triggered directly by git push events.
5. **SEO-First Implementation:** Ensure search engines can crawl, index, and render pages and posts easily with correct schema metadata.

---

## 3. Tech Stack Details

- **Core Library:** React `^18.3.1`
- **Language Compiler:** TypeScript `^5.5.4`
- **Build Tool / Dev Server:** Vite `^5.3.5` (utilizes Rollup for production packaging)
- **Styling Framework:** Tailwind CSS `^3.4.7` + PostCSS & Autoprefixer
- **Animations Library:** Framer Motion `^11.3.0`
- **Vector Icons:** Lucide React `^0.408.0`
- **Client Routing:** React Router DOM `^6.26.0`

---

## 4. Directory Structure

```text
D:\GITHUB\BLOG
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions build-and-deployment workflow pipeline
├── public/                     # Static assets copied directly to the build output (dist/)
│   ├── 404.html                # Intercepts SPA sub-paths and encodes paths to query parameters
│   ├── CNAME                   # Maps custom domain blog.sahayasavari.me
│   ├── robots.txt              # Standard web crawler rules
│   └── sitemap.xml             # Search engine crawler index XML
├── src/                        # React application source code root
│   ├── components/             # Reusable UI component modules (Grid, Card, SearchBar, etc.)
│   ├── hooks/                  # Custom React hooks (e.g., location tracking, scroll behaviors)
│   ├── lib/                    # Storage folders for static data and settings configs
│   │   └── data.ts             # Raw blog posts database array (structured Markdown strings)
│   ├── pages/                  # Route views compiled as chunks via lazy loading
│   ├── styles/                 # Tailwind layout layers and custom Brutalist utility CSS
│   ├── types/                  # TypeScript contract interface definitions
│   ├── utils/                  # Utility formatters, slugifiers, and pagination helpers
│   ├── App.tsx                 # Core Application layout wrapper defining SPA routes
│   └── main.tsx                # Entry script rendering React DOM inside index.html
├── package.json                # Project dependencies and run scripts
├── tailwind.config.js          # Tailwind custom theme definitions (colors, fonts, shadow-brutal)
├── tsconfig.json               # TypeScript compiler config
└── vite.config.ts              # Configures path alias resolutions and manual bundle chunking
```

---

## 5. Git Workflow

- **Branch Strategy:**
  - The `main` branch serves as the production timeline.
  - **Backup Requirement:** A backup branch must be created prior to making major refactoring attempts.
- **Commits:** Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
  - `feat: ...` for new features
  - `fix: ...` for bug fixes
  - `chore: ...` for configuration or library updates
  - `docs: ...` for documentation changes
- **CI Trigger:** Merges and pushes directly to `main` trigger the automated GitHub Actions pipeline.

---

## 6. Firebase Setup

- **Current Status:** The project does **not** integrate Firebase. It utilizes a **Static Local Data Architecture** (as per ADR 005) with raw posts maintained in [data.ts](file:///D:/GITHUB/blog/src/lib/data.ts). This ensures zero infrastructure costs, zero CORS latency, and absolute immunity to database connection drops.
- **Future Firebase Integration Guidelines:**
  - If a database or auth backend is requested:
    1. Install the SDK: `npm install firebase`.
    2. Setup an initializer in `src/lib/firebase.ts` fetching configuration values from Vite's environment parser:
       ```typescript
       import { initializeApp } from "firebase/app";
       import { getFirestore } from "firebase/firestore";

       const firebaseConfig = {
         apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
         authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
         projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
         storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
         messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
         appId: import.meta.env.VITE_FIREBASE_APP_ID
       };

       export const app = initializeApp(firebaseConfig);
       export const db = getFirestore(app);
       ```
    3. **Crucial Rule:** Never check secret keys or database credentials into Git. Keep all configuration variables inside local `.env` (ignored by Git) and populate them inside GitHub Secrets for build-time injections.

---

## 7. Domain Setup

- **Custom Domain:** `blog.sahayasavari.me`
- **DNS Routing:** Configure DNS settings at the domain registrar:
  - Add a **CNAME** record for the host `blog` pointing to the GitHub Pages domain `sahaya-savari.github.io`.
- **Repository Linkage:**
  - The repository root includes [CNAME](file:///D:/GITHUB/blog/CNAME) (and `public/CNAME`) containing `blog.sahayasavari.me`. 
  - This ensures that when GitHub Pages deploys, it binds the static assets to the custom domain.
  - The source builder settings under "Settings > Pages" in GitHub must be configured to deploy from **GitHub Actions** rather than a static branch.

---

## 8. SEO Configuration

The site implements a robust, programmatic SEO system. Do not modify or drop these parameters.

### HTML Meta Tags (`index.html`)
The `<head>` of [index.html](file:///D:/GITHUB/blog/index.html) defines:
- **Canonical URL:** `<link rel="canonical" href="https://blog.sahayasavari.me" />`
- **Open Graph (OG) Tags:** Custom title, description, URL, and image tags.
- **Twitter Cards:** Optimized for summary-large-image cards.
- **Structured Data:** Schema markup utilizing JSON-LD format declaring the site as a `Blog` written by the author:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Sahaya Savari",
    "url": "https://blog.sahayasavari.me",
    "author": {
      "@type": "Person",
      "name": "Sahaya Savari F"
    }
  }
  ```

### Crawler Crawl Indexing
- **Robots configuration:** [robots.txt](file:///D:/GITHUB/blog/public/robots.txt) maps allowed areas and links directly to the sitemap location.
- **Sitemap XML:** [sitemap.xml](file:///D:/GITHUB/blog/public/sitemap.xml) contains structural priorities for core landing pages and lists specific slugs of articles to optimize search engine crawling performance.

---

## 9. Performance Optimizations

1. **Lazy Loading Routes:**
   All routes inside [App.tsx](file:///D:/GITHUB/blog/src/App.tsx) are dynamically imported and split into lazy components wrapped in a `<Suspense>` container with a fallback loading animation.
2. **Vite Manual Splitting:**
   The `vite.config.ts` file splits standard dependencies to keep chunk sizes low:
   - `react-vendor`: `react`, `react-dom`, `react-router-dom`
   - `animation`: `framer-motion`
   - `icons`: `lucide-react`
3. **Asset Handling:**
   All icons use SVG vectors via Lucide React. Images are loaded lazily using the native `loading="lazy"` attribute.

---

## 10. Design Philosophy (Neo-Brutalism)

The UI exhibits a striking Neo-Brutalist look and feel. Adhere strictly to these design guidelines:
- **Borders:** High-contrast, thick solid borders (`border-4 border-[#652929]`).
- **Colors:**
  - Primary Dark Red: `#652929`
  - Teal/Cyan Background: `#C1E5E7`
  - Cards Cream: `#FCF9E0`
  - Active Accents Gold: `#DCD27D`
- **Hard Offsets:** Avoid soft blur shadows. Instead, use offset solid brutalist shadows:
  - `shadow-brutal` token: `8px 8px 0px 0px #652929`
- **Typography:**
  - Headings: Serif impact font combination (`Playfair Display`).
  - Body Text: Clean sans-serif sans default (`Inter`).
- **Micro-animations:** Soft bounce springs on hover and entry effects compiled with Framer Motion.

---

## 11. Coding Standards

- **Strict TypeScript:** Explicitly define interfaces and types for all hooks, components, properties, and utilities. Avoid using `any`.
- **Functional Components:** Build pure functional components with hooks (`useState`, `useMemo`, `useCallback`). Avoid class components.
- **Import Ordering:**
  1. React core library and core hooks
  2. Third-party NPM dependencies
  3. Path-aliased local components (`@/components/...`)
  4. Styles, icons, and local utility helpers
- **Semantic HTML:** Keep markup accessible. Use standard headers (`<h1>` to `<h6>` sequentially), `<main>`, `<article>`, `<section>`, and `<nav>`. Ensure interactive controls have focus indicators.

---

## 12. Deployment Process

Deployments are automated through a single-stage GitHub Actions runner:
1. Pushing to the `main` branch kicks off the runner in `.github/workflows/deploy.yml`.
2. The runner checks out code, sets up Node 18, installs dependencies, and runs `npm run build`.
3. The build process runs `tsc -b` to verify type safety and Vite processes output resources to the `./dist` folder.
4. The output is bundled and deployed to the GitHub Pages environment.

### SPA Routing Redirect Handshake
To prevent 404s on browser reloads or direct path visits on static servers:
1. If a path (e.g., `/blog/some-post`) is requested, the server fails to find a file and loads [404.html](file:///D:/GITHUB/blog/public/404.html).
2. The script inside `404.html` converts the request path into a query parameter string (e.g., `/?//blog/some-post`) and redirects to the root.
3. The script in the header of [index.html](file:///D:/GITHUB/blog/index.html) intercepts query parameters, extracts the original path, and restores the URL path without refreshing the page.
4. The React Router DOM mounts and navigates to the target page dynamically.

---

## 13. Completed Work

- **Stack Migration:** Ported codebase from JS React to React 18, TypeScript, and Vite.
- **Design Tokens:** Set up brutalist styles, fonts, custom colors, and offset shadow presets in Tailwind configuration.
- **Search Engine:** Dynamic text search matching titles/excerpts, category pill toggles, and local pagination.
- **Markdown Renderer:** Custom client-side parser to convert raw static markdown text into React JSX, including generating slug-based Table of Contents (TOC) links.
- **Automated Workflow:** Fixed broken build branches by setting up the GitHub Actions runner.
- **Route Redirection:** Created `404.html` fallback system to allow direct links.

---

## 14. Remaining Tasks & Roadmap

### Short-Term Backlog
- [ ] **Static RSS Feed Generator:** Build a lightweight script to automatically compile and update `public/rss.xml` containing current post summaries during builds.
- [ ] **Bookmark / Reading Progress Cache:** Save user bookmarks and scroll depths inside LocalStorage to maintain a personalized reading list.
- [ ] **Contact Form Backend Integration:** Hook up contact form submissions to a mailer dispatch endpoint (e.g. Formspree or custom handler).

### Quality & Infrastructure Backlog
- [ ] **Unit Testing Base:** Set up a testing library (Vitest + React Testing Library) to verify type matching and markdown compiler outputs.
- [ ] **Dynamic Image Sizing:** Setup pipeline responsive image generation to reduce image weight.

### Long-Term Vision
- **i18n Translation:** Support switching languages.
- **Offline Cache reads:** Use standard Service Workers to cache loaded blog post resources for offline reading.
- **Decoupled CMS Adaptability:** Support dynamic endpoints if the static library in `data.ts` grows too large for local bundles.

---

## 15. Known Issues & Quirks

- **URL flicker on reload:** Refreshing a page (e.g., `/categories`) causes the browser to fetch the 404 page first. There is a sub-second flash of blank screen/redirection before the path is decoded and loaded.
- **Data Bundle Growth:** Because all article records are kept in `src/lib/data.ts`, they are downloaded on initial mount. As post counts grow, initial bundle size increases. Solution: If bundle size exceeds budget limits, separate the dataset into chunks and dynamically import them, or implement an API client interface.
