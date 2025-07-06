<template>
  <div>
    <BlogTagFilter 
      :tags="allTags" 
      @filter-changed="handleFilterChange"
    />
    
    <div class="space-y-8">
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">
          No posts found for "{{ activeFilter }}" tag.
        </p>
        <button 
          @click="clearFilter"
          class="mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          View all posts
        </button>
      </div>
      
      <article 
        v-for="post in filteredPosts" 
        :key="post.url"
        class="border-b pb-8"
      >
        <a :href="post.url" class="group">
          <div class="flex gap-6">
            <div 
              v-if="post.frontmatter.featuredImage" 
              class="flex-shrink-0 w-48 h-32 overflow-hidden rounded-lg"
            >
              <img 
                :src="post.frontmatter.featuredImage" 
                :alt="post.frontmatter.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {{ post.frontmatter.title }}
              </h2>
              <p class="mt-3 text-gray-600">{{ post.frontmatter.excerpt }}</p>
              <div class="flex flex-wrap gap-2 mt-4">
                <span 
                  v-for="tag in getClassificationTags(post.frontmatter.tags)"
                  :key="tag"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BlogTagFilter from './BlogTagFilter.vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const activeFilter = ref('')
const allTags = ref([])

const classificationTags = ['Trenddit Memo', 'AI Agents', 'Code Generation', 'Lean Workflows']

onMounted(() => {
  // Extract all unique tags from posts
  const uniqueTags = new Set()
  props.posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => uniqueTags.add(tag))
    }
  })
  allTags.value = Array.from(uniqueTags)
})

const filteredPosts = computed(() => {
  if (!activeFilter.value) {
    return props.posts
  }
  
  return props.posts.filter(post => {
    return post.frontmatter.tags && post.frontmatter.tags.includes(activeFilter.value)
  })
})

const handleFilterChange = (tag) => {
  activeFilter.value = tag
}

const clearFilter = () => {
  activeFilter.value = ''
  const url = new URL(window.location)
  url.searchParams.delete('tag')
  window.history.replaceState({}, '', url)
}

const getClassificationTags = (tags) => {
  if (!tags) return []
  return tags.filter(tag => classificationTags.includes(tag))
}
</script>