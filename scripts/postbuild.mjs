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
      return {
        slug,
        title: fm.title || slug,
        excerpt: fm.excerpt || '',
        category: fm.category || 'General',
        author: fm.author || 'Sahaya Savari',
        date: fm.date || '',
        image: fm.image || `${baseUrl}/og-image.png`,
        draft: fm.draft ?? false,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
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
  console.log('🚀 Running SEO post-build route generator...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const rawDistHtml = fs.readFileSync(indexPath, 'utf8');
  // Normalize base template so <div id="root"> is clean
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
      <h1>Sahaya Savari — Python, Git & AI Blog</h1>
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
          Sahaya Savari is a dedicated technical learning blog focused on empowering students, self-taught developers, and aspiring AI engineers. Our guides break down complex computer science concepts into clear, visual, and actionable tutorials. Whether you are getting started with Python programming, mastering database design with SQL, understanding Git and GitHub workflows, or exploring machine learning and artificial intelligence, this platform offers structured reading paths and practical code examples.
        </p>
        <p>
          Key core topics covered across our articles include core Python foundations, data visualization, web performance optimization with React and Vite, neural network mechanics, and software engineering best practices. Dive into our latest long-form tutorials to elevate your programming skill set.
        </p>
      </section>
      <section>
        <h2>Featured Articles & Programming Tutorials</h2>
        ${homePostsHtml}
      </section>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} Sahaya Savari F. All rights reserved.</p>
    </footer>
  `;

  let updatedHomeHtml = updateHeadMeta(baseHtmlTemplate, {
    title: 'Sahaya Savari — Python, Git & AI Blog',
    description: 'Technical learning blog by Sahaya Savari F, sharing practical guides on Python, Databases, Git, and Web Development.',
    canonicalUrl: `${baseUrl}/`,
    imageUrl: `${baseUrl}/og-image.png`,
  });
  updatedHomeHtml = injectRootContent(updatedHomeHtml, homeCrawlableHtml);
  fs.writeFileSync(indexPath, updatedHomeHtml, 'utf8');
  console.log('✅ Generated root / (dist/index.html)');

  // Define static routes
  const staticRoutes = [
    {
      path: 'blog',
      title: 'Blog Articles & Tutorials — Sahaya Savari',
      description: 'Explore all technical articles and tutorials on Python, React, AI, Machine Learning, and Git version control by Sahaya Savari.',
      contentHtml: `
        <header>
          <h1>Blog Articles &amp; Technical Guides</h1>
        </header>
        <main>
          <p>Browse our complete travelog of programming tutorials, data science explorations, and web development guides.</p>
          <section>
            ${homePostsHtml}
          </section>
        </main>`,
    },
    {
      path: 'about',
      title: 'About — Sahaya Savari',
      description: 'Learn about Sahaya Savari, AI & Data Analytics student, developer, and author of technical tutorials on Python, databases, and software engineering.',
      contentHtml: `
        <main>
          <h1>About Sahaya Savari</h1>
          <p>I am an AI &amp; Data Analytics student and aspiring AI engineer writing in-depth guides on Python programming, database modeling, software engineering workflows, and machine learning fundamentals.</p>
          <p>This blog serves as a public repository where technical concepts are broken down into intuitive mental models and step-by-step guides.</p>
        </main>`,
    },
    {
      path: 'contact',
      title: 'Contact — Sahaya Savari',
      description: 'Get in touch with Sahaya Savari for technical collaborations, questions on tutorials, or software engineering inquiries.',
      contentHtml: `
        <main>
          <h1>Contact Sahaya Savari</h1>
          <p>Have questions about a tutorial or interested in collaboration? Reach out through our official channels or connect via GitHub.</p>
        </main>`,
    },
    {
      path: 'categories',
      title: 'Categories & Topics — Sahaya Savari',
      description: 'Browse programming guides by topic: Python, Git & GitHub, React Web Development, and General Programming.',
      contentHtml: `
        <main>
          <h1>Categories &amp; Learning Tracks</h1>
          <ul>
            <li><strong>Python:</strong> Master Python from scratch to data analytics and AI.</li>
            <li><strong>Git &amp; GitHub:</strong> Version control tutorials, workflow guides, and open source collaboration.</li>
            <li><strong>Programming:</strong> Core programming concepts, logic building, and learning strategies.</li>
            <li><strong>React:</strong> Modern web development tutorials using React and Vite.</li>
          </ul>
        </main>`,
    },
    {
      path: 'newsletter',
      title: 'Newsletter — Sahaya Savari',
      description: 'Subscribe to the Sahaya Savari technical newsletter for weekly insights on Python, AI, React, and software engineering.',
      contentHtml: `
        <main>
          <h1>Subscribe to Technical Insights</h1>
          <p>Get notified whenever new Python, Git, or AI tutorials are published.</p>
        </main>`,
    },
    {
      path: 'privacy-policy',
      title: 'Privacy Policy — Sahaya Savari',
      description: 'Privacy Policy for the Sahaya Savari technical learning blog.',
      contentHtml: `<main><h1>Privacy Policy</h1><p>We respect your privacy. No personal data is tracked or sold.</p></main>`,
    },
    {
      path: 'accessibility',
      title: 'Accessibility Statement — Sahaya Savari',
      description: 'Accessibility Statement for the Sahaya Savari technical learning blog.',
      contentHtml: `<main><h1>Accessibility Statement</h1><p>We strive to make all content accessible to everyone.</p></main>`,
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
      title: `${post.title} — Sahaya Savari`,
      description: post.excerpt,
      canonicalUrl: `${baseUrl}/${postRoutePath}`,
      imageUrl: post.image,
    });
    postHtml = injectRootContent(postHtml, postContentHtml);
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf8');
    console.log(`✅ Generated /${postRoutePath} (dist/${postRoutePath}/index.html)`);
  });

  console.log('🎉 Post-build SEO route generation completed successfully!');
}

postbuild();
