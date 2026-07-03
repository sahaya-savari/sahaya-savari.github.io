# Nomad Tome

A modern, production-ready literary blog website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Design Style

Neo-Brutalist editorial magazine with:
- Large condensed display typography (Bebas Neue)
- Modern sans-serif body text (Inter)
- Playfair Display for serif accents
- Pastel color palette with soft brutalist shadows
- Rounded components with hard offset shadows

## Color Palette

| Color      | Hex       | Usage              |
|------------|-----------|-------------------|
| Background | #D8F4F5   | Page background    |
| Cream      | #FFF8E6   | Section accents    |
| Yellow     | #E9DA79   | Badges, highlights |
| Primary    | #6B2B2B   | Text, borders      |
| Shadow     | #5A2020   | Brutalist shadows  |
| White      | #FFFFFF   | Cards, inputs      |

## Tech Stack

- **React 18** + **TypeScript** — Type-safe component architecture
- **Vite 5** — Fast dev server and optimized builds
- **Tailwind CSS 3** — Utility-first styling with custom theme
- **Framer Motion** — Page transitions, scroll reveals, hover animations
- **React Router 6** — Client-side routing with lazy-loaded pages
- **Lucide React** — Icon system

## Pages

| Route                | Page              | Features                                    |
|---------------------|-------------------|---------------------------------------------|
| `/`                 | Home              | Hero, Marquee, About, Blog Highlights, Genre Spotlight, Newsletter |
| `/blog`             | Blog              | Featured posts, search, category filter, pagination |
| `/blog/:slug`       | Blog Details      | Full article, TOC, social share, comments, related posts, prev/next |
| `/about`            | About             | Bio, philosophy, timeline, skills, achievements, testimonials |
| `/contact`          | Contact           | Contact form, map, FAQ accordion            |
| `/categories`       | Categories        | All genre categories with post counts       |
| `/newsletter`       | Newsletter        | Email signup with success animation         |
| `/privacy-policy`   | Privacy Policy    | Legal content                               |
| `/accessibility`    | Accessibility     | WCAG AA statement                           |
| `*`                 | 404               | Custom illustration + back to home          |

## Project Structure

```
src/
├── assets/          # Static assets
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── BlogCard.tsx
│   ├── BlogGrid.tsx
│   ├── SearchBar.tsx
│   ├── Pagination.tsx
│   ├── CategoryFilter.tsx
│   ├── CommentSection.tsx
│   ├── ContactForm.tsx
│   ├── Timeline.tsx
│   ├── Testimonials.tsx
│   ├── Newsletter.tsx
│   ├── ScrollToTop.tsx
│   └── LoadingSpinner.tsx
├── pages/           # Route pages
├── hooks/           # Custom React hooks
├── lib/             # Data and configuration
├── styles/          # Global CSS
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Root component with routing
└── main.tsx         # Entry point
```

## Features

- **Responsive**: Optimized for 320px to 1920px+ screens
- **Animations**: Fade, slide, scale, hover, reveal, marquee, button press
- **SEO**: Semantic HTML, meta tags, Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt
- **Accessibility**: WCAG AA, keyboard navigation, ARIA labels, focus states
- **Performance**: Code splitting, lazy loading, manual chunks, optimized fonts
- **Forms**: Client-side validation with inline errors and success states

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

© 2026 Nomad Tome. All rights reserved.
