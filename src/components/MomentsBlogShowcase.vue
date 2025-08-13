<template>
  <section class="w-full">
    <!-- Section Header -->
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Moments Insights
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced insights into analytics dashboards, interactive knowledge graphs, correlation matrix intelligence, and strategic business intelligence workflows
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
              <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
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
                  class="inline-flex items-center group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Read Intelligence Guide</span>
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
                    class="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium rounded-full"
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

    <!-- View Moments Posts CTA -->
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center pt-16 border-t border-emerald-200">
        <a 
          href="/blog?tag=Moments"
          class="inline-flex items-center group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Explore Moments Insights</span>
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
  await loadMomentsPosts();
});

const loadMomentsPosts = async () => {
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
            featuredImage: post.frontmatter?.featuredImage || '/images/blog/moments.png',
            author: post.frontmatter?.author || 'Trenddit Team',
            tags: post.frontmatter?.tags || []
          };
        } catch (error) {
          console.warn(`Failed to load post: ${path}`, error);
          return null;
        }
      })
    );
    
    // Filter posts by Moments-related tags including dashboard features
    const validPosts = loadedPosts.filter(post => 
      post !== null && 
      post.tags.some(tag => 
        tag.includes('Moments') ||
        tag.includes('Dashboard') ||
        tag.includes('Analytics') ||
        tag.includes('Knowledge Graph') ||
        tag.includes('Network Analysis') ||
        tag.includes('Correlation Analysis') ||
        tag.includes('Factor Analysis') ||
        tag.includes('AI Intelligence') ||
        tag.includes('Business Intelligence') ||
        tag.includes('Multi-Agent Systems') ||
        tag.includes('Performance Optimization') ||
        tag.includes('File System Architecture')
      )
    ) as BlogPost[];
    
    // If no specific posts found, get posts with business intelligence themes
    if (validPosts.length === 0) {
      const intelligencePosts = loadedPosts.filter(post => 
        post !== null && 
        post.tags.some(tag => 
          tag.toLowerCase().includes('intelligence') ||
          tag.toLowerCase().includes('business') ||
          tag.toLowerCase().includes('competitive') ||
          tag.toLowerCase().includes('research')
        )
      ) as BlogPost[];
      
      featuredPosts.value = intelligencePosts.slice(0, 3);
    } else {
      featuredPosts.value = validPosts.slice(0, 3);
    }

    // Fallback posts if still empty
    if (featuredPosts.value.length === 0) {
      featuredPosts.value = [
        {
          slug: 'moments-dashboard-three-tier-analytics',
          title: 'Moments Dashboard: Three-Tier Analytics for AI Business Intelligence',
          excerpt: 'Transform AI industry data into strategic insights with Moments three-tier analytics dashboard featuring real-time KPIs, correlation intelligence, and factor analysis.',
          featuredImage: '/images/blog/dashboard.png',
          author: 'Trenddit Advisory Team',
          tags: ['Moments', 'Dashboard', 'Analytics']
        },
        {
          slug: 'moments-knowledge-graph-network-visualization',
          title: 'Interactive Knowledge Graph: Network Visualization for AI Industry Intelligence',
          excerpt: 'Discover hidden connections in the AI ecosystem through force-directed network visualization with 237+ entities and 1,814 relationships revealing strategic patterns.',
          featuredImage: '/images/blog/graph.png',
          author: 'Trenddit Advisory Team',
          tags: ['Moments', 'Knowledge Graph', 'Network Analysis']
        },
        {
          slug: 'moments-correlation-matrix-analytics',
          title: 'Correlation Matrix Analytics: Quantifying AI Industry Relationships',
          excerpt: 'Transform qualitative AI industry connections into precise quantitative insights through advanced correlation coefficients and statistical relationship measurement.',
          featuredImage: '/images/blog/matrix.png',
          author: 'Trenddit Advisory Team',
          tags: ['Moments', 'Correlation Analysis', 'Analytics']
        }
      ];
    }
    
  } catch (error) {
    console.error('Error loading Moments posts:', error);
    // Set fallback posts
    featuredPosts.value = [
      {
        slug: 'moments-dashboard-three-tier-analytics',
        title: 'Moments Dashboard: Three-Tier Analytics for AI Business Intelligence',
        excerpt: 'Transform AI industry data into strategic insights with Moments three-tier analytics dashboard featuring real-time KPIs, correlation intelligence, and factor analysis.',
        featuredImage: '/images/blog/dashboard.png',
        author: 'Trenddit Advisory Team',
        tags: ['Moments', 'Dashboard', 'Analytics']
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