import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import { fileURLToPath, URL } from 'node:url';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue()
  ],
  site: 'https://trenddit.com',
  base: '/',
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
      }
    }
  }
});