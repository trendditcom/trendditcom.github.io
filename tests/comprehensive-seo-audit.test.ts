import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const projectRoot = path.join(__dirname, '..')

describe('Comprehensive SEO Audit 2025', () => {
  let homepageContent: string = ''
  let productsContent: string = ''
  let advisoryContent: string = ''
  let blogIndexContent: string = ''
  let layoutContent: string = ''
  let robotsContent: string = ''

  beforeAll(async () => {
    try {
      homepageContent = await fs.readFile(path.join(projectRoot, 'src/pages/index.astro'), 'utf-8')
      productsContent = await fs.readFile(path.join(projectRoot, 'src/pages/products.astro'), 'utf-8')
      advisoryContent = await fs.readFile(path.join(projectRoot, 'src/pages/advisory.astro'), 'utf-8')
      blogIndexContent = await fs.readFile(path.join(projectRoot, 'src/pages/blog/index.astro'), 'utf-8')
      layoutContent = await fs.readFile(path.join(projectRoot, 'src/layouts/Layout.astro'), 'utf-8')
      robotsContent = await fs.readFile(path.join(projectRoot, 'public/robots.txt'), 'utf-8')
    } catch (error) {
      console.warn('Some SEO files not found for audit')
    }
  })

  describe('Technical SEO Infrastructure', () => {
    it('should have properly configured robots.txt', () => {
      expect(robotsContent).toMatch(/User-agent: \*/)
      expect(robotsContent).toMatch(/Allow: \//)
      expect(robotsContent).toMatch(/Sitemap: https:\/\/www\.trenddit\.com\/sitemap-index\.xml/)
      expect(robotsContent).toMatch(/Disallow: \/_astro\//)
    })

    it('should verify sitemap generation', async () => {
      const sitemapExists = await fs.access(path.join(projectRoot, 'dist/sitemap-index.xml')).then(() => true).catch(() => false)
      expect(sitemapExists).toBe(true)
    })

    it('should have comprehensive structured data for Organization', () => {
      expect(layoutContent).toMatch(/"@type": "Organization"/)
      expect(layoutContent).toMatch(/"name": "Trenddit"/)
      expect(layoutContent).toMatch(/AI-powered business intelligence platform/)
      expect(layoutContent).toMatch(/"products":/)
      expect(layoutContent).toMatch(/"name": "Moments"/)
    })
  })

  describe('Moments-Focused SEO Strategy', () => {
    it('should feature Moments prominently in homepage metadata', () => {
      expect(homepageContent).toMatch(/Moments.*AI-Powered Business Intelligence/i)
      expect(homepageContent).toMatch(/strategic insights.*Moments|Moments.*strategic insights/i)
      expect(homepageContent).toMatch(/multi-agent systems/)
      expect(homepageContent).toMatch(/ogImage.*moments\.png/)
    })

    it('should prioritize Moments in Products page SEO', () => {
      expect(productsContent).toMatch(/title.*Moments.*AI-Powered Business Intelligence/)
      expect(productsContent).toMatch(/description.*flagship.*multi-agent processing/)
      expect(productsContent).toMatch(/keywords.*Moments.*AI business intelligence/)
    })

    it('should align Advisory page with Moments positioning', () => {
      expect(advisoryContent).toMatch(/title.*Moments.*AI Business Intelligence/)
      expect(advisoryContent).toMatch(/multi-agent systems.*business intelligence transformation/)
      expect(advisoryContent).toMatch(/ogImage.*moments\.png/)
    })

    it('should use Moments-optimized keywords consistently', () => {
      const momentsKeywords = [
        'Moments',
        'AI business intelligence',
        'multi-agent systems',
        'business intelligence platform',
        'competitive analysis',
        'strategic decision-making'
      ]

      for (const keyword of momentsKeywords) {
        expect(layoutContent).toMatch(new RegExp(keyword.replace(' ', '.*'), 'i'))
      }
    })
  })

  describe('Meta Tags & Open Graph Optimization', () => {
    it('should have complete meta tag structure in Layout', () => {
      expect(layoutContent).toMatch(/name="title"/)
      expect(layoutContent).toMatch(/name="description"/)
      expect(layoutContent).toMatch(/name="keywords"/)
      expect(layoutContent).toMatch(/name="author"/)
      expect(layoutContent).toMatch(/name="robots"/)
      expect(layoutContent).toMatch(/rel="canonical"/)
    })

    it('should have comprehensive Open Graph tags', () => {
      expect(layoutContent).toMatch(/property="og:type"/)
      expect(layoutContent).toMatch(/property="og:url"/)
      expect(layoutContent).toMatch(/property="og:title"/)
      expect(layoutContent).toMatch(/property="og:description"/)
      expect(layoutContent).toMatch(/property="og:image"/)
      expect(layoutContent).toMatch(/property="og:site_name"/)
    })

    it('should have Twitter Card optimization', () => {
      expect(layoutContent).toMatch(/property="twitter:card"/)
      expect(layoutContent).toMatch(/property="twitter:title"/)
      expect(layoutContent).toMatch(/property="twitter:description"/)
      expect(layoutContent).toMatch(/property="twitter:image"/)
    })
  })

  describe('Content Quality & Keywords', () => {
    it('should use target keywords naturally in page titles', () => {
      // Homepage
      expect(homepageContent).toMatch(/AI-Powered Business Intelligence.*Moments/i)
      
      // Products
      expect(productsContent).toMatch(/AI-Powered Business Intelligence Platform/i)
      
      // Advisory  
      expect(advisoryContent).toMatch(/AI Business Intelligence Consulting/i)
      
      // Blog
      expect(blogIndexContent).toMatch(/AI Business Intelligence Insights/i)
    })

    it('should have keyword-rich descriptions within character limits', () => {
      const checkDescription = (content: string) => {
        const descMatch = content.match(/description="([^"]+)"/);
        if (descMatch) {
          const desc = descMatch[1];
          expect(desc.length).toBeGreaterThan(120); // Minimum for good SEO
          expect(desc.length).toBeLessThan(160); // Google's limit
        }
      };

      checkDescription(homepageContent);
      checkDescription(productsContent);
      checkDescription(advisoryContent);
    })

    it('should prioritize Moments content in blog sequencing', () => {
      expect(blogIndexContent).toMatch(/Moments.*priority|priority.*Moments/i)
      expect(blogIndexContent).toMatch(/tags.*includes.*Moments/)
    })
  })

  describe('Blog Post SEO Completeness', () => {
    it('should verify blog post has proper frontmatter', async () => {
      const samplePost = await fs.readFile(
        path.join(projectRoot, 'src/pages/blog/parallel-ai-processing-performance.md'), 
        'utf-8'
      )
      
      expect(samplePost).toMatch(/layout: '@layouts\/BlogPost\.astro'/)
      expect(samplePost).toMatch(/date: ['"][\d-]+['"]/) // Should have date field now
      expect(samplePost).toMatch(/title: .+/)
      expect(samplePost).toMatch(/excerpt: .+/)
      expect(samplePost).toMatch(/tags: \[.+\]/)
      expect(samplePost).toMatch(/featuredImage: .+/)
    })
  })

  describe('Internal Linking Strategy', () => {
    it('should have strategic internal linking in footer', async () => {
      const footerContent = await fs.readFile(path.join(projectRoot, 'src/components/Footer.vue'), 'utf-8')
      
      // Product links
      expect(footerContent).toMatch(/href="\/products"/)
      expect(footerContent).toMatch(/href="\/advisory"/)
      expect(footerContent).toMatch(/href="\/blog"/)
      
      // Tag-filtered blog links for better internal linking
      expect(footerContent).toMatch(/href="\/blog\?tag=Business%20Intelligence"/)
      expect(footerContent).toMatch(/href="\/blog\?tag=AI%20Intelligence"/)
      expect(footerContent).toMatch(/href="\/blog\?tag=Moments"/)
    })

    it('should use descriptive anchor text for SEO', async () => {
      const footerContent = await fs.readFile(path.join(projectRoot, 'src/components/Footer.vue'), 'utf-8')
      
      // Should avoid generic anchor text
      expect(footerContent).not.toMatch(/learn more|click here|read more/gi)
      
      // Should use keyword-rich anchor text
      expect(footerContent).toMatch(/AI-Powered Business Intelligence/)
      expect(footerContent).toMatch(/Strategic AI Advisory/)
      expect(footerContent).toMatch(/Multi-Agent/)
    })
  })

  describe('Image SEO Optimization', () => {
    it('should verify images have proper alt attributes', async () => {
      const componentFiles = [
        'src/components/Header.vue',
        'src/components/BlogList.vue',
        'src/components/MomentsBlogShowcase.vue'
      ]

      for (const file of componentFiles) {
        try {
          const content = await fs.readFile(path.join(projectRoot, file), 'utf-8')
          const hasImages = content.includes('<img') || content.includes('img')
          if (hasImages) {
            expect(content).toMatch(/alt=["'][^"']*["']/)
          }
        } catch {
          // File doesn't exist, skip
        }
      }
    })
  })

  describe('Performance & Core Web Vitals', () => {
    it('should have optimized meta tags for performance', () => {
      expect(layoutContent).toMatch(/name="viewport".*width=device-width/)
      expect(layoutContent).toMatch(/rel="preconnect".*fonts\.googleapis\.com/)
    })

    it('should have proper favicon configuration', () => {
      expect(layoutContent).toMatch(/rel="icon".*favicon\.ico/)
      expect(layoutContent).toMatch(/rel="apple-touch-icon"/)
      expect(layoutContent).toMatch(/rel="manifest"/)
    })
  })

  describe('Google Analytics Integration', () => {
    it('should have Google Analytics tracking properly configured', () => {
      expect(layoutContent).toMatch(/googletagmanager\.com\/gtag\/js\?id=G-/)
      expect(layoutContent).toMatch(/gtag\('config'/)
      expect(layoutContent).toMatch(/window\.dataLayer/)
    })
  })

  describe('Mobile & Accessibility SEO', () => {
    it('should have mobile-first meta configuration', () => {
      expect(layoutContent).toMatch(/name="viewport".*width=device-width.*initial-scale=1\.0/)
      expect(layoutContent).toMatch(/name="theme-color"/)
      expect(layoutContent).toMatch(/name="apple-mobile-web-app-capable"/)
    })
  })
})