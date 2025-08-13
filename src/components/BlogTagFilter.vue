<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-3 items-center">
      <span class="text-sm font-medium text-gray-700">Filter by:</span>
      <button
        @click="setActiveTag('')"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          activeTag === '' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        All Posts
      </button>
      <button
        v-for="tag in availableTags"
        :key="tag"
        @click="setActiveTag(tag)"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          activeTag === tag 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-changed'])

const activeTag = ref('')
const availableTags = ref([])

onMounted(() => {
  // Extract unique classification tags including Moments tags
  const classificationTags = [
    'Moments',
    'Trenddit Client', 
    'Trenddit Memo', 
    'AI Intelligence',
    'Business Intelligence',
    'Multi-Agent Systems',
    'Dashboard',
    'Analytics',
    'Knowledge Graph',
    'Network Analysis',
    'Correlation Analysis',
    'Factor Analysis',
    'Data Visualization',
    'Sunburst Charts',
    'Pattern Recognition',
    'Statistical Analysis',
    'Enterprise Technology',
    'Enterprise Strategy',
    'AI Advisory',
    'AI Agents', 
    'Code Generation', 
    'Lean Workflows',
    'User Guide',
    'Performance Optimization',
    'File System Architecture',
    'Market Research',
    'Competitive Analysis',
    'Data Sovereignty',
    'Strategic Planning',
    'Data Science'
  ]
  availableTags.value = classificationTags

  // Check URL for tag parameter
  const urlParams = new URLSearchParams(window.location.search)
  const tagFromUrl = urlParams.get('tag')
  if (tagFromUrl && classificationTags.includes(tagFromUrl)) {
    activeTag.value = tagFromUrl
    emit('filter-changed', tagFromUrl)
  }
})

const setActiveTag = (tag) => {
  activeTag.value = tag
  
  // Update URL without page reload
  const url = new URL(window.location)
  if (tag) {
    url.searchParams.set('tag', tag)
  } else {
    url.searchParams.delete('tag')
  }
  window.history.replaceState({}, '', url)
  
  emit('filter-changed', tag)
}

watch(activeTag, (newTag) => {
  emit('filter-changed', newTag)
})
</script>