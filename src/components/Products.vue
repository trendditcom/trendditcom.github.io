<template>
  <section id="products" class="py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Our Products</h2>
        <p class="mt-4 text-lg text-gray-600">
          AI-first intelligence platform and tools for enterprise technology decisions and lean automation
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-4xl space-y-8">
        <!-- Trenddit Client - Flagship Product -->
        <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg ring-1 ring-blue-200 border-l-4 border-l-blue-600">
          <div class="flex items-start gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-2xl font-bold text-gray-900">Trenddit Client</h3>
                <span class="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">Flagship</span>
              </div>
              <p class="mt-2 text-gray-700 text-lg leading-relaxed">
                AI-first enterprise intelligence platform for strategic technology decisions. Multi-agent intelligence system that analyzes market trends, predicts technology impact, and provides evidence-based recommendations for enterprise technology adoption.
              </p>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Multi-Agent Intelligence</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Predictive Forecasting</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Enterprise Technology Strategy</span>
                </div>
              </div>
              <div class="mt-6 flex gap-4">
                <Button as="a" href="https://github.com/trendditcom/trenddit-client" target="_blank" class="bg-blue-600 hover:bg-blue-700">
                  View on GitHub
                </Button>
                <Button variant="outline" as="a" href="/blog?tag=Trenddit%20Client" class="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Trenddit Memo - Supporting Product -->
        <div class="rounded-2xl bg-white p-8 shadow-xs ring-1 ring-gray-200">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600 text-white">
              <DocumentTextIcon class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-semibold text-gray-900">Trenddit Memo</h3>
              <p class="mt-2 text-gray-600">
                Chrome extension that transforms web browsing into intelligent knowledge management. Capture content from any webpage, organize with AI-powered tags, and chat with your saved knowledge using multiple AI providers like Claude, GPT, and Gemini.
              </p>
              <div class="mt-6 flex gap-4">
                <Button variant="outline" as="a" href="https://github.com/trendditcom/trenddit-memo" target="_blank">
                  View on GitHub
                </Button>
                <Button variant="outline" as="a" href="/blog?tag=Trenddit%20Memo">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'
</script>