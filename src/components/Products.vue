<template>
  <section id="products" class="py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Our Products</h2>
        <p class="mt-4 text-lg text-gray-600">
          Innovative AI-powered tools designed for modern workflows
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-4xl">
        <div class="rounded-2xl bg-white p-8 shadow-xs ring-1 ring-gray-200">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
              <DocumentTextIcon class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-semibold">Trenddit Memo</h3>
              <p class="mt-2 text-gray-600">
                A Chrome extension that transforms web browsing into intelligent knowledge management. Capture content from any webpage, organize with AI-powered tags, and chat with your saved knowledge using multiple AI providers like Claude, GPT, and Gemini.
              </p>
              <div class="mt-6 flex gap-4">
                <Button as="a" href="https://github.com/trendditcom/trenddit-memo" target="_blank">
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