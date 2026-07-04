# Security Policy (SECURITY.md)

We take the security of the Sahaya Savari blog platform seriously. This document outlines vulnerability reporting policies, secrets management, dependency updates, and security best practices.

---

## 🛡️ Vulnerability Reporting

If you find a security vulnerability, please do NOT report it publicly (such as via Git issues). 

Instead, report it directly via email to:
- **Email:** `sahayasavari.info@gmail.com`
- **Response window:** Expect an initial response within 48 hours, along with a planned timeline for release updates.

---

## 🔑 Secrets & Key Management

Because the blog compiles into static HTML/JS assets served by GitHub Pages, **any keys or constants committed to the source code are fully visible to the public**.

- **No Secrets:** Never store private API keys, client credentials, database secrets, or private tokens inside the codebase.
- **Environment Isolation:** If third-party utilities (like contact mailers or comment widgets) demand client-facing keys, reference them through `import.meta.env.VITE_` environment variables and declare fallback mock values for local environments.
- **Strict gitignore:** Keep `.env` and local temporary build settings inside `.gitignore` permanently.

---

## 📦 Dependency Audit & Updates

Dependency vulnerabilities are managed through automation:
- Run `npm audit` regularly to check for package updates.
- If dependencies report high-severity warnings, run `npm audit fix` or upgrade minor packages immediately.
- Dependabot is configured on the repository to automatically compile dependency alert PRs.

---

## 🔒 Coding Security Practices

- **Strict Input Sanitation:** The Markdown-to-JSX custom parser must sanitize body contents before mounting JSX components. Prevent the execution of arbitrary raw script elements.
- **HTTP Headers:** We configure security headers at the page level inside HTML templates:
  - `Content-Security-Policy` (CSP) restrictions to limit script loading origins.
  - `X-Frame-Options` is set to `DENY` to prevent clickjacking.
  - `X-Content-Type-Options` set to `nosniff`.
