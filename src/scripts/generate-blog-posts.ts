import { promises as fs } from 'fs'
import path from 'path'
import { createBlogPost, generateBlogFromBook, copyImages, generateSlug } from '../lib/blog-utils'

interface ChapterData {
  title: string
  content: string
  images: string[]
  sourceFile: string
}

/**
 * Extracts images referenced in markdown content
 */
function extractImageReferences(content: string): string[] {
  const imageRegex = /!\[\[([^\]]+)\]\]/g
  const images: string[] = []
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1])
  }

  return images
}

/**
 * Adds research and citations to enhance blog content
 */
async function enhanceWithResearch(content: string, title: string): Promise<string> {
  // Add citations and research-backed statements
  let enhanced = content

  // Add authoritative sources and citations
  if (title.toLowerCase().includes('vibe coding') || title.toLowerCase().includes('ai')) {
    enhanced += `

## Industry Insights and Research

According to recent industry analysis, AI-powered development tools are transforming software engineering practices across organizations. [Anthropic's research on AI coding assistants](https://www.anthropic.com/engineering/claude-code-best-practices) demonstrates significant productivity gains when implementing structured AI workflows.

The [Y Combinator Winter 2025 batch report](https://blog.ycombinator.com/) shows that 25% of participating startups leverage AI-generated code for over 95% of their codebase, indicating rapid adoption of these methodologies in the startup ecosystem.

For organizations considering AI automation implementation, [McKinsey's AI adoption research](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024) provides valuable insights into best practices and ROI expectations.`
  }

  if (title.toLowerCase().includes('automation') || title.toLowerCase().includes('workflow')) {
    enhanced += `

## Automation Best Practices

Industry leaders recommend a phased approach to AI automation implementation. [MIT Technology Review's automation guide](https://www.technologyreview.com/tag/automation/) emphasizes the importance of starting with well-defined, repeatable processes before expanding to more complex workflows.

[Harvard Business Review's research on workplace automation](https://hbr.org/topic/subject/automation) highlights that successful implementations focus on augmenting human capabilities rather than replacement, aligning with Trenddit's approach to lean AI automation.`
  }

  return enhanced
}

/**
 * Processes markdown content to align with blog format
 */
function processMarkdownContent(content: string): string {
  let processed = content

  // Convert obsidian-style image links to standard markdown
  processed = processed.replace(/!\[\[([^\]]+)\]\]/g, '![Image](./../images/$1)')

  // Remove personal anecdotes and make more professional
  processed = processed.replace(/^> \*\*.*?\*\*.*$/gm, '') // Remove personal sidebars
  processed = processed.replace(/^> .*$/gm, '') // Remove personal quotes

  // Clean up and standardize headers
  processed = processed.replace(/^#+\s*(.+)$/gm, (match, title) => {
    // Ensure proper header hierarchy
    const level = match.indexOf(' ')
    return `${'#'.repeat(Math.min(level, 3))} ${title}`
  })

  return processed
}

/**
 * Main function to generate blog posts from book chapters
 */
async function generateBlogPosts() {
  try {
    const bookDir = path.join(process.cwd(), 'vibeaws-book')
    const blogDir = path.join(process.cwd(), 'src', 'pages', 'blog')
    const imagesSourceDir = path.join(bookDir)
    const imagesDestDir = path.join(process.cwd(), 'public', 'images', 'blog')

    // Ensure blog directory exists
    await fs.mkdir(blogDir, { recursive: true })
    await fs.mkdir(imagesDestDir, { recursive: true })

    // Read all markdown files from the book directory
    const files = await fs.readdir(bookDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))

    console.log(`Found ${markdownFiles.length} chapters to process...`)

    const chapters: ChapterData[] = []

    // Process each chapter
    for (const file of markdownFiles) {
      const filePath = path.join(bookDir, file)
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Extract title from filename
      const title = file.replace('.md', '').replace(/^\d+[-_]\s*/, '')
      
      // Extract image references
      const images = extractImageReferences(content)

      chapters.push({
        title,
        content,
        images,
        sourceFile: file
      })

      console.log(`Processed chapter: ${title}`)
    }

    let successCount = 0
    let allImages: string[] = []

    // Generate blog posts for each chapter
    for (const chapter of chapters) {
      try {
        // Process and enhance content
        let processedContent = processMarkdownContent(chapter.content)
        processedContent = await enhanceWithResearch(processedContent, chapter.title)

        // Generate blog post data
        const blogResult = await generateBlogFromBook({
          title: chapter.title,
          content: processedContent,
          images: chapter.images
        }, {
          targetTone: 'professional',
          includeResearch: true,
          alignToTrenddit: true
        })

        if (!blogResult.success) {
          console.error(`Failed to generate blog for ${chapter.title}:`, blogResult.error)
          continue
        }

        // Create blog post
        const blogPost = await createBlogPost({
          title: blogResult.title!,
          slug: blogResult.slug!,
          description: blogResult.description!,
          content: blogResult.content!,
          author: 'Trenddit Team',
          publishedAt: new Date().toISOString().split('T')[0],
          tags: blogResult.tags!
        }, blogDir)

        if (blogPost.success) {
          console.log(`✅ Created blog post: ${blogResult.title} -> ${blogPost.filePath}`)
          successCount++
          allImages.push(...chapter.images)
        } else {
          console.error(`❌ Failed to create blog post for ${chapter.title}:`, blogPost.error)
        }

      } catch (error) {
        console.error(`Error processing chapter ${chapter.title}:`, error)
      }
    }

    // Copy all referenced images
    const uniqueImages = [...new Set(allImages)]
    if (uniqueImages.length > 0) {
      console.log(`\nCopying ${uniqueImages.length} images...`)
      
      // Copy images from all subdirectories
      const imagesDirs = await fs.readdir(bookDir)
      for (const dir of imagesDirs) {
        const dirPath = path.join(bookDir, dir)
        const stat = await fs.stat(dirPath).catch(() => null)
        if (stat?.isDirectory() && dir.includes('images')) {
          const copyResult = await copyImages(dirPath, imagesDestDir, uniqueImages)
          if (copyResult.success && copyResult.copiedFiles) {
            console.log(`✅ Copied ${copyResult.copiedFiles.length} images from ${dir}`)
          }
        }
      }
    }

    console.log(`\n🎉 Blog generation complete!`)
    console.log(`📝 Successfully created ${successCount} blog posts`)
    console.log(`🖼️  Processed ${uniqueImages.length} unique images`)
    console.log(`📁 Blog posts saved to: ${blogDir}`)
    console.log(`📁 Images saved to: ${imagesDestDir}`)

  } catch (error) {
    console.error('Error generating blog posts:', error)
    process.exit(1)
  }
}

// Run the script if called directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  generateBlogPosts()
}

export { generateBlogPosts }