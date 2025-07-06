<template>
  <section class="w-full bg-gray-50 py-16" data-blog-carousel>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Trenddit Memo Insights
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how to maximize your productivity with our AI-powered knowledge management tool
        </p>
      </div>
      
      <!-- Edge-to-Edge Carousel Container -->
      <div class="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        <div 
          ref="carouselTrack"
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
        >
          <article
            v-for="post in blogPosts"
            :key="post.slug"
            class="flex-shrink-0 px-2"
            :style="{ width: `${slideWidth}px` }"
          >
            <a :href="`/blog/${post.slug}`" class="block h-full">
              <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <!-- Featured Image -->
                <div class="relative overflow-hidden rounded-t-xl h-56">
                  <img 
                    :src="post.featuredImage"
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  <!-- Category Badge -->
                  <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-blue-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      Trenddit Memo
                    </span>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="p-6 flex-1 flex flex-col">
                  <h3 class="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {{ post.title }}
                  </h3>
                  <p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {{ post.excerpt }}
                  </p>
                  
                  <!-- Footer -->
                  <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center gap-2">
                      <span class="text-blue-600 text-sm font-medium group-hover:underline">
                        Read More →
                      </span>
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ post.author }}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>
        
        <!-- Navigation Buttons -->
        <button
          v-if="canScrollLeft"
          @click="scrollLeft"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 z-20"
          aria-label="Previous posts"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button
          v-if="canScrollRight"
          @click="scrollRight"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 z-20"
          aria-label="Next posts"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <!-- Dots Indicator -->
      <div class="flex justify-center mt-8 gap-2" v-if="totalSlides > 1">
        <button
          v-for="(dot, index) in totalSlides"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-colors',
            currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string[];
}

const blogPosts = ref<BlogPost[]>([]);
const currentIndex = ref(0);
const carouselTrack = ref<HTMLElement>();
const slideWidth = ref(320);
const visibleSlides = ref(5);

const totalSlides = computed(() => Math.max(0, blogPosts.value.length - visibleSlides.value + 1));
const canScrollLeft = computed(() => currentIndex.value > 0);
const canScrollRight = computed(() => currentIndex.value < totalSlides.value - 1);

onMounted(async () => {
  await loadBlogPosts();
  updateSlideWidth();
  window.addEventListener('resize', updateSlideWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSlideWidth);
});

const updateSlideWidth = () => {
  if (typeof window === 'undefined') return;
  
  const containerWidth = window.innerWidth;
  const maxWidth = Math.min(1280, containerWidth);
  const padding = containerWidth > 1024 ? 64 : containerWidth > 640 ? 48 : 32;
  const availableWidth = maxWidth - padding;
  
  if (containerWidth >= 1280) {
    visibleSlides.value = 5;
    slideWidth.value = availableWidth / 5;
  } else if (containerWidth >= 1024) {
    visibleSlides.value = 4;
    slideWidth.value = availableWidth / 4;
  } else if (containerWidth >= 768) {
    visibleSlides.value = 3;
    slideWidth.value = availableWidth / 3;
  } else if (containerWidth >= 640) {
    visibleSlides.value = 2;
    slideWidth.value = availableWidth / 2;
  } else {
    visibleSlides.value = 1;
    slideWidth.value = availableWidth;
  }
};

const loadBlogPosts = async () => {
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
    
    // If no specific posts found, show all posts
    if (validPosts.length === 0) {
      const allValidPosts = loadedPosts.filter(post => post !== null) as BlogPost[];
      blogPosts.value = allValidPosts.slice(0, 10);
    } else {
      blogPosts.value = validPosts.slice(0, 10);
    }
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    // Fallback posts
    blogPosts.value = [
      {
        slug: 'introducing-trenddit-memo-ai-browsing',
        title: 'Introducing Trenddit Memo: AI-Powered Browsing',
        excerpt: 'Transform your browsing experience with our intelligent Chrome extension for knowledge management.',
        featuredImage: '/images/blog/select-content-to-capture.png',
        author: 'Trenddit Team',
        tags: ['trenddit-memo', 'ai', 'knowledge-management']
      },
      {
        slug: 'trenddit-memo-privacy-first-design',
        title: 'Privacy-First Design in Trenddit Memo',
        excerpt: 'Learn how we built privacy protection into every aspect of our knowledge management platform.',
        featuredImage: '/images/blog/select-content-to-capture.png',
        author: 'Trenddit Team',
        tags: ['trenddit-memo', 'privacy', 'design']
      }
    ];
  }
};

const scrollLeft = () => {
  if (canScrollLeft.value) {
    currentIndex.value = Math.max(0, currentIndex.value - 1);
  }
};

const scrollRight = () => {
  if (canScrollRight.value) {
    currentIndex.value = Math.min(totalSlides.value - 1, currentIndex.value + 1);
  }
};

const goToSlide = (index: number) => {
  currentIndex.value = Math.max(0, Math.min(totalSlides.value - 1, index));
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for responsive changes */
[style*="transform"] {
  transition: transform 0.5s ease-in-out;
}
</style>