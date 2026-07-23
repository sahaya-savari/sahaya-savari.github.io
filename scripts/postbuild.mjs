import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const contentDir = path.join(projectRoot, 'content');
const baseUrl = 'https://blog.sahayasavari.me';

// Helper to parse YAML frontmatter from MDX files
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yamlText = match[1];
  const data = {};
  let currentKey = null;
  let inList = false;

  yamlText.split(/\r?\n/).forEach((line) => {
    const keyValMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyValMatch) {
      const key = keyValMatch[1];
      let val = keyValMatch[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === 'true') val = true;
      if (val === 'false') val = false;
      if (val === '') {
        data[key] = [];
        currentKey = key;
        inList = true;
      } else {
        data[key] = val;
        currentKey = null;
        inList = false;
      }
    } else if (inList && line.trim().startsWith('-')) {
      let item = line.trim().slice(1).trim();
      if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
        item = item.slice(1, -1);
      }
      data[currentKey].push(item);
    }
  });
  return data;
}

// Helper to recursively get all MDX files
function getMdxFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdxFiles(filePath));
    } else if (filePath.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

// Load all posts dynamically
function loadPosts() {
  const files = getMdxFiles(contentDir);
  return files
    .map((filePath) => {
      const slug = path.basename(filePath, '.mdx');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const fm = parseFrontmatter(fileContent);
      const contentWithoutFm = fileContent.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
      return {
        slug,
        title: fm.title || slug,
        excerpt: fm.excerpt || '',
        category: fm.category || 'General',
        author: fm.author || 'Sahaya Savari F',
        date: fm.date || '',
        image: fm.image || `${baseUrl}/og-image.png`,
        draft: fm.draft ?? false,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        rawBody: contentWithoutFm,
      };
    })
    .filter((post) => !post.draft);
}

// Escape HTML utility
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Replace or inject meta tag in HTML head
function updateHeadMeta(html, { title, description, canonicalUrl, imageUrl }) {
  let updatedHtml = html;

  // Title
  if (title) {
    const escapedTitle = escapeHtml(title);
    updatedHtml = updatedHtml.replace(/<title>.*?<\/title>/i, `<title>${escapedTitle}</title>`);
    updatedHtml = updatedHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapedTitle}" />`);
    updatedHtml = updatedHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapedTitle}" />`);
  }

  // Description
  if (description) {
    const escapedDesc = escapeHtml(description);
    updatedHtml = updatedHtml.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapedDesc}" />`);
    updatedHtml = updatedHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapedDesc}" />`);
    updatedHtml = updatedHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapedDesc}" />`);
  }

  // Canonical
  if (canonicalUrl) {
    updatedHtml = updatedHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    updatedHtml = updatedHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  }

  // Image
  if (imageUrl) {
    updatedHtml = updatedHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />`);
    updatedHtml = updatedHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
  }

  return updatedHtml;
}

// Inject fallback content into <div id="root">
function injectRootContent(html, contentHtml) {
  return html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${contentHtml}</div>`
  );
}

// Main postbuild process
function postbuild() {
  console.log('🚀 Running SEO post-build route & feed generator...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const rawDistHtml = fs.readFileSync(indexPath, 'utf8');
  const baseHtmlTemplate = rawDistHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');

  const posts = loadPosts();
  console.log(`📦 Found ${posts.length} published blog posts from MDX.`);

  // 1. Generate Homepage dist/index.html
  const homePostsHtml = posts
    .map(
      (p) => `
      <article>
        <h3><a href="${baseUrl}/blog/${p.slug}">${escapeHtml(p.title)}</a></h3>
        <p>${escapeHtml(p.excerpt)}</p>
        <small>Category: ${escapeHtml(p.category)} | Date: ${escapeHtml(p.date)}</small>
      </article>`
    )
    .join('\n');

  const homeCrawlableHtml = `
    <header>
      <h1>Sahaya Savari Developer Blog — AI &amp; Software Engineering Knowledge Hub</h1>
      <nav>
        <a href="${baseUrl}/">Home</a> |
        <a href="${baseUrl}/blog">Blog</a> |
        <a href="${baseUrl}/categories">Categories</a> |
        <a href="${baseUrl}/about">About</a> |
        <a href="${baseUrl}/contact">Contact</a> |
        <a href="${baseUrl}/newsletter">Newsletter</a>
      </nav>
    </header>
    <main>
      <section>
        <h2>Welcome to Sahaya Savari's Technical Learning Notebook</h2>
        <p>
          Sahaya Savari Developer Blog is an enterprise-grade AI and Software Engineering knowledge hub. Our guides cover Artificial Intelligence, Machine Learning, Python, FastAPI, React 19, DevOps, and Tech Career Growth.
        </p>
      </section>
      <section>
        <h2>Featured Articles &amp; Technical Guides</h2>
        ${homePostsHtml}
      </section>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} Sahaya Savari F. All rights reserved.</p>
    </footer>
  `;

  let updatedHomeHtml = updateHeadMeta(baseHtmlTemplate, {
    title: 'Sahaya Savari Developer Blog — AI & Software Engineering Knowledge Hub',
    description: 'World-class technical articles on Artificial Intelligence, Python, React, DevOps, and Software Engineering Career Growth by Sahaya Savari F.',
    canonicalUrl: `${baseUrl}/`,
    imageUrl: `${baseUrl}/og-image.png`,
  });
  updatedHomeHtml = injectRootContent(updatedHomeHtml, homeCrawlableHtml);
  fs.writeFileSync(indexPath, updatedHomeHtml, 'utf8');
  console.log('✅ Generated root / (dist/index.html)');

  // Static routes
  const staticRoutes = [
    {
      path: 'blog',
      title: 'Blog Articles & Technical Guides — Sahaya Savari',
      description: 'Explore all technical articles and deep dives on AI & ML, Python, React 19, DevOps, and Software Engineering by Sahaya Savari F.',
      contentHtml: `<header><h1>Blog Articles &amp; Technical Guides</h1></header><main><section>${homePostsHtml}</section></main>`,
    },
    {
      path: 'about',
      title: 'About — Sahaya Savari F',
      description: 'Learn about Sahaya Savari F, AI Engineer & M.Sc. AI student authoring long-form technical guides on AI, Python, React, and DevOps.',
      contentHtml: `<main><h1>About Sahaya Savari F</h1><p>AI Engineer and M.Sc. Artificial Intelligence student building machine learning systems and full-stack software.</p></main>`,
    },
    {
      path: 'contact',
      title: 'Contact — Sahaya Savari F',
      description: 'Get in touch with Sahaya Savari F for technical collaborations or inquiries.',
      contentHtml: `<main><h1>Contact Sahaya Savari F</h1><p>Email: contact@sahayasavari.me</p></main>`,
    },
    {
      path: 'categories',
      title: 'Categories & Topic Clusters — Sahaya Savari',
      description: 'Browse programming guides by category: AI & Machine Learning, Python, React & Web, DevOps & Cloud, and Career Growth.',
      contentHtml: `<main><h1>Categories &amp; Topic Clusters</h1></main>`,
    },
    {
      path: 'newsletter',
      title: 'Newsletter — Sahaya Savari',
      description: 'Subscribe to weekly technical guides on AI Engineering, Python, and Full Stack Web Architecture.',
      contentHtml: `<main><h1>Subscribe to Technical Insights</h1></main>`,
    },
    {
      path: 'privacy-policy',
      title: 'Privacy Policy — Sahaya Savari',
      description: 'Privacy Policy for Sahaya Savari Developer Blog.',
      contentHtml: `<main><h1>Privacy Policy</h1></main>`,
    },
    {
      path: 'accessibility',
      title: 'Accessibility Statement — Sahaya Savari',
      description: 'Accessibility Statement for Sahaya Savari Developer Blog.',
      contentHtml: `<main><h1>Accessibility Statement</h1></main>`,
    },
  ];

  // Generate static routes
  staticRoutes.forEach((route) => {
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    let routeHtml = updateHeadMeta(baseHtmlTemplate, {
      title: route.title,
      description: route.description,
      canonicalUrl: `${baseUrl}/${route.path}`,
      imageUrl: `${baseUrl}/og-image.png`,
    });
    routeHtml = injectRootContent(routeHtml, route.contentHtml);
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
    console.log(`✅ Generated /${route.path} (dist/${route.path}/index.html)`);
  });

  // Generate dynamic blog post routes
  posts.forEach((post) => {
    const postRoutePath = `blog/${post.slug}`;
    const postDir = path.join(distDir, 'blog', post.slug);
    fs.mkdirSync(postDir, { recursive: true });

    const postContentHtml = `
      <article>
        <header>
          <h1>${escapeHtml(post.title)}</h1>
          <p>Published on <time dateTime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time> by ${escapeHtml(post.author)} | Category: ${escapeHtml(post.category)}</p>
        </header>
        <section>
          <p><strong>Excerpt:</strong> ${escapeHtml(post.excerpt)}</p>
        </section>
        <footer>
          <p><a href="${baseUrl}/blog">&larr; Back to all articles</a></p>
        </footer>
      </article>`;

    let postHtml = updateHeadMeta(baseHtmlTemplate, {
      title: `${post.title} — Sahaya Savari Developer Blog`,
      description: post.excerpt,
      canonicalUrl: `${baseUrl}/${postRoutePath}`,
      imageUrl: post.image,
    });
    postHtml = injectRootContent(postHtml, postContentHtml);
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf8');
    console.log(`✅ Generated /${postRoutePath} (dist/${postRoutePath}/index.html)`);
  });

  // Generate dist/sitemap.xml
  const sitemapUrls = [
    `${baseUrl}/`,
    `${baseUrl}/blog`,
    `${baseUrl}/categories`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/newsletter`,
    ...posts.map((p) => `${baseUrl}/blog/${p.slug}`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✅ Generated dist/sitemap.xml');

  // Generate dist/feed.xml (RSS 2.0)
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sahaya Savari Developer Blog</title>
    <link>${baseUrl}</link>
    <description>AI Engineering, Python, React, DevOps &amp; Career Guides by Sahaya Savari F</description>
    <language>en-us</language>
    ${posts
      .map(
        (p) => `
    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <guid>${baseUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date || Date.now()).toUTCString()}</pubDate>
      <description>${escapeHtml(p.excerpt)}</description>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;
  fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf8');
  console.log('✅ Generated dist/feed.xml');

  // Generate dist/llms.txt
  const llmsTxt = `# Sahaya Savari Developer Blog

> World-Class AI & Software Engineering Knowledge Hub by Sahaya Savari F.
> Site URL: ${baseUrl}

## Knowledge Hub Topics & Cluster Guides

${posts.map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## Core Categories
- AI & Machine Learning (${baseUrl}/blog?category=ai-ml)
- Python & Backend (${baseUrl}/blog?category=python)
- React & Web Performance (${baseUrl}/blog?category=react)
- DevOps & Cloud Infrastructure (${baseUrl}/blog?category=devops)
- Career & Engineering Growth (${baseUrl}/blog?category=career)
`;
  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf8');
  console.log('✅ Generated dist/llms.txt');

  // Generate dist/llms-full.txt
  const llmsFullTxt = `# Sahaya Savari Developer Blog — Complete Content Repository

${posts
  .map(
    (p) => `
================================================================================
# ${p.title}
URL: ${baseUrl}/blog/${p.slug}
Category: ${p.category}
Date: ${p.date}
Author: ${p.author}
Summary: ${p.excerpt}

${p.rawBody}
`
  )
  .join('\n\n')}`;
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf8');
  console.log('✅ Generated dist/llms-full.txt');

  console.log('🎉 Post-build SEO, Sitemap, RSS & AI Search (LLMs) generation completed successfully!');
}

postbuild();
