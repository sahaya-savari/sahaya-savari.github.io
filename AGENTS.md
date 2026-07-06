# Operating Manual for AI Coding Agents (AGENTS.md)

This document serves as the project's permanent operating guidelines and constitution. Every AI agent working on this repository must read, understand, and adhere strictly to these rules.

---

## 1. Project Overview

- **Project Name:** Sahaya Savari Portfolio
- **Purpose:** A world-class AI Engineer portfolio and personal website featuring project case studies, an interactive AI assistant, and an ATS-friendly recruiter mode.
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router Dom.
- **Deployment Platform:** GitHub Pages (custom domain: `sahayasavari.me`).
- **Repository Purpose:** Serve static built assets of the React application via automated workflows.

---

## 2. Project Architecture

### Folder Structure
- `public/` - Static assets copied directly to the build output. Contains `robots.txt`, `sitemap.xml`, and `404.html` (for SPA routing).
- `src/` - Application source directory.
  - `components/` - Reusable UI components and raw WebGL shaders (e.g., `Galaxy`, `TargetCursor`).
  - `layouts/` - Contains `RootLayout.tsx` which wraps all application routes and provides global state/FABs.
  - `pages/` - Page view entry points (e.g., `HomePage.tsx`, `ProjectDetails.tsx`, `RecruiterMode.tsx`, `AskSahayaAI.tsx`).
  - `data/` - Client-side static data models (e.g., `caseStudies.ts`).
  - `hooks/` - Custom React hooks.
  - `styles/` - Global stylesheets and Tailwind layers.
  - `types/` - TypeScript typings and interfaces.
- `docs/` - Career strategy, architectural planning, and GitHub profile templates.
- `.github/workflows/` - CI/CD deployment configurations.

### Architecture Specifications
- **Routing:** Configured with `react-router-dom`. `App.tsx` handles route definitions using `<Outlet />` patterns. All major views are dynamically loaded using `React.lazy` and `Suspense` for code-splitting.
- **State Management:** Fully decentralized using local React state and `useOutletContext` for passing context between layouts and nested pages. No heavy state libraries are used.
- **Data Sources:** Content (projects, skills, case studies) is maintained statically inside `src/data/` to support instant client-side rendering.

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
- **Animations:** Subtle, responsive micro-animations using `framer-motion`. Complex visual effects are handled via WebGL shaders (e.g., `Galaxy.jsx`, `TargetCursor.jsx`) which require `// @ts-ignore` flags to satisfy strict TypeScript environments without breaking the Vite bundler.
- **Responsive Behavior:** Strict custom responsive breakpoints for desktop, laptop, tablet, and mobile layouts. Check margins and grid columns on resized screens to avoid layout overflow.
- **Layout & Positioning:** Core layout structures (like Navbars and Headers) must participate in the normal document flow (e.g., static, relative, or sticky) rather than relying on `absolute` positioning. This reserves their height globally and prevents z-index overlaps, eliminating the need for brittle, page-specific `padding-top` hacks.

---

## 5. SEO Standards

- **Metadata Preservation:** Never modify or drop existing header metadata tags. 
- **Dynamic SEO:** Every page must utilize the `SEOHead.tsx` component (powered by `react-helmet-async`) to dynamically inject custom `<title>`, OpenGraph meta tags, and description fields.
- **Structured Data:** Use `SEOHead.tsx` to inject dynamic structured JSON-LD schemas (e.g., `Person` on HomePage, `SoftwareSourceCode` on Case Studies) for rich search results.
- **Static SEO Assets:** Keep `robots.txt` and `sitemap.xml` intact at the root directory. Update the static `sitemap.xml` when new dedicated routes are added.

---

## 6. Portfolio Integration Rules

- **Project Case Studies:** Every project referenced must have a corresponding entry in `src/data/caseStudies.ts` with a URL-safe, lowercase, unique slug to populate dynamic `ProjectDetails` pages.
- **Dedicated Blog Links:** The portfolio does NOT host blog modals. Any blog entry point (buttons, links, command palette) must navigate strictly to the external dedicated blog domain: `https://blog.sahayasavari.me`.
- **Specialized Routes:** Maintain dedicated views for specific use cases (e.g., ATS-friendly `/recruiter`, conversational `/ai`) to enhance UX for varying audiences.

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

## 14. Project Philosophy

- Treat every project as a production-quality software project.
- Never prioritize speed over correctness.
- Always preserve existing architecture unless explicitly instructed to refactor.
- Avoid unnecessary rewrites.
- Always make the smallest possible change.

## 15. Workflow

For every task:

1. Understand the entire feature before editing.
2. Read all related files.
3. Identify root cause.
4. Explain planned changes.
5. Make minimal edits.
6. Verify locally.
7. Build the project.
8. Check runtime.
9. Stop and report.

Never skip verification.

## 16. Responsive Design

When asked to improve responsiveness:

- Never redesign.
- Preserve desktop appearance.
- Preserve branding.
- Preserve typography personality.
- Preserve animations.
- Preserve layout hierarchy.
- Preserve spacing philosophy.

Support:

320
360
375
390
412
430
480
576
768
820
1024
1280
1440
1920

Verify:

✓ no horizontal scrolling

✓ no clipped headings

✓ no navbar overlap

✓ no overflowing cards

✓ responsive images

✓ responsive typography

✓ proper touch targets

## 17. Typography

Typography is part of the design language.

Never blindly replace font sizes.

Avoid:

- giant headings
- tiny text
- clipped letters
- excessive wrapping
- overly aggressive clamp() scaling

Desktop typography should remain visually identical unless instructed otherwise.

## 18. Visual Polish

Prefer refinement over redesign.

Improve:

- alignment
- spacing
- visual balance
- consistent padding
- consistent margins
- button alignment
- card alignment
- content hierarchy

Only add visuals when they improve the experience.

Avoid decorative clutter.

## 19. Images

Never distort images.

Always:

- object-fit: cover
- maintain aspect ratio
- prevent overflow
- preserve quality

## 20. Code Quality

Prefer maintainable code.

- Avoid duplication.
- Avoid unnecessary abstraction.
- Avoid changing unrelated files.
- Avoid renaming components without reason.

## 21. Debugging

When fixing bugs:

- Find the root cause.
- Never hide the symptom.
- Never rewrite large components to fix a small issue.

## 22. Build Verification

Before marking any task complete:

Run:

`npm run build`

If available:

`npm run test`

Run:

`npm run preview`

Check browser rendering.

Check console.

Verify responsive layouts.

## 23. Git Workflow

- Never commit automatically.
- Never push automatically.
- Always wait for my approval before:
  - `git add`
  - `git commit`
  - `git push`

## 24. Communication

- Be concise.
- Do not over-explain.
- Report:
  - What changed
  - Why
  - Files modified
  - Verification completed
  - Remaining manual testing

## 25. When Unsure

If uncertain:

- Read more code.
- Ask for clarification.
- Never guess.

## 26. Final Rule

Do not declare success until:

✓ Build succeeds

✓ Runtime verified

✓ No console errors

✓ Responsive verification completed

✓ Desktop appearance preserved

✓ Mobile tested

✓ No regressions introduced

---

## 27. Verification Checklist

Use this checklist to validate your output before completing the task:

- [ ] Project builds with zero errors: `npx tsc --noEmit && vite build`
- [ ] Local preview succeeds: `npm run preview`
- [ ] Browser console has zero exceptions or MIME-type blocks.
- [ ] Direct URLs (such as `/projects/:id`) load correctly via the 404 redirector.
- [ ] Deployment workflow file is checked in: `.github/workflows/deploy.yml`
- [ ] Redirect resources are checked in: `public/404.html`
- [ ] Custom domain settings remain functional.
- [ ] SEO compliance is intact: `robots.txt` and `sitemap.xml` are accessible at the root.

---

## 28. Production Baseline (Do Not Regress)

The portfolio has completed its major architectural roadmap and is considered production-ready.

Future AI agents MUST treat the current implementation as the baseline.

Do NOT:
- Redesign existing UI without explicit instruction.
- Reintroduce removed architectures (e.g., BlogModal).
- Replace stable implementations simply for stylistic reasons.
- Introduce unnecessary dependencies.
- Rewrite large portions of working code.

Prefer extending existing architecture over replacing it.

Every change should:
- Preserve existing UX.
- Maintain backward compatibility where practical.
- Improve maintainability.
- Improve accessibility.
- Improve performance.
- Improve recruiter experience.

Before completing any task:
1. Run `npm run build`.
2. Fix all build errors.
3. Run `npm run preview`.
4. Verify affected functionality.
5. Check browser console for errors.
6. Commit only after successful verification.
7. Push and deploy only when explicitly requested.
