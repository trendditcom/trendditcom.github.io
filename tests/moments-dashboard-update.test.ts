import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import fs from 'fs';
import path from 'path';

describe('Moments Dashboard and Analytics Update', () => {
  
  describe('Hero Component Updates', () => {
    it('should feature Moments dashboard and knowledge graph in hero banner', async () => {
      const heroPath = path.join(process.cwd(), 'src/components/Hero.vue');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      
      // Check for dashboard and analytics mentions
      expect(heroContent).toContain('dashboard');
      expect(heroContent).toContain('analytics');
      expect(heroContent).toContain('knowledge graph');
    });

    it('should highlight three-tier analytics in features', async () => {
      const heroPath = path.join(process.cwd(), 'src/components/Hero.vue');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      
      // Check for three-tier analytics features
      expect(heroContent.toLowerCase()).toMatch(/strategic.*tactical.*operational|three-tier|multi-tier/);
    });

    it('should mention network visualization and correlation analysis', async () => {
      const heroPath = path.join(process.cwd(), 'src/components/Hero.vue');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      
      expect(heroContent.toLowerCase()).toMatch(/network.*visualiz|graph.*analys|correlation/);
    });
  });

  describe('Blog Posts Creation', () => {
    it('should have blog post about dashboard analytics', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const files = fs.readdirSync(blogPath);
      const dashboardPost = files.find(f => 
        f.includes('dashboard') || f.includes('three-tier-analytics')
      );
      expect(dashboardPost).toBeTruthy();
    });

    it('should have blog post about knowledge graph', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const files = fs.readdirSync(blogPath);
      const graphPost = files.find(f => 
        f.includes('knowledge-graph') || f.includes('network-visualization')
      );
      expect(graphPost).toBeTruthy();
    });

    it('should have blog post about correlation matrix', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const files = fs.readdirSync(blogPath);
      const matrixPost = files.find(f => 
        f.includes('matrix') || f.includes('correlation')
      );
      expect(matrixPost).toBeTruthy();
    });

    it('should have blog post about factor analytics', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const files = fs.readdirSync(blogPath);
      const factorPost = files.find(f => 
        f.includes('factor') || f.includes('sunburst')
      );
      expect(factorPost).toBeTruthy();
    });
  });

  describe('Image Assets', () => {
    it('should have dashboard images in public/images/blog/', () => {
      const imagesPath = path.join(process.cwd(), 'public/images/blog');
      const images = fs.readdirSync(imagesPath);
      
      expect(images).toContain('dashboard.png');
      expect(images).toContain('graph.png');
      expect(images).toContain('matrix.png');
      expect(images).toContain('dashboard-factors.png');
    });
  });

  describe('BlogTagFilter Updates', () => {
    it('should include dashboard and analytics tags', async () => {
      const filterPath = path.join(process.cwd(), 'src/components/BlogTagFilter.vue');
      const filterContent = fs.readFileSync(filterPath, 'utf-8');
      
      expect(filterContent).toContain('Dashboard');
      expect(filterContent).toContain('Analytics');
      expect(filterContent).toContain('Knowledge Graph');
      expect(filterContent).toContain('Network Analysis');
    });
  });

  describe('Products Component Updates', () => {
    it('should highlight Moments dashboard and analytics features', async () => {
      const productsPath = path.join(process.cwd(), 'src/components/Products.vue');
      const productsContent = fs.readFileSync(productsPath, 'utf-8');
      
      expect(productsContent.toLowerCase()).toContain('dashboard');
      expect(productsContent.toLowerCase()).toContain('analytics');
      expect(productsContent.toLowerCase()).toMatch(/three-tier|multi-tier/);
    });

    it('should mention network graph and correlation analysis', async () => {
      const productsPath = path.join(process.cwd(), 'src/components/Products.vue');
      const productsContent = fs.readFileSync(productsPath, 'utf-8');
      
      expect(productsContent.toLowerCase()).toMatch(/network.*graph|knowledge.*graph/);
      expect(productsContent.toLowerCase()).toContain('correlation');
    });
  });

  describe('HomeBlogShowcase Updates', () => {
    it('should feature dashboard blog posts', async () => {
      const showcasePath = path.join(process.cwd(), 'src/components/HomeBlogShowcase.vue');
      const showcaseContent = fs.readFileSync(showcasePath, 'utf-8');
      
      // Should prioritize dashboard/analytics content
      expect(showcaseContent).toMatch(/dashboard|analytics|graph|matrix/i);
    });
  });

  describe('ProductsHero Updates', () => {
    it('should mention dashboard analytics in ProductsHero', async () => {
      const heroPath = path.join(process.cwd(), 'src/components/ProductsHero.vue');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      
      expect(heroContent.toLowerCase()).toMatch(/dashboard|analytics|visualization/);
    });
  });

  describe('AdvisoryHero Updates', () => {
    it('should mention dashboard implementation advisory', async () => {
      const advisoryPath = path.join(process.cwd(), 'src/components/AdvisoryHero.vue');
      const advisoryContent = fs.readFileSync(advisoryPath, 'utf-8');
      
      expect(advisoryContent.toLowerCase()).toMatch(/dashboard.*implement|analytics.*strateg/);
    });
  });

  describe('MomentsBlogShowcase Updates', () => {
    it('should feature dashboard and analytics blog posts', async () => {
      const showcasePath = path.join(process.cwd(), 'src/components/MomentsBlogShowcase.vue');
      const showcaseContent = fs.readFileSync(showcasePath, 'utf-8');
      
      // Should include dashboard/analytics related tags
      expect(showcaseContent).toMatch(/Dashboard|Analytics|Network.*Analysis|Correlation/);
    });

    it('should prioritize new dashboard content', async () => {
      const showcasePath = path.join(process.cwd(), 'src/components/MomentsBlogShowcase.vue');
      const showcaseContent = fs.readFileSync(showcasePath, 'utf-8');
      
      // Should have updated tag filters
      const hasAnalyticsTags = showcaseContent.includes('Dashboard') || 
                               showcaseContent.includes('Analytics') ||
                               showcaseContent.includes('Knowledge Graph');
      expect(hasAnalyticsTags).toBe(true);
    });
  });

  describe('SEO and Metadata', () => {
    it('should update homepage metadata with dashboard keywords', async () => {
      const indexPath = path.join(process.cwd(), 'src/pages/index.astro');
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      
      expect(indexContent).toMatch(/dashboard|analytics|knowledge graph|network visualization/i);
    });

    it('should have proper metadata in new blog posts', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const dashboardPosts = fs.readdirSync(blogPath).filter(f => 
        f.includes('dashboard') || f.includes('graph') || 
        f.includes('matrix') || f.includes('factor')
      );
      
      dashboardPosts.forEach(post => {
        const content = fs.readFileSync(path.join(blogPath, post), 'utf-8');
        expect(content).toContain('title:');
        expect(content).toContain('excerpt:');
        expect(content).toContain('tags:');
        expect(content).toContain('author:');
      });
    });
  });

  describe('Professional Content Alignment', () => {
    it('should use professional advisory tone in blog posts', () => {
      const blogPath = path.join(process.cwd(), 'src/pages/blog');
      const dashboardPosts = fs.readdirSync(blogPath).filter(f => 
        f.includes('dashboard') || f.includes('graph') || 
        f.includes('matrix') || f.includes('factor')
      );
      
      dashboardPosts.forEach(post => {
        const content = fs.readFileSync(path.join(blogPath, post), 'utf-8');
        // Should have professional language
        expect(content).toMatch(/strategic|enterprise|business intelligence|advisory|decision-making/i);
        // Should include citations or references
        expect(content).toMatch(/research|study|report|analysis|according to/i);
      });
    });
  });
});