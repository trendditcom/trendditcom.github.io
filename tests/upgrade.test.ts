import { describe, it, expect, beforeAll } from 'vitest'
import { readFile } from 'fs/promises'
import path from 'path'

describe('Project Upgrades', () => {
  let packageJson: any

  beforeAll(async () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8')
    packageJson = JSON.parse(packageJsonContent)
  })

  it('should have upgraded Astro to version 5.11 or higher', () => {
    expect(packageJson.dependencies.astro).toBeDefined()
    const astroVersion = packageJson.dependencies.astro.replace(/[^0-9.]/g, '')
    const [major, minor] = astroVersion.split('.').map(Number)
    
    expect(major).toBeGreaterThanOrEqual(5)
    if (major === 5) {
      expect(minor).toBeGreaterThanOrEqual(11)
    }
  })

  it('should have upgraded Tailwind CSS to version 4.1.11 or higher', () => {
    expect(packageJson.devDependencies.tailwindcss).toBeDefined()
    const tailwindVersion = packageJson.devDependencies.tailwindcss.replace(/[^0-9.]/g, '')
    const [major, minor, patch] = tailwindVersion.split('.').map(Number)
    
    expect(major).toBeGreaterThanOrEqual(4)
    if (major === 4) {
      expect(minor).toBeGreaterThanOrEqual(1)
      if (minor === 1) {
        expect(patch).toBeGreaterThanOrEqual(11)
      }
    }
  })

  it('should have compatible Astro integrations', () => {
    // Check that Astro integrations are compatible with Astro 5.x
    expect(packageJson.dependencies['@astrojs/vue']).toBeDefined()
    
    // Verify Vue integration is compatible
    const vueIntegrationVersion = packageJson.dependencies['@astrojs/vue'].replace(/[^0-9.]/g, '')
    const [vueIntegrationMajor] = vueIntegrationVersion.split('.').map(Number)
    expect(vueIntegrationMajor).toBeGreaterThanOrEqual(4)
    
    // Verify @astrojs/tailwind is NOT present (Tailwind v4 uses PostCSS directly)
    expect(packageJson.dependencies['@astrojs/tailwind']).toBeUndefined()
  })

  it('should have required Tailwind CSS v4 packages', () => {
    // Tailwind CSS v4 requires specific packages
    expect(packageJson.devDependencies['@tailwindcss/postcss']).toBeDefined()
  })

  it('should maintain Vue 3 compatibility', () => {
    expect(packageJson.dependencies.vue).toBeDefined()
    const vueVersion = packageJson.dependencies.vue.replace(/[^0-9.]/g, '')
    const [vueMajor] = vueVersion.split('.').map(Number)
    expect(vueMajor).toBe(3)
  })
})