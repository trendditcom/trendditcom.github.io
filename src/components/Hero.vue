<template>
  <section class="relative bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4 py-24 sm:py-32">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Trenddit Memo
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
          The Chrome extension that transforms your browsing into conversations with AI. Capture web content, organize with smart tags, and chat with your knowledge management system using multiple AI providers.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" as="a" href="https://github.com/trendditcom/trenddit-memo" target="_blank" data-testid="cta-download">
            Get Trenddit Memo
          </Button>
          <Button variant="outline" size="lg" as="a" href="/blog">
            Read Our Blog
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}
</script>