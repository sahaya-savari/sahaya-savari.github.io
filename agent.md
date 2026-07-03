task - 1

You are a Senior Frontend Architect, Senior UI/UX Designer, Senior React Engineer, Visual Designer, and Website Reverse Engineer.

Your ONLY goal is to recreate the reference website with the highest visual accuracy possible.

Reference Website

https://cebab51548.wixsite.com/my-site

DO NOT immediately generate code.

======================================================
PHASE 1 — VISUAL REVERSE ENGINEERING
======================================================

Before writing ANY code, completely inspect the reference website.

Visit EVERY page.

Home

Blog

About

Contact

Inspect every section.

Study:

layout

spacing

padding

margin

font sizes

font weights

line heights

letter spacing

border radius

colors

shadows

hover effects

animations

button sizes

container widths

grid systems

responsive behaviour

card sizes

badge positions

image positions

background decorations

section heights

sticky navigation

footer

newsletter

blog cards

about section

hero section

contact section

overall visual rhythm

Do NOT estimate.

Inspect carefully.

If needed, spend several minutes analysing the website before writing code.

======================================================
PHASE 2 — VISUAL DESIGN REPORT
======================================================

Before generating code, internally create a complete design system.

Determine:

Primary Colors

Secondary Colors

Accent Colors

Typography

Spacing System

Container Width

Border Radius

Shadow System

Button Styles

Animations

Responsive Breakpoints

Icon Style

Image Style

Component hierarchy

Do not skip this phase.

======================================================
PHASE 3 — WEBSITE RECREATION
======================================================

Only after completing the visual analysis, recreate the website.

Do NOT redesign.

Do NOT simplify.

Do NOT modernize.

Do NOT improve.

Recreate.

The website should be visually almost identical.

Target visual similarity:

98%+

======================================================
TECH STACK
======================================================

React 19

TypeScript

Vite

Tailwind CSS

Framer Motion

React Router

Lucide Icons

======================================================
PAGES
======================================================

Home

Blog

Blog Details

About

Contact

Newsletter

Privacy Policy

Accessibility

404

======================================================
HERO
======================================================

Recreate exactly.

Large condensed heading.

Background illustrations.

Floating badges.

Correct spacing.

Correct proportions.

Correct typography.

Correct shadows.

Correct button.

Correct section height.

Correct scroll indicator.

======================================================
NAVBAR
======================================================

Match:

height

spacing

logo

button

border

shadow

hover

sticky behaviour

======================================================
ABOUT
======================================================

Match:

split layout

portrait size

badge position

grid background

spacing

typography

======================================================
BLOG
======================================================

Recreate:

cards

spacing

heading hierarchy

button

pagination

search

categories

======================================================
NEWSLETTER
======================================================

Recreate exactly.

Input

Checkbox

Button

Grid background

Typography

======================================================
FOOTER
======================================================

Recreate:

layout

icons

spacing

links

typography

background

======================================================
TYPOGRAPHY
======================================================

Match the reference.

Do NOT substitute random fonts.

Find the closest Google Fonts.

Match:

font weight

letter spacing

line height

heading scale

======================================================
SPACING
======================================================

Copy the spacing system.

Every section should match.

Do not invent spacing.

======================================================
SHADOWS
======================================================

Recreate every shadow.

Offset shadows.

Thickness.

Color.

Blur.

======================================================
BUTTONS
======================================================

Every button should match.

Hover

Press

Focus

Radius

Shadow

======================================================
RESPONSIVE
======================================================

Desktop

Laptop

Tablet

Mobile

The responsive layout should match the original website instead of using generic responsive behaviour.

======================================================
ANIMATIONS
======================================================

Match the original.

Fade

Hover

Scroll

Marquee

Reveal

Buttons

======================================================
ASSETS
======================================================

If images cannot legally be copied, use royalty-free images with nearly identical composition, colors, framing and proportions.

Use SVG illustrations similar to the reference.

======================================================
IMPORTANT
======================================================

Do NOT create your own layout.

Do NOT improvise.

Do NOT simplify.

Do NOT interpret.

Reverse engineer the website.

Recreate it.

======================================================
FINAL QA
======================================================

Before finishing:

Compare every section against the reference website.

Compare spacing.

Compare typography.

Compare colors.

Compare margins.

Compare paddings.

Compare button sizes.

Compare shadows.

Compare responsiveness.

Fix every difference.

Do not stop until the recreated website is visually as close as possible to the original.

Generate a complete production-ready React + TypeScript + Vite project.

task - 2

Your analysis is a good start, but do NOT begin implementation yet.

I want a much deeper reverse-engineering report before any code changes.

