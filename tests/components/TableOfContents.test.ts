import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableOfContents from '@components/TableOfContents.vue';

describe('TableOfContents', () => {
  it('should render table of contents with only first-level headings (h2)', () => {
    const headings = [
      { id: 'heading-1', text: 'First Heading', level: 2 },
      { id: 'heading-2', text: 'Second Heading', level: 3 },
      { id: 'heading-3', text: 'Third Heading', level: 2 },
      { id: 'heading-4', text: 'Fourth Heading', level: 4 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    expect(wrapper.find('.table-of-contents').exists()).toBe(true);
    // Should only show h2 headings (2 out of 4)
    expect(wrapper.findAll('.toc-item')).toHaveLength(2);
    expect(wrapper.text()).toContain('First Heading');
    expect(wrapper.text()).toContain('Third Heading');
    expect(wrapper.text()).not.toContain('Second Heading');
    expect(wrapper.text()).not.toContain('Fourth Heading');
  });

  it('should have toggle functionality for showing/hiding content', async () => {
    const headings = [
      { id: 'heading-1', text: 'H2 Heading', level: 2 },
      { id: 'heading-2', text: 'Another H2', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const toggleButton = wrapper.find('button');
    expect(toggleButton.exists()).toBe(true);
    expect(toggleButton.text()).toContain('Table of Contents');

    // Check SVG icon rotation state (should start rotated when expanded)
    const svg = wrapper.find('svg');
    expect(svg.classes()).toContain('rotate-180');

    // Click to collapse
    await toggleButton.trigger('click');
    expect(svg.classes()).not.toContain('rotate-180');

    // Click to expand again
    await toggleButton.trigger('click');
    expect(svg.classes()).toContain('rotate-180');
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

  it('should render anchor links for navigation only for h2 headings', () => {
    const headings = [
      { id: 'heading-1', text: 'First Heading', level: 2 },
      { id: 'heading-2', text: 'Second Heading', level: 3 },
      { id: 'heading-3', text: 'Third Heading', level: 2 }
    ];

    const wrapper = mount(TableOfContents, {
      props: { headings }
    });

    const links = wrapper.findAll('a');
    // Should only show 2 links (for h2 headings)
    expect(links).toHaveLength(2);
    expect(links[0].attributes('href')).toBe('#heading-1');
    expect(links[1].attributes('href')).toBe('#heading-3');
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