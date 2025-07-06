<template>
  <section class="w-full py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Trenddit Memo Insights
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover how to maximize your productivity with our AI-powered knowledge management tool
        </p>
      </div>

      <!-- Blog Posts Showcase -->
      <div class="space-y-0">
        <article
          v-for="(post, index) in featuredPosts"
          :key="post.slug"
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24"
          :class="[
            { 'lg:grid-flow-col-dense': index % 2 === 1 },
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          ]"
        >
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
            <!-- Image Section -->
            <div 
              class="relative group"
              :class="index % 2 === 1 ? 'lg:col-start-2' : ''"
            >
              <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img 
                  :src="post.featuredImage"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <!-- Content Section -->
            <div 
              class="space-y-8"
              :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''"
            >
              <div class="space-y-6">
                <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {{ post.title }}
                </h3>
                <p class="text-lg text-gray-600 leading-relaxed">
                  {{ post.excerpt }}
                </p>
              </div>

              <!-- CTA Button -->
              <div class="pt-4">
                <a 
                  :href="`/blog/${post.slug}`"
                  class="inline-flex items-center group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Read More</span>
                  <svg 
                    class="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>

              <!-- Meta Information -->
              <div class="flex items-center space-x-4 pt-6 border-t border-gray-200">
                <span class="text-sm text-gray-500">By {{ post.author }}</span>
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                <div class="flex items-center space-x-2">
                  <span 
                    v-for="tag in post.tags.slice(0, 2)" 
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Posts CTA -->
      <div class="text-center mt-20 pt-16 border-t border-gray-200">
        <a 
          href="/blog"
          class="inline-flex items-center group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Explore All Posts</span>
          <svg 
            class="ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string[];
}

const featuredPosts = ref<BlogPost[]>([]);

onMounted(async () => {
  await loadFeaturedPosts();
});

const loadFeaturedPosts = async () => {
  try {
    // Get all blog posts
    const allPosts = await import.meta.glob('/src/pages/blog/*.md');
    const postEntries = Object.entries(allPosts);
    
    // Load and process posts
    const loadedPosts = await Promise.all(
      postEntries.map(async ([path, loadPost]) => {
        try {
          const post = await loadPost() as any;
          const slug = path.split('/').pop()?.replace('.md', '') || '';
          
          return {
            slug,
            title: post.frontmatter?.title || 'Untitled',
            excerpt: post.frontmatter?.excerpt || 'No excerpt available',
            featuredImage: post.frontmatter?.featuredImage || '/images/blog/select-content-to-capture.png',
            author: post.frontmatter?.author || 'Trenddit Team',
            tags: post.frontmatter?.tags || []
          };
        } catch (error) {
          console.warn(`Failed to load post: ${path}`, error);
          return null;
        }
      })
    );
    
    // Filter posts by Trenddit Memo tag
    const validPosts = loadedPosts.filter(post => 
      post !== null && 
      post.tags.some(tag => 
        tag.toLowerCase().includes('trenddit') || 
        tag.toLowerCase().includes('memo') ||
        tag.toLowerCase().includes('knowledge') ||
        tag.toLowerCase().includes('ai-tools')
      )
    ) as BlogPost[];
    
    // If no specific posts found, get posts with AI/automation themes
    if (validPosts.length === 0) {
      const aiPosts = loadedPosts.filter(post => 
        post !== null && 
        post.tags.some(tag => 
          tag.toLowerCase().includes('ai') ||
          tag.toLowerCase().includes('automation') ||
          tag.toLowerCase().includes('productivity')
        )
      ) as BlogPost[];
      
      featuredPosts.value = aiPosts.slice(0, 3);
    } else {
      featuredPosts.value = validPosts.slice(0, 3);
    }

    // Fallback posts if still empty
    if (featuredPosts.value.length === 0) {
      featuredPosts.value = [
        {
          slug: 'introducing-trenddit-memo-ai-browsing',
          title: 'Introducing Trenddit Memo: Transform Your Browsing with AI',
          excerpt: 'Discover how our Chrome extension revolutionizes knowledge management by turning your browsing into intelligent conversations with AI.',
          featuredImage: '/images/blog/select-content-to-capture.png',
          author: 'Trenddit Team',
          tags: ['trenddit-memo', 'ai', 'knowledge-management']
        },
        {
          slug: 'trenddit-memo-privacy-first-design',
          title: 'Privacy-First Design: How Trenddit Memo Protects Your Data',
          excerpt: 'Learn about our commitment to privacy and how we built security into every aspect of our knowledge management platform.',
          featuredImage: '/images/blog/select-content-to-capture.png',
          author: 'Trenddit Team',
          tags: ['trenddit-memo', 'privacy', 'security']
        },
        {
          slug: 'trenddit-memo-multi-ai-providers',
          title: 'Multi-AI Provider Support in Trenddit Memo',
          excerpt: 'Explore how Trenddit Memo integrates with multiple AI providers to give you choice and flexibility in your knowledge workflows.',
          featuredImage: '/images/blog/select-content-to-capture.png',
          author: 'Trenddit Team',
          tags: ['trenddit-memo', 'ai-providers', 'flexibility']
        }
      ];
    }
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    // Set fallback posts
    featuredPosts.value = [
      {
        slug: 'introducing-trenddit-memo-ai-browsing',
        title: 'Introducing Trenddit Memo: Transform Your Browsing with AI',
        excerpt: 'Discover how our Chrome extension revolutionizes knowledge management by turning your browsing into intelligent conversations with AI.',
        featuredImage: '/images/blog/select-content-to-capture.png',
        author: 'Trenddit Team',
        tags: ['trenddit-memo', 'ai', 'knowledge-management']
      }
    ];
  }
};
</script>

<style scoped>
/* Enhanced shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Grid responsive adjustments */
@media (max-width: 1023px) {
  .lg\:grid-flow-col-dense {
    grid-auto-flow: unset !important;
  }
  
  .lg\:col-start-2,
  .lg\:col-start-1,
  .lg\:row-start-1 {
    grid-column-start: unset !important;
    grid-row-start: unset !important;
  }
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
</style>