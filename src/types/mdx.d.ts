declare module '*.mdx' {
  import type { ComponentType } from 'react';
  
  export interface BlogPostFrontmatter {
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
  }

  export const frontmatter: BlogPostFrontmatter;
  const Component: ComponentType<any>;
  export default Component;
}
