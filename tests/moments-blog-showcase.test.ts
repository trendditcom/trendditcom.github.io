import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const projectRoot = path.join(__dirname, '..')

describe('Moments Blog Showcase Integration Tests', () => {
  let momentsComponent: string = ''
  let productsPage: string = ''
  let blogPosts: any[] = []
  
  beforeAll(async () => {
    // Check if MomentsBlogShowcase component exists
    try {
      momentsComponent = await fs.readFile(path.join(projectRoot, 'src/components/MomentsBlogShowcase.vue'), 'utf-8')
    } catch (error) {
      console.warn('MomentsBlogShowcase.vue component not found')
    }
    
    // Read products page
    try {
      productsPage = await fs.readFile(path.join(projectRoot, 'src/pages/products.astro'), 'utf-8')
    } catch (error) {
      console.warn('Products page not found')
    }
    
    // Get list of blog posts with Moments tags
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
            const lines = yamlContent.split('\n')
            for (const line of lines) {
              const [key, ...valueParts] = line.split(':')
              if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim()
                if (key.trim() === 'tags') {
                  // Handle both array format ['tag1', 'tag2'] and comma-separated format
                  let tagValue = value.replace(/^["']|["']$/g, '')
                  if (tagValue.startsWith('[') && tagValue.endsWith(']')) {
                    // Array format: ['tag1', 'tag2', 'tag3']
                    tagValue = tagValue.slice(1, -1) // Remove brackets
                    frontmatter[key.trim()] = tagValue.split(',').map(t => t.trim().replace(/^["']|["']$/g, ''))
                  } else if (tagValue) {
                    // Comma-separated format: tag1, tag2, tag3
                    frontmatter[key.trim()] = tagValue.split(',').map(t => t.trim())
                  } else {
                    frontmatter[key.trim()] = []
                  }
                } else {
                  frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '')
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

  describe('MomentsBlogShowcase Component', () => {
    it('should create MomentsBlogShowcase.vue component', () => {
      expect(momentsComponent, 'MomentsBlogShowcase.vue component should exist').not.toBe('')
    })

    it('should have Moments Insights section header', () => {
      expect(momentsComponent).toMatch(/Moments Insights/i)
    })

    it('should filter posts by Moments-related tags', () => {
      expect(momentsComponent).toMatch(/Moments|AI Intelligence|Business Intelligence|Multi-Agent Systems/i)
    })

    it('should have proper Vue component structure', () => {
      expect(momentsComponent).toMatch(/<template>/)
      expect(momentsComponent).toMatch(/<script setup lang="ts">/)
      expect(momentsComponent).toMatch(/<style scoped>/)
    })

    it('should have similar layout structure to TrendditClientBlogShowcase', () => {
      // Should have section header
      expect(momentsComponent).toMatch(/bg-gradient-to-br.*from-.*to-.*py-24/i)
      
      // Should have blog posts showcase with alternating layout
      expect(momentsComponent).toMatch(/v-for.*featuredPosts/i)
      expect(momentsComponent).toMatch(/index % 2/i)
      
      // Should have CTA button to view all Moments posts
      expect(momentsComponent).toMatch(/blog\?tag=Moments/i)
    })

    it('should load Moments-tagged blog posts', () => {
      expect(momentsComponent).toMatch(/loadMomentsPosts|loadMomentsContent/i)
      expect(momentsComponent).toMatch(/import\.meta\.glob/i)
    })

    it('should have appropriate styling and transitions', () => {
      expect(momentsComponent).toMatch(/transition-all|group-hover|transform/i)
      expect(momentsComponent).toMatch(/rounded-2xl|shadow-2xl/i)
    })
  })

  describe('Products Page Integration', () => {
    it('should include MomentsBlogShowcase component in products page', () => {
      expect(productsPage).toMatch(/MomentsBlogShowcase/i)
    })

    it('should position MomentsBlogShowcase above TrendditClientBlogShowcase', () => {
      const momentsIndex = productsPage.search(/MomentsBlogShowcase/i)
      const trendditClientIndex = productsPage.search(/TrendditClientBlogShowcase/i)
      
      expect(momentsIndex, 'MomentsBlogShowcase should appear before TrendditClientBlogShowcase').toBeLessThan(trendditClientIndex)
    })

    it('should import MomentsBlogShowcase component', () => {
      expect(productsPage).toMatch(/import.*MomentsBlogShowcase.*from.*@components\/MomentsBlogShowcase\.vue/i)
    })
  })

  describe('Moments Blog Posts Availability', () => {
    it('should have at least 3 Moments-tagged blog posts for the showcase', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.frontmatter.tags?.includes('Moments') ||
        post.frontmatter.tags?.includes('AI Intelligence') ||
        post.frontmatter.tags?.includes('Business Intelligence')
      )

      expect(momentsPosts.length, 'Should have at least 3 Moments-related blog posts').toBeGreaterThanOrEqual(3)
    })

    it('should have featured images for Moments posts', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.frontmatter.tags?.includes('Moments') ||
        post.frontmatter.tags?.includes('AI Intelligence') ||
        post.frontmatter.tags?.includes('Business Intelligence')
      )

      for (const post of momentsPosts.slice(0, 3)) {
        expect(post.frontmatter.featuredImage, `${post.filename} should have featuredImage`).toBeDefined()
      }
    })

    it('should have proper excerpt content for Moments posts', () => {
      const momentsPosts = blogPosts.filter(post => 
        post.frontmatter.tags?.includes('Moments') ||
        post.frontmatter.tags?.includes('AI Intelligence') ||
        post.frontmatter.tags?.includes('Business Intelligence')
      )

      for (const post of momentsPosts.slice(0, 3)) {
        expect(post.frontmatter.excerpt, `${post.filename} should have excerpt`).toBeDefined()
        expect(post.frontmatter.excerpt.length, `${post.filename} should have meaningful excerpt`).toBeGreaterThan(50)
      }
    })
  })

  describe('Visual Design Consistency', () => {
    it('should use consistent gradient styling with Moments brand colors', () => {
      // Should use different gradient colors than TrendditClient (blue/purple)
      // Moments could use different colors like green/blue or purple/pink
      expect(momentsComponent).toMatch(/from-.*to-.*(?!blue-.*purple)/i)
    })

    it('should have appropriate section spacing and layout', () => {
      expect(momentsComponent).toMatch(/py-24|py-20/i)
      expect(momentsComponent).toMatch(/max-w-7xl.*mx-auto/i)
      expect(momentsComponent).toMatch(/grid.*lg:grid-cols-2/i)
    })
  })
})