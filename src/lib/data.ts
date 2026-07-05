import type { BlogPost, Category, Comment, Testimonial, TimelineEvent, Skill, Achievement } from '../types';

export const categories: Category[] = [
  {
    "id": "1",
    "name": "Python",
    "slug": "python",
    "description": "Master Python from scratch to data analytics and AI.",
    "color": "#3776AB",
    "icon": "Code",
    "postCount": 4
  },
  {
    "id": "2",
    "name": "Git & GitHub",
    "slug": "github",
    "description": "Version control tutorials, workflow guides, and open source collaboration.",
    "color": "#181717",
    "icon": "GitBranch",
    "postCount": 1
  },
  {
    "id": "3",
    "name": "Programming",
    "slug": "programming",
    "description": "Core programming concepts, logic building, and learning strategies.",
    "color": "#E9DA79",
    "icon": "BookOpen",
    "postCount": 1
  },
  {
    "id": "4",
    "name": "React",
    "slug": "react",
    "description": "Modern web development tutorials using React and Vite.",
    "color": "#61DAFB",
    "icon": "Layers",
    "postCount": 2
  }
];

export const comments: Comment[] = [
  {
    "id": "1",
    "name": "Riya Sharma",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "date": "2026-06-30",
    "content": "This guide is amazing! I was always confused about Virtual Environments in Python, but your bubble analogy made it click. Thanks!"
  },
  {
    "id": "2",
    "name": "Alex Chen",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "date": "2026-06-29",
    "content": "Absolutely love the detailed Git log section. Highly practical and visually clean."
  }
];

export const testimonials: Testimonial[] = [
  {
    "id": "1",
    "name": "Riya Sharma",
    "role": "Student peer",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "content": "Sahaya's Python guides are the most beginner-friendly tutorials I've ever read. The analogies are perfect.",
    "rating": 5
  },
  {
    "id": "2",
    "name": "Alex Chen",
    "role": "Aspiring developer",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "content": "I finally understood Git branching thanks to the visual lifecycle diagrams in these posts. Extremely helpful!",
    "rating": 5
  },
  {
    "id": "3",
    "name": "Priya Patel",
    "role": "Tech blogger",
    "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "content": "The clean layout and searchable topics list make finding tutorials incredibly fast and responsive.",
    "rating": 5
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    "year": "2023",
    "title": "College & AI Studies",
    "description": "Entered college to study AI & Data Analytics, starting my technical journey."
  },
  {
    "year": "2024",
    "title": "Python & Database Mastery",
    "description": "Deep-dived into Python programming, database modeling, and automated data processing."
  },
  {
    "year": "2025",
    "title": "Technical Blog Launch",
    "description": "Launched my personal learning blog blog.sahayasavari.me to share practical tutorials with other students."
  },
  {
    "year": "2026",
    "title": "Production Blog Overhaul",
    "description": "Redesigned the entire blog platform with high-fidelity Wix layouts, and expanded posts on Git, React, and Machine Learning."
  }
];

export const skills: Skill[] = [
  {
    "name": "Python Programming",
    "level": 90
  },
  {
    "name": "Data Analytics",
    "level": 85
  },
  {
    "name": "SQL & Databases",
    "level": 80
  },
  {
    "name": "Git & GitHub Workflow",
    "level": 85
  },
  {
    "name": "React Web Dev",
    "level": 75
  },
  {
    "name": "Technical Writing",
    "level": 88
  }
];

export const achievements: Achievement[] = [
  {
    "title": "Tutorials Written",
    "value": "9+",
    "description": "In-depth long-form guides"
  },
  {
    "title": "GitHub Repos",
    "value": "30+",
    "description": "Personal and academic code"
  },
  {
    "title": "Languages",
    "value": "3+",
    "description": "Python, SQL, JS"
  },
  {
    "title": "Years Learning",
    "value": "3+",
    "description": "AI & Web development"
  }
];

/* ── MDX Content Loader ───────────────────────────────────────────────── */

interface MDXModule {
  default: React.ComponentType<any>;
  frontmatter: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorAvatar: string;
    date: string;
    readingTime: number;
    image: string;
    featured: boolean;
    tags: string[];
    draft?: boolean;
  };
}

// 1. Eagerly load MDX compiled modules
const mdxModules = import.meta.glob<MDXModule>('../../content/**/*.mdx', { eager: true });

// 2. Eagerly load raw MDX text for TOC/search compatibility
const rawModules = import.meta.glob('../../content/**/*.mdx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// 3. Map the MDX posts
export const blogPosts: BlogPost[] = Object.entries(mdxModules)
  .map(([path, module]) => {
    const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || '';
    const fm = module.frontmatter;
    return {
      id: fm.id,
      slug: slug,
      title: fm.title,
      excerpt: fm.excerpt,
      content: rawModules[path + '?raw'] || '', // raw Markdown string for backward compatibility
      category: fm.category,
      author: fm.author,
      authorAvatar: fm.authorAvatar,
      date: fm.date,
      readingTime: fm.readingTime,
      image: fm.image,
      featured: fm.featured,
      tags: fm.tags,
      draft: fm.draft ?? false,
    };
  })
  .filter(post => !post.draft);

// 4. Component lookup maps
export const postComponents: Record<string, React.ComponentType<any>> = {};

Object.entries(mdxModules).forEach(([path, module]) => {
  const slug = path.split('/').pop()?.replace(/\.mdx$/, '') || '';
  postComponents[slug] = module.default;
});
