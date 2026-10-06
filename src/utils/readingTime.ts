export function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';
  // Strip code blocks and markdown tags
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*_~`]/g, '');

  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${Math.max(1, minutes)} min read`;
}