Please revise this plan with the following improvements.

---

# 1. No Estimates

Do not use phrases like:

- approximately
- similar
- closest
- looks like
- should be
- likely

Instead, inspect the reference page carefully and document the actual values wherever possible.

---

# 2. Expand the Design System

In addition to colors and fonts, extract:

- container max width
- section widths
- navbar height
- hero height
- footer height
- card widths
- card heights
- image aspect ratios
- badge sizes
- button heights
- border thickness
- border radius values
- shadow offsets
- shadow spread
- shadow blur
- spacing scale
- margin scale
- padding scale
- z-index hierarchy
- line heights
- letter spacing
- font weights
- icon sizes
- illustration sizes

I want a complete design token system.

---

# 3. Section-by-Section Reverse Engineering

For every page (Home, Blog, About, Contact), create a breakdown for each section containing:

- layout
- dimensions
- alignment
- spacing
- typography
- colors
- shadows
- borders
- images
- badges
- decorative elements
- responsive behavior
- hover effects
- animations
- component hierarchy

Nothing should be omitted.

---

# 4. Navbar Analysis

Do not only describe the navbar.

Document:

- total height
- container width
- horizontal padding
- vertical padding
- logo diameter
- navigation spacing
- CTA dimensions
- shadow values
- border thickness
- sticky offset
- scroll behavior
- hover transitions
- active state styling

---

# 5. Hero Analysis

Provide a complete hero specification including:

- section height
- left/right column proportions
- heading width
- heading font size
- heading weight
- heading line height
- heading letter spacing
- skew/italic angle
- illustration positions
- illustration sizes
- floating badge positions
- badge dimensions
- badge colors
- badge shadows
- decorative graphics
- scroll indicator position
- spacing between every element

---

# 6. Component Inventory

Before implementation, generate a reusable component inventory.

List every component that should exist.

Example:

Navbar

Button

Badge

SectionLabel

Hero

BookIllustration

BlogCard

NewsletterForm

Footer

Container

Input

SectionHeading

Marquee

GenreCard

AboutSection

ContactForm

ScrollIndicator

etc.

Mark which existing components can be reused and which require refactoring.

---

# 7. Asset Audit

Identify every asset required.

Separate them into:

Can be recreated as SVG

Needs royalty-free replacement

Needs custom illustration

Needs placeholder until replaced

Do not use random Unsplash images if the reference uses illustrations or styled graphics.

---

# 8. Motion Analysis

Document every animation.

Include:

- duration
- easing
- delay
- trigger
- hover behavior
- entrance animations
- marquee speed
- button interactions
- scrolling behavior

---

# 9. Responsive Analysis

Analyze separately for:

Desktop

Laptop

Tablet

Mobile

Document exactly how each section changes across breakpoints.

Do not assume generic responsive layouts.

---

# 10. Implementation Roadmap

Instead of one large implementation, divide the work into phases:

Phase 1 — Design Tokens

Phase 2 — Global Styles

Phase 3 — Shared Components

Phase 4 — Navigation

Phase 5 — Home

Phase 6 — Blog

Phase 7 — About

Phase 8 — Contact

Phase 9 — Footer

Phase 10 — Final Responsive Refinement

Phase 11 — Accessibility

Phase 12 — Performance Optimization

Phase 13 — Final Pixel-Perfect QA

---

# 11. Final QA Checklist

Before writing code, produce a QA checklist that compares the recreated site against the reference.

Include:

✓ Colors

✓ Typography

✓ Layout

✓ Spacing

✓ Margins

✓ Padding

✓ Borders

✓ Shadows

✓ Radius

✓ Buttons

✓ Icons

✓ Images

✓ Illustrations

✓ Navbar

✓ Hero

✓ Blog

✓ About

✓ Contact

✓ Footer

✓ Responsiveness

✓ Animations

✓ Accessibility

✓ Performance

---

Only after completing this expanded reverse-engineering report should you begin implementation.

The objective is a production-ready recreation with **99%+ visual fidelity**, maintaining clean, reusable React + TypeScript architecture while preserving the existing project structure wherever possible.# ADDITIONAL REQUIREMENTS — DO NOT SKIP ANY ITEM

Treat the following as mandatory acceptance criteria. Do not ask me what to do next unless you have completed every applicable item.

---

# PROJECT RULES

- Do NOT redesign the website.
- Do NOT modernize the UI.
- Do NOT simplify layouts.
- Do NOT substitute your own design decisions.
- Prioritize visual fidelity over creativity.
- Preserve the existing React + TypeScript + Vite project architecture whenever possible.
- Refactor only where necessary to achieve visual parity.
- Write clean, reusable, production-quality code.
- Avoid duplicated code.
- Follow React best practices.
- Keep components modular.
- Maintain strict TypeScript typing.
- Ensure accessibility is not degraded.
- Optimize for performance.

---

# COMPLETE VISUAL AUDIT

Reverse engineer every page completely.

Inspect:

□ Navbar
□ Hero
□ About
□ Blog
□ Blog Details
□ Contact
□ Newsletter
□ Footer
□ Privacy Policy
□ Accessibility
□ 404 Page

For every section extract:

□ Width
□ Height
□ Padding
□ Margin
□ Gap
□ Alignment
□ Typography
□ Font family
□ Font size
□ Font weight
□ Letter spacing
□ Line height
□ Colors
□ Background
□ Border
□ Border radius
□ Border thickness
□ Shadow
□ Shadow offset
□ Shadow blur
□ Hover effects
□ Focus states
□ Active states
□ Animations
□ Decorative elements
□ Image sizes
□ Illustration sizes
□ Badge positions
□ Z-index
□ Responsive behavior

---

# DESIGN TOKENS

Create reusable design tokens for:

□ Colors
□ Typography
□ Font scale
□ Spacing scale
□ Border radius
□ Borders
□ Shadows
□ Animation durations
□ Transition timings
□ Z-index
□ Container widths
□ Breakpoints

Use CSS variables and Tailwind theme extensions where appropriate.

---

# GLOBAL STYLES

Verify and update:

□ index.html
□ theme-color
□ Fonts
□ globals.css
□ Tailwind config
□ CSS variables
□ Utility classes

---

# COMPONENT REVIEW

Review every existing component.

Determine:

□ Reusable
□ Needs modification
□ Needs replacement
□ Can be removed

Review:

□ Navbar
□ Footer
□ Button
□ BlogCard
□ Newsletter
□ Marquee
□ Hero
□ SectionLabel
□ Badge
□ Input
□ Container
□ BookIllustrations
□ ContactForm
□ SectionHeading
□ ScrollIndicator

Do not create duplicate components.

---

# PAGE IMPLEMENTATION

Home

□ Hero
□ About
□ Blog Highlights
□ Genre Spotlight
□ Newsletter
□ Footer

Blog

□ Hero
□ Search
□ Categories
□ Blog Feed
□ Pagination
□ Footer

Blog Details

□ Header
□ Metadata
□ Content
□ Related Posts
□ Footer

About

□ Hero
□ Biography
□ Philosophy
□ Timeline (if applicable)
□ CTA
□ Footer

Contact

□ Hero
□ Contact Card
□ Contact Form
□ Footer

Privacy Policy

□ Typography
□ Layout
□ Footer

Accessibility

□ Typography
□ Layout
□ Footer

404

□ Illustration
□ Heading
□ CTA

---

# NAVBAR

Verify:

□ Height
□ Width
□ Sticky behavior
□ Border
□ Shadow
□ Logo
□ Navigation spacing
□ Active link
□ Hover
□ Mobile navigation
□ CTA button
□ Scroll state

---

# HERO

Verify:

□ Height
□ Heading size
□ Heading width
□ Font
□ Italic angle
□ Illustration placement
□ Floating badges
□ Decorative SVGs
□ Background
□ Scroll indicator
□ Responsive layout

---

# BUTTON SYSTEM

Every button must include:

□ Default state
□ Hover state
□ Focus state
□ Active state
□ Disabled state
□ Correct border
□ Correct shadow
□ Correct radius
□ Correct typography
□ Correct spacing

---

# CARD SYSTEM

Verify:

□ Radius
□ Border
□ Shadow
□ Padding
□ Typography
□ Hover
□ Image ratio
□ Spacing

---

# FORMS

Verify:

□ Input height
□ Border
□ Radius
□ Placeholder
□ Focus state
□ Error state
□ Button alignment
□ Validation UI

---

# FOOTER

Verify:

□ Layout
□ Typography
□ Icons
□ Contact info
□ Links
□ Copyright
□ Responsive layout

---

# RESPONSIVE REVIEW

Desktop

□ 1920px
□ 1600px
□ 1440px

Laptop

□ 1366px
□ 1280px

Tablet

□ 1024px
□ 768px

Mobile

□ 430px
□ 390px
□ 375px
□ 360px
□ 320px

Do not rely on generic Tailwind defaults. Match the reference site's responsive behavior.

---

# ACCESSIBILITY

Verify:

□ Semantic HTML
□ Heading hierarchy
□ Alt text
□ Keyboard navigation
□ Focus visibility
□ ARIA labels where appropriate
□ Color contrast
□ Form labels

---

# PERFORMANCE

Verify:

□ Lazy loading
□ Image optimization
□ SVG optimization
□ Bundle size
□ Tree shaking
□ Dynamic imports where appropriate
□ Avoid unnecessary re-renders

---

# CODE QUALITY

Ensure:

□ Strict TypeScript
□ No `any` unless justified
□ No duplicated logic
□ Reusable utilities
□ Consistent naming
□ Clean folder structure
□ No dead code
□ No unused imports
□ No console.log statements

---

# TESTING

Before considering the project complete:

□ npm install
□ npm run lint (if configured)
□ npm run typecheck (if configured)
□ npm run build
□ npm run preview

Resolve every warning and every error.

---

# FINAL VISUAL QA

Perform a final comparison against the reference website.

Review every page side-by-side.

Compare:

□ Colors
□ Typography
□ Layout
□ Spacing
□ Margins
□ Padding
□ Borders
□ Border radius
□ Shadows
□ Buttons
□ Cards
□ Images
□ SVG illustrations
□ Navigation
□ Hero
□ About
□ Blog
□ Contact
□ Newsletter
□ Footer
□ Responsive behavior
□ Animations

If any section is noticeably different from the reference, continue refining it before stopping.

---

# COMPLETION RULE

Do NOT stop after the first implementation.

Continue iterating until there are no significant visual differences remaining.

Treat this as a production-ready website recreation, not a prototype or first draft.

When all work is complete, provide:

1. A summary of all modified files.
2. A list of all newly created files.
3. A list of removed files (if any).
4. Any assumptions made due to unavailable assets.
5. Build verification results.
6. Remaining limitations (if any).
7. A final self-assessed visual fidelity score (0–100%) with justification for any differences.

Task - 3

# FINAL ACCEPTANCE CRITERIA (MANDATORY)

Do not consider this task complete until ALL of the following requirements have been satisfied.

---

## 1. Visual Fidelity

Target visual similarity: **99%+**

Compare every page against the reference website using side-by-side inspection.

Review:

- Overall layout
- Section heights
- Container widths
- Grid alignment
- Margins
- Padding
- Typography
- Font rendering
- Colors
- Borders
- Border radius
- Shadows
- Buttons
- Icons
- Images
- SVG illustrations
- Decorative elements
- Hover effects
- Animations
- Responsive layouts

If any noticeable differences remain, continue refining before stopping.

---

## 2. Pixel Consistency

Verify:

✓ Consistent spacing throughout

✓ Consistent typography

✓ Consistent border thickness

✓ Consistent shadow system

✓ Consistent radius system

✓ Consistent button styling

✓ Consistent section rhythm

Nothing should visually feel out of place.

---

## 3. Code Quality

Ensure:

✓ No duplicated code

✓ No inline style duplication

✓ Strict TypeScript

✓ No unnecessary re-renders

✓ No dead code

✓ No unused imports

✓ No console.log statements

✓ Reusable components

✓ Reusable design tokens

✓ Clean folder structure

---

## 4. Performance

Verify:

✓ Optimized SVGs

✓ Lazy-loaded large assets

✓ Optimized images

✓ Tree shaking

✓ Dynamic imports where appropriate

✓ No unnecessary bundle growth

---

## 5. Accessibility

Verify:

✓ Semantic HTML

✓ Correct heading hierarchy

✓ Keyboard navigation

✓ Visible focus states

✓ Accessible forms

✓ ARIA attributes where appropriate

✓ Alt text

✓ Sufficient color contrast

---

## 6. Responsive QA

Test and refine at:

1920px

1600px

1440px

1366px

1280px

1024px

768px

430px

390px

375px

360px

320px

Do not rely on generic responsive behavior.

Match the reference site's responsive layout as closely as possible.

---

## 7. Build Verification

Before finishing, execute and verify:

npm install

npm run lint (if configured)

npm run typecheck (if configured)

npm run build

npm run preview

Resolve every error and warning.

---

## 8. Final Self Review

Perform one complete review of the finished project as if you were a senior frontend reviewer.

Look for:

- Inconsistent spacing
- Typography mismatches
- Incorrect colors
- Wrong shadows
- Incorrect alignment
- Missing hover effects
- Missing responsive adjustments
- Missing assets
- Incorrect animation timing

Fix every issue found before finishing.

---

## 9. Completion Report

When all work is complete, provide:

1. Files modified
2. Files created
3. Files removed
4. Design tokens added
5. Components added
6. Components refactored
7. Performance improvements
8. Accessibility improvements
9. Build verification results
10. Known limitations (if any)
11. Estimated visual fidelity percentage with justification

---

## 10. Stop Condition

Do NOT stop after the first implementation.

Continue iterating until there are no significant visual differences remaining.

Only consider the project complete when it is production-ready, builds successfully, and closely matches the reference website.

Task - 4

# FINAL DEPLOYMENT & MIGRATION (MANDATORY)

The website recreation is now complete.

DO NOT stop here.

I want to completely replace my existing production blog with this new website.

Treat the following as mandatory.

==========================================================
CURRENT WEBSITE
==========================================================

Current Production Blog

https://blog.sahayasavari.me

Current GitHub Repository

sahaya-savari/sahaya-savari.github.io

This repository currently powers my blog.

The new recreated website must completely replace it.

==========================================================
IMPORTANT
==========================================================

I DO NOT want:

Nomad Tome

Neo Node

Neo Blog

Antigravity branding

Any placeholder brand

Any demo company

Any fake author

Any fake identity

Any copied branding from the reference website.

The reference website is ONLY for visual inspiration.

The entire identity must become MY identity.

==========================================================
MY BRAND
==========================================================

Replace EVERYTHING with my identity.

Use:

Name

Sahaya Savari F

Brand

Sahaya Savari

Website

https://blog.sahayasavari.me

Portfolio

https://sahayasavari.me

GitHub

https://github.com/sahaya-savari

Author

Sahaya Savari

Role

AI & Data Analytics Student

Aspiring AI Engineer

Python Developer

Technical Writer

SEO Learner

Digital Marketing Learner

Every page should reflect MY identity.

==========================================================
CONTENT MIGRATION
==========================================================

I want ALL useful content from my old blog migrated.

Review the existing project.

Preserve wherever possible:

Blog posts

Categories

Tags

Reading time

Markdown

SEO metadata

URLs

Slugs

Images

Assets

Search index

RSS

Sitemap

robots.txt

favicon

manifest

Open Graph

Twitter Cards

Structured Data

If something cannot be migrated automatically,
list it in a migration report.

Do NOT silently delete anything.

==========================================================
URL PRESERVATION
==========================================================

Maintain existing URLs whenever possible.

Do not break links.

If URLs must change,

Create redirects.

Preserve SEO.

==========================================================
BACKUP
==========================================================

Before replacing anything,

Create a COMPLETE backup.

Create a branch:

legacy-blog

Commit every old file.

Push the branch.

Then create a Git Tag.

Example:

legacy-blog-v1

Then create a GitHub Release.

Release Name

Legacy Blog Archive

Description

Final backup of the original learning blog before replacing it with the new production website.

This release must allow me to restore the old website at any time.

==========================================================
NEW RELEASE
==========================================================

After migration,

Create a clean production commit.

Example

feat: launch new production blog website

Push to main.

Then create a new Git tag.

Example

v2.0.0

Then create a GitHub Release.

Example

Production Blog v2.0.0

Include release notes describing:

Major redesign

Visual overhaul

Improved performance

Improved SEO

Improved accessibility

New branding

Migration completed

==========================================================
REPOSITORY CLEANUP
==========================================================

Remove:

Unused assets

Unused components

Unused CSS

Unused images

Unused markdown

Dead code

Temporary files

Debug code

Console logs

Unused dependencies

==========================================================
SEO
==========================================================

Verify:

robots.txt

sitemap.xml

canonical URLs

OpenGraph

Twitter Cards

JSON-LD

BlogPosting schema

Breadcrumb schema

Person schema

Website schema

RSS

==========================================================
BUILD
==========================================================

Run

npm install

npm run lint

npm run typecheck

npm run build

npm run preview

Resolve every warning.

Resolve every error.

==========================================================
DEPLOYMENT
==========================================================

Deploy the finished production build.

Verify:

GitHub Pages

Custom domain

blog.sahayasavari.me

HTTPS

404 handling

SPA routing

RSS

Sitemap

Robots

==========================================================
FINAL QA
==========================================================

Compare:

Old Website

New Website

Ensure:

No missing content

No broken pages

No broken links

No missing images

No missing blog posts

No missing metadata

No missing SEO

No missing accessibility

==========================================================
FINAL REPORT
==========================================================

When finished provide:

1. Migration Report

2. Files Removed

3. Files Added

4. Files Modified

5. Git Commit Hash

6. Git Tag

7. GitHub Release Name

8. Deployment Status

9. Backup Branch Name

10. Backup Tag Name

11. Build Status

12. Lighthouse Scores

13. Accessibility Score

14. SEO Score

15. Performance Score

16. Remaining Limitations

17. Estimated Visual Fidelity

Do NOT consider the task complete until every requirement above has been satisfied.