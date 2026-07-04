# Project Roadmap (ROADMAP.md)

This document outlines the features and milestones of the Sahaya Savari blog platform, divided into completed milestones, in-progress work, and future backlog items.

---

## ✅ Completed

- **Core Framework Migration:** Ported codebase from legacy React JS to clean React 18, TypeScript, and Vite.
- **Neo-Brutalist Layouts:** Completed layout configurations matching high-contrast design specifications (thick borders, offset shadows, display typefaces).
- **Client-Side Engine:** Built search filters, category selectors, and custom client-side paginations.
- **Markdown & TOC Rendering:** Created custom inline markdown parsing logic to translate article markup text into React elements and map headers to dynamic TOC anchors.
- **CI/CD Pipeline:** Restored automated GitHub Actions checks and deployment to GitHub Pages.
- **SPA Path Correction:** Integrated 404 page redirection mapping and index-level parameter decoder hooks to prevent routes from crashing on page refresh.

---

## 🚧 In Progress

- **Documentation Overhaul:** Creating comprehensive, production-grade documentation (`AGENTS.md`, `ARCHITECTURE.md`, `ROADMAP.md`, etc.) to align project requirements.
- **Unit Testing Base:** Setting up test runs to verify compilation and rendering behaviors on future pushes.

---

## 📅 Planned (Short-Term)

- **Static RSS Feed Generator:** Build a lightweight script to automatically compile and update `public/rss.xml` containing current post summaries during builds.
- **Bookmark / Reading Progress Cache:** Save user bookmarks and scroll depths inside LocalStorage to maintain a personalized reading list.
- **Contact Form Backend Integration:** Hook up contact form submissions to a mailer dispatch endpoint (e.g. Formspree or custom handler).

---

## 🔮 Future Ideas & Long-Term Backlog

- **Internationalization (i18n):** Add support for multi-language blog versions.
- **Offline PWA support:** Restructure caching to support offline reads of blog pages.
- **Headless CMS Adaptability:** Support API hooks to fetch articles dynamically if migrating away from static files in the future.
