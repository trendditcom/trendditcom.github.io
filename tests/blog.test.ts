import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import { createBlogPost, copyImages, generateBlogFromBook } from '@/lib/blog-utils'

describe('Blog post generation', () => {
  const tempDir = path.join(__dirname, 'temp-blog-test')
  const blogDir = path.join(tempDir, 'blog')
  const imagesDir = path.join(tempDir, 'images')

  beforeEach(async () => {
    // Create temporary directories for testing
    await fs.mkdir(tempDir, { recursive: true })
    await fs.mkdir(blogDir, { recursive: true })
    await fs.mkdir(imagesDir, { recursive: true })
  })

  afterEach(async () => {
    // Clean up temporary directories
    await fs.rm(tempDir, { recursive: true, force: true })
  })

  describe('createBlogPost', () => {
    it('should create a blog post with proper frontmatter', async () => {
      const blogData = {
        title: 'Test Blog Post',
        slug: 'test-blog-post',
        description: 'A test blog post description',
        content: '# Test Content\n\nThis is test content.',
        author: 'Trenddit Team',
        publishedAt: '2024-01-01',
        tags: ['ai', 'automation']
      }

      const result = await createBlogPost(blogData, blogDir)

      expect(result.success).toBe(true)
      expect(result.filePath).toBe(path.join(blogDir, 'test-blog-post.md'))

      // Verify file was created
      const fileExists = await fs.access(result.filePath).then(() => true).catch(() => false)
      expect(fileExists).toBe(true)

      // Verify content format
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('---')
      expect(content).toContain('title: "Test Blog Post"')
      expect(content).toContain('description: "A test blog post description"')
      expect(content).toContain('author: "Trenddit Team"')
      expect(content).toContain('publishedAt: "2024-01-01"')
      expect(content).toContain('tags: ["ai", "automation"]')
      expect(content).toContain('# Test Content')
    })

    it('should handle special characters in title and description', async () => {
      const blogData = {
        title: 'AI & Automation: "The Future" of Work',
        slug: 'ai-automation-future-work',
        description: 'Exploring AI\'s impact on "modern" workflows',
        content: '# Content',
        author: 'Trenddit Team',
        publishedAt: '2024-01-01',
        tags: ['ai']
      }

      const result = await createBlogPost(blogData, blogDir)

      expect(result.success).toBe(true)
      
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('title: "AI & Automation: \\"The Future\\" of Work"')
      expect(content).toContain('description: "Exploring AI\'s impact on \\"modern\\" workflows"')
    })
  })

  describe('copyImages', () => {
    it('should copy images from source to destination directory', async () => {
      // Create test image file
      const sourceDir = path.join(tempDir, 'source-images')
      await fs.mkdir(sourceDir, { recursive: true })
      await fs.writeFile(path.join(sourceDir, 'test-image.png'), 'fake-image-data')

      const result = await copyImages(sourceDir, imagesDir, ['test-image.png'])

      expect(result.success).toBe(true)
      expect(result.copiedFiles).toContain('test-image.png')

      // Verify file was copied
      const copiedFile = path.join(imagesDir, 'test-image.png')
      const fileExists = await fs.access(copiedFile).then(() => true).catch(() => false)
      expect(fileExists).toBe(true)
    })

    it('should handle missing source images gracefully', async () => {
      const sourceDir = path.join(tempDir, 'nonexistent')
      
      const result = await copyImages(sourceDir, imagesDir, ['missing-image.png'])

      expect(result.success).toBe(false)
      expect(result.errors).toContain('missing-image.png')
    })
  })

  describe('generateBlogFromBook', () => {
    it('should generate professional blog posts from book chapters', async () => {
      const bookContent = {
        title: 'Test Chapter',
        content: 'I love vibe coding. It works great for me. Here is my personal experience...',
        images: ['example-image.png']
      }

      const result = await generateBlogFromBook(bookContent, {
        targetTone: 'professional',
        includeResearch: true,
        alignToTrenddit: true
      })

      expect(result.success).toBe(true)
      expect(result.title).toBeDefined()
      expect(result.content).toBeDefined()
      expect(result.slug).toBeDefined()
      
      // Should transform personal tone to professional
      expect(result.content).not.toContain('I love')
      expect(result.content).not.toContain('for me')
      expect(result.content).not.toContain('my personal experience')
      
      // Should include Trenddit alignment
      expect(result.content.toLowerCase()).toContain('trenddit')
    })

    it('should generate proper slug from title', async () => {
      const bookContent = {
        title: 'AI & Machine Learning: The Future!',
        content: 'Content here',
        images: []
      }

      const result = await generateBlogFromBook(bookContent, {})

      expect(result.slug).toBe('ai-machine-learning-the-future')
    })

    it('should include appropriate tags for AI and automation content', async () => {
      const bookContent = {
        title: 'Vibe Coding with Claude',
        content: 'Content about AI automation and Claude AI',
        images: []
      }

      const result = await generateBlogFromBook(bookContent, {})

      expect(result.tags).toContain('ai')
      expect(result.tags).toContain('automation')
    })
  })

  describe('Trenddit Client blog posts', () => {
    it('should create AI-Driven Trend Analysis Research blog post', async () => {
      const blogData = {
        title: 'AI-Driven Trend Analysis: Enterprise Intelligence Systems for Technology Decisions',
        slug: 'ai-driven-trend-analysis-enterprise-intelligence',
        excerpt: 'Discover how AI-first intelligence systems transform enterprise technology adoption decisions through multi-agent reasoning and predictive analysis.',
        content: '# AI-Driven Trend Analysis\n\nEnterprise leaders face unprecedented challenges...',
        author: 'Trenddit Team',
        date: '2025-01-15',
        tags: ['Trenddit Client', 'AI Intelligence', 'Enterprise Technology', 'Trend Analysis'],
        featuredImage: '/images/blog/trends-intelligence-cards.png'
      }

      const result = await createBlogPost(blogData, blogDir)

      expect(result.success).toBe(true)
      
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('layout: "@/layouts/BlogPost.astro"')
      expect(content).toContain('title: "AI-Driven Trend Analysis: Enterprise Intelligence Systems for Technology Decisions"')
      expect(content).toContain('tags: ["Trenddit Client", "AI Intelligence", "Enterprise Technology", "Trend Analysis"]')
      expect(content).toContain('featuredImage: "/images/blog/trends-intelligence-cards.png"')
      expect(content).toContain('multi-agent')
      expect(content).toContain('enterprise')
    })

    it('should create Enterprise AI Advisory Platform blog post', async () => {
      const blogData = {
        title: 'Enterprise AI Advisory Platform: Transforming Technology Investment Decisions',
        slug: 'enterprise-ai-advisory-platform-technology-decisions',
        excerpt: 'How Trenddit Client revolutionizes enterprise technology adoption with AI-first intelligence and predictive forecasting.',
        content: '# Enterprise AI Advisory Platform\n\nTechnology decision-making has evolved...',
        author: 'Trenddit Team',
        date: '2025-01-16',
        tags: ['Trenddit Client', 'Enterprise Strategy', 'AI Advisory', 'Technology Investment'],
        featuredImage: '/images/blog/trenddit-workflow.png'
      }

      const result = await createBlogPost(blogData, blogDir)

      expect(result.success).toBe(true)
      
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('Enterprise Strategy')
      expect(content).toContain('AI Advisory')
      expect(content).toContain('Technology Investment')
      expect(content).toContain('enterprise')
      expect(content).toContain('technology adoption')
    })

    it('should create Getting Started guide blog post', async () => {
      const blogData = {
        title: 'Getting Started with Trenddit Client: AI-Powered Enterprise Intelligence',
        slug: 'getting-started-trenddit-client-enterprise-intelligence',
        excerpt: 'Complete step-by-step guide to implementing Trenddit Client for enterprise technology decision-making.',
        content: '# Getting Started with Trenddit Client\n\nThis comprehensive guide...',
        author: 'Trenddit Team',
        date: '2025-01-17',
        tags: ['Trenddit Client', 'Getting Started', 'User Guide', 'Implementation'],
        featuredImage: '/images/blog/personalized-trends.png'
      }

      const result = await createBlogPost(blogData, blogDir)

      expect(result.success).toBe(true)
      
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('Getting Started')
      expect(content).toContain('User Guide')
      expect(content).toContain('Implementation')
      expect(content).toContain('step-by-step')
      expect(content).toContain('comprehensive')
    })

    it('should ensure all blog posts have professional advisory tone', async () => {
      const blogPosts = [
        'ai-driven-trend-analysis-enterprise-intelligence',
        'enterprise-ai-advisory-platform-technology-decisions',
        'getting-started-trenddit-client-enterprise-intelligence'
      ]

      for (const slug of blogPosts) {
        const filePath = path.join('src/pages/blog', `${slug}.md`)
        const exists = await fs.access(filePath).then(() => true).catch(() => false)
        
        if (exists) {
          const content = await fs.readFile(filePath, 'utf-8')
          
          // Should not contain personal pronouns typical of personal tone
          expect(content).not.toMatch(/\bI\b/)
          expect(content).not.toMatch(/\bmy\b/)
          expect(content).not.toMatch(/\bme\b/)
          
          // Should contain professional advisory language
          expect(content.toLowerCase()).toMatch(/recommend|strategy|enterprise|professional|advisory|guidance/)
        }
      }
    })

    it('should verify all required images are copied to blog images folder', async () => {
      const requiredImages = [
        'trends-intelligence-cards.png',
        'trends-intelligence-rows.png',
        'personalized-trends.png',
        'trenddit-workflow.png',
        'needs-discovery-company.png',
        'generate-solutions.png'
      ]

      for (const imageName of requiredImages) {
        const imagePath = path.join('public/images/blog', imageName)
        const exists = await fs.access(imagePath).then(() => true).catch(() => false)
        expect(exists).toBe(true)
      }
    })
  })
})