import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

describe('Blog Image References', () => {
  it('should have correct image paths in all blog posts', () => {
    const blogDir = join(process.cwd(), 'src/pages/blog');
    const blogFiles = readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    blogFiles.forEach(file => {
      const blogPostPath = join(blogDir, file);
      const blogContent = readFileSync(blogPostPath, 'utf-8');
      
      // Extract all image references
      const imageMatches = blogContent.match(/!\[.*?\]\(([^)]+)\)/g) || [];
      
      imageMatches.forEach(match => {
        const imagePath = match.match(/!\[.*?\]\(([^)]+)\)/)?.[1];
        
        if (imagePath) {
          // Check if it's a relative path that should be absolute
          if (imagePath.startsWith('../') || imagePath.startsWith('./')) {
            expect(imagePath, `Relative path found in ${file}: ${imagePath}`).not.toMatch(/^\.\.?\//);
          }
          
          // If it's an absolute path, check if the file exists
          if (imagePath.startsWith('/')) {
            const fullPath = join(process.cwd(), 'public', imagePath);
            expect(existsSync(fullPath), `Image not found for ${file}: ${imagePath}`).toBe(true);
          }
        }
      });
    });
  });
  
  it('should have all required images in the correct location', () => {
    const requiredImages = [
      'claude-desktop-puppeteer-mcp-tools.png',
      'first-sprint-generation.png'
    ];
    
    requiredImages.forEach(image => {
      const imagePath = join(process.cwd(), 'public/images/blog', image);
      expect(existsSync(imagePath), `Required image not found: ${image}`).toBe(true);
    });
  });
});