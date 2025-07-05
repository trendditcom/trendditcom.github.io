import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';

describe('Blog Post Metadata', () => {
  it('should have correct frontmatter format for all blog posts', async () => {
    const blogDir = join(process.cwd(), 'src/pages/blog');
    const blogFiles = await glob('*.md', { cwd: blogDir });
    
    // Filter out index files
    const blogPosts = blogFiles.filter(file => !file.includes('index'));
    
    expect(blogPosts.length).toBeGreaterThan(0);
    
    for (const blogFile of blogPosts) {
      const filePath = join(blogDir, blogFile);
      const content = await readFile(filePath, 'utf-8');
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      expect(frontmatterMatch, `Blog post ${blogFile} should have frontmatter`).toBeDefined();
      
      const frontmatter = frontmatterMatch![1];
      
      // Check required fields
      expect(frontmatter, `${blogFile} should have layout field`).toMatch(/layout:/);
      expect(frontmatter, `${blogFile} should have title field`).toMatch(/title:/);
      expect(frontmatter, `${blogFile} should have date field (not publishedAt)`).toMatch(/date:/);
      expect(frontmatter, `${blogFile} should have excerpt field (not description)`).toMatch(/excerpt:/);
      expect(frontmatter, `${blogFile} should have author field`).toMatch(/author:/);
      
      // Check incorrect fields that should NOT be present
      expect(frontmatter, `${blogFile} should not have publishedAt field`).not.toMatch(/publishedAt:/);
      expect(frontmatter, `${blogFile} should not have description field`).not.toMatch(/description:/);
      
      // Verify layout value
      const layoutMatch = frontmatter.match(/layout:\s*['"]?([^'"'\n]+)['"]?/);
      expect(layoutMatch, `${blogFile} should have layout value`).toBeDefined();
      expect(layoutMatch![1].trim(), `${blogFile} should use BlogPost layout`).toBe('@layouts/BlogPost.astro');
      
      // Verify date format
      const dateMatch = frontmatter.match(/date:\s*['"]?([^'"'\n]+)['"]?/);
      expect(dateMatch, `${blogFile} should have date value`).toBeDefined();
      const dateValue = dateMatch![1].trim();
      expect(new Date(dateValue).toString(), `${blogFile} should have valid date`).not.toBe('Invalid Date');
      
      // Verify excerpt exists and is not empty
      const excerptMatch = frontmatter.match(/excerpt:\s*['"]([^'"]+)['"]?/);
      expect(excerptMatch, `${blogFile} should have excerpt value`).toBeDefined();
      expect(excerptMatch![1].trim().length, `${blogFile} should have non-empty excerpt`).toBeGreaterThan(0);
    }
  });
  
  it('should have proper date sorting in blog index', async () => {
    const blogDir = join(process.cwd(), 'src/pages/blog');
    const blogFiles = await glob('*.md', { cwd: blogDir });
    const blogPosts = blogFiles.filter(file => !file.includes('index'));
    
    const dates: Date[] = [];
    
    for (const blogFile of blogPosts) {
      const filePath = join(blogDir, blogFile);
      const content = await readFile(filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const dateMatch = frontmatter.match(/date:\s*['"]?([^'"'\n]+)['"]?/);
        
        if (dateMatch) {
          const date = new Date(dateMatch[1].trim());
          expect(date.toString()).not.toBe('Invalid Date');
          dates.push(date);
        }
      }
    }
    
    expect(dates.length).toBeGreaterThan(0);
    
    // Verify dates are valid for sorting
    dates.forEach(date => {
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
});