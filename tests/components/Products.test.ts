import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Products from '@/components/Products.vue'

describe('Products component', () => {
  it('renders Trenddit Memo as the main product', () => {
    const wrapper = mount(Products)
    expect(wrapper.text()).toContain('Trenddit Memo')
  })

  it('describes Trenddit Memo as a Chrome extension', () => {
    const wrapper = mount(Products)
    expect(wrapper.text()).toContain('Chrome extension')
  })

  it('mentions key features like content capture and AI conversations', () => {
    const wrapper = mount(Products)
    expect(wrapper.text()).toContain('Capture')
    expect(wrapper.text()).toContain('AI')
  })

  it('has a prominent call-to-action button to GitHub', () => {
    const wrapper = mount(Products)
    const githubButton = wrapper.find('a[href*="github.com/trendditcom/trenddit-memo"]')
    expect(githubButton.exists()).toBe(true)
  })

  it('has a learn more link to the blog', () => {
    const wrapper = mount(Products)
    const blogLink = wrapper.find('a[href*="/blog"]')
    expect(blogLink.exists()).toBe(true)
  })
})