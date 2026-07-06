# Architecture Decision Records (DECISIONS.md)

This document contains architectural decision records (ADRs) tracking critical engineering directions, context, and outcomes.

---

## ADR 001: React 18 + Vite 5

### Context
We needed a build toolchain that compiles React assets quickly and performs code-splitting/asset-minification out of the box to achieve near 100% PageSpeed performance.

### Decision
Utilize React 18 with Vite 5 instead of older bundlers (like Webpack or Create React App).

### Reason
- Hot module replacement (HMR) under Vite is nearly instantaneous.
- Vite uses Rollup internally for production builds, providing superior bundle minification and splitting capabilities.

### Consequences
- Requires using aliases configured in both `vite.config.ts` and `tsconfig.json`.
- Developers must use `npm run preview` to test production compilations locally.

### Status
**Approved**

---

## ADR 002: TypeScript

### Context
Maintaining large datasets of articles and metadata blocks in vanilla JS often introduces runtime type errors, missing key references, or invalid props during refactoring.

### Decision
Enforce strict TypeScript compiler options across all source code.

### Reason
- Avoids structural layout crashes by strictly defining post types (`BlogPost`, `Category`).
- Improves autocomplete efficiency and readability for coding agents and developers.

### Consequences
- Developers must run `tsc -b` during compilation.
- Strict typings are required on new custom components.

### Status
**Approved**

---

## ADR 003: Automated GitHub Actions Deployment

### Context
Relying on manual local compiles (`npm run build`) and raw branch pushes to GitHub Pages is prone to errors, missing assets, and deployment synchronization failures.

### Decision
Implement GitHub Actions workflow (`deploy.yml`) to compile and publish the site.

### Reason
- Ensures every commit merged to the `main` branch builds cleanly in a isolated container environment.
- Prevents raw source code from being served, keeping build outputs clean.

### Consequences
- Repository Pages settings must be changed from "Deploy from branch" to "GitHub Actions".
- The workflow demands proper permissions setup (`pages: write`, `id-token: write`).

### Status
**Approved**

---

## ADR 004: Query-Parameter SPA Redirect Handshake

### Context
GitHub Pages is a static host. Page refreshes or direct URL navigations (e.g. `/blog`) return a 404 because the server expects static directories.

### Decision
Integrate a two-part redirection handshake utilizing `public/404.html` and root `index.html`.

### Reason
- Captures 404 paths and encodes them safely into a query parameter string.
- Decodes the path upon page refresh at the root level and restores the route inside the React Router DOM.
- Obviates the need to switch from modern clean URLs (`BrowserRouter`) to hash-based routing (`HashRouter`).

### Consequences
- Direct navigations experience a brief redirection flicker.
- Relies on keeping `404.html` intact inside the `public/` directory.

### Status
**Approved**

---

## ADR 005: Static Local Data Architecture

### Context
Fetching blog articles dynamically from a headless database or API increases latency, demands secret access tokens, and limits the portability of static hosting.

### Decision
Keep all posts as structured Markdown strings exported directly from `src/lib/data.ts`.

### Reason
- Enables sub-millisecond route transitions and search queries since all data is compiled directly in the bundle.
- Eliminates external API dependencies and CORS issues, ensuring 100% uptime.

### Consequences
- New articles require commits and pushes to trigger a new build.
- Initial bundle sizes will scale with article counts (addressed by lazy loading components).

### Status
**Approved**
