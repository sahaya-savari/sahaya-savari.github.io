export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readingTime: number;
  image: string;
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  postCount: number;
}

export interface Comment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Achievement {
  title: string;
  value: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
}
