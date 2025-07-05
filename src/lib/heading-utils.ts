export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateHeadingId(text);
    
    headings.push({
      id,
      text,
      level
    });
  }

  return headings;
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function addHeadingIds(content: string): string {
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
    const id = generateHeadingId(text.trim());
    return `${hashes} ${text.trim()} {#${id}}`;
  });
}