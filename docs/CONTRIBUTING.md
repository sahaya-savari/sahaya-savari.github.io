# Contribution Guidelines (CONTRIBUTING.md)

Welcome to the Sahaya Savari blog platform. To maintain strict visual standards, codebase reliability, and stable deployments, please review and adhere to the guidelines outlined below before submitting changes.

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18 or higher
- **Package Manager:** npm v9 or higher

### 2. Sandbox Setup
```bash
# Clone the repository
git clone https://github.com/sahaya-savari/sahaya-savari.github.io.git
cd sahaya-savari.github.io

# Install dependency tree
npm install

# Start local hot-reloading development server
npm run dev
```

---

## 🌿 Git Strategy & Branching

### 1. Branch Naming Conventions
Always create a descriptive feature branch from the latest `main` branch:
- Features: `feat/feature-name`
- Bug Fixes: `fix/bug-description`
- Chore/Cleanup: `chore/clean-something`

> [!IMPORTANT]
> **Safety Backup:** Before undertaking any major layout or routing refactors, check out a temporary backup branch (e.g. `backup-main-before-refactor`) to preserve the last stable build state.

### 2. Commit Message Formats
We strictly enforce the **Conventional Commits** specification:
- `feat: add category description tooltips`
- `fix: correct markdown table cell padding rules`
- `docs: add contributing requirements guidelines`
- `chore: update packages and clean lockfile`

---

## 🛠️ Code Verification Checklist

Prior to requesting a code review or merge, you must compile the application locally and check for warnings:

```bash
# 1. Clean build verification (Compiles TS and bundles Vite)
npm run build

# 2. Local production preview verification
npm run preview
```

### Pull Request (PR) Requirements
- The local compile step (`npm run build`) must exit with code `0` (Zero warnings/compiler errors).
- Clean console logs output: Navigating pages locally must not trigger runtime exceptions or network failures.
- Direct URL pathing (e.g. typing `/blog` into address bar) must be successfully decoded by the redirect mechanism.

---

## 🚀 Deployment Process

The deployment pipeline is fully automated on push events to `main` branch. 
- Do NOT commit compiled assets (the `dist/` directory) to Git.
- Do NOT modify the `.github/workflows/deploy.yml` configurations without architect approval.
- Ensure the repository settings under **Settings -> Pages -> Build and deployment -> Source** is set to **GitHub Actions**.
