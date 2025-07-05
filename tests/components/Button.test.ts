import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/ui/Button.vue'

describe('Button component', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies custom variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('renders as a different element when as prop is provided', () => {
    const wrapper = mount(Button, {
      props: {
        as: 'a'
      }
    })
    expect(wrapper.element.tagName).toBe('A')
  })
})