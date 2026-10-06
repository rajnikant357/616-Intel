import { createHash } from 'node:crypto';
import { config } from '../config/env';

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

// Cleanup stale buckets periodically
const CLEANUP_INTERVAL = 5 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Anonymize client IP address to prevent unnecessary user tracking (Section 23).
 */
export function hashClientIp(ip: string): string {
  return createHash('sha256').update(ip.trim()).digest('hex').substring(0, 16);
}

export interface RateLimitCheckResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds?: number;
}

/**
 * Check action rate limit for an anonymized identifier.
 */
export function checkRateLimit(
  action: 'publish' | 'payment_create' | 'payment_verify' | 'report' | 'upload' | 'api_general',
  identifier: string,
  customLimit?: number
): RateLimitCheckResult {
  const now = Date.now();
  const windowMs = config.rateLimitWindowMs;

  let limit = customLimit;
  if (!limit) {
    switch (action) {
      case 'publish':
        limit = config.rateLimitMaxSubmissions;
        break;
      case 'upload':
        limit = 20;
        break;
      case 'payment_create':
      case 'payment_verify':
        limit = config.rateLimitMaxPayments;
        break;
      case 'report':
        limit = 5;
        break;
      default:
        limit = 60;
    }
  }

  const key = `${action}:${identifier}`;
  const bucket = rateLimitStore.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
    };
  }

  if (bucket.count >= limit) {
    const retryAfterSeconds = Math.ceil((bucket.resetAt - now) / 1000);
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - bucket.count,
  };
}
