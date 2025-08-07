import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Products from '@/components/Products.vue'
import ProductsHero from '@/components/ProductsHero.vue'
import AdvisoryHero from '@/components/AdvisoryHero.vue'
import { promises as fs } from 'fs'
import path from 'path'

describe('Trenddit Client Promotion Across Website', () => {
  describe('Products Component', () => {
    it('should feature Trenddit Client as the flagship product', () => {
      const wrapper = mount(Products)
      const text = wrapper.text()
      
      // Should mention Trenddit Client prominently
      expect(text).toContain('Trenddit Client')
      
      // Should describe it as enterprise intelligence platform
      expect(text.toLowerCase()).toMatch(/enterprise.*intelligence|ai.*intelligence.*platform/i)
      
      // Should have call-to-action for Trenddit Client
      const clientCTA = wrapper.find('a[href*="trenddit-client"]')
      expect(clientCTA.exists()).toBe(true)
    })

    it('should position Trenddit Client before Trenddit Memo', () => {
      const wrapper = mount(Products)
      const html = wrapper.html()
      
      const clientIndex = html.indexOf('Trenddit Client')
      const memoIndex = html.indexOf('Trenddit Memo')
      
      // Trenddit Client should appear before Trenddit Memo in the HTML
      expect(clientIndex).toBeLessThan(memoIndex)
      expect(clientIndex).toBeGreaterThan(-1)
    })

    it('should include both products with distinct messaging', () => {
      const wrapper = mount(Products)
      const text = wrapper.text()
      
      // Should contain both products
      expect(text).toContain('Trenddit Client')
      expect(text).toContain('Trenddit Memo')
      
      // Should differentiate between enterprise and consumer use cases
      expect(text.toLowerCase()).toMatch(/enterprise|business|technology decisions/i)
      expect(text.toLowerCase()).toMatch(/chrome extension|browsing|knowledge management/i)
    })
  })

  describe('ProductsHero Component', () => {
    it('should emphasize AI-first intelligence platform messaging', () => {
      const wrapper = mount(ProductsHero)
      const text = wrapper.text()
      
      // Should focus on enterprise intelligence rather than just tools
      expect(text.toLowerCase()).toMatch(/ai.*intelligence|enterprise.*intelligence|intelligence.*platform/i)
      
      // Should not be limited to knowledge management only
      expect(text.toLowerCase()).toMatch(/technology.*decision|enterprise.*decision|strategic/i)
    })

    it('should have primary CTA linking to Trenddit Client', () => {
      const wrapper = mount(ProductsHero)
      
      // Primary CTA should link to Trenddit Client
      const primaryCTA = wrapper.find('a[href*="trenddit-client"]')
      expect(primaryCTA.exists()).toBe(true)
      
      // Button text should reference Trenddit Client
      expect(primaryCTA.text()).toMatch(/trenddit client|get.*client/i)
    })

    it('should update feature highlights for enterprise focus', () => {
      const wrapper = mount(ProductsHero)
      const text = wrapper.text()
      
      // Should include enterprise-focused features
      expect(text.toLowerCase()).toMatch(/intelligence|analysis|forecasting|decision/i)
      
      // Should move beyond basic content capture features
      expect(text.toLowerCase()).toMatch(/strategic|enterprise|predictive|multi.*agent/i)
    })
  })

  describe('AdvisoryHero Component', () => {
    it('should align messaging with Trenddit Client enterprise intelligence', () => {
      const wrapper = mount(AdvisoryHero)
      const text = wrapper.text()
      
      // Should mention enterprise intelligence or technology decisions
      expect(text.toLowerCase()).toMatch(/enterprise.*intelligence|technology.*decision|strategic.*intelligence/i)
      
      // Should reference Trenddit Client specifically or its capabilities
      expect(text.toLowerCase()).toMatch(/trenddit client|ai.*first.*intelligence|trend analysis/i)
    })

    it('should update feature highlights to match Trenddit Client value proposition', () => {
      const wrapper = mount(AdvisoryHero)
      const text = wrapper.text()
      
      // Should include features that align with Trenddit Client
      expect(text.toLowerCase()).toMatch(/trend.*analysis|enterprise.*strategy|technology.*advisory|intelligence.*platform/i)
      
      // Should position advisory services as complementary to Trenddit Client
      expect(text.toLowerCase()).toMatch(/implementation|strategy|advisory|consulting|guidance/i)
    })

    it('should have CTA that connects to Trenddit Client content', () => {
      const wrapper = mount(AdvisoryHero)
      
      // Should have CTA that leads to relevant content
      const cta = wrapper.find('a[href*="blog"]')
      expect(cta.exists()).toBe(true)
      
      // CTA text should reflect advisory focus
      expect(cta.text()).toMatch(/guidance|advisory|insights|consultation/i)
    })
  })

  describe('Blog Sequence Prioritization', () => {
    it('should prioritize Trenddit Client blog posts in default sequence', async () => {
      const blogIndexPath = path.join(__dirname, '../src/pages/blog/index.astro')
      const content = await fs.readFile(blogIndexPath, 'utf-8')
      
      // Should include logic to prioritize Trenddit Client posts
      expect(content).toMatch(/trenddit.*client.*priority|priority.*trenddit.*client/i)
      
      // Or should implement custom sorting for featured posts
      expect(content).toMatch(/sort.*trenddit.*client|featured.*sort|priority.*sort/i)
    })

    it('should ensure Trenddit Client posts appear prominently', async () => {
      const blogIndexPath = path.join(__dirname, '../src/pages/blog/index.astro')
      const content = await fs.readFile(blogIndexPath, 'utf-8')
      
      // Should have logic to prioritize Trenddit Client posts
      expect(content).toMatch(/trenddit.*client.*priority|priority.*trenddit.*client|trenddit.*client.*get.*priority/i)
    })
  })

  describe('Page Metadata Updates', () => {
    it('should update products page metadata to feature Trenddit Client', async () => {
      const productsPagePath = path.join(__dirname, '../src/pages/products.astro')
      const content = await fs.readFile(productsPagePath, 'utf-8')
      
      // Title should mention Trenddit Client
      expect(content).toMatch(/title.*trenddit client/i)
      
      // Description should emphasize enterprise intelligence
      expect(content).toMatch(/description.*enterprise.*intelligence|description.*ai.*first.*intelligence/i)
      
      // Keywords should include Trenddit Client terms
      expect(content).toMatch(/keywords.*trenddit client|keywords.*enterprise.*intelligence/i)
    })

    it('should update advisory page metadata to align with Trenddit Client', async () => {
      const advisoryPagePath = path.join(__dirname, '../src/pages/advisory.astro')
      const content = await fs.readFile(advisoryPagePath, 'utf-8')
      
      // Should reference Trenddit Client or related terms
      expect(content).toMatch(/trenddit client|enterprise.*intelligence.*advisory|ai.*first.*advisory/i)
      
      // Should align advisory services with enterprise intelligence
      expect(content).toMatch(/enterprise.*ai.*advisory|technology.*decision.*advisory|intelligence.*platform.*advisory/i)
    })
  })

  describe('Cross-Page Consistency', () => {
    it('should maintain consistent Trenddit Client messaging across components', () => {
      const products = mount(Products)
      const productsHero = mount(ProductsHero)
      const advisoryHero = mount(AdvisoryHero)
      
      // All should reference enterprise focus consistently
      const enterpriseRegex = /enterprise|business.*intelligence|technology.*decision/i
      
      expect(products.text()).toMatch(enterpriseRegex)
      expect(productsHero.text()).toMatch(enterpriseRegex)
      expect(advisoryHero.text()).toMatch(enterpriseRegex)
    })

    it('should have consistent call-to-action hierarchy', () => {
      const products = mount(Products)
      const productsHero = mount(ProductsHero)
      
      // Primary CTAs should prioritize Trenddit Client
      const productsPrimaryCTA = products.find('a[href*="trenddit-client"]')
      const heroPrimaryCTA = productsHero.find('a[href*="trenddit-client"]')
      
      expect(productsPrimaryCTA.exists()).toBe(true)
      expect(heroPrimaryCTA.exists()).toBe(true)
    })
  })
})