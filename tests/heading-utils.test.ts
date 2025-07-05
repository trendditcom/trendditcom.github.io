import { describe, it, expect } from 'vitest';
import { extractHeadings, generateHeadingId, addHeadingIds } from '@lib/heading-utils';

describe('Heading Utils', () => {
  describe('extractHeadings', () => {
    it('should extract headings from markdown content', () => {
      const content = `
# Main Title
Some content here.

## Section One
More content.

### Subsection
Even more content.

## Section Two
Final content.
      `;

      const headings = extractHeadings(content);
      expect(headings).toHaveLength(4);
      expect(headings[0]).toEqual({ id: 'main-title', text: 'Main Title', level: 1 });
      expect(headings[1]).toEqual({ id: 'section-one', text: 'Section One', level: 2 });
      expect(headings[2]).toEqual({ id: 'subsection', text: 'Subsection', level: 3 });
      expect(headings[3]).toEqual({ id: 'section-two', text: 'Section Two', level: 2 });
    });

    it('should handle empty content', () => {
      const headings = extractHeadings('');
      expect(headings).toHaveLength(0);
    });

    it('should handle content with no headings', () => {
      const content = 'This is just regular content with no headings.';
      const headings = extractHeadings(content);
      expect(headings).toHaveLength(0);
    });
  });

  describe('generateHeadingId', () => {
    it('should generate valid IDs from heading text', () => {
      expect(generateHeadingId('Simple Title')).toBe('simple-title');
      expect(generateHeadingId('Title with Special Characters!')).toBe('title-with-special-characters');
      expect(generateHeadingId('Multiple    Spaces')).toBe('multiple-spaces');
      expect(generateHeadingId('Title-with-hyphens')).toBe('title-with-hyphens');
    });

    it('should handle edge cases', () => {
      expect(generateHeadingId('')).toBe('');
      expect(generateHeadingId('123')).toBe('123');
      expect(generateHeadingId('   ')).toBe('');
    });
  });

  describe('addHeadingIds', () => {
    it('should add IDs to markdown headings', () => {
      const content = `
# Main Title
Some content.

## Section One
More content.
      `;

      const result = addHeadingIds(content);
      expect(result).toContain('# Main Title {#main-title}');
      expect(result).toContain('## Section One {#section-one}');
    });

    it('should handle content with no headings', () => {
      const content = 'Just regular content.';
      const result = addHeadingIds(content);
      expect(result).toBe(content);
    });
  });
});