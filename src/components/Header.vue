<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
    <div class="container mx-auto flex h-16 items-center px-4">
      <a href="/" class="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Trenddit Logo" class="h-6 w-auto" />
        <span class="text-2xl font-bold">Trenddit</span>
      </a>
      <nav class="ml-auto flex items-center space-x-6 text-sm font-medium">
        <a href="/" class="transition-colors hover:text-foreground/80 text-foreground">Home</a>
        <a href="/blog" class="transition-colors hover:text-foreground/80 text-foreground/60">Blog</a>
        <a href="/products" class="transition-colors hover:text-foreground/80 text-foreground/60">Products</a>
        <a href="/advisory" class="transition-colors hover:text-foreground/80 text-foreground/60">Advisory</a>
      </nav>
    </div>
  </header>
</template>