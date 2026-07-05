import type { BlogPost } from '../types';

type BlogCoverInput = Pick<BlogPost, 'title' | 'category' | 'image'> & {
  slug?: string;
  sourcePath?: string;
};

type BlogTheme = {
  background: string;
  panel: string;
  accent: string;
  secondary: string;
  grid: string;
  label: string;
  mark: string;
  pattern: 'python' | 'git' | 'react' | 'programming' | 'data' | 'generic';
};

const BLOG_THEMES: Array<{ matches: string[]; theme: BlogTheme }> = [
  {
    matches: ['python', 'machine learning', 'ai', 'neural', 'data science', 'visualization'],
    theme: {
      background: '#C1E5E7',
      panel: '#FCF9E0',
      accent: '#652929',
      secondary: '#DCD27D',
      grid: '#8ABFC4',
      label: 'Python',
      mark: 'PY',
      pattern: 'python',
    },
  },
  {
    matches: ['git', 'github'],
    theme: {
      background: '#FCF9E0',
      panel: '#FFFFFF',
      accent: '#652929',
      secondary: '#DCD27D',
      grid: '#D6C6BA',
      label: 'Git & GitHub',
      mark: 'GIT',
      pattern: 'git',
    },
  },
  {
    matches: ['react', 'vite', 'frontend', 'performance'],
    theme: {
      background: '#FCF9E0',
      panel: '#C1E5E7',
      accent: '#652929',
      secondary: '#DCD27D',
      grid: '#D8C8BB',
      label: 'React',
      mark: 'R',
      pattern: 'react',
    },
  },
  {
    matches: ['programming', 'javascript', 'js', 'web'],
    theme: {
      background: '#DCD27D',
      panel: '#FCF9E0',
      accent: '#652929',
      secondary: '#C1E5E7',
      grid: '#C6B956',
      label: 'Programming',
      mark: 'DEV',
      pattern: 'programming',
    },
  },
  {
    matches: ['sql', 'database', 'databases'],
    theme: {
      background: '#FCF9E0',
      panel: '#FFFFFF',
      accent: '#652929',
      secondary: '#C1E5E7',
      grid: '#D6C6BA',
      label: 'SQL & Data',
      mark: 'DB',
      pattern: 'data',
    },
  },
];

const localCoverModules = import.meta.glob<string>(
  [
    '../../content/**/*.{avif,webp,png,jpg,jpeg,svg}',
    '../assets/**/*.{avif,webp,png,jpg,jpeg,svg}',
  ],
  { eager: true, query: '?url', import: 'default' }
);

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function isRemoteOrDataImage(src: string): boolean {
  return /^(https?:)?\/\//i.test(src) || /^(data|blob):/i.test(src);
}

function isRootRelativeImage(src: string): boolean {
  return src.startsWith('/');
}

function resolveLocalImagePath(src: string, sourcePath?: string): string | undefined {
  const normalized = src.replace(/\\/g, '/').replace(/^\.\//, '');
  const normalizedWithoutPublic = normalized.replace(/^public\//, '/');

  if (normalizedWithoutPublic.startsWith('/')) {
    return normalizedWithoutPublic;
  }

  if (sourcePath) {
    const sourceDirectory = sourcePath.replace(/\\/g, '/').split('/').slice(0, -1).join('/');
    const expectedPath = `${sourceDirectory}/${normalized}`.replace(/\/\.\//g, '/');
    const directMatch = localCoverModules[expectedPath];

    if (directMatch) {
      return directMatch;
    }
  }

  const match = Object.entries(localCoverModules).find(([path]) => {
    const comparablePath = path.replace(/\\/g, '/').replace(/^\.\.\//, '');
    return comparablePath.endsWith(normalized) || comparablePath.endsWith(`/${normalized}`);
  });

  return match?.[1];
}

function resolveConventionCover(post: BlogCoverInput): string | undefined {
  const slug = post.slug ? normalizeSlug(post.slug) : normalizeSlug(post.title);
  const category = normalizeSlug(post.category);
  const candidates = Object.entries(localCoverModules);

  const slugMatch = candidates.find(([path]) => {
    const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
    const fileName = normalizedPath.split('/').pop()?.replace(/\.(avif|webp|png|jpe?g|svg)$/i, '');
    return fileName === slug || fileName === 'cover' && normalizedPath.includes(`/${slug}/`);
  });

  if (slugMatch) {
    return slugMatch[1];
  }

  const categoryMatch = candidates.find(([path]) => {
    const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
    const fileName = normalizedPath.split('/').pop()?.replace(/\.(avif|webp|png|jpe?g|svg)$/i, '');
    return fileName === category || fileName === 'cover' && normalizedPath.includes(`/${category}/`);
  });

  return categoryMatch?.[1];
}

function splitTitleIntoLines(title: string, maxLines = 2, maxCharsPerLine = 27): string[] {
  const words = title
    .replace(/^[^A-Za-z0-9]+/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) {
    return ['Untitled Post'];
  }

  const lines: string[] = [];
  let currentLine = '';
  let consumedWords = 0;

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }

    consumedWords += 1;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && currentLine) {
    lines.push(currentLine);
  }

  const remainingWords = words.slice(consumedWords);
  if (remainingWords.length > 0 && lines.length > 0) {
    const lastIndex = lines.length - 1;
    const combined = `${lines[lastIndex]} ${remainingWords.join(' ')}`.trim();
    lines[lastIndex] = `${combined.slice(0, maxCharsPerLine * 2 - 1).trimEnd()}...`;
  }

  return lines.slice(0, maxLines);
}

function resolveTheme(post: BlogCoverInput): BlogTheme {
  const haystack = `${post.category} ${post.title}`.toLowerCase();

  for (const preset of BLOG_THEMES) {
    if (preset.matches.some((match) => haystack.includes(match))) {
      return preset.theme;
    }
  }

  return {
    background: '#FCF9E0',
    panel: '#FFFFFF',
    accent: '#652929',
    secondary: '#DCD27D',
    grid: '#D6C6BA',
    label: post.category || 'Blog',
    mark: 'POST',
    pattern: 'generic',
  };
}

function buildPattern(theme: BlogTheme): string {
  switch (theme.pattern) {
    case 'python':
      return `
        <path d="M850 156h146c58 0 92 34 92 92v34H940c-40 0-65 24-65 60v88H733v-48c0-58 34-92 92-92h96v-42H765v-16c0-48 30-76 85-76Z" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="6" />
        <path d="M735 426h148c40 0 65-24 65-60v-88h142v48c0 58-34 92-92 92h-96v42h156v16c0 48-30 76-85 76H827c-58 0-92-34-92-92v-34Z" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="6" />
        <circle cx="838" cy="224" r="14" fill="${theme.accent}" />
        <circle cx="985" cy="486" r="14" fill="${theme.accent}" />
      `;
    case 'git':
      return `
        <path d="M910 138 1094 322 910 506 726 322 910 138Z" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="8" />
        <path d="M817 322h184M910 230v184M910 230l92 92" stroke="${theme.accent}" stroke-width="18" stroke-linecap="round" />
        <circle cx="817" cy="322" r="25" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <circle cx="910" cy="230" r="25" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <circle cx="1002" cy="322" r="25" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <circle cx="910" cy="414" r="25" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
      `;
    case 'react':
      return `
        <ellipse cx="910" cy="332" rx="224" ry="72" fill="none" stroke="${theme.accent}" stroke-width="8" />
        <ellipse cx="910" cy="332" rx="224" ry="72" fill="none" stroke="${theme.accent}" stroke-width="8" transform="rotate(60 910 332)" />
        <ellipse cx="910" cy="332" rx="224" ry="72" fill="none" stroke="${theme.accent}" stroke-width="8" transform="rotate(120 910 332)" />
        <circle cx="910" cy="332" r="42" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="8" />
      `;
    case 'programming':
      return `
        <rect x="724" y="152" width="384" height="322" rx="28" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <rect x="724" y="152" width="384" height="58" rx="28" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="8" />
        <path d="m830 296-70 58 70 58M1002 296l70 58-70 58M943 268l-66 172" stroke="${theme.accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="770" cy="181" r="9" fill="${theme.accent}" />
        <circle cx="802" cy="181" r="9" fill="${theme.accent}" />
        <circle cx="834" cy="181" r="9" fill="${theme.accent}" />
      `;
    case 'data':
      return `
        <rect x="738" y="172" width="332" height="330" rx="28" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <path d="M800 422V302M904 422V246M1008 422V338" stroke="${theme.accent}" stroke-width="32" stroke-linecap="round" />
        <path d="M782 238h244M782 458h244" stroke="${theme.accent}" stroke-width="10" stroke-linecap="round" opacity="0.25" />
      `;
    case 'generic':
      return `
        <rect x="748" y="160" width="336" height="360" rx="34" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="8" />
        <path d="M812 252h208M812 316h176M812 380h208" stroke="${theme.accent}" stroke-width="18" stroke-linecap="round" opacity="0.72" />
        <rect x="812" y="424" width="118" height="42" rx="21" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="6" />
      `;
  }
}

export function buildBlogFallbackCover(post: BlogCoverInput): string {
  const theme = resolveTheme(post);
  const titleLines = splitTitleIntoLines(post.title);
  const titleTspans = titleLines
    .map((line, index) => {
      const dy = index === 0 ? '0' : '1.16em';
      return `<tspan x="80" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" fill="none" role="img" aria-label="${escapeXml(theme.label)} cover">
      <rect width="1200" height="675" fill="${theme.background}" />
      <path d="M0 0h1200v675H0V0Z" fill="url(#grid)" opacity="0.28" />
      <rect x="36" y="36" width="1128" height="603" rx="34" fill="none" stroke="${theme.accent}" stroke-width="8" />
      <rect x="62" y="62" width="1076" height="551" rx="24" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.22" />
      <rect x="80" y="82" width="300" height="50" rx="25" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="6" />
      <text x="108" y="115" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="0.18em">${escapeXml(theme.label.toUpperCase())}</text>
      <text x="80" y="278" fill="${theme.accent}" font-family="Impact, Haettenschweiler, 'Arial Black', sans-serif" font-size="76" font-weight="900" letter-spacing="0">
        ${titleTspans}
      </text>
      <rect x="80" y="482" width="430" height="72" rx="36" fill="${theme.panel}" stroke="${theme.accent}" stroke-width="6" />
      <text x="112" y="527" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="0.12em">SAHAYA SAVARI BLOG</text>
      <circle cx="1038" cy="126" r="42" fill="${theme.secondary}" stroke="${theme.accent}" stroke-width="6" />
      <text x="1038" y="136" text-anchor="middle" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="900">${escapeXml(theme.mark)}</text>
      ${buildPattern(theme)}
      <defs>
        <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" stroke="${theme.grid}" stroke-width="2" />
        </pattern>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function resolveBlogCoverImage(post: BlogCoverInput): string {
  const trimmedImage = post.image?.trim();

  if (trimmedImage) {
    if (isRemoteOrDataImage(trimmedImage) || isRootRelativeImage(trimmedImage)) {
      return trimmedImage;
    }

    const localFrontmatterImage = resolveLocalImagePath(trimmedImage, post.sourcePath);
    if (localFrontmatterImage) {
      return localFrontmatterImage;
    }
  }

  return resolveConventionCover(post) ?? buildBlogFallbackCover(post);
}

export function resolveBlogFallbackCover(post: BlogCoverInput): string {
  return resolveConventionCover(post) ?? buildBlogFallbackCover(post);
}

export function resolveChapterEmoji(title: string, level: number, index: number): string {
  const normalized = title.toLowerCase();

  if (normalized.includes('introduction')) return 'Intro';
  if (normalized.includes('install')) return 'Setup';
  if (normalized.includes('concept') || normalized.includes('what is')) return 'Idea';
  if (normalized.includes('table') || normalized.includes('comparison')) return 'Chart';
  if (normalized.includes('code') || normalized.includes('terminal')) return 'Code';
  if (normalized.includes('branch') || normalized.includes('workflow')) return 'Flow';
  if (normalized.includes('api') || normalized.includes('network')) return 'Link';
  if (normalized.includes('security') || normalized.includes('auth')) return 'Lock';
  if (normalized.includes('faq')) return 'FAQ';
  if (normalized.includes('summary') || normalized.includes('conclusion')) return 'End';
  if (normalized.includes('example')) return 'Lab';
  if (normalized.includes('tip') || normalized.includes('note')) return 'Tip';

  if (level === 2) {
    return index % 2 === 0 ? 'Read' : 'Learn';
  }

  return index % 2 === 0 ? '-' : '+';
}
