import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';

describe('Blog Layout Tests', () => {
  it('should not display date in BlogPost layout', async () => {
    const blogPostPath = join(process.cwd(), 'src/layouts/BlogPost.astro');
    const content = await readFile(blogPostPath, 'utf8');
    
    // Should not contain date-related display code
    expect(content).not.toMatch(/toLocaleDateString/);
    expect(content).not.toMatch(/<time>/);
    expect(content).not.toMatch(/new Date\(date\)/);
  });

  it('should not display date in blog index layout', async () => {
    const blogIndexPath = join(process.cwd(), 'src/pages/blog/index.astro');
    const content = await readFile(blogIndexPath, 'utf8');
    
    // Should not contain date-related display code
    expect(content).not.toMatch(/<time.*toLocaleDateString/);
    expect(content).not.toMatch(/new Date\(post\.frontmatter\.date\)\.toLocaleDateString/);
  });

  it('should have date as optional in BlogPost Props interface', async () => {
    const blogPostPath = join(process.cwd(), 'src/layouts/BlogPost.astro');
    const content = await readFile(blogPostPath, 'utf8');
    
    // Date should be optional in Props interface within frontmatter
    expect(content).toMatch(/frontmatter:.*{[\s\S]*?date\?:/);
  });

  it('should sort blog posts by title instead of date', async () => {
    const blogIndexPath = join(process.cwd(), 'src/pages/blog/index.astro');
    const content = await readFile(blogIndexPath, 'utf8');
    
    // Should sort by title alphabetically instead of date
    expect(content).toMatch(/sort.*frontmatter\.title/);
    expect(content).not.toMatch(/sort.*new Date.*frontmatter\.date/);
  });

  it('should display featured images as thumbnails in blog index', async () => {
    const blogIndexPath = join(process.cwd(), 'src/pages/blog/index.astro');
    const content = await readFile(blogIndexPath, 'utf8');
    
    // Should contain featured image display code
    expect(content).toMatch(/post\.frontmatter\.featuredImage/);
    expect(content).toMatch(/src=\{post\.frontmatter\.featuredImage\}/);
  });

  it('should display featured images edge-to-edge in blog posts', async () => {
    const blogPostPath = join(process.cwd(), 'src/layouts/BlogPost.astro');
    const content = await readFile(blogPostPath, 'utf8');
    
    // Should contain featured image display code
    expect(content).toMatch(/featuredImage/);
    expect(content).toMatch(/src=\{featuredImage\}/);
  });

  it('should display Apple-style hero section with parallax and gradients', async () => {
    const blogPostPath = join(process.cwd(), 'src/layouts/BlogPost.astro');
    const content = await readFile(blogPostPath, 'utf8');
    
    // Should have Apple-style hero with parallax, gradients, and animations
    expect(content).toMatch(/relative.*min-h-screen.*overflow-hidden/);
    expect(content).toMatch(/bg-gradient-to-br/);
    expect(content).toMatch(/backdrop-blur/);
    expect(content).toMatch(/animate-fade-in/);
  });

  it('should include TableOfContents component in blog posts', async () => {
    const blogPostPath = join(process.cwd(), 'src/layouts/BlogPost.astro');
    const content = await readFile(blogPostPath, 'utf8');
    
    // Should import and use TableOfContents component
    expect(content).toMatch(/import TableOfContents from '@components\/TableOfContents\.vue'/);
    expect(content).toMatch(/<TableOfContents client:load \/>/);
  });
});