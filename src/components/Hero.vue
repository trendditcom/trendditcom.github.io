<template>
  <!-- Apple-style Epic Hero Section -->
  <section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-900 to-purple-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-wave-pattern opacity-15"></div>
    
    <!-- Animated Particles/Dots -->
    <div class="absolute inset-0 opacity-30">
      <div class="floating-particles"></div>
    </div>
    
    <!-- Content Container with Glass Morphism -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-6xl mx-auto">
        <!-- Main Title with Epic Typography -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight animate-fade-in tracking-tight">
          <span class="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Trenddit Memo
          </span>
        </h1>
        
        <!-- Glassmorphism Card for Description -->
        <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl animate-slide-up max-w-4xl mx-auto">
          <p class="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-6">
            Transform your browsing into conversations with AI
          </p>
          
          <p class="text-lg text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
            The Chrome extension that captures web content, organizes with smart tags, and lets you chat with your knowledge management system using multiple AI providers.
          </p>
          
          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              as="a" 
              href="https://github.com/trendditcom/trenddit-memo" 
              target="_blank" 
              data-testid="cta-download"
              class="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Get Trenddit Memo
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
                Explore Our Blog
              </span>
            </Button>
          </div>
        </div>
        
        <!-- Feature Highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up-delayed">
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p class="text-white/70 text-sm">Multiple AI providers for intelligent content processing</p>
          </div>
          
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c1.21 0 2.9.57 4 1.68C17.11 5.78 17.89 7.57 18 9h1l-1 5.5c-.1 1.43-.9 2.22-2 2.5l-1-.5c-1.1.28-1.9 1.07-2 2.5L12 19c-.1-1.43-.9-2.22-2-2.5l-1 .5c-1.1-.28-1.9-1.07-2-2.5L6 9h1c.11-1.43.89-3.22 2-4.32C10.1 3.57 11.79 3 13 3z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Smart Organization</h3>
            <p class="text-white/70 text-sm">Automatic tagging and intelligent categorization</p>
          </div>
          
          <div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Conversational</h3>
            <p class="text-white/70 text-sm">Chat with your captured knowledge naturally</p>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="animate-bounce mt-16">
          <div class="w-6 h-10 border-2 border-white/50 rounded-full mx-auto relative">
            <div class="w-1 h-3 bg-white/70 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-pulse"></div>
          </div>
          <p class="text-white/60 text-sm mt-2 font-light">Explore our products</p>
        </div>
      </div>
    </div>
    
    <!-- Subtle Vignette Effect -->
    <div class="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/30"></div>
  </section>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Wave background pattern */
.bg-wave-pattern {
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.05) 41%, rgba(255, 255, 255, 0.05) 42%, transparent 43%),
    linear-gradient(-45deg, transparent 40%, rgba(255, 255, 255, 0.05) 41%, rgba(255, 255, 255, 0.05) 42%, transparent 43%);
  background-size: 120px 120px, 80px 80px, 60px 60px, 60px 60px;
  background-position: 0 0, 40px 40px, 20px 20px, 30px 30px;
}

/* Apple-style Epic Animations */
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

.floating-particles {
  background-image: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px);
  background-size: 100px 100px, 150px 150px, 80px 80px;
  background-position: 0 0, 40px 40px, 20px 20px;
  animation: float 6s ease-in-out infinite;
  width: 100%;
  height: 100%;
}

/* Radial gradient for vignette effect */
.bg-radial-gradient {
  background: radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.3) 100%);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
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