# Sahaya Savari — Python, Git & AI Blog

A high-performance, responsive personal learning blog and professional portfolio website built using React, Vite, TypeScript, Tailwind CSS, and Framer Motion. 

The site features a bold Neo-Brutalist editorial design, client-side dynamic search and categorization, and automated GitHub Pages deployment.

---

## 🚀 Features

- **Neo-Brutalist Aesthetic:** Flat colors, thick dark red borders (`#652929`), custom Display fonts for headings, and high-impact hard offset block shadows (`shadow-brutal`).
- **Client-Side Search & Filter:** Responsive article queries matching titles and excerpts, along with custom category toggles and pagination.
- **TOC & Markdown Rendering:** Custom Markdown-to-JSX parsing that dynamically formats blog content, slugifies headings for anchor links, and compiles a Table of Contents (TOC).
- **Service Worker / PWA Caching:** Built-in caching mechanisms to enable offline asset fallback and caching capability.
- **SPA Routing:** Configured with `react-router-dom` using `BrowserRouter` and local 404 redirection script decoding for GitHub Pages.
- **Search Engine Optimization (SEO):** Fully compliant semantic HTML templates, meta headers, Open Graph tag configurations, Twitter Cards, canonical URL mapping, and pre-built `robots.txt` / `sitemap.xml` scripts.
- **Performance Optimized:** Route code-splitting via `React.lazy`/`Suspense`, manual vendor chunking in Vite, and lightweight vector graphics.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 + Autoprefixer & PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM v6

---

## 📂 Folder Structure

```text
src/
├── components/          # Reusable modular UI elements (e.g., BlogCard, Navbar, Footer)
├── hooks/               # Custom React hooks (e.g., useLocation tracking)
├── lib/                 # Static data sources (data.ts contains raw blog contents)
├── pages/               # Lazy-loaded page view components (e.g., Home, Blog, About, Contact)
├── styles/              # Global styles and Tailwind layers directives
├── types/               # TypeScript interface definitions (e.g., BlogPost, Category)
├── utils/               # Common helper functions (helpers.ts handles parsing and formatting)
├── App.tsx              # Root component managing Routing switch tables
└── main.tsx             # Entry point initializing React DOM
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/sahaya-savari/sahaya-savari.github.io.git

# Navigate into the project directory
cd sahaya-savari.github.io

# Install dependencies
npm install
```

### Development Server

Run the local development server with hot-module reloading:

```bash
npm run dev
```

### Build & Compilation

Compile and bundle the production-ready assets into the `dist/` directory:

```bash
npm run build
```

### Production Preview

Host the built assets locally to simulate the production environment:

```bash
npm run preview
```

---

## 📦 Deployment

The application is deployed using **GitHub Pages** via a custom GitHub Actions workflow:
- The pipeline configuration is stored in `.github/workflows/deploy.yml`.
- Pushes to the `main` branch trigger a deployment run automatically.
- Built files inside `dist/` are served under the custom domain `blog.sahayasavari.me`.

*Note: Ensure the repository settings have Pages configured to build and deploy from **GitHub Actions**.*

---
## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=sahaya-savari/sahaya-savari.github.io&type=date&legend=bottom-right)](https://www.star-history.com/?repos=sahaya-savari%2Fsahaya-savari.github.io&type=date&legend=bottom-right)

---

## 📄 License

© 2026 Sahaya Savari F. All rights reserved.
