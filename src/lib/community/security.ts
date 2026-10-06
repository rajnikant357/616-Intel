import { createHash } from 'node:crypto';

export function hashEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  return createHash('sha256').update(normalized).digest('hex');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

const FORBIDDEN_WRITER_NAMES = [
  'marvel',
  'marvel studios',
  'marvel entertainment',
  'walt disney',
  'disney',
  'kevin feige',
  'sony pictures',
  '616 intel',
  '616 intel editorial',
  'editorial desk',
  'admin',
  'administrator',
  'moderator',
  'official',
  'studio representative',
];

export function validateWriterName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Writer name must be at least 2 characters long.' };
  }
  if (trimmed.length > 50) {
    return { valid: false, error: 'Writer name cannot exceed 50 characters.' };
  }

  const lower = trimmed.toLowerCase();
  for (const forbidden of FORBIDDEN_WRITER_NAMES) {
    if (lower === forbidden || lower.includes(`official ${forbidden}`) || lower.startsWith(`${forbidden} `)) {
      return {
        valid: false,
        error: 'Impersonation of official Marvel Studios, Disney, or 616 Intel editorial personnel is prohibited.',
      };
    }
  }

  return { valid: true };
}

export function validateTitle(title: string): { valid: boolean; error?: string } {
  const trimmed = title.trim();
  if (trimmed.length < 5) {
    return { valid: false, error: 'Title must be at least 5 characters long.' };
  }
  if (trimmed.length > 120) {
    return { valid: false, error: 'Title cannot exceed 120 characters.' };
  }

  // Check for HTML injection in title
  if (/<[^>]*>/g.test(trimmed)) {
    return { valid: false, error: 'HTML tags are not permitted in article titles.' };
  }

  // Check for excessive punctuation
  if (/([!?.,:;])\1{3,}/.test(trimmed)) {
    return { valid: false, error: 'Excessive repeated punctuation is not permitted in titles.' };
  }

  // Check for misleading official system prefixes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('[official]') || 
    lower.startsWith('[confirmed by disney]') || 
    lower.startsWith('[studio leak]')
  ) {
    return { valid: false, error: 'Misleading official studio claim tags are not permitted in community titles.' };
  }

  return { valid: true };
}

/**
 * Robust HTML and Rich Text Sanitizer (Sections 24, 25, 26, 27)
 * Strictly whitelists: p, strong, b, em, i, h2, h3, h4, ul, ol, li, blockquote, a
 * Enforces rel="noopener noreferrer" and safe http(s) protocols for all links.
 * Strips all script, style, iframe, svg, img, form, and inline event handlers.
 */
export function sanitizeContent(raw: string): string {
  if (!raw) return '';

  // 1. Strip all script, style, iframe, object, embed, svg, math, form, input, textarea tags with their contents
  let text = raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/<math\b[^<]*(?:(?!<\/math>)<[^<]*)*<\/math>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');

  // 2. Remove all inline event handlers (onerror, onclick, onload, etc.)
  text = text.replace(/\son\w+(\s*=\s*(?:".*?"|'.*?'|[^\s>]+))?/gi, '');

  // 3. Remove javascript: and data: schemes anywhere
  text = text.replace(/javascript:[^\s"'>]+/gi, '#');
  text = text.replace(/data:text\/[^\s"'>]+/gi, '#');
  text = text.replace(/vbscript:[^\s"'>]+/gi, '#');

  // 4. Allowed tag whitelist regex
  // Allowed tags: p, strong, b, em, i, h2, h3, h4, ul, ol, li, blockquote, a
  const allowedTags = new Set([
    'p', '/p',
    'strong', '/strong',
    'b', '/b',
    'em', '/em',
    'i', '/i',
    'h2', '/h2',
    'h3', '/h3',
    'h4', '/h4',
    'ul', '/ul',
    'ol', '/ol',
    'li', '/li',
    'blockquote', '/blockquote',
  ]);

  // Replace tags: preserve whitelisted tags, sanitize <a> tags specifically, strip everything else
  text = text.replace(/<\/?([a-z0-9_-]+)([^>]*)>/gi, (match, tagName, attrs) => {
    const lowerTag = tagName.toLowerCase();

    // Closing tag for allowed tags
    if (match.startsWith('</')) {
      if (allowedTags.has(`/${lowerTag}`) || lowerTag === 'a') {
        return `</${lowerTag}>`;
      }
      return '';
    }

    // Opening <a> tag
    if (lowerTag === 'a') {
      const hrefMatch = attrs.match(/href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const rawHref = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || '') : '';
      const cleanHref = rawHref.trim();

      // Enforce safe http/https URL scheme only
      if (/^https?:\/\//i.test(cleanHref)) {
        return `<a href="${cleanHref}" rel="noopener noreferrer" target="_blank">`;
      }
      // If relative URL starting with /
      if (cleanHref.startsWith('/') && !cleanHref.startsWith('//')) {
        return `<a href="${cleanHref}">`;
      }
      return '<a>';
    }

    // Other allowed tags (strip all attributes to prevent style/class/id exploits)
    if (allowedTags.has(lowerTag)) {
      return `<${lowerTag}>`;
    }

    // Disallowed tag -> strip tag completely
    return '';
  });

  return text.trim();
}

/**
 * Automated Moderation & Spam Detection Engine (Section 33)
 */
export interface ModerationCheckResult {
  passed: boolean;
  riskScore: number; // 0 - 100
  recommendedStatus: 'PUBLISHED' | 'PENDING' | 'FLAGGED';
  flags: string[];
}

const SPAM_PATTERNS = [
  /\b(?:casino|crypto|bitcoin|forex|invest\s+\$|earn\s+money\s+fast|viagra|cialis|whatsapp\s+group|telegram\s+channel)\b/i,
  /\b(?:free\s+robux|gift\s+card\s+generator|hack\s+tool|unlimited\s+gems)\b/i,
  /\b(?:t\.me\/\w+|bit\.ly\/\w+|tinyurl\.com\/\w+)\b/i,
];

export function automatedModerationCheck(
  title: string,
  content: string,
  writerName: string
): ModerationCheckResult {
  const flags: string[] = [];
  let riskScore = 0;

  const combined = `${title} ${content} ${writerName}`.toLowerCase();

  // 1. Spam pattern scan
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(combined)) {
      flags.push('Known spam or scam keywords detected');
      riskScore += 50;
      break;
    }
  }

  // 2. Link density scan (excessive links in community articles)
  const linkCount = (content.match(/https?:\/\//gi) || []).length;
  if (linkCount > 3) {
    flags.push(`Excessive link density: ${linkCount} links in single article`);
    riskScore += 35;
  }

  // 3. Repeated character / word stuffing
  if (/(.)\1{10,}/.test(content)) {
    flags.push('Repeated character stuffing detected');
    riskScore += 30;
  }

  // 4. Excessive uppercase ratio
  const letters = content.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 100) {
    const uppers = letters.replace(/[^A-Z]/g, '').length;
    if (uppers / letters.length > 0.65) {
      flags.push('Excessive uppercase text (> 65%)');
      riskScore += 25;
    }
  }

  // Decide status
  let recommendedStatus: 'PUBLISHED' | 'PENDING' | 'FLAGGED' = 'PUBLISHED';
  if (riskScore >= 50) {
    recommendedStatus = 'FLAGGED';
  } else if (riskScore >= 25) {
    recommendedStatus = 'PENDING';
  }

  return {
    passed: riskScore < 50,
    riskScore,
    recommendedStatus,
    flags,
  };
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
