import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RelatedPosts from '@components/RelatedPosts.vue';

describe('RelatedPosts', () => {
  const mockPosts = [
    {
      url: '/blog/test-post-1',
      frontmatter: {
        title: 'Test Post 1',
        excerpt: 'This is a test excerpt for post 1',
        featuredImage: '/images/blog/test1.png',
        author: 'Test Author',
        tags: ['test', 'vue', 'component']
      }
    },
    {
      url: '/blog/test-post-2',
      frontmatter: {
        title: 'Test Post 2',
        excerpt: 'This is a test excerpt for post 2',
        featuredImage: '/images/blog/test2.png',
        author: 'Test Author',
        tags: ['test', 'javascript', 'development']
      }
    },
    {
      url: '/blog/test-post-3',
      frontmatter: {
        title: 'Test Post 3',
        excerpt: 'This is a test excerpt for post 3',
        featuredImage: '/images/blog/test3.png',
        author: 'Test Author',
        tags: ['test', 'react', 'frontend']
      }
    },
    {
      url: '/blog/test-post-4',
      frontmatter: {
        title: 'Test Post 4',
        excerpt: 'This is a test excerpt for post 4',
        featuredImage: '/images/blog/test4.png',
        author: 'Test Author',
        tags: ['test', 'backend', 'api']
      }
    }
  ];

  it('should render related posts when provided', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1', 'test-post-2'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('h3').text()).toBe('Related Articles');
    expect(wrapper.findAll('article')).toHaveLength(2);
  });

  it('should not render when no related posts provided', () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: [],
        allPosts: mockPosts
      }
    });

    expect(wrapper.find('h3').exists()).toBe(false);
  });

  it('should display post information correctly', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();

    const postElement = wrapper.find('article');
    expect(postElement.find('h4').text()).toBe('Test Post 1');
    expect(postElement.text()).toContain('This is a test excerpt for post 1');
    expect(postElement.text()).toContain('Test Author');
  });

  it('should have navigation buttons for carousel', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1', 'test-post-2', 'test-post-3', 'test-post-4'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();
    
    // Give a small delay for all async operations to complete
    await new Promise(resolve => setTimeout(resolve, 10));
    await wrapper.vm.$nextTick();

    // Initially, only next button should be visible (currentIndex = 0)
    expect(wrapper.find('[aria-label="Previous posts"]').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Next posts"]').exists()).toBe(true);
  });

  it('should display tags for each post', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();

    const tagElements = wrapper.findAll('.text-blue-700');
    expect(tagElements.length).toBeGreaterThan(0);
    expect(tagElements[0].text()).toBe('test');
  });

  it('should have proper links to blog posts', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();

    const linkElement = wrapper.find('a');
    expect(linkElement.attributes('href')).toBe('/blog/test-post-1');
  });

  it('should handle carousel navigation', async () => {
    const wrapper = mount(RelatedPosts, {
      props: {
        relatedPostSlugs: ['test-post-1', 'test-post-2', 'test-post-3', 'test-post-4'],
        allPosts: mockPosts
      }
    });

    // Wait for component to mount and load posts
    await wrapper.vm.$nextTick();
    
    // Give a small delay for all async operations to complete
    await new Promise(resolve => setTimeout(resolve, 10));
    await wrapper.vm.$nextTick();

    // Initially only next button should exist
    let nextButton = wrapper.find('[aria-label="Next posts"]');
    expect(nextButton.exists()).toBe(true);
    
    // Click next button to move forward
    await nextButton.trigger('click');
    await wrapper.vm.$nextTick();
    
    // Now both buttons should exist (we can go forward and backward)
    const prevButton = wrapper.find('[aria-label="Previous posts"]');
    nextButton = wrapper.find('[aria-label="Next posts"]'); // Re-query after state change
    
    expect(prevButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(true);
  });
});