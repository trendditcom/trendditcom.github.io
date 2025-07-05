import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';

describe('Blog Frontmatter Tests', () => {
  const blogPosts = [
    'vibe-coding.md',
    'coding-with-claude-code.md', 
    'solutions.md',
    'workflows.md',
    'writing.md'
  ];

  blogPosts.forEach(postFile => {
    it(`should have featuredImage in ${postFile}`, async () => {
      const postPath = join(process.cwd(), 'src/pages/blog', postFile);
      const content = await readFile(postPath, 'utf8');
      
      // Should contain featuredImage in frontmatter
      expect(content).toMatch(/featuredImage: ['"]/);
      expect(content).toMatch(/featuredImage: ['"]\/images\/blog\//);
    });
  });

  it('should have all required frontmatter fields', async () => {
    const postPath = join(process.cwd(), 'src/pages/blog/vibe-coding.md');
    const content = await readFile(postPath, 'utf8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    expect(frontmatterMatch).toBeTruthy();
    
    const frontmatter = frontmatterMatch![1];
    expect(frontmatter).toMatch(/layout: ['"]@layouts\/BlogPost\.astro['"]/);
    expect(frontmatter).toMatch(/title: ['"]/);
    expect(frontmatter).toMatch(/excerpt: ['"]/);
    expect(frontmatter).toMatch(/featuredImage: ['"]\/images\/blog\//);
  });
});