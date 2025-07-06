import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableOfContents from '@components/TableOfContents.vue';

describe('TableOfContents', () => {
  it('should render table of contents with headings', () => {
    const headings = [
      { id: 'heading-1', text: 'First Heading', level: 2 },
      { id: 'heading-2', text: 'Second Heading', level: 3 },
      { id: 'heading-3', text: 'Third Heading', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    expect(wrapper.find('.table-of-contents').exists()).toBe(true);
    expect(wrapper.findAll('.toc-item')).toHaveLength(3);
    expect(wrapper.text()).toContain('First Heading');
    expect(wrapper.text()).toContain('Second Heading');
    expect(wrapper.text()).toContain('Third Heading');
  });

  it('should have different styling for different heading levels', () => {
    const headings = [
      { id: 'heading-1', text: 'H2 Heading', level: 2 },
      { id: 'heading-2', text: 'H3 Heading', level: 3 },
      { id: 'heading-3', text: 'H4 Heading', level: 4 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const tocItems = wrapper.findAll('.toc-item');
    expect(tocItems[0].classes()).toContain('toc-level-2');
    expect(tocItems[1].classes()).toContain('toc-level-3');
    expect(tocItems[2].classes()).toContain('toc-level-4');
  });

  it('should be positioned as a floating element', () => {
    const headings = [
      { id: 'heading-1', text: 'Test Heading', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const tocElement = wrapper.find('.table-of-contents');
    expect(tocElement.classes()).toContain('fixed');
  });

  it('should render anchor links for navigation', () => {
    const headings = [
      { id: 'heading-1', text: 'First Heading', level: 2 },
      { id: 'heading-2', text: 'Second Heading', level: 3 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const links = wrapper.findAll('a');
    expect(links).toHaveLength(2);
    expect(links[0].attributes('href')).toBe('#heading-1');
    expect(links[1].attributes('href')).toBe('#heading-2');
  });

  it('should not render when no headings are provided', () => {
    const wrapper = mount(TableOfContents, {
      props: { headings: [] }
    });

    expect(wrapper.find('.table-of-contents').exists()).toBe(false);
  });

  it('should have scroll-based visibility controls', () => {
    const headings = [
      { id: 'heading-1', text: 'Test Heading', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const tocElement = wrapper.find('.table-of-contents');
    expect(tocElement.classes()).toContain('transition-all');
    expect(tocElement.classes()).toContain('duration-300');
  });

  it('should start hidden and have proper visibility classes', () => {
    const headings = [
      { id: 'heading-1', text: 'Test Heading', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const tocElement = wrapper.find('.table-of-contents');
    // Should start hidden (opacity-0) since isVisible starts as false
    expect(tocElement.classes()).toContain('opacity-0');
    expect(tocElement.classes()).toContain('translate-x-full');
    expect(tocElement.classes()).toContain('pointer-events-none');
  });
});