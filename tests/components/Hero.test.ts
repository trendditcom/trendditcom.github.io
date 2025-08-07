import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'

describe('Hero component', () => {
  it('renders the main headline about Trenddit Client', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Trenddit Client')
  })

  it('describes Trenddit Client as an AI-first intelligence platform', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('AI-first intelligence platform')
  })

  it('mentions enterprise technology decisions and trend analysis', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('enterprise technology decisions')
    expect(wrapper.text()).toContain('trend analysis')
  })

  it('has a prominent call-to-action button to get Trenddit Client', () => {
    const wrapper = mount(Hero)
    const ctaButton = wrapper.find('[data-testid="cta-download"]')
    expect(ctaButton.exists()).toBe(true)
    expect(ctaButton.text()).toMatch(/get trenddit client/i)
  })

  it('links to the Trenddit Client GitHub repository', () => {
    const wrapper = mount(Hero)
    const githubLink = wrapper.find('a[href*="github.com/trendditcom/trenddit-client"]')
    expect(githubLink.exists()).toBe(true)
  })

  it('has a blog link', () => {
    const wrapper = mount(Hero)
    const blogLink = wrapper.find('a[href="/blog"]')
    expect(blogLink.exists()).toBe(true)
  })

  it('highlights multi-agent intelligence system', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Multi-Agent Intelligence')
  })

  it('mentions predictive forecasting capability', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Predictive Forecasting')
  })

  it('describes real-time learning features', () => {
    const wrapper = mount(Hero)
    expect(wrapper.text()).toContain('Real-Time Learning')
  })
})