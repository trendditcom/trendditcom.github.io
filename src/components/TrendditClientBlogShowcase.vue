<template>
  <section class="w-full">
    <!-- Section Header -->
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trenddit Client Insights
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deep insights into enterprise intelligence, AI-first technology decisions, and strategic implementation guidance
          </p>
        </div>
      </div>
    </div>

    <!-- Blog Posts Showcase -->
    <div class="space-y-0">
      <article
        v-for="(post, index) in featuredPosts"
        :key="post.slug"
        class="w-full py-24"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
            <!-- Image Section -->
            <div 
              class="relative group"
              :class="index % 2 === 1 ? 'lg:col-start-2' : ''"
            >
              <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
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
                  class="inline-flex items-center group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Read Enterprise Guide</span>
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
                    class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- View Trenddit Client Posts CTA -->
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center pt-16 border-t border-blue-200">
        <a 
          href="/blog?tag=Trenddit%20Client"
          class="inline-flex items-center group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Explore Trenddit Client Insights</span>
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
  await loadTrendditClientPosts();
});

const loadTrendditClientPosts = async () => {
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
            featuredImage: post.frontmatter?.featuredImage || '/images/blog/trends-intelligence-cards.png',
            author: post.frontmatter?.author || 'Trenddit Team',
            tags: post.frontmatter?.tags || []
          };
        } catch (error) {
          console.warn(`Failed to load post: ${path}`, error);
          return null;
        }
      })
    );
    
    // Filter posts by Trenddit Client tag
    const validPosts = loadedPosts.filter(post => 
      post !== null && 
      post.tags.some(tag => 
        tag.includes('Trenddit Client') ||
        tag.includes('AI Intelligence') ||
        tag.includes('Enterprise Technology') ||
        tag.includes('Enterprise Strategy') ||
        tag.includes('AI Advisory')
      )
    ) as BlogPost[];
    
    // If no specific posts found, get posts with enterprise/intelligence themes
    if (validPosts.length === 0) {
      const enterprisePosts = loadedPosts.filter(post => 
        post !== null && 
        post.tags.some(tag => 
          tag.toLowerCase().includes('enterprise') ||
          tag.toLowerCase().includes('intelligence') ||
          tag.toLowerCase().includes('strategic') ||
          tag.toLowerCase().includes('advisory')
        )
      ) as BlogPost[];
      
      featuredPosts.value = enterprisePosts.slice(0, 3);
    } else {
      featuredPosts.value = validPosts.slice(0, 3);
    }

    // Fallback posts if still empty
    if (featuredPosts.value.length === 0) {
      featuredPosts.value = [
        {
          slug: 'ai-driven-trend-analysis-enterprise-intelligence',
          title: 'AI-Driven Trend Analysis: Enterprise Intelligence Systems',
          excerpt: 'Discover how AI-first intelligence systems transform enterprise technology adoption decisions through multi-agent reasoning and predictive analysis.',
          featuredImage: '/images/blog/trends-intelligence-cards.png',
          author: 'Trenddit Team',
          tags: ['Trenddit Client', 'AI Intelligence', 'Enterprise Technology']
        },
        {
          slug: 'enterprise-ai-advisory-platform-technology-decisions',
          title: 'Enterprise AI Advisory Platform: Technology Investment Decisions',
          excerpt: 'How Trenddit Client revolutionizes enterprise technology adoption with AI-first intelligence and predictive forecasting.',
          featuredImage: '/images/blog/trenddit-workflow.png',
          author: 'Trenddit Team',
          tags: ['Trenddit Client', 'Enterprise Strategy', 'AI Advisory']
        },
        {
          slug: 'getting-started-trenddit-client-enterprise-intelligence',
          title: 'Getting Started with Trenddit Client: AI-Powered Enterprise Intelligence',
          excerpt: 'Complete step-by-step guide to implementing Trenddit Client for enterprise technology decision-making.',
          featuredImage: '/images/blog/personalized-trends.png',
          author: 'Trenddit Team',
          tags: ['Trenddit Client', 'Getting Started', 'User Guide']
        }
      ];
    }
    
  } catch (error) {
    console.error('Error loading Trenddit Client posts:', error);
    // Set fallback posts
    featuredPosts.value = [
      {
        slug: 'ai-driven-trend-analysis-enterprise-intelligence',
        title: 'AI-Driven Trend Analysis: Enterprise Intelligence Systems',
        excerpt: 'Discover how AI-first intelligence systems transform enterprise technology adoption decisions through multi-agent reasoning and predictive analysis.',
        featuredImage: '/images/blog/trends-intelligence-cards.png',
        author: 'Trenddit Team',
        tags: ['Trenddit Client', 'AI Intelligence', 'Enterprise Technology']
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