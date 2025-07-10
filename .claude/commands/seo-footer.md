# SEO Footer Update Command

Update the website footer with keyword-rich navigation based on new content and SEO best practices.

## Overview

This command analyzes the current website content and updates the Footer.vue component to include comprehensive, SEO-optimized navigation that improves internal linking and user experience.

## Command Usage

```bash
/seo-footer
```

## What This Command Does

1. **Content Analysis**: Scans all pages, blog posts, and content to identify new sections and categories
2. **Keyword Optimization**: Updates footer links with target keywords from CLAUDE.md
3. **Navigation Structure**: Maintains 3-column footer layout with organized content sections
4. **SEO Enhancement**: Ensures proper internal linking and crawlability

## Target Keywords to Include

Based on CLAUDE.md, prioritize these keywords in footer navigation:
- "lean AI automation"
- "AI advisory" 
- "Trenddit Memo"
- "AI-powered tools"
- "Chrome extension"
- "knowledge management"
- "multiple AI providers"
- "privacy-first AI"

## Footer Structure Template

### Column 1: Products & Services
- AI Automation Products (/products)
- Lean AI Advisory (/advisory)
- Trenddit Memo Chrome Extension (GitHub link)
- Use Cases & Examples (/blog?tag=use-cases)
- [Add new product pages as they're created]

### Column 2: Resources & Content  
- Blog & Insights (/blog)
- AI Research & Trends (/blog?tag=research)
- User Guides & Tutorials (/blog?tag=guides)
- Knowledge Management (/blog?tag=knowledge-management)
- [Add new content categories based on blog tags]

### Column 3: Company & Connect
- About Trenddit (/#about)
- Contact Us (/#contact)
- GitHub Development (GitHub link)
- Privacy-First AI Tools (/)
- [Add new company pages as needed]

## Implementation Steps

1. **Analyze Current Content**:
   - Scan all .astro pages in src/pages/
   - Review blog post frontmatter for new tags/categories
   - Identify any new sections or content types

2. **Update Footer Component**:
   - Edit src/components/Footer.vue
   - Maintain 3-column grid layout (grid-cols-1 md:grid-cols-3)
   - Use semantic HTML with proper heading hierarchy
   - Include transition-colors for hover effects

3. **SEO Optimization**:
   - Use descriptive anchor text with target keywords
   - Ensure all important pages are linked
   - Create logical content groupings
   - Include proper internal link structure

4. **Responsive Design**:
   - Ensure mobile-first approach
   - Test grid layout on different screen sizes
   - Maintain proper spacing and typography

5. **Testing & Validation**:
   - Run `npm run build` to verify no errors
   - Check all footer links work correctly
   - Verify responsive behavior
   - Ensure SEO improvements are maintained

## Code Template

```vue
<template>
  <footer class="border-t bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <!-- Footer Navigation -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Column 1: Products & Services -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Products & Services</h3>
          <ul class="space-y-3">
            <!-- Add product links with keyword-rich anchor text -->
          </ul>
        </div>

        <!-- Column 2: Resources & Content -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resources & Content</h3>
          <ul class="space-y-3">
            <!-- Add content links organized by category -->
          </ul>
        </div>

        <!-- Column 3: Company & Connect -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Company & Connect</h3>
          <ul class="space-y-3">
            <!-- Add company and social links -->
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t pt-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-gray-900">Trenddit</span>
            <span class="text-sm text-gray-600">© 2025 - Lean AI Automation</span>
          </div>
          <div class="text-sm text-gray-600">
            <span>Transforming browsing into AI conversations</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
```

## When to Use This Command

- After adding new pages to the website
- When creating new blog post categories or tags
- After launching new products or services
- When restructuring site navigation
- As part of regular SEO maintenance

## SEO Benefits

- **Enhanced Internal Linking**: Creates multiple pathways to important content
- **Keyword Optimization**: Uses target keywords naturally in anchor text
- **Improved Crawlability**: Helps search engines discover all site content
- **Better User Experience**: Provides comprehensive navigation options
- **Site Architecture**: Reinforces content hierarchy and relationships

## Notes

- Always maintain the 3-column structure for consistency
- Use descriptive, keyword-rich anchor text
- Keep navigation logical and user-focused
- Test responsive behavior after updates
- Ensure all links are functional before deployment