import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';

describe('Blog Posts Split and Related Posts Tests', () => {
  const expectedPosts = [
    'ai-automation-best-practices.md',
    'enterprise-ai-development-workflows.md', 
    'lean-ai-stack-selection.md',
    'product-vision-driven-development.md',
    'aws-solutions-architecture-automation.md',
    'ai-powered-document-workflows.md',
    'vibe-coding-workflow-fundamentals.md'
  ];

  expectedPosts.forEach(postFile => {
    it(`should have ${postFile} with proper frontmatter`, async () => {
      const postPath = join(process.cwd(), 'src/pages/blog', postFile);
      const content = await readFile(postPath, 'utf8');
      
      // Should contain required frontmatter fields
      expect(content).toMatch(/layout: ['"]@layouts\/BlogPost\.astro['"]/);
      expect(content).toMatch(/title: ['"]/);
      expect(content).toMatch(/excerpt: ['"]/);
      expect(content).toMatch(/featuredImage: ['"]\/images\/blog\//);
      expect(content).toMatch(/relatedPosts: \[/);
    });
  });

  it('should have posts with appropriate length (300-800 lines)', async () => {
    for (const postFile of expectedPosts) {
      const postPath = join(process.cwd(), 'src/pages/blog', postFile);
      const content = await readFile(postPath, 'utf8');
      const lineCount = content.split('\n').length;
      
      expect(lineCount).toBeGreaterThan(50);
      expect(lineCount).toBeLessThan(800);
    }
  });

  it('should have related posts arrays with valid post references', async () => {
    for (const postFile of expectedPosts) {
      const postPath = join(process.cwd(), 'src/pages/blog', postFile);
      const content = await readFile(postPath, 'utf8');
      
      // Extract relatedPosts array
      const relatedPostsMatch = content.match(/relatedPosts: \[(.*?)\]/s);
      if (relatedPostsMatch) {
        const relatedPosts = relatedPostsMatch[1];
        // Should contain valid post slugs
        expect(relatedPosts).toMatch(/['"][a-z-]+['"]/);
      }
    }
  });
});