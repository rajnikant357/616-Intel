import { createHmac, randomBytes } from 'node:crypto';
import type { PaymentRecord, ProductType, ProductIdentifier, PaymentStatus } from './types';
import { hashEmail } from './security';
import { savePayment, getPayment, getPaymentByIdempotencyKey } from './storage';
import { resolveProductPricing } from './pricing';
import { config } from '../config/env';

export interface PaymentInitResult {
  paymentId: string;
  providerPaymentId: string;
  product: ProductIdentifier;
  amount: number;
  currency: 'INR' | 'USD';
  clientToken: string;
  checkoutUrl?: string;
  entitlementType: 'SINGLE_ARTICLE' | 'SUBSCRIPTION';
  status: PaymentStatus;
}

export interface PaymentVerificationResult {
  verified: boolean;
  paymentId: string;
  error?: string;
  record?: PaymentRecord;
}

export interface PaymentInitParams {
  deviceId?: string;
  email?: string;
  product?: ProductType | 'SINGLE' | 'SUBSCRIPTION' | ProductIdentifier;
  currency?: 'INR' | 'USD';
  clientClaimedAmount?: number;
  idempotencyKey?: string;
  submissionId?: string;
}

/**
 * Initializes a payment order with server-side price resolution,
 * price manipulation protection, and idempotency guarantees.
 */
export async function createPaymentSession(
  params: PaymentInitParams
): Promise<PaymentInitResult> {
  const { 
    deviceId, 
    email, 
    product = 'single_article', 
    currency = 'INR', 
    clientClaimedAmount,
    idempotencyKey,
    submissionId
  } = params;

  // 1. Idempotency Check (Section 11)
  if (idempotencyKey) {
    const existing = await getPaymentByIdempotencyKey(idempotencyKey);
    if (existing && existing.status !== 'FAILED') {
      const existingToken = createHmac('sha256', config.paymentSecretKey)
        .update(`${existing.id}:${existing.providerPaymentId}:${existing.amount}:${existing.currency}`)
        .digest('hex');

      return {
        paymentId: existing.id,
        providerPaymentId: existing.providerPaymentId,
        product: existing.product,
        amount: existing.amount,
        currency: existing.currency,
        clientToken: existingToken,
        entitlementType: existing.entitlementType,
        status: existing.status,
      };
    }
  }

  // 2. Server Price Authority & Price Manipulation Defense (Section 7, 8, 9)
  const productDetails = resolveProductPricing(product, currency, clientClaimedAmount);

  const emailHash = email ? hashEmail(email) : undefined;
  const paymentId = `pay_${Date.now()}_${randomBytes(4).toString('hex')}`;
  const providerPaymentId = `order_${randomBytes(8).toString('hex')}`;

  // 3. Cryptographic Client Token (HMAC-SHA256)
  const clientToken = createHmac('sha256', config.paymentSecretKey)
    .update(`${paymentId}:${providerPaymentId}:${productDetails.amount}:${productDetails.currency}`)
    .digest('hex');

  const entitlementType = productDetails.productType === 'monthly_pass' ? 'SUBSCRIPTION' : 'SINGLE_ARTICLE';

  const record: PaymentRecord = {
    id: paymentId,
    idempotencyKey,
    submissionId,
    product: productDetails.id,
    amount: productDetails.amount,
    currency: productDetails.currency,
    provider: 'hosted_gateway',
    providerPaymentId,
    status: 'CREATED',
    deviceId,
    emailHash,
    entitlementType,
    createdAt: new Date().toISOString(),
  };

  await savePayment(record);

  return {
    paymentId,
    providerPaymentId,
    product: productDetails.id,
    amount: productDetails.amount,
    currency: productDetails.currency,
    clientToken,
    entitlementType,
    status: 'CREATED',
  };
}

/**
 * Verify client payment token cryptographically.
 */
export async function verifyPayment(
  paymentId: string,
  providerPaymentId: string,
  clientToken: string
): Promise<PaymentVerificationResult> {
  const record = await getPayment(paymentId);
  if (!record) {
    return { verified: false, paymentId, error: 'Payment record not found.' };
  }

  // Cryptographically recompute and verify token FIRST (Section 10)
  const expectedToken = createHmac('sha256', config.paymentSecretKey)
    .update(`${paymentId}:${providerPaymentId}:${record.amount}:${record.currency}`)
    .digest('hex');

  if (expectedToken !== clientToken) {
    record.status = 'FAILED';
    await savePayment(record);
    return { verified: false, paymentId, error: 'Cryptographic signature mismatch.' };
  }

  if (record.status !== 'SUCCEEDED') {
    record.status = 'SUCCEEDED';
    record.verifiedAt = new Date().toISOString();
    await savePayment(record);
  }

  return {
    verified: true,
    paymentId,
    record,
  };
}

/**
 * Cryptographically verify webhook signatures from the payment provider.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  if (!signatureHeader || !rawBody) return false;

  const expectedSignature = createHmac('sha256', config.paymentWebhookSecret)
    .update(rawBody)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  if (expectedSignature.length !== signatureHeader.length) return false;
  let result = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    result |= expectedSignature.charCodeAt(i) ^ signatureHeader.charCodeAt(i);
  }
  return result === 0;
}
