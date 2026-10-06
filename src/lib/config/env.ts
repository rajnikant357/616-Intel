/**
 * 616 INTEL — Server Environment Configuration & Validation
 * Centralized, secure environment parsing with production invariant checks.
 */

export interface AppConfig {
  siteUrl: string;
  isProduction: boolean;
  isDevelopment: boolean;
  paymentSecretKey: string;
  paymentWebhookSecret: string;
  adminApiKey: string;
  rateLimitWindowMs: number;
  rateLimitMaxSubmissions: number;
  rateLimitMaxPayments: number;
}

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const isDevelopment = nodeEnv === 'development';

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://616intel.com';

// Payment secrets
const paymentSecretKey = process.env.PAYMENT_SECRET_KEY || (
  isProduction ? '' : '616_intel_dev_secret_key_receipts_minimum_32_characters'
);

const paymentWebhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || (
  isProduction ? '' : '616_intel_dev_webhook_secret_verification_key'
);

// Admin key for internal moderation API
const adminApiKey = process.env.ADMIN_API_KEY || (
  isProduction ? '' : '616_intel_dev_admin_key_internal_bureau_token'
);

// Rate limit parameters
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 mins
const rateLimitMaxSubmissions = Number(process.env.RATE_LIMIT_MAX_SUBMISSIONS) || 5;
const rateLimitMaxPayments = Number(process.env.RATE_LIMIT_MAX_PAYMENTS) || 10;

/**
 * Validate configuration. In production, fail early if critical secrets are missing.
 */
export function validateProductionConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (isProduction) {
    if (!paymentSecretKey || paymentSecretKey.includes('dev_secret')) {
      missing.push('PAYMENT_SECRET_KEY');
    }
    if (!paymentWebhookSecret || paymentWebhookSecret.includes('dev_webhook')) {
      missing.push('PAYMENT_WEBHOOK_SECRET');
    }
    if (!adminApiKey || adminApiKey.includes('dev_admin')) {
      missing.push('ADMIN_API_KEY');
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

export const config: AppConfig = {
  siteUrl,
  isProduction,
  isDevelopment,
  paymentSecretKey,
  paymentWebhookSecret,
  adminApiKey,
  rateLimitWindowMs,
  rateLimitMaxSubmissions,
  rateLimitMaxPayments,
};
