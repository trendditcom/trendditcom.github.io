<template>
  <section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
    
    <!-- Content Container -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-6xl mx-auto">
        <!-- Main Title -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight animate-fade-in tracking-tight">
          <span class="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Products
          </span>
        </h1>
        
        <!-- Glassmorphism Card for Description -->
        <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl animate-slide-up max-w-4xl mx-auto">
          <p class="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-6">
            AI-Powered Business Intelligence for Strategic Decision-Making
          </p>
          
          <p class="text-lg text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
            Transform overwhelming AI industry information into strategic insights with Moments. Automatically discover, analyze, and connect pivotal moments across 100+ AI companies using specialized AI agents and local-first architecture.
          </p>
          
          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              as="a" 
              href="https://github.com/trendditcom/moments" 
              target="_blank" 
              class="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Get Moments
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              as="a" 
              href="/blog"
              class="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-full hover:border-white/80"
            >
              <span class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Learn More
              </span>
            </Button>
          </div>
        </div>
        
        <!-- Feature Highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up-delayed">
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Multi-Agent Processing</h3>
            <p class="text-white/70 text-sm">Specialized AI agents for content analysis and correlation discovery</p>
          </div>
          
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c1.21 0 2.9.57 4 1.68C17.11 5.78 17.89 7.57 18 9h1l-1 5.5c-.1 1.43-.9 2.22-2 2.5l-1-.5c-1.1.28-1.9 1.07-2 2.5L12 19c-.1-1.43-.9-2.22-2-2.5l-1 .5c-1.1-.28-1.9-1.07-2-2.5L6 9h1c.11-1.43.89-3.22 2-4.32C10.1 3.57 11.79 3 13 3z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Smart Correlation Discovery</h3>
            <p class="text-white/70 text-sm">Automatically discover relationships between business events</p>
          </div>
          
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Local-First Architecture</h3>
            <p class="text-white/70 text-sm">Your data stays secure on your systems with complete privacy control</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<style scoped>
/* Grid background pattern */
.bg-grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Animations */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up-delayed {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 1s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-slide-up-delayed {
  animation: slide-up-delayed 1s ease-out 0.6s forwards;
  opacity: 0;
}

/* Glass morphism enhancements */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Button hover effects */
.transform:hover {
  transition: transform 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}
</style>