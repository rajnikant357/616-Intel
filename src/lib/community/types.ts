export type PaymentStatus = 
  | 'CREATED'
  | 'PENDING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'DISPUTED';

export type SubscriptionStatus = 
  | 'NONE'
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'PAUSED';

export type ModerationStatus = 
  | 'PENDING'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'REMOVED'
  | 'FLAGGED';

export type ProductIdentifier = 
  | 'single_article_inr'
  | 'single_article_usd'
  | 'monthly_pass_inr'
  | 'monthly_pass_usd';

export type ProductType = 'single_article' | 'monthly_pass';

export interface ContributorEntitlement {
  id: string;
  deviceId?: string; // Persistent device session identifier
  emailHash?: string; // SHA-256 hash of normalized lowercased trimmed email (if provided)
  freeArticleUsed: boolean;
  purchasedArticles: number; // Single article credits
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMediaItem {
  type: 'image' | 'video';
  url: string;
  name: string;
  size: number;
}

export interface CommunityArticle {
  id: string;
  title: string;
  movieName: string;
  content: string; // Sanitized HTML/text
  writerName: string;
  writerEmailHash?: string; // Strictly hash, never plaintext email
  deviceId?: string; // Device session identifier
  slug: string;
  status: ModerationStatus;
  publishedAt: string;
  entitlementType: 'FREE' | 'SINGLE' | 'SUBSCRIPTION';
  paymentReference?: string;
  subscriptionReference?: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: string;
  characterCount: number;
  reportCount?: number;
  flagReason?: string;
  mediaType?: 'none' | 'images' | 'video';
  mediaItems?: CommunityMediaItem[];
}

export interface PaymentRecord {
  id: string; // Internal payment ID (e.g. pay_...)
  idempotencyKey?: string;
  submissionId?: string;
  product: ProductIdentifier;
  amount: number;
  currency: 'INR' | 'USD';
  provider: string; // 'mock' | 'razorpay' | 'stripe'
  providerPaymentId: string;
  status: PaymentStatus;
  deviceId?: string;
  emailHash?: string;
  entitlementType: 'SINGLE_ARTICLE' | 'SUBSCRIPTION';
  createdAt: string;
  verifiedAt?: string;
  refundedAt?: string;
  signature?: string;
}

export interface PricingPlan {
  code: string;
  countryName: string;
  currency: 'INR' | 'USD';
  symbol: string;
  singleArticleProduct: ProductIdentifier;
  monthlyPassProduct: ProductIdentifier;
  article: number;
  subscription: number;
  subscriptionInterval: string;
  freeArticleMaxChars: number;
  paidArticleMaxChars: number;
}

export type ReportReason = 
  | 'SPAM'
  | 'HARASSMENT'
  | 'FALSE_IMPERSONATION'
  | 'MALICIOUS_LINK'
  | 'COPYRIGHT_CONCERN'
  | 'OTHER';

export interface ArticleReport {
  id: string;
  articleId: string;
  articleSlug: string;
  reason: ReportReason;
  details?: string;
  reporterSessionHash: string; // SHA-256 of IP/session, strictly hashed for privacy
  createdAt: string;
  resolved: boolean;
}

export interface ModerationLogEntry {
  id: string;
  action: 'APPROVE' | 'REJECT' | 'REMOVE' | 'FLAG' | 'REFUND_REVIEW';
  targetId: string; // article id or payment id
  targetType: 'ARTICLE' | 'PAYMENT';
  actor: string; // internal actor ID (e.g. 'admin_bureau')
  reason?: string;
  timestamp: string;
}

export interface WebhookEventRecord {
  eventId: string;
  provider: string;
  eventType: string;
  receivedAt: string;
  status: 'PROCESSED' | 'IGNORED' | 'FAILED';
}
