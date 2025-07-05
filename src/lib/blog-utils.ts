import { promises as fs } from 'fs'
import path from 'path'

export interface BlogData {
  title: string
  slug: string
  description: string
  content: string
  author: string
  publishedAt: string
  tags: string[]
}

export interface BlogResult {
  success: boolean
  filePath?: string
  error?: string
}

export interface CopyResult {
  success: boolean
  copiedFiles?: string[]
  errors?: string[]
}

export interface BookContent {
  title: string
  content: string
  images: string[]
}

export interface GenerationOptions {
  targetTone?: 'professional' | 'casual'
  includeResearch?: boolean
  alignToTrenddit?: boolean
}

export interface GeneratedBlog {
  success: boolean
  title?: string
  slug?: string
  description?: string
  content?: string
  tags?: string[]
  error?: string
}

/**
 * Creates a blog post file with proper frontmatter
 */
export async function createBlogPost(blogData: BlogData, outputDir: string): Promise<BlogResult> {
  try {
    const filename = `${blogData.slug}.md`
    const filePath = path.join(outputDir, filename)

    // Escape quotes in title and description for YAML
    const escapedTitle = blogData.title.replace(/"/g, '\\"')
    const escapedDescription = blogData.description.replace(/"/g, '\\"')

    const frontmatter = `---
title: "${escapedTitle}"
description: "${escapedDescription}"
author: "${blogData.author}"
publishedAt: "${blogData.publishedAt}"
tags: ${JSON.stringify(blogData.tags, null, 0).replace(/,/g, ', ')}
---

`

    const fullContent = frontmatter + blogData.content

    await fs.writeFile(filePath, fullContent, 'utf-8')

    return {
      success: true,
      filePath
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Copies images from source directory to destination directory
 */
export async function copyImages(sourceDir: string, destDir: string, imageFiles: string[]): Promise<CopyResult> {
  const copiedFiles: string[] = []
  const errors: string[] = []

  try {
    // Ensure destination directory exists
    await fs.mkdir(destDir, { recursive: true })

    for (const imageFile of imageFiles) {
      try {
        const sourcePath = path.join(sourceDir, imageFile)
        const destPath = path.join(destDir, imageFile)

        await fs.copyFile(sourcePath, destPath)
        copiedFiles.push(imageFile)
      } catch (error) {
        errors.push(imageFile)
      }
    }

    return {
      success: errors.length === 0,
      copiedFiles,
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error) {
    return {
      success: false,
      errors: imageFiles
    }
  }
}

/**
 * Generates a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Transforms personal tone content to professional advisory tone
 */
export function transformToProfessionalTone(content: string): string {
  let transformed = content

  // Replace personal pronouns and phrases
  const personalToProf = [
    { pattern: /\bI\s+(?:love|like|enjoy|prefer)\b/gi, replacement: 'Organizations benefit from' },
    { pattern: /\bI\s+(?:think|believe|feel)\b/gi, replacement: 'Research indicates' },
    { pattern: /\bI\s+(?:have|had)\s+(?:found|discovered|learned)\b/gi, replacement: 'Studies have shown' },
    { pattern: /\bmy\s+personal\s+experience\b/gi, replacement: 'industry best practices' },
    { pattern: /\bmy\s+experience\b/gi, replacement: 'industry experience' },
    { pattern: /\bfor\s+me\b/gi, replacement: 'for organizations' },
    { pattern: /\bI\s+(?:can|could|will|would)\b/gi, replacement: 'Teams can' },
    { pattern: /\bI\s+(?:am|was)\b/gi, replacement: 'Practitioners are' },
    { pattern: /\bI\s+(?:do|did)\b/gi, replacement: 'Best practices involve' },
    { pattern: /\bmy\s+(?:workflow|approach|method)\b/gi, replacement: 'recommended workflows' }
  ]

  personalToProf.forEach(({ pattern, replacement }) => {
    transformed = transformed.replace(pattern, replacement)
  })

  return transformed
}

/**
 * Adds Trenddit-specific context and alignment to content
 */
export function alignToTrendditObjectives(content: string): string {
  const trendditContext = `
This approach aligns with Trenddit's mission to provide lean AI automation solutions. The Trenddit Memo browser extension exemplifies these principles by enabling knowledge workers to capture, organize, and interact with information using AI-powered automation.

For organizations looking to implement similar AI-driven workflows, consider how tools like Trenddit Memo can streamline knowledge management and enhance productivity across teams.
`

  // Insert Trenddit context after first major section
  const sections = content.split('\n## ')
  if (sections.length > 1) {
    sections[1] = sections[1] + '\n' + trendditContext
    return sections.join('\n## ')
  }

  return content + '\n' + trendditContext
}

/**
 * Extracts relevant tags from content
 */
export function extractTags(title: string, content: string): string[] {
  const tags: string[] = []
  const text = (title + ' ' + content).toLowerCase()

  const tagMappings = [
    { keywords: ['ai', 'artificial intelligence', 'claude', 'gpt'], tag: 'ai' },
    { keywords: ['automation', 'automate', 'automated'], tag: 'automation' },
    { keywords: ['coding', 'programming', 'development'], tag: 'development' },
    { keywords: ['workflow', 'process'], tag: 'workflows' },
    { keywords: ['productivity', 'efficiency'], tag: 'productivity' },
    { keywords: ['aws', 'amazon'], tag: 'aws' },
    { keywords: ['knowledge management', 'documentation'], tag: 'knowledge-management' },
    { keywords: ['trenddit', 'memo'], tag: 'trenddit' }
  ]

  tagMappings.forEach(({ keywords, tag }) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      tags.push(tag)
    }
  })

  // Always include core tags for the blog
  if (!tags.includes('ai')) tags.push('ai')
  if (!tags.includes('automation')) tags.push('automation')

  return [...new Set(tags)] // Remove duplicates
}

/**
 * Generates a professional blog post from book content
 */
export async function generateBlogFromBook(
  bookContent: BookContent,
  options: GenerationOptions = {}
): Promise<GeneratedBlog> {
  try {
    const { targetTone = 'professional', alignToTrenddit = true } = options

    let content = bookContent.content

    // Transform tone if needed
    if (targetTone === 'professional') {
      content = transformToProfessionalTone(content)
    }

    // Align to Trenddit objectives if requested
    if (alignToTrenddit) {
      content = alignToTrendditObjectives(content)
    }

    // Generate metadata
    const title = bookContent.title.replace(/^(Vibe |Rails of )/i, '').trim()
    const slug = generateSlug(title)
    const tags = extractTags(title, content)
    
    // Generate description from first paragraph
    const firstParagraph = content.split('\n\n')[0]
    const description = firstParagraph.length > 160 
      ? firstParagraph.substring(0, 157) + '...'
      : firstParagraph

    return {
      success: true,
      title,
      slug,
      description: description.replace(/^#+\s*/, ''), // Remove markdown headers
      content,
      tags
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}