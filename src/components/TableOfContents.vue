<template>
  <div 
    v-if="headings && headings.length > 0"
    class="table-of-contents fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-50"
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

onMounted(() => {
  // If no headings are provided via props, extract them from the page
  if (!props.headings || props.headings.length === 0) {
    extractHeadingsFromPage();
  }
});

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