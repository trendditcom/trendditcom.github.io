## Goals
Deliver following goals

- Trenddit offers products and advisory for lean AI automation
- deliver marketing and blog for Trenddit Memo product (https://github.com/trendditcom/trenddit-memo/blob/master/README.md)
- design trenddit.com marketing landing page
- create trenddit.com/blog blog for sharing use cases, research, user guides

## Stack 
Use following stack to code Trenddit.com

- astro build 5.11 web framework for fast content-driven website and blog
- vue.js 3 framework for building web user interface
- tailwind 4.11 css as utility-first CSS framework
- shadcn/ui 2.7 for a set of beautifully-designed, accessible components
- heroicons 2.1.5 for beautiful hand-crafted SVG icons
- GitHub Pages for hosting trenddit.com as static generated website and blog

## Design
Study following for creating the design system

- study https://epoch.ai/ for blog design including structure, typography, fonts, design, visuals, charts
- study https://astro.build/ for marketing landing page design, structure, typography, fonts, design, visuals

## Documentation
Use following documentation for using frameworks and libraries

- use context7 for latest documentation and samples

## Coding
Follow these guidelines when coding

- IMPORTANT: use test driven development
- IMPORTANT: code working features. no feature mocks, prototypes, placeholders unless explicitly instructed.
- use SOLID principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion
- use DRY principles: reduce redundancy, improve maintainability, reusability, extensibility

## SEO Best Practices
IMPORTANT: Apply these SEO best practices for all content and pages on trenddit.com

### Meta Tags & Structured Data
- Every page MUST have unique, keyword-rich title (50-60 chars) and description (150-160 chars)
- Include relevant keywords naturally in content, headings, and meta tags
- Use the Layout.astro props to set custom title, description, keywords, ogImage for each page
- Blog posts must include proper frontmatter: title, date, author, excerpt, tags, featuredImage
- Ensure JSON-LD structured data is present (Organization schema on homepage, Article schema on blog posts)

### Target Keywords
Primary keywords to incorporate naturally:
- "AI agents"
- "AI workflows"
- "AI advisory"
- "lean AI automation"
- "AI-powered tools"
- "Treddit Client"
- "Trenddit Memo"
- "Web app"
- "SaaS"
- "Chrome extension"
- "knowledge management"
- "multiple AI providers"
- "privacy-first AI"

### Content Guidelines
- Write comprehensive, valuable content (minimum 1000 words for blog posts)
- Use semantic HTML: proper heading hierarchy (H1 > H2 > H3)
- Include internal links to related content
- Add descriptive alt text for all images
- Create clear, keyword-focused URLs (slugs)
- Include call-to-actions (CTAs) in content

### Technical SEO
- Ensure all new pages are included in sitemap (automatic with current setup)
- Verify canonical URLs are set correctly
- Check that Open Graph and Twitter Card tags are populated
- Test mobile responsiveness for all new content
- Optimize images before uploading (compress, proper dimensions)

### Content Creation Checklist
When creating new content:
1. Research target keywords for the topic
2. Create compelling title with primary keyword
3. Write meta description that includes keywords and CTA
4. Structure content with clear headings
5. Include relevant internal links
6. Add featured image with descriptive alt text
7. Set appropriate tags and categories
8. Preview social sharing appearance
9. Run build to ensure sitemap updates

