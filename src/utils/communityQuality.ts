import type { CommunityArticle } from '../lib/community/types';

export interface QualityAssessment {
  isIndexable: boolean;
  reasons: string[];
}

/**
 * Evaluates whether a community article meets quality standards for search engine indexing.
 * Gated by: content length, word count, title quality, spam patterns, and link density.
 */
export function assessCommunityArticleQuality(article: CommunityArticle): QualityAssessment {
  const reasons: string[] = [];

  // 1. Title validation
  if (!article.title || article.title.trim().length < 10) {
    reasons.push('Title is too short (< 10 characters).');
  }

  // 2. Minimum content length and depth
  const trimmedContent = article.content.trim();
  const wordCount = trimmedContent.split(/\s+/).filter(Boolean).length;

  if (trimmedContent.length < 250) {
    reasons.push(`Content length (${trimmedContent.length} chars) is below minimum indexing threshold of 250 characters.`);
  }

  if (wordCount < 40) {
    reasons.push(`Word count (${wordCount} words) is below editorial indexing depth of 40 words.`);
  }

  // 3. Movie attachment check
  if (!article.movieName || article.movieName.trim().length < 2) {
    reasons.push('Article lacks a verified Marvel movie/series association.');
  }

  // 4. Spam & keyword stuffing heuristics
  const words = trimmedContent.toLowerCase().split(/\s+/);
  const wordFrequency: Record<string, number> = {};
  for (const w of words) {
    const cleanWord = w.replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > 3) {
      wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      if (wordFrequency[cleanWord] > 20 && (wordFrequency[cleanWord] / words.length) > 0.15) {
        reasons.push(`Potential keyword stuffing detected for term: "${cleanWord}".`);
        break;
      }
    }
  }

  // 5. Repetitive character strings (e.g. "aaaaa", "asdfasdf")
  if (/(.)\1{9,}/.test(trimmedContent)) {
    reasons.push('Contains repetitive character strings.');
  }

  // 6. Malicious / unauthorized link density
  const linkMatches = trimmedContent.match(/https?:\/\/[^\s]+/gi) || [];
  if (linkMatches.length > 3) {
    reasons.push('Contains excessive external link references.');
  }

  return {
    isIndexable: reasons.length === 0,
    reasons,
  };
}
