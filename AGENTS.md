# Operating Manual for AI Coding Agents (AGENTS.md)

This document serves as the project's permanent operating guidelines and constitution. Every AI agent working on this repository must read, understand, and adhere strictly to these rules.

---

## 1. Project Overview

- **Project Name:** Sahaya Savari Blog
- **Purpose:** A high-fidelity, high-performance personal learning blog and portfolio sharing practical guides on Python, Databases, Git, and Web Development.
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router Dom v6.
- **Deployment Platform:** GitHub Pages (custom domain: `blog.sahayasavari.me`).
- **Repository Purpose:** Serve static built assets of the React application via automated workflows.

---

## 2. Project Architecture

### Folder Structure
- `public/` - Static assets copied directly to the build output. Contains [CNAME](file:///D:/GITHUB/blog/public/CNAME), [robots.txt](file:///D:/GITHUB/blog/public/robots.txt), [sitemap.xml](file:///D:/GITHUB/blog/public/sitemap.xml), and [404.html](file:///D:/GITHUB/blog/public/404.html).
- `src/` - Application source directory.
  - `components/` - Reusable layout, navigation, and UI components.
  - `hooks/` - Custom React hooks.
  - `lib/` - Client-side data storage and configuration (e.g., [data.ts](file:///D:/GITHUB/blog/src/lib/data.ts)).
  - `pages/` - Page view entry points (lazy-loaded).
  - `styles/` - Global stylesheets and Tailwind layers.
  - `types/` - TypeScript typings and interfaces.
  - `utils/` - Global helper functions and formatters.
- `.github/workflows/` - CI/CD deployment configurations.

### Architecture Specifications
- **Routing:** Configured with `react-router-dom` using `BrowserRouter` inside `main.tsx`. Routes are defined in `App.tsx` and dynamically loaded using `React.lazy` and `Suspense` for code-splitting.
- **State Management:** Fully decentralized using local React state (`useState`, `useReducer`), hooks, and memoization (`useMemo`, `useCallback`). No heavy state libraries (Redux, Zustand) are used.
- **Data Sources:** Raw blog posts and tags are maintained statically inside `src/lib/data.ts` to support rapid, client-side rendering with no external database requirements.
- **Blog System:** Powered by clean client-side search indexing (title/excerpt), category filters, and custom client-side pagination. Headings inside posts are automatically slugified to build dynamic Tables of Contents (TOC).

---

## 3. Coding Standards

- **Strict TypeScript:** Explicitly define types for all arguments, props, and return values. Avoid the `any` keyword.
- **Functional Components:** All React components must be written as functional components using modern hooks.
- **Reusable Logic:** Extract component patterns into local UI directories. Consolidate duplicated logic into custom hooks or utility helpers.
- **Naming Conventions:**
  - File names for React components: PascalCase (e.g., `BlogCard.tsx`).
  - Directories and non-component files: camelCase or kebab-case (e.g., `helpers.ts`, `data-fetching`).
- **Import Order:** Group imports by library (React first, then NPM packages), relative components, assets/styles, and helpers. Keep path aliases (e.g., `@/components`) consistent.

---

## 4. UI/UX Standards

- **Design Language:** Brutalist/Neo-brutalist aesthetic featuring high contrast, thick solid borders (`border-ref border-primary`), flat colors, offset hard shadows (`shadow-brutal`), and bold typography.
- **Typography:**
  - Headings: Bold impact fonts (e.g., Display/Impact) for titles.
  - Body Text: Clean sans-serif sans default styling (e.g., `Inter` or system-ui) for legibility.
- **Design Tokens:**
  - **Colors:** Primary dark red (`#652929`), background teal/cyan (`#C1E5E7`), cards cream (`#FCF9E0`), active accents gold (`#DCD27D`).
  - **Border Radius:** Precise brutalist pill shapes (`rounded-navbar` at `48px`, `rounded-badge` at `24px`).
  - **Shadow System:** High-impact solid offsets (`8px 8px 0px 0px #652929`).
- **Animations:** Subtle, responsive micro-animations using `framer-motion` (e.g., springs, smooth transitions, page transition suspension, and marquee loops). Opacity scales should have clean exit steps.
- **Responsive Behavior:** Strict custom responsive breakpoints for desktop, laptop, tablet, and mobile layouts. Check margins and grid columns on resized screens to avoid layout overflow.

---

## 5. SEO Standards

- **Metadata Preservation:** Never modify or drop existing header metadata tags. Every page must contain custom title tags, meta descriptions, canonical URLs, and appropriate robot indexing instructions.
- **Static SEO Assets:** Keep `robots.txt` and `sitemap.xml` intact at the root. Update them when new paths are added.
- **Social Tags:** Include complete Open Graph (`og:`) and Twitter Card specifications on all page templates.
- **Structured Data:** Use JSON-LD scripts at the root template level to declare structured data (such as articles and authors) for crawlers.

---

## 6. Blog Rules

- **Unique Slugs:** Every post in `src/lib/data.ts` must have a URL-safe, lowercase, unique slug.
- **Structure:** Content should support Markdown blocks. Headings inside the post must have a hierarchical structure starting with `##` (H2).
- **Metadata:** Every blog post must include: `id`, `slug`, `title`, `excerpt`, `content`, `category`, `author`, `authorAvatar`, `date`, `readingTime`, `image`, `featured` (boolean), and `tags` (string array).
- **Search & Filters:** The filtering system must query case-insensitively across both the title and post excerpt.

---

## 7. Deployment Rules

- **GitHub Actions pipeline:** Deployments to GitHub Pages are strictly automated through GitHub Actions workflow runs triggered on push events to `main`.
- **Pages settings:** The Pages builder configuration on GitHub must target **GitHub Actions** rather than deploying directly from a branch folder.
- **Build assets:** The built files inside `dist/` must match production bundles. Local source files (TypeScript) must never be served directly.
- **SPA Routing Redirect:** The custom `public/404.html` must remain present. It translates invalid routes to query strings (`/?/...`) which `index.html` decodes upon reload to prevent page refreshes from throwing 404 errors.

---

## 8. Git Rules

- **Branch Strategy:**
  - Master timeline: `main`.
  - Backup branch requirement: Create a backup branch prior to major refactoring attempts.
- **Commits:** Commit messages must follow the Conventional Commits specification (e.g., `feat: ...`, `fix: ...`, `chore: ...`). Keep commits atomic and clean.

---

## 9. Testing & Quality Requirements

Before marking a task as complete, verify:
- [ ] Dependencies install cleanly (`npm install`).
- [ ] The build finishes successfully (`npm run build`) with zero TypeScript compiler errors or Vite build warnings.
- [ ] The local production preview (`npm run preview`) runs and serves correctly.
- [ ] No client-side JavaScript or network resource exceptions are logged in the browser console.
- [ ] Internal route links do not result in blank page loads or 404s.

---

## 10. Performance Standards

- **Lazy Loading:** All page view routes must be declared as dynamically imported lazy components wrapped in `Suspense`.
- **Asset Optimization:** Images must use lightweight compression and modern formats. Set `loading="lazy"` on non-critical images.
- **Code Splitting:** Manual vendor chunks must be maintained in `vite.config.ts` to separate standard dependencies (react, react-dom, react-router-dom), icons, and animation libraries.

---

## 11. Accessibility (a11y) Standards

- **Semantic Tags:** Use proper semantic HTML elements (e.g., `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`).
- **Heading Hierarchy:** Maintain a strict nested heading hierarchy (`h1` -> `h2` -> `h3`). Never skip heading levels.
- **Focus & Interaction:** Ensure interactive controls are fully focusable with keyboard navigation and display visible brutalist focus outlines. Use appropriate `aria-*` tags and semantic labels on icons or decorative SVGs.

---

## 12. Security Rules

- **Secrets Management:** Never commit API keys, environment tokens, or private variables to Git.
- **Ignored Directories:** Keep `node_modules/`, `dist/`, and local temporary files (.env) inside `.gitignore`.
- **Dependencies:** Keep build configurations secure by checking dependency warnings.

---

## 13. AI Agent Constraints

As an AI agent operating on this project, you must:
1. Thoroughly read and audit the existing logic/components before suggesting modifications.
2. Minimize unnecessary modifications to preserve code architecture.
3. Keep current styling rules intact and matching the brutalist design style.
4. Keep all existing SEO configurations, sitemaps, domains, and canonical definitions alive.
5. Prevent breaking changes by compiling and previewing build assets locally.

---

## 14. Verification Checklist

Use this checklist to validate your output before completing the task:

- [ ] Project builds with zero errors: `tsc -b && vite build`
- [ ] Local preview succeeds: `npm run preview`
- [ ] Browser console has zero exceptions or MIME-type blocks.
- [ ] Direct URLs (such as `/blog`) load correctly via the 404 redirector.
- [ ] Deployment workflow file is checked in: `.github/workflows/deploy.yml`
- [ ] Redirect resources are checked in: `public/404.html` and script in `index.html`
- [ ] CNAME points to custom domain: `blog.sahayasavari.me`
- [ ] SEO compliance is intact: `robots.txt` and `sitemap.xml` are accessible at the root.
