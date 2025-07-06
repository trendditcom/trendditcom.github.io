<template>
  <div 
    v-if="firstLevelHeadings && firstLevelHeadings.length > 0"
    :class="[
      'table-of-contents fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-50',
      'transition-all duration-300 ease-in-out',
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
    ]"
  >
    <div class="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
      <!-- Toggle Button -->
      <button
        @click="toggleTocVisibility"
        :class="[
          'w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100',
          'text-sm font-semibold text-gray-700 transition-colors duration-200',
          'border-b border-gray-200'
        ]"
      >
        <span>Table of Contents</span>
        <svg
          :class="[
            'w-4 h-4 transition-transform duration-200',
            isTocExpanded ? 'rotate-180' : ''
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>
      
      <!-- Content -->
      <nav 
        v-show="isTocExpanded"
        class="p-4 space-y-2 max-w-xs"
      >
        <a
          v-for="heading in firstLevelHeadings"
          :key="heading.id"
          :href="`#${heading.id}`"
          :class="[
            'toc-item block text-sm hover:text-blue-600 transition-colors duration-200',
            'font-medium text-gray-800'
          ]"
          @click="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  headings?: Heading[];
}

const props = defineProps<Props>();
const headings = ref<Heading[]>(props.headings || []);
const firstLevelHeadings = ref<Heading[]>(
  props.headings ? props.headings.filter(h => h.level === 2) : []
);
const isVisible = ref(false); // Start hidden until scrolled past hero
const isTocExpanded = ref(true);

onMounted(() => {
  // If no headings are provided via props, extract them from the page
  if (!props.headings || props.headings.length === 0) {
    extractHeadingsFromPage();
  } else {
    // Set headings and filter to only show first-level (h2)
    headings.value = props.headings;
    filterFirstLevelHeadings();
  }

  // Set up scroll listener for visibility
  setupScrollListener();
});

const setupScrollListener = () => {
  let heroSection: Element | null = null;
  let lastHeading: Element | null = null;
  let heroScrolledPast = false;
  let lastSectionVisible = false;
  
  // Add a small delay to ensure DOM is fully loaded and prevent flashing
  setTimeout(() => {
    // Find the hero section (either with featured image or fallback header)
    const heroWithImage = document.querySelector('.relative.min-h-screen.overflow-hidden');
    const heroFallback = document.querySelector('.relative.py-24.bg-gradient-to-br');
    heroSection = heroWithImage || heroFallback;
    
    // Find the related posts section or last heading
    const relatedPostsSection = document.querySelector('[data-related-posts]') ||
                                 document.querySelector('h3') ||
                                 document.querySelector('.mt-16.pt-8.border-t');
    
    if (relatedPostsSection) {
      lastHeading = relatedPostsSection;
    } else {
      // Fallback: find the last heading in the content
      const allHeadings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');
      lastHeading = allHeadings[allHeadings.length - 1] || null;
    }
    
    // Set up observer for the last section if found
    if (lastHeading) {
      const lastSectionObserver = new IntersectionObserver(
        (entries) => {
          const lastEntry = entries[0];
          lastSectionVisible = lastEntry.isIntersecting && lastEntry.intersectionRatio > 0.1;
          
          // Update visibility based on both conditions
          isVisible.value = heroScrolledPast && !lastSectionVisible;
        },
        {
          rootMargin: '0px 0px -20% 0px', // Trigger when last section is 20% into viewport
          threshold: [0, 0.1, 0.5]
        }
      );
      
      lastSectionObserver.observe(lastHeading);
    }
    
    if (heroSection) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          const heroEntry = entries[0];
          // Only consider hero scrolled past when it's completely out of view
          heroScrolledPast = !heroEntry.isIntersecting || heroEntry.intersectionRatio === 0;
          
          // Update visibility based on both conditions
          isVisible.value = heroScrolledPast && !lastSectionVisible;
        },
        {
          rootMargin: '-100px 0px 0px 0px', // Trigger only after hero is 100px out of view
          threshold: [0]
        }
      );

      heroObserver.observe(heroSection);
    } else {
      // Fallback: show TOC after scrolling past viewport height if no hero section found
      const handleScroll = () => {
        // Only show after scrolling past the viewport height
        isVisible.value = window.scrollY > window.innerHeight;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }, 200); // Increased delay to prevent initial flash
};

const extractHeadingsFromPage = () => {
  // Only extract h2 headings (first-level headings)
  const headingElements = document.querySelectorAll('.prose h2');
  const extractedHeadings: Heading[] = [];

  headingElements.forEach((element) => {
    const level = parseInt(element.tagName.charAt(1));
    const text = element.textContent?.trim() || '';
    let id = element.id;

    // Generate ID if not present
    if (!id) {
      id = generateHeadingId(text);
      element.id = id;
    }

    extractedHeadings.push({
      id,
      text,
      level
    });
  });

  headings.value = extractedHeadings;
  firstLevelHeadings.value = extractedHeadings;
};

const filterFirstLevelHeadings = () => {
  // Filter to only show h2 headings
  firstLevelHeadings.value = headings.value.filter(heading => heading.level === 2);
};

const toggleTocVisibility = () => {
  isTocExpanded.value = !isTocExpanded.value;
};

const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.toc-item {
  transition: all 0.2s ease;
}

.toc-item:hover {
  padding-left: 0.25rem;
}
</style>