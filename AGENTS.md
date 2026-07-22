# Operating Manual for AI Coding Agents (AGENTS.md)

This document is the operating guide for AI agents working on this repository. Every agent must read it, keep it accurate, and follow it. All statements below are verifiable from the current codebase.

---

## Project Overview

- **Project name:** `sahaya-savari-blog` (package name). The site brands itself as the **Sahaya Savari Blog**.
- **Purpose:** A technical learning blog that publishes long-form tutorials on Python, Git & GitHub, programming fundamentals, and React/web development.
- **Tech stack:** React 18, TypeScript (strict), Vite 5, Tailwind CSS 3, Framer Motion, Lucide React, React Router DOM 6, and MDX (`@mdx-js/rollup` + `@mdx-js/react`).
- **Build tool:** Vite (`vite build`, preceded by `tsc -b` for type checking).
- **Package manager:** npm (a `package-lock.json` is committed).
- **Deployment method:** GitHub Pages via a GitHub Actions workflow (`.github/workflows/deploy.yml`), served on the custom domain `blog.sahayasavari.me` (see `CNAME` and `public/CNAME`).
- **Repository structure:** A single-page React application. Blog content lives as MDX files under `content/`; built static assets are deployed from `dist/`.

---

## Architecture

- **Single-page app.** `src/main.tsx` mounts `<App />` inside `<BrowserRouter>` (from `react-router-dom`) and `<React.StrictMode>`. It also imports the global stylesheet and a Prism theme for code highlighting.
- **Route composition.** `src/App.tsx` renders a persistent `Navbar`, `Footer`, `ScrollToTop`, and an `AnimatePresence` wrapper around the routed `<main>`. Page components are code-split with `React.lazy` + `Suspense`.
- **Content pipeline.** MDX files in `content/` are compiled at build time by the `@mdx-js/rollup` plugin configured in `vite.config.ts`. `src/lib/data.ts` uses `import.meta.glob` to eagerly load both the compiled MDX modules and their raw text, then derives the `blogPosts` array and a `postComponents` slug→component map.
- **Static, client-side data.** There is no backend or data-fetching layer. Editorial data (categories, comments, testimonials, timeline, skills, achievements) is declared as typed constants in `src/lib/data.ts`. Blog posts come from the MDX content pipeline.
- **Path alias.** `@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
- **Manual chunking.** `vite.config.ts` splits vendor bundles into `react-vendor`, `animation` (framer-motion), and `icons` (lucide-react).

---

## Directory Structure

Only folders that exist are listed.

- `content/` — MDX blog posts, grouped by topic folder: `python/`, `react/`, `web/`.
- `docs/` — Project documentation (`ARCHITECTURE.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `SECURITY.md`).
- `public/` — Static assets copied verbatim into the build: `404.html` (SPA redirect), `CNAME`, `favicon.ico`, `favicon.svg`, `robots.txt`, `sitemap.xml`.
- `src/` — Application source.
  - `components/` — Reusable UI components (see **Components**).
  - `pages/` — Route-level page components.
  - `hooks/` — Custom React hooks (`src/hooks/index.ts`): `useScrollPosition`, `useMediaQuery`, `useScrollToTop`.
  - `lib/` — Static data and the MDX content loader (`src/lib/data.ts`).
  - `utils/` — Pure helpers: `helpers.ts` (`formatDate`, `formatDateShort`, `paginate`, `getTotalPages`) and `blogImages.ts` (cover-image resolution and generated SVG fallbacks).
  - `styles/` — `globals.css` (Tailwind layers + brutalist component classes).
  - `types/` — TypeScript interfaces (`index.ts`) and MDX module typings (`mdx.d.ts`).
- `.github/workflows/` — CI/CD (`deploy.yml`).

---

## Routing

Routing uses `react-router-dom` v6. `App.tsx` declares all routes in a `<Routes>` block (no nested layout routes / `<Outlet>`). Defined routes:

- `/` → `Home`
- `/blog` → `Blog`
- `/blog/:slug` → `BlogDetails`
- `/about` → `About`
- `/contact` → `Contact`
- `/categories` → `Categories`
- `/newsletter` → `Newsletter`
- `/privacy-policy` → `PrivacyPolicy`
- `/accessibility` → `AccessibilityStatement`
- `*` → `NotFound`

All page components are lazy-loaded and wrapped in `Suspense` with a `LoadingSpinner` fallback, keyed by `location.pathname` for transition animations. Deep links are supported on GitHub Pages through `public/404.html`, which encodes the path into a query string that the inline script in `index.html` decodes on load.

---

## Content System

- Blog posts are authored as **MDX** files under `content/<topic>/<slug>.mdx`. There are 9 posts (5 under `python/`, 2 under `react/`, 2 under `web/`).
- Each post begins with YAML frontmatter (`id`, `title`, `excerpt`, `date`, `category`, `author`, `authorAvatar`, `readingTime`, `image`, `featured`, `tags`, and optional `draft`), parsed via `remark-frontmatter` + `remark-mdx-frontmatter`.
- `src/lib/data.ts` builds `blogPosts` from the compiled modules, filters out any post marked `draft`, and resolves each cover image through `resolveBlogCoverImage` (remote/local resolution with a generated SVG fallback in `src/utils/blogImages.ts`).
- `BlogDetails.tsx` renders the post by looking up its compiled component in `postComponents` and passing a custom `mdxComponents` map that styles MDX output with the project's design tokens. It also builds a table of contents from rendered `h2`–`h4` headings, tracks reading progress, and provides scroll-spy + copyable heading anchors.
- MDX plugins in `vite.config.ts`: `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, `rehype-slug`, and `rehype-prism-plus` (syntax highlighting; `ignoreMissing: true`).

---

## Components

Reusable components live in `src/components/` (21 components plus one colocated test):

- **Layout & chrome:** `Navbar`, `Footer`, `Container`, `GridBackground`, `ScrollToTop`, `ScrollIndicator`.
- **Blog listing & cards:** `BlogGrid`, `BlogCard`, `CategoryFilter`, `SearchBar`, `Pagination`, `SectionLabel`.
- **Content & engagement:** `CommentSection`, `Newsletter`, `Testimonials`, `Timeline`, `Marquee`, `BookIllustrations`.
- **Forms & controls:** `ContactForm`, `Button`, `LoadingSpinner`.

`Marquee.tsx` has a colocated test, `Marquee.test.tsx`.

---

## Styling

- **Tailwind CSS 3** is the primary styling system, configured in `tailwind.config.js` and layered through `src/styles/globals.css` (`@tailwind base/components/utilities`).
- **Design language:** neo-brutalist — thin solid borders (`border-ref` = `0.8px`), flat colors, hard offset shadows (`shadow-brutal` = `8px 8px 0px #652929`), and pill-shaped radii.
- **Design tokens** (from `tailwind.config.js`): colors `background` `#C1E5E7`, `cream` `#FCF9E0`, `gold` `#DCD27D`, `primary` `#652929`; display font Playfair Display, body font Inter; custom `fontSize`, `boxShadow`, `borderRadius`, `spacing`, and keyframe animations (`float`, `marquee`, `bounce-slow`).
- **Reusable component classes** (e.g. `.btn-primary`, `.btn-gold`, `.card-brutal`, `.badge-brutal`, `.section-label`, `.container-custom`, `.prose-custom`) are defined in `globals.css` under `@layer components`.
- Fonts are loaded from Google Fonts in `index.html`.

---

## State Management

There is no external state-management library. State is local and colocated:

- Component-level `useState` / `useMemo` / `useEffect`.
- `Blog.tsx` uses `useSearchParams` to sync the selected category with the URL, plus local state for the search query and current page.
- Custom hooks in `src/hooks/index.ts` encapsulate scroll and media-query logic.

---

## Data Flow

1. At build time, Vite compiles MDX in `content/` and Tailwind processes styles.
2. `src/lib/data.ts` eagerly imports the compiled MDX modules and raw text, producing the `blogPosts` array (drafts filtered out) and the `postComponents` map.
3. Pages import from `src/lib/data.ts` and `src/utils/`:
   - `Blog.tsx` filters/searches `blogPosts`, paginates with `paginate` / `getTotalPages`, and renders `BlogGrid`.
   - `BlogDetails.tsx` resolves the current post by `slug`, renders its MDX component with the custom `mdxComponents` map, and derives related/prev/next posts.
4. Editorial constants (categories, testimonials, etc.) flow directly from `src/lib/data.ts` into the components that display them.

---

## SEO

SEO is implemented statically (there is no runtime head-management library):

- `index.html` contains the base `<title>`, meta description/keywords/author/robots, `canonical` link, Open Graph tags, Twitter Card tags, and a JSON-LD `Blog` schema.
- `public/robots.txt` and `public/sitemap.xml` are shipped at the site root.
- `public/404.html` preserves deep links for the SPA on GitHub Pages.
- Semantic HTML and heading hierarchy (`<main>`, `<article>`, `<nav>`, ordered headings) support crawlability and accessibility.

---

## Build & Deployment

- **Development:** `npm run dev` (Vite dev server; `host: true` and an allowed ngrok host are configured in `vite.config.ts`).
- **Testing:** `npm run test` runs Vitest once (`vitest run`) in a `jsdom` environment with globals enabled, using `@testing-library/react`.
- **Production build:** `npm run build` runs `tsc -b` (type check) then `vite build`, emitting to `dist/`. `npm run preview` serves the built output.
- **Deployment process:** On push to `main` (or manual `workflow_dispatch`), `.github/workflows/deploy.yml` checks out the repo, sets up Node 20, runs `npm install`, `npm run test`, and `npm run build`, then uploads `dist/` and deploys it to GitHub Pages.

---

## Coding Standards

- **Strict TypeScript.** `strict: true` in `tsconfig.json`. Type props, arguments, and return values; avoid `any`. Interfaces live in `src/types/`.
- **Functional components** with hooks only.
- **Naming.** React component files use PascalCase (e.g. `BlogCard.tsx`); non-component modules use camelCase (e.g. `helpers.ts`, `blogImages.ts`).
- **Imports.** Group by React/npm packages, then local components, then styles/assets/helpers. Use the `@/` alias for `src/` where helpful.
- **Reuse.** Prefer the existing helpers in `src/utils/` and hooks in `src/hooks/` over reimplementing logic. Use the `globals.css` component classes and Tailwind tokens rather than ad-hoc styles.
- **Modularity.** Keep components small and focused; keep static data in `src/lib/data.ts` and content in `content/`.

---

## AI Agent Instructions

When working in this repository:

- **Respect the existing architecture.** It is an MDX-driven, statically-data-backed SPA. Do not introduce a backend, CMS, or router pattern that isn't already present.
- **Do not introduce unnecessary dependencies.** Solve problems with the libraries already in `package.json`. Adding a dependency requires clear justification.
- **Prefer existing utilities.** Reuse `formatDate`, `paginate`, `getTotalPages`, the `blogImages` resolvers, and the custom hooks instead of duplicating them.
- **Maintain TypeScript strictness.** Keep `tsc -b` clean; type all new code and avoid `any`.
- **Keep components modular.** Extend existing components before creating new ones; keep changes minimal and focused.
- **Preserve project conventions.** Match the neo-brutalist design tokens, the file-naming rules, and the MDX/frontmatter format for new posts.
- **Avoid breaking public APIs.** Keep exported types in `src/types/`, the `blogPosts`/`postComponents` exports in `src/lib/data.ts`, existing route paths, and MDX frontmatter fields backward compatible. When adding a route, also update `public/sitemap.xml`.
- **Verify before reporting done.** Run `npm run build` and `npm run test`; do not commit or push unless explicitly asked.

---

## Repository Facts

Verified against the current repository:

- **Pages:** 10 (`Home`, `Blog`, `BlogDetails`, `About`, `Contact`, `Categories`, `Newsletter`, `PrivacyPolicy`, `AccessibilityStatement`, `NotFound`).
- **Reusable components:** 21 in `src/components/` (plus one colocated test file, `Marquee.test.tsx`).
- **Content organization:** 9 MDX posts under `content/`, grouped into `python/` (5), `react/` (2), and `web/` (2). Categories are defined in `src/lib/data.ts`.
- **Major libraries:** React 18, React Router DOM 6, Framer Motion, Lucide React, MDX (`@mdx-js/rollup`, `@mdx-js/react`), Tailwind CSS 3, plus remark/rehype plugins (`remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, `rehype-slug`, `rehype-prism-plus`).
- **Testing framework:** Vitest with `@testing-library/react` and `jsdom`.
- **Build system:** Vite 5 with TypeScript type checking (`tsc -b`); npm as the package manager; deployed to GitHub Pages via GitHub Actions.
