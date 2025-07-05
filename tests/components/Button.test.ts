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

  it('applies correct classes for primary button with proper styling', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'bg-primary',
      'text-primary-foreground',
      'hover:bg-primary/90',
      'h-11',
      'px-8'
    ]))
  })

  it('applies correct classes for outline button', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outline',
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'border',
      'border-input',
      'bg-background',
      'hover:bg-accent',
      'hover:text-accent-foreground'
    ]))
  })
})