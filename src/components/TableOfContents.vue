<template>
  <div 
    v-if="headings && headings.length > 0"
    :class="[
      'table-of-contents fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-50',
      'transition-all duration-300 ease-in-out',
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
    ]"
  >
    <div class="bg-white shadow-lg rounded-lg p-4 max-w-xs border border-gray-200">
      <h3 class="text-sm font-semibold text-gray-700 mb-3">Table of Contents</h3>
      <nav class="space-y-2">
        <a
          v-for="heading in headings"
          :key="heading.id"
          :href="`#${heading.id}`"
          :class="[
            'toc-item',
            `toc-level-${heading.level}`,
            'block text-sm hover:text-blue-600 transition-colors duration-200'
          ]"
          :style="{ paddingLeft: `${(heading.level - 2) * 12}px` }"
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
const isVisible = ref(false);

onMounted(() => {
  // If no headings are provided via props, extract them from the page
  if (!props.headings || props.headings.length === 0) {
    extractHeadingsFromPage();
  }

  // Set up scroll listener for visibility
  setupScrollListener();
});

const setupScrollListener = () => {
  let heroSection: Element | null = null;
  let lastHeading: Element | null = null;
  let heroScrolledPast = false;
  let lastSectionVisible = false;
  
  // Find the hero section (either with featured image or fallback header)
  const heroWithImage = document.querySelector('.relative.min-h-screen.overflow-hidden');
  const heroFallback = document.querySelector('.relative.py-24.bg-gradient-to-br');
  heroSection = heroWithImage || heroFallback;
  
  // Find the related posts section or last heading
  setTimeout(() => {
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
  }, 100); // Small delay to ensure components are rendered

  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        const heroEntry = entries[0];
        heroScrolledPast = !heroEntry.isIntersecting || heroEntry.intersectionRatio < 0.1;
        
        // Update visibility based on both conditions
        isVisible.value = heroScrolledPast && !lastSectionVisible;
      },
      {
        rootMargin: '-10% 0px -10% 0px', // Trigger when hero is mostly out of view
        threshold: [0, 0.1, 0.5, 1]
      }
    );

    heroObserver.observe(heroSection);
  } else {
    // Fallback: show TOC after scrolling 300px if no hero section found
    const handleScroll = () => {
      isVisible.value = window.scrollY > 300;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
};

const extractHeadingsFromPage = () => {
  const headingElements = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');
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
.toc-level-2 {
  font-weight: 500;
  color: rgb(31 41 55);
}

.toc-level-3 {
  color: rgb(75 85 99);
}

.toc-level-4 {
  color: rgb(107 114 128);
  font-size: 0.75rem;
  line-height: 1rem;
}

.toc-level-5, .toc-level-6 {
  color: rgb(156 163 175);
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>