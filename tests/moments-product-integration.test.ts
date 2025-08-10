import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const projectRoot = path.join(__dirname, '..')

describe('Moments Product Integration Tests', () => {
  let momentsImages: string[] = []
  let blogPosts: any[] = []
  
  beforeAll(async () => {
    // Get list of moments blog images
    try {
      momentsImages = await fs.readdir(path.join(projectRoot, 'moments-blog/images'))
    } catch (error) {
      console.warn('Moments blog images directory not found')
      momentsImages = []
    }
    
    // Get list of blog posts
    try {
      const blogFiles = await fs.readdir(path.join(projectRoot, 'src/pages/blog'))
      const mdFiles = blogFiles.filter(file => file.endsWith('.md'))
      
      blogPosts = await Promise.all(
        mdFiles.map(async (file) => {
          const content = await fs.readFile(path.join(projectRoot, 'src/pages/blog', file), 'utf-8')
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
          let frontmatter: any = {}
          
          if (frontmatterMatch) {
            const yamlContent = frontmatterMatch[1]
            // Parse basic YAML frontmatter
            const lines = yamlContent.split('\n')
            for (const line of lines) {
              const [key, ...valueParts] = line.split(':')
              if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
                if (key.trim() === 'tags') {
                  frontmatter[key.trim()] = value ? value.split(',').map(t => t.trim().replace(/[\[\]]/g, '')) : []
                } else {
                  frontmatter[key.trim()] = value
                }
              }
            }
          }
          
          return {
            filename: file,
            frontmatter,
            content
          }
        })
      )
    } catch (error) {
      console.warn('Could not read blog posts directory')
      blogPosts = []
    }
  })

  describe('Image Migration', () => {
    it('should copy moments-blog images to public/images/blog/', async () => {
      for (const imageName of momentsImages) {
        if (imageName.endsWith('.png')) {
          const targetPath = path.join(projectRoot, 'public/images/blog', imageName)
          try {
            await fs.access(targetPath)
          } catch {
            expect.fail(`Moments image ${imageName} should be copied to public/images/blog/`)
          }
        }
      }
    })
  })

  describe('Moments Blog Posts Creation', () => {
    const expectedMomentsPosts = [
      'multi-agent-ai-systems-business-intelligence.md',
      'ai-powered-business-intelligence-end-users.md', 
      'moments-ai-intelligence-research-teams.md',
      'file-system-persistence-real-time-ai.md',
      'parallel-ai-processing-performance.md'
    ]

    it('should create blog posts from moments-blog content', () => {
      for (const expectedPost of expectedMomentsPosts) {
        const post = blogPosts.find(p => p.filename === expectedPost)
        expect(post, `Missing moments blog post: ${expectedPost}`).toBeDefined()
      }
    })

    it('should have professional advisory tone in blog posts', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.frontmatter.tags?.includes('Moments') || 
        post.frontmatter.tags?.includes('AI Intelligence') ||
        post.content.includes('Moments')
      )

      for (const post of momentsPosts) {
        // Should not contain first-person personal pronouns
        expect(post.content.toLowerCase()).not.toMatch(/\b(i am|i'm|my personal|i think|i believe)\b/)
        
        // Should contain professional advisory language
        const advisoryPatterns = [
          /\b(strategic|enterprise|business|professional|advisory|guidance|implementation)\b/i,
          /\b(organizations|companies|teams|executives|decision-makers)\b/i
        ]
        
        const hasAdvisoryTone = advisoryPatterns.some(pattern => pattern.test(post.content))
        expect(hasAdvisoryTone, `Post ${post.filename} should have professional advisory tone`).toBe(true)
      }
    })

    it('should include authoritative citations and links', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.frontmatter.tags?.includes('Moments') ||
        post.content.includes('Moments')
      )

      for (const post of momentsPosts) {
        // Should contain citations from authoritative sources
        const hasCitations = /\[.*\]\(https?:\/\/[^)]+\)/.test(post.content) ||
                           /(McKinsey|Harvard Business Review|Stanford|MIT|Deloitte|Anthropic|OpenAI)/i.test(post.content)
        
        expect(hasCitations, `Post ${post.filename} should include authoritative citations`).toBe(true)
      }
    })

    it('should have proper frontmatter with Moments tags', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.content.includes('Moments') || 
        post.frontmatter.tags?.includes('Moments')
      )

      expect(momentsPosts.length, 'Should have at least 3 Moments blog posts').toBeGreaterThanOrEqual(3)

      for (const post of momentsPosts) {
        expect(post.frontmatter.title, `${post.filename} should have title`).toBeDefined()
        expect(post.frontmatter.excerpt, `${post.filename} should have excerpt`).toBeDefined()
        expect(post.frontmatter.layout, `${post.filename} should have layout`).toBe('@layouts/BlogPost.astro')
        
        const expectedTags = ['Moments', 'AI Intelligence', 'Business Intelligence']
        const hasMomentsTag = expectedTags.some(tag => post.frontmatter.tags?.includes(tag))
        expect(hasMomentsTag, `${post.filename} should have Moments-related tags`).toBe(true)
      }
    })
  })

  describe('Homepage Hero Updates', () => {
    it('should feature Moments in main banner area', async () => {
      const heroPath = path.join(projectRoot, 'src/components/Hero.vue')
      try {
        const heroContent = await fs.readFile(heroPath, 'utf-8')
        
        // Should mention Moments in the hero content
        expect(heroContent.toLowerCase()).toMatch(/moments/i)
        
        // Should have updated messaging for Moments
        const hasMomentsMessaging = /AI-Powered Business Intelligence|business intelligence|multi-agent/i.test(heroContent)
        expect(hasMomentsMessaging, 'Hero should feature Moments messaging').toBe(true)
        
      } catch (error) {
        expect.fail('Hero.vue component should exist and be readable')
      }
    })
  })

  describe('Products Section Updates', () => {
    it('should promote Moments in Products component', async () => {
      const productsPath = path.join(projectRoot, 'src/components/Products.vue')
      try {
        const productsContent = await fs.readFile(productsPath, 'utf-8')
        
        // Should mention Moments
        expect(productsContent.toLowerCase()).toMatch(/moments/i)
        
        // Should position Moments as flagship product
        const hasFlagshipMoments = /flagship.*moments|moments.*flagship/i.test(productsContent)
        expect(hasFlagshipMoments, 'Products should feature Moments as flagship').toBe(true)
        
      } catch (error) {
        expect.fail('Products.vue component should exist and be readable')
      }
    })
  })

  describe('Products Page Updates', () => {
    it('should update ProductsHero for Moments', async () => {
      const productsHeroPath = path.join(projectRoot, 'src/components/ProductsHero.vue')
      try {
        const heroContent = await fs.readFile(productsHeroPath, 'utf-8')
        
        // Should feature Moments messaging
        expect(heroContent.toLowerCase()).toMatch(/moments|business intelligence/i)
        
        // Should have updated CTA for Moments
        const hasMomentsCTA = /get moments|moments.*github/i.test(heroContent)
        expect(hasMomentsCTA, 'ProductsHero should have Moments CTA').toBe(true)
        
      } catch (error) {
        expect.fail('ProductsHero.vue component should exist and be readable')
      }
    })
  })

  describe('Advisory Page Updates', () => {
    it('should align AdvisoryHero with Moments', async () => {
      const advisoryHeroPath = path.join(projectRoot, 'src/components/AdvisoryHero.vue')
      try {
        const heroContent = await fs.readFile(advisoryHeroPath, 'utf-8')
        
        // Should mention Moments or business intelligence
        const hasMomentsAlignment = /moments|business intelligence|AI intelligence/i.test(heroContent)
        expect(hasMomentsAlignment, 'AdvisoryHero should align with Moments').toBe(true)
        
      } catch (error) {
        expect.fail('AdvisoryHero.vue component should exist and be readable')
      }
    })
  })

  describe('Blog Filter Updates', () => {
    it('should include Moments tags in BlogTagFilter', async () => {
      const filterPath = path.join(projectRoot, 'src/components/BlogTagFilter.vue')
      try {
        const filterContent = await fs.readFile(filterPath, 'utf-8')
        
        // Should include Moments-related tags
        const expectedTags = ['Moments', 'AI Intelligence', 'Business Intelligence']
        for (const tag of expectedTags) {
          expect(filterContent).toMatch(new RegExp(tag.replace(/\s+/g, '\\s*'), 'i'))
        }
        
      } catch (error) {
        expect.fail('BlogTagFilter.vue component should exist and be readable')
      }
    })
  })

  describe('Blog Post Prioritization', () => {
    it('should prioritize Moments content in blog listing', async () => {
      const blogIndexPath = path.join(projectRoot, 'src/pages/blog/index.astro')
      try {
        const indexContent = await fs.readFile(blogIndexPath, 'utf-8')
        
        // Should have logic to prioritize Moments posts
        const hasPrioritization = /moments|sort.*tag|tag.*sort|filter.*moments/i.test(indexContent)
        expect(hasPrioritization, 'Blog index should prioritize Moments content').toBe(true)
        
      } catch (error) {
        expect.fail('Blog index.astro should exist and be readable')
      }
    })
  })

  describe('SEO and Metadata Updates', () => {
    it('should update page metadata for Moments', async () => {
      const pages = ['src/pages/index.astro', 'src/pages/products.astro', 'src/pages/advisory.astro']
      
      for (const pagePath of pages) {
        try {
          const pageContent = await fs.readFile(path.join(projectRoot, pagePath), 'utf-8')
          
          // Should have updated metadata mentioning Moments or business intelligence
          const hasUpdatedMeta = /moments|business intelligence|AI intelligence/i.test(pageContent)
          expect(hasUpdatedMeta, `${pagePath} should have updated metadata for Moments`).toBe(true)
          
        } catch (error) {
          console.warn(`Could not read ${pagePath}`)
        }
      }
    })
  })
})