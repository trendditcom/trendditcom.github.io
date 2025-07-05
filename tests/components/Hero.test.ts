import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'

describe('Hero component', () => {
  it('renders the main headline about Trenddit Memo', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Trenddit Memo')
  })

  it('describes Trenddit Memo as a Chrome extension', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Chrome extension')
  })

  it('mentions AI-powered browsing and knowledge management', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('AI')
    expect(wrapper.text()).toContain('knowledge management')
  })

  it('has a prominent call-to-action button to download/get Trenddit Memo', () => {
    const wrapper = mount(Hero)
    const ctaButton = wrapper.find('[data-testid="cta-download"]')
    expect(ctaButton.exists()).toBe(true)
    expect(ctaButton.text()).toMatch(/download|get/i)
  })

  it('links to the Trenddit Memo GitHub repository', () => {
    const wrapper = mount(Hero)
    const githubLink = wrapper.find('a[href*="github.com/trendditcom/trenddit-memo"]')
    expect(githubLink.exists()).toBe(true)
  })

  it('has a blog link', () => {
    const wrapper = mount(Hero)
    const blogLink = wrapper.find('a[href="/blog"]')
    expect(blogLink.exists()).toBe(true)
  })
})