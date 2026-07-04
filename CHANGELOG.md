# Changelog (CHANGELOG.md)

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.1.0] - 2026-07-04

### Added
- Created `public/404.html` containing query parameter redirection fallback script to support SPA client-side routing on refreshes.
- Injected decodable query parameter parsing script into `index.html` to recover React Router routes from the redirection.
- Added `.github/workflows/deploy.yml` to support automated builds and deployments via GitHub Actions.
- Documented full repository guidelines across `AGENTS.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `ROADMAP.md`, `DECISIONS.md`, and `SECURITY.md`.

### Fixed
- Fixed blank blog page loads on the live custom domain `blog.sahayasavari.me` caused by serving uncompiled TSX files from the source branch root.
- Restored `robots.txt` and `sitemap.xml` accessibility at the root domain level.

---

## [2.0.0] - 2026-07-04

### Added
- Re-initialized `main` branch with clean React 18, TypeScript, and Vite structure.
- Designed high-contrast Neo-Brutalist theme with offset hard shadows and flat background colors.
- Implemented client-side pagination, search indexing queries, and category selection.
- Created local custom Markdown-to-JSX parsing component with slugified TOC anchor mappings.
- Declared complete SEO header blocks, metadata schemas, Open Graph properties, and JSON-LD structured data.

---

## [1.0.0] - 2026-02-05

### Added
- Initial project creation on `legacy-blog` branch containing a modular vanilla JS/React layout.
- Added support for mobile sidebar toggle, dark/light theme, service worker caching, and comments widget.
