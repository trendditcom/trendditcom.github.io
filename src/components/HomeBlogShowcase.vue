<template>
  <section class="w-full">
    <!-- Section Header -->
    <div class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest from Our Blog
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insights on AI business intelligence, dashboard analytics, knowledge graphs, and strategic decision-making
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
        :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
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
        </div>
      </article>
    </div>

    <!-- View All Posts CTA -->
    <div class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center pt-16 border-t border-gray-200">
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
  date?: string;
}

const featuredPosts = ref<BlogPost[]>([]);

onMounted(async () => {
  await loadLatestPosts();
});

const loadLatestPosts = async () => {
  try {
    // Get all blog posts
    const allPosts = await import.meta.glob('/src/pages/blog/*.md');
    const postEntries = Object.entries(allPosts);
    
    // Load and process posts with dates
    const loadedPosts = await Promise.all(
      postEntries.map(async ([path, loadPost]) => {
        try {
          const post = await loadPost() as any;
          const slug = path.split('/').pop()?.replace('.md', '') || '';
          
          return {
            slug,
            title: post.frontmatter?.title || 'Untitled',
            excerpt: post.frontmatter?.excerpt || 'No excerpt available',
            featuredImage: post.frontmatter?.featuredImage || '/images/blog/vibe-coding-workflows.png',
            author: post.frontmatter?.author || 'Trenddit Team',
            tags: post.frontmatter?.tags || [],
            date: post.frontmatter?.publishDate || post.frontmatter?.date || new Date().toISOString()
          };
        } catch (error) {
          console.warn(`Failed to load post: ${path}`, error);
          return null;
        }
      })
    );
    
    // Filter out failed loads
    const validPosts = loadedPosts.filter(post => post !== null) as BlogPost[];
    
    // Prioritize posts: 2 Moments Dashboard, 2 Trenddit Client/AI Intelligence, 1 Trenddit Memo
    const momentsDashboardPosts = validPosts
      .filter(post => 
        post.tags.includes('Moments') || 
        post.tags.includes('Dashboard') || 
        post.tags.includes('Knowledge Graph') ||
        post.tags.includes('Analytics') ||
        post.tags.includes('Correlation Analysis') ||
        post.tags.includes('Factor Analysis'))
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
      .slice(0, 2);
    
    const trendditClientPosts = validPosts
      .filter(post => 
        !momentsDashboardPosts.some(mp => mp.slug === post.slug) &&
        (post.tags.includes('Trenddit Client') || 
         post.tags.includes('AI Intelligence') ||
         post.tags.includes('Business Intelligence'))
      )
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
      .slice(0, 2);
    
    const trendditMemoPosts = validPosts
      .filter(post => 
        !momentsDashboardPosts.some(mp => mp.slug === post.slug) &&
        !trendditClientPosts.some(tc => tc.slug === post.slug) &&
        (post.tags.includes('Trenddit Memo') || post.tags.includes('trenddit-memo'))
      )
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
      .slice(0, 1);
    
    // Combine in the desired order
    const prioritizedPosts = [
      ...momentsDashboardPosts,
      ...trendditClientPosts,
      ...trendditMemoPosts
    ];
    
    // Fill remaining slots with other posts if needed
    const remainingSlots = 5 - prioritizedPosts.length;
    if (remainingSlots > 0) {
      const usedSlugs = new Set(prioritizedPosts.map(p => p.slug));
      const otherPosts = validPosts
        .filter(post => !usedSlugs.has(post.slug))
        .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
        .slice(0, remainingSlots);
      
      prioritizedPosts.push(...otherPosts);
    }
    
    featuredPosts.value = prioritizedPosts.slice(0, 5);

    // Fallback posts if no posts loaded
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
          excerpt: 'Discover hidden connections in the AI ecosystem through force-directed network visualization with 237+ entities and 1,814 relationships.',
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
        },
        {
          slug: 'moments-factor-analytics-sunburst-visualization',
          title: 'Factor Distribution Analytics: Advanced Sunburst Charts for AI Intelligence',
          excerpt: 'Unlock hidden patterns in AI industry dynamics through multi-dimensional visualization combining interactive sunburst charts with correlation heatmaps.',
          featuredImage: '/images/blog/dashboard-factors.png',
          author: 'Trenddit Advisory Team',
          tags: ['Moments', 'Factor Analysis', 'Data Visualization']
        },
        {
          slug: 'introducing-trenddit-memo-ai-browsing',
          title: 'Introducing Trenddit Memo: AI-Powered Browsing',
          excerpt: 'Transform your browsing experience with our intelligent Chrome extension for knowledge management.',
          featuredImage: '/images/blog/select-content-to-capture.png',
          author: 'Trenddit Team',
          tags: ['trenddit-memo', 'ai', 'productivity']
        }
      ];
    }
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    // Set fallback posts
    featuredPosts.value = [
      {
        slug: 'coding-with-claude-code',
        title: 'Coding with Claude Code: A Developer\'s Guide',
        excerpt: 'Learn how to maximize your productivity using Claude Code for AI-assisted development workflows.',
        featuredImage: '/images/blog/vibe-coding-workflows.png',
        author: 'Trenddit Team',
        tags: ['ai', 'development', 'tools']
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