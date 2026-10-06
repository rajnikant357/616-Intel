import type { PricingPlan, ProductIdentifier, ProductType } from './types';

export interface ProductDetails {
  id: ProductIdentifier;
  name: string;
  productType: ProductType;
  amount: number;
  currency: 'INR' | 'USD';
  symbol: string;
  charLimit: number;
}

export const IMMUTABLE_PRODUCTS: Record<ProductIdentifier, ProductDetails> = {
  single_article_inr: {
    id: 'single_article_inr',
    name: 'Single Article Dispatch (INR)',
    productType: 'single_article',
    amount: 20,
    currency: 'INR',
    symbol: '₹',
    charLimit: 10000,
  },
  single_article_usd: {
    id: 'single_article_usd',
    name: 'Single Article Dispatch (USD)',
    productType: 'single_article',
    amount: 1,
    currency: 'USD',
    symbol: '$',
    charLimit: 10000,
  },
  monthly_pass_inr: {
    id: 'monthly_pass_inr',
    name: 'Monthly Publishing Pass (INR)',
    productType: 'monthly_pass',
    amount: 199,
    currency: 'INR',
    symbol: '₹',
    charLimit: 10000,
  },
  monthly_pass_usd: {
    id: 'monthly_pass_usd',
    name: 'Monthly Publishing Pass (USD)',
    productType: 'monthly_pass',
    amount: 9,
    currency: 'USD',
    symbol: '$',
    charLimit: 10000,
  },
};

export const pricingConfig: Record<'india' | 'international', PricingPlan> = {
  india: {
    code: 'IN',
    countryName: 'India',
    currency: 'INR',
    symbol: '₹',
    singleArticleProduct: 'single_article_inr',
    monthlyPassProduct: 'monthly_pass_inr',
    article: 20,
    subscription: 199,
    subscriptionInterval: 'month',
    freeArticleMaxChars: 1000,
    paidArticleMaxChars: 10000,
  },
  international: {
    code: 'INTL',
    countryName: 'International',
    currency: 'USD',
    symbol: '$',
    singleArticleProduct: 'single_article_usd',
    monthlyPassProduct: 'monthly_pass_usd',
    article: 1,
    subscription: 9,
    subscriptionInterval: 'month',
    freeArticleMaxChars: 1000,
    paidArticleMaxChars: 10000,
  },
};

export function getPricingForRegion(region: 'india' | 'international' | string): PricingPlan {
  if (region === 'india' || region === 'IN' || region === 'INR') {
    return pricingConfig.india;
  }
  return pricingConfig.international;
}

/**
 * Resolves immutable product details from product type and currency.
 * Throws an explicit error if the client attempts price tampering.
 */
export function resolveProductPricing(
  productType: ProductType | 'SINGLE' | 'SUBSCRIPTION' | ProductIdentifier,
  currency: 'INR' | 'USD' = 'INR',
  clientClaimedAmount?: number
): ProductDetails {
  let productId: ProductIdentifier;

  // Normalize product string
  const normalizedType = String(productType).toLowerCase();

  if (normalizedType.includes('single') || normalizedType === 'single_article') {
    productId = currency === 'USD' ? 'single_article_usd' : 'single_article_inr';
  } else if (normalizedType.includes('sub') || normalizedType.includes('month') || normalizedType === 'monthly_pass') {
    productId = currency === 'USD' ? 'monthly_pass_usd' : 'monthly_pass_inr';
  } else if (normalizedType in IMMUTABLE_PRODUCTS) {
    productId = normalizedType as ProductIdentifier;
  } else {
    productId = currency === 'USD' ? 'single_article_usd' : 'single_article_inr';
  }

  const resolved = IMMUTABLE_PRODUCTS[productId];

  // Price manipulation protection (Section 9)
  if (clientClaimedAmount !== undefined && clientClaimedAmount !== null) {
    if (Number(clientClaimedAmount) !== resolved.amount) {
      throw new Error(
        `Price manipulation detected: Requested amount ${clientClaimedAmount} does not match immutable server price of ${resolved.symbol}${resolved.amount} for product ${resolved.id}.`
      );
    }
  }

  return resolved;
}
