import fs from 'node:fs';
import path from 'node:path';
import type { 
  CommunityArticle, 
  ContributorEntitlement, 
  PaymentRecord,
  ArticleReport,
  ModerationLogEntry,
  WebhookEventRecord,
  ModerationStatus
} from './types';

const DATA_DIR = path.resolve(process.cwd(), 'data/community');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const ENTITLEMENTS_FILE = path.join(DATA_DIR, 'entitlements.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');
const LOGS_FILE = path.join(DATA_DIR, 'moderation-logs.json');
const WEBHOOKS_FILE = path.join(DATA_DIR, 'webhook-events.json');

// Ensure storage directory and files exist
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ARTICLES_FILE)) {
    // Production rule: community articles remain empty until real reader submissions arrive
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(ENTITLEMENTS_FILE)) {
    fs.writeFileSync(ENTITLEMENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(PAYMENTS_FILE)) {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(REPORTS_FILE)) {
    fs.writeFileSync(REPORTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  if (!fs.existsSync(WEBHOOKS_FILE)) {
    fs.writeFileSync(WEBHOOKS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read helper with error resilience
function readJsonFile<T>(filePath: string, fallback: T): T {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Write helper
function writeJsonFile<T>(filePath: string, data: T): void {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- ARTICLES API ---

export async function getCommunityArticles(status: ModerationStatus | 'ALL' = 'PUBLISHED'): Promise<CommunityArticle[]> {
  const articles = readJsonFile<CommunityArticle[]>(ARTICLES_FILE, []);
  if (status === 'ALL') {
    return articles;
  }
  return articles
    .filter((a) => a.status === status)
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}

export async function getCommunityArticleBySlug(slug: string): Promise<CommunityArticle | undefined> {
  const articles = await getCommunityArticles('ALL');
  return articles.find((a) => a.slug === slug);
}

export async function getCommunityArticleById(id: string): Promise<CommunityArticle | undefined> {
  const articles = await getCommunityArticles('ALL');
  return articles.find((a) => a.id === id);
}

export async function saveCommunityArticle(article: CommunityArticle): Promise<CommunityArticle> {
  const articles = readJsonFile<CommunityArticle[]>(ARTICLES_FILE, []);
  const index = articles.findIndex((a) => a.id === article.id);

  if (index >= 0) {
    articles[index] = { ...article, updatedAt: new Date().toISOString() };
  } else {
    articles.unshift(article);
  }

  writeJsonFile(ARTICLES_FILE, articles);
  return article;
}

export async function updateArticleModerationStatus(
  articleId: string, 
  status: ModerationStatus,
  reason?: string
): Promise<CommunityArticle | null> {
  const articles = readJsonFile<CommunityArticle[]>(ARTICLES_FILE, []);
  const index = articles.findIndex((a) => a.id === articleId || a.slug === articleId);

  if (index < 0) return null;

  articles[index].status = status;
  if (reason) {
    articles[index].flagReason = reason;
  }
  articles[index].updatedAt = new Date().toISOString();

  writeJsonFile(ARTICLES_FILE, articles);
  return articles[index];
}

export async function generateUniqueSlug(baseTitle: string): Promise<string> {
  const baseSlug = baseTitle
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'community-article';

  const articles = await getCommunityArticles('ALL');
  let slug = baseSlug;
  let counter = 1;

  while (articles.some((a) => a.slug === slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}

// --- ENTITLEMENTS API ---

export type EntitlementKey = string | { deviceId?: string; emailHash?: string };

export async function getEntitlement(identifier: EntitlementKey): Promise<ContributorEntitlement> {
  const entitlements = readJsonFile<ContributorEntitlement[]>(ENTITLEMENTS_FILE, []);
  
  let deviceId: string | undefined;
  let emailHash: string | undefined;

  if (typeof identifier === 'string') {
    if (identifier.startsWith('dev_')) {
      deviceId = identifier;
    } else {
      emailHash = identifier;
    }
  } else {
    deviceId = identifier.deviceId;
    emailHash = identifier.emailHash;
  }

  // Look for match by deviceId OR emailHash
  let found = entitlements.find((e) => {
    if (deviceId && e.deviceId === deviceId) return true;
    if (emailHash && e.emailHash === emailHash) return true;
    return false;
  });

  if (!found) {
    found = {
      id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      deviceId,
      emailHash,
      freeArticleUsed: false,
      purchasedArticles: 0,
      subscriptionStatus: 'NONE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    entitlements.push(found);
    writeJsonFile(ENTITLEMENTS_FILE, entitlements);
  } else {
    // Link deviceId and emailHash together if not already linked
    let updated = false;
    if (deviceId && !found.deviceId) {
      found.deviceId = deviceId;
      updated = true;
    }
    if (emailHash && !found.emailHash) {
      found.emailHash = emailHash;
      updated = true;
    }
    if (updated) {
      found.updatedAt = new Date().toISOString();
      writeJsonFile(ENTITLEMENTS_FILE, entitlements);
    }
  }

  // Check if active subscription has expired
  if (found.subscriptionStatus === 'ACTIVE' && found.subscriptionExpiresAt) {
    if (new Date(found.subscriptionExpiresAt).getTime() < Date.now()) {
      found.subscriptionStatus = 'EXPIRED';
      found.updatedAt = new Date().toISOString();
      writeJsonFile(ENTITLEMENTS_FILE, entitlements);
    }
  }

  return found;
}

export async function saveEntitlement(entitlement: ContributorEntitlement): Promise<ContributorEntitlement> {
  const entitlements = readJsonFile<ContributorEntitlement[]>(ENTITLEMENTS_FILE, []);
  const index = entitlements.findIndex((e) => {
    if (e.id === entitlement.id) return true;
    if (entitlement.deviceId && e.deviceId === entitlement.deviceId) return true;
    if (entitlement.emailHash && e.emailHash === entitlement.emailHash) return true;
    return false;
  });

  if (index >= 0) {
    entitlements[index] = { ...entitlement, updatedAt: new Date().toISOString() };
  } else {
    entitlements.push(entitlement);
  }

  writeJsonFile(ENTITLEMENTS_FILE, entitlements);
  return entitlement;
}

export async function consumeFreeArticleCredit(identifier: EntitlementKey): Promise<boolean> {
  const entitlement = await getEntitlement(identifier);
  if (entitlement.freeArticleUsed) {
    return false;
  }
  entitlement.freeArticleUsed = true;
  await saveEntitlement(entitlement);
  return true;
}

export async function consumePaidArticleCredit(identifier: EntitlementKey): Promise<boolean> {
  const entitlement = await getEntitlement(identifier);
  if (entitlement.subscriptionStatus === 'ACTIVE') {
    return true; // Subscribers have unlimited articles
  }
  if (entitlement.purchasedArticles > 0) {
    entitlement.purchasedArticles -= 1;
    await saveEntitlement(entitlement);
    return true;
  }
  return false;
}

export async function addPaidArticleCredit(identifier: EntitlementKey, count = 1): Promise<ContributorEntitlement> {
  const entitlement = await getEntitlement(identifier);
  entitlement.purchasedArticles += count;
  return saveEntitlement(entitlement);
}

export async function activateSubscription(identifier: EntitlementKey, durationDays = 30): Promise<ContributorEntitlement> {
  const entitlement = await getEntitlement(identifier);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

  entitlement.subscriptionStatus = 'ACTIVE';
  entitlement.subscriptionExpiresAt = expiresAt.toISOString();
  return saveEntitlement(entitlement);
}

export async function revokeEntitlementForRefund(identifier: EntitlementKey, isSubscription: boolean): Promise<ContributorEntitlement> {
  const entitlement = await getEntitlement(identifier);
  if (isSubscription) {
    entitlement.subscriptionStatus = 'CANCELLED';
  } else {
    entitlement.purchasedArticles = Math.max(0, entitlement.purchasedArticles - 1);
  }
  entitlement.updatedAt = new Date().toISOString();
  return saveEntitlement(entitlement);
}

// --- PAYMENTS API ---

export async function savePayment(record: PaymentRecord): Promise<PaymentRecord> {
  const payments = readJsonFile<PaymentRecord[]>(PAYMENTS_FILE, []);
  const index = payments.findIndex((p) => p.id === record.id);

  if (index >= 0) {
    payments[index] = record;
  } else {
    payments.unshift(record);
  }

  writeJsonFile(PAYMENTS_FILE, payments);
  return record;
}

export async function getPayment(paymentId: string): Promise<PaymentRecord | undefined> {
  const payments = readJsonFile<PaymentRecord[]>(PAYMENTS_FILE, []);
  return payments.find((p) => p.id === paymentId || p.providerPaymentId === paymentId);
}

export async function getPaymentByIdempotencyKey(key: string): Promise<PaymentRecord | undefined> {
  const payments = readJsonFile<PaymentRecord[]>(PAYMENTS_FILE, []);
  return payments.find((p) => p.idempotencyKey === key);
}

export async function getAllPayments(): Promise<PaymentRecord[]> {
  return readJsonFile<PaymentRecord[]>(PAYMENTS_FILE, []);
}

// --- ARTICLE REPORTS & MODERATION QUEUE ---

export async function saveArticleReport(report: ArticleReport): Promise<ArticleReport> {
  const reports = readJsonFile<ArticleReport[]>(REPORTS_FILE, []);
  reports.unshift(report);
  writeJsonFile(REPORTS_FILE, reports);

  // Increment report count on article
  const articles = readJsonFile<CommunityArticle[]>(ARTICLES_FILE, []);
  const artIndex = articles.findIndex((a) => a.id === report.articleId || a.slug === report.articleSlug);
  if (artIndex >= 0) {
    const currentCount = (articles[artIndex].reportCount || 0) + 1;
    articles[artIndex].reportCount = currentCount;
    // Auto-flag if report threshold reached (>= 2 reports)
    if (currentCount >= 2 && articles[artIndex].status === 'PUBLISHED') {
      articles[artIndex].status = 'FLAGGED';
      articles[artIndex].flagReason = `Flagged by community reader reports (${currentCount} reports)`;
    }
    writeJsonFile(ARTICLES_FILE, articles);
  }

  return report;
}

export async function getArticleReports(): Promise<ArticleReport[]> {
  return readJsonFile<ArticleReport[]>(REPORTS_FILE, []);
}

// --- ADMIN AUDIT LOG ---

export async function logModerationAction(entry: Omit<ModerationLogEntry, 'id' | 'timestamp'>): Promise<ModerationLogEntry> {
  const logs = readJsonFile<ModerationLogEntry[]>(LOGS_FILE, []);
  const newEntry: ModerationLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...entry,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newEntry);
  writeJsonFile(LOGS_FILE, logs);
  return newEntry;
}

export async function getModerationLogs(): Promise<ModerationLogEntry[]> {
  return readJsonFile<ModerationLogEntry[]>(LOGS_FILE, []);
}

// --- WEBHOOK EVENT TRACKING (IDEMPOTENCY) ---

export async function recordWebhookEvent(record: WebhookEventRecord): Promise<void> {
  const events = readJsonFile<WebhookEventRecord[]>(WEBHOOKS_FILE, []);
  events.unshift(record);
  writeJsonFile(WEBHOOKS_FILE, events.slice(0, 500)); // Maintain rolling log of 500 events
}

export async function hasProcessedWebhookEvent(eventId: string): Promise<boolean> {
  const events = readJsonFile<WebhookEventRecord[]>(WEBHOOKS_FILE, []);
  return events.some((e) => e.eventId === eventId && e.status === 'PROCESSED');
}
