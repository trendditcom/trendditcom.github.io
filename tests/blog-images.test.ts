import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Blog Image References', () => {
  it('should have correct image paths in blog posts', () => {
    const blogPostPath = join(process.cwd(), 'src/pages/blog/coding-with-claude-code.md');
    const blogContent = readFileSync(blogPostPath, 'utf-8');
    
    // Extract all image references
    const imageMatches = blogContent.match(/!\[.*?\]\(([^)]+)\)/g) || [];
    
    imageMatches.forEach(match => {
      const imagePath = match.match(/!\[.*?\]\(([^)]+)\)/)?.[1];
      
      if (imagePath) {
        // Check if it's a relative path that should be absolute
        if (imagePath.startsWith('../') || imagePath.startsWith('./')) {
          expect(imagePath).not.toMatch(/^\.\.?\//);
        }
        
        // If it's an absolute path, check if the file exists
        if (imagePath.startsWith('/')) {
          const fullPath = join(process.cwd(), 'public', imagePath);
          expect(existsSync(fullPath)).toBe(true);
        }
      }
    });
  });
  
  it('should have claude-desktop-puppeteer-mcp-tools.png in the correct location', () => {
    const imagePath = join(process.cwd(), 'public/images/blog/claude-desktop-puppeteer-mcp-tools.png');
    expect(existsSync(imagePath)).toBe(true);
  });
});