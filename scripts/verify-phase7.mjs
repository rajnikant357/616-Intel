/**
 * 616 INTEL — Phase 7 Automated Production Hardening Verification Suite
 * Rigorously executes and validates all security, payment, anti-abuse,
 * moderation, and legal invariants required for production launch.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHmac } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('\n============================================================');
console.log('616 INTEL — PHASE 7 PRODUCTION HARDENING VERIFICATION SUITE');
console.log('============================================================\n');

async function runSuite() {
  // --------------------------------------------------------------------------
  // TEST 1: ENVIRONMENT & SECRET SAFETY
  // --------------------------------------------------------------------------
  console.log('\n>>> 1. Environment & Secret Safety (Sections 3, 4, 5, 6, 82)');
  
  const gitignorePath = path.join(ROOT, '.gitignore');
  assert(fs.existsSync(gitignorePath), '.gitignore file exists in project root');
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  assert(gitignoreContent.includes('.env') && gitignoreContent.includes('!.env.example'), '.gitignore excludes .env files while keeping .env.example');
  assert(gitignoreContent.includes('dist/') && gitignoreContent.includes('node_modules/'), '.gitignore excludes build outputs and node_modules');

  const envExamplePath = path.join(ROOT, '.env.example');
  assert(fs.existsSync(envExamplePath), '.env.example exists with template keys');
  const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');
  assert(
    envExampleContent.includes('PAYMENT_SECRET_KEY=') &&
    envExampleContent.includes('PAYMENT_WEBHOOK_SECRET=') &&
    envExampleContent.includes('ADMIN_API_KEY='),
    '.env.example documents all critical server security secrets'
  );

  const { validateProductionConfig } = await import('../src/lib/config/env.js').catch(async () => {
    // If TS, load through dynamic compilation check
    return await import('../dist/server/entry.mjs').then(m => m.validateProductionConfig).catch(() => ({}));
  });

  // --------------------------------------------------------------------------
  // TEST 2: PRICE MANIPULATION DEFENSE & IMMUTABLE PRODUCTS
  // --------------------------------------------------------------------------
  console.log('\n>>> 2. Payment Security & Price Manipulation Protection (Sections 7, 8, 9, 11)');
  
  const { resolveProductPricing, IMMUTABLE_PRODUCTS } = await import('../src/lib/community/pricing.ts');
  
  assert(IMMUTABLE_PRODUCTS.single_article_inr.amount === 20, 'Immutable product single_article_inr costs ₹20');
  assert(IMMUTABLE_PRODUCTS.single_article_usd.amount === 1, 'Immutable product single_article_usd costs $1');
  assert(IMMUTABLE_PRODUCTS.monthly_pass_inr.amount === 199, 'Immutable product monthly_pass_inr costs ₹199');
  assert(IMMUTABLE_PRODUCTS.monthly_pass_usd.amount === 9, 'Immutable product monthly_pass_usd costs $9');

  const inrResolved = resolveProductPricing('single_article', 'INR');
  assert(inrResolved.amount === 20 && inrResolved.currency === 'INR', 'Server resolves single_article in INR to 20');

  const usdResolved = resolveProductPricing('monthly_pass', 'USD');
  assert(usdResolved.amount === 9 && usdResolved.currency === 'USD', 'Server resolves monthly_pass in USD to 9');

  // Attempt price tampering (e.g. passing amount = 1 for a ₹20 item)
  let priceTamperCaught = false;
  try {
    resolveProductPricing('single_article', 'INR', 1); // Client tries to pay ₹1 instead of ₹20
  } catch (err) {
    if (err.message.includes('Price manipulation detected')) {
      priceTamperCaught = true;
    }
  }
  assert(priceTamperCaught, 'Price tampering attempt (e.g. ₹1 for ₹20 product) is strictly rejected');

  // --------------------------------------------------------------------------
  // TEST 3: CRYPTOGRAPHIC PAYMENT TOKENS & IDEMPOTENCY
  // --------------------------------------------------------------------------
  console.log('\n>>> 3. Payment Token Verification & Idempotency (Sections 10, 11, 13, 14)');
  
  const { createPaymentSession, verifyPayment, verifyWebhookSignature } = await import('../src/lib/community/payment.ts');
  
  const testIdempotencyKey = `test_idemp_${Date.now()}`;
  const session1 = await createPaymentSession({
    deviceId: 'test_dev_001',
    product: 'single_article',
    currency: 'INR',
    idempotencyKey: testIdempotencyKey,
  });

  assert(session1.paymentId && session1.clientToken, 'Payment session successfully created with HMAC client token');
  assert(session1.status === 'CREATED', 'Initial payment record status is CREATED (never prematurely marked paid)');

  // Retry with same idempotency key
  const session2 = await createPaymentSession({
    deviceId: 'test_dev_001',
    product: 'single_article',
    currency: 'INR',
    idempotencyKey: testIdempotencyKey,
  });
  assert(session2.paymentId === session1.paymentId, 'Idempotent request returns identical paymentId without creating duplicate order');

  // Verify valid token
  const verifyResult = await verifyPayment(session1.paymentId, session1.providerPaymentId, session1.clientToken);
  assert(verifyResult.verified === true && verifyResult.record?.status === 'SUCCEEDED', 'Cryptographic verification succeeds and transitions status to SUCCEEDED');

  // Tampered token verification
  const fakeVerify = await verifyPayment(session1.paymentId, session1.providerPaymentId, 'tampered_fake_signature_token');
  assert(fakeVerify.verified === false, 'Tampered payment token is strictly rejected');

  // --------------------------------------------------------------------------
  // TEST 4: WEBHOOK VERIFICATION & DEDUPLICATION
  // --------------------------------------------------------------------------
  console.log('\n>>> 4. Webhook Cryptographic Verification & Deduplication (Sections 10, 61)');
  
  const { config } = await import('../src/lib/config/env.ts');
  const sampleWebhookPayload = JSON.stringify({
    eventId: `evt_${Date.now()}`,
    eventType: 'payment.succeeded',
    paymentId: session1.paymentId,
    amount: 20,
    currency: 'INR',
  });

  const validSignature = createHmac('sha256', config.paymentWebhookSecret)
    .update(sampleWebhookPayload)
    .digest('hex');

  const signaturePassed = verifyWebhookSignature(sampleWebhookPayload, validSignature);
  assert(signaturePassed === true, 'Valid HMAC-SHA256 webhook signature successfully verified');

  const forgedSignature = 'forged_deadbeef_signature_attacker_trying_to_fake_payment';
  const signatureFailed = verifyWebhookSignature(sampleWebhookPayload, forgedSignature);
  assert(signatureFailed === false, 'Forged webhook signature is strictly rejected');

  // --------------------------------------------------------------------------
  // TEST 5: CONTENT SECURITY & XSS SANITIZATION
  // --------------------------------------------------------------------------
  console.log('\n>>> 5. Content Security & XSS Whitelisting (Sections 24, 25, 26, 27)');
  
  const { sanitizeContent, validateWriterName, validateTitle, automatedModerationCheck } = await import('../src/lib/community/security.ts');

  // Script injection
  const scriptPayload = '<script>alert("XSS")</script><p>Legitimate commentary</p>';
  const cleanScript = sanitizeContent(scriptPayload);
  assert(!cleanScript.includes('<script>') && cleanScript.includes('<p>Legitimate commentary</p>'), 'Removes <script> tags while preserving safe paragraphs');

  // Event handler injection
  const eventPayload = '<p onmouseover="alert(1)" onclick="stealCookies()">Test content</p>';
  const cleanEvent = sanitizeContent(eventPayload);
  assert(!cleanEvent.includes('onmouseover') && !cleanEvent.includes('onclick'), 'Strips all inline event handlers (onmouseover, onclick)');

  // Image with onerror
  const imgPayload = '<img src="https://evil.com/x" onerror="alert(1)"><p>Article body</p>';
  const cleanImg = sanitizeContent(imgPayload);
  assert(!cleanImg.includes('<img') && !cleanImg.includes('onerror'), 'Strips disallowed <img> tags and onerror handlers');

  // Javascript scheme link
  const jsLinkPayload = '<a href="javascript:alert(1)">Click for leak</a>';
  const cleanJsLink = sanitizeContent(jsLinkPayload);
  assert(!cleanJsLink.includes('javascript:'), 'Strips dangerous javascript: link schemes');

  // Safe external link receives rel="noopener noreferrer"
  const safeLinkPayload = '<a href="https://marvel.com/test">Official source</a>';
  const cleanSafeLink = sanitizeContent(safeLinkPayload);
  assert(cleanSafeLink.includes('rel="noopener noreferrer"'), 'Safe HTTP(S) links automatically enforce rel="noopener noreferrer"');

  // Prohibited writer name impersonation
  const impersonationTest = validateWriterName('Marvel Studios Official');
  assert(impersonationTest.valid === false, 'Official studio impersonation in writer byline is rejected');

  const validWriterTest = validateWriterName('TrueBeliever_99');
  assert(validWriterTest.valid === true, 'Legitimate contributor byline is accepted');

  // Title validation
  const badTitleTest = validateTitle('[OFFICIAL] Secret Wars Cancelled');
  assert(badTitleTest.valid === false, 'Misleading [OFFICIAL] prefix in title is rejected');

  // Automated spam check
  const spamArticle = automatedModerationCheck('Earn crypto fast', 'Join our telegram channel t.me/scam and casino bonus', 'SpamBot');
  assert(spamArticle.passed === false && spamArticle.recommendedStatus === 'FLAGGED', 'Automated spam scanner flags crypto/casino telegram spam');

  // --------------------------------------------------------------------------
  // TEST 6: RATE LIMITING & ANTI-ABUSE
  // --------------------------------------------------------------------------
  console.log('\n>>> 6. Rate Limiting & Anti-Abuse (Sections 20, 21, 22)');
  
  const { checkRateLimit, hashClientIp } = await import('../src/lib/community/rateLimit.ts');
  const testIp = '198.51.100.42';
  const ipHash = hashClientIp(testIp);

  assert(ipHash !== testIp && ipHash.length > 8, 'IP addresses are hashed and minimized for privacy protection');

  // Check rate limit threshold
  let hitLimit = false;
  for (let i = 0; i < 15; i++) {
    const res = checkRateLimit('publish', ipHash);
    if (!res.allowed) {
      hitLimit = true;
      break;
    }
  }
  assert(hitLimit, 'Rate limiter activates when submission threshold is exceeded, returning retry delay');

  // --------------------------------------------------------------------------
  // TEST 7: LEGAL PAGES & DISCLAIMERS
  // --------------------------------------------------------------------------
  console.log('\n>>> 7. Legal Pages & Compliance Disclaimers (Sections 39, 40, 41, 42, 43)');

  const termsFile = path.join(ROOT, 'src/pages/terms.astro');
  const privacyFile = path.join(ROOT, 'src/pages/privacy.astro');
  const copyrightFile = path.join(ROOT, 'src/pages/copyright.astro');

  assert(fs.existsSync(termsFile), 'Terms of Use page (/terms) exists');
  assert(fs.existsSync(privacyFile), 'Privacy Policy page (/privacy) exists');
  assert(fs.existsSync(copyrightFile), 'Copyright & DMCA Complaints page (/copyright) exists');

  const termsContent = fs.readFileSync(termsFile, 'utf-8');
  assert(
    termsContent.includes('616 Intel is an independent Marvel-focused publication and is not affiliated with Marvel Entertainment, Marvel Studios, Disney, or their subsidiaries'),
    'Terms page contains exact required Marvel non-affiliation disclaimer'
  );

  const footerFile = path.join(ROOT, 'src/components/layout/Footer.astro');
  const footerContent = fs.readFileSync(footerFile, 'utf-8');
  assert(
    footerContent.includes('/terms') && 
    footerContent.includes('/privacy') && 
    footerContent.includes('/copyright'),
    'Footer links directly to /terms, /privacy, and /copyright'
  );
  assert(
    footerContent.includes('616 Intel is an independent Marvel-focused publication and is not affiliated with Marvel Entertainment, Marvel Studios, Disney, or their subsidiaries'),
    'Footer displays exact required Marvel non-affiliation disclaimer'
  );

  const rumorsFile = path.join(ROOT, 'src/pages/rumors/index.astro');
  const rumorsContent = fs.readFileSync(rumorsFile, 'utf-8');
  assert(
    rumorsContent.includes('Rumors and unverified reports are presented as such and may not reflect confirmed information'),
    'Rumors hub displays required speculation and unverified report notice'
  );

  // --------------------------------------------------------------------------
  // TEST 8: SEO & INDEXING SAFEGUARDS
  // --------------------------------------------------------------------------
  console.log('\n>>> 8. SEO & Indexing Safeguards (Sections 67, 68)');

  const robotsFile = path.join(ROOT, 'public/robots.txt');
  const robotsContent = fs.readFileSync(robotsFile, 'utf-8');
  assert(
    robotsContent.includes('Disallow: /write') &&
    robotsContent.includes('Disallow: /api/') &&
    robotsContent.includes('Disallow: /payment/'),
    'robots.txt disallows /write, /api/, and /payment/ from search crawler indexation'
  );

  const sitemapFile = path.join(ROOT, 'src/pages/sitemap.xml.ts');
  const sitemapContent = fs.readFileSync(sitemapFile, 'utf-8');
  assert(!sitemapContent.includes('${baseUrl}/write'), 'sitemap.xml excludes /write from search engines');
  assert(
    sitemapContent.includes('${baseUrl}/terms') &&
    sitemapContent.includes('${baseUrl}/privacy') &&
    sitemapContent.includes('${baseUrl}/copyright'),
    'sitemap.xml indexes canonical compliance pages (/terms, /privacy, /copyright)'
  );

  const writeFile = path.join(ROOT, 'src/pages/write/index.astro');
  const writeContent = fs.readFileSync(writeFile, 'utf-8');
  assert(writeContent.includes('noindex={true}'), 'Writing desk template enforces noindex={true}');

  // --------------------------------------------------------------------------
  // TEST 9: ADMIN BUREAU & METRICS SECURITY
  // --------------------------------------------------------------------------
  console.log('\n>>> 9. Internal Moderation & Admin Security (Sections 35, 36, 37, 97)');

  const moderationFile = path.join(ROOT, 'src/pages/api/community/moderation.ts');
  const moderationContent = fs.readFileSync(moderationFile, 'utf-8');
  assert(
    moderationContent.includes('Bearer ') && !moderationContent.includes('secret=123'),
    'Moderation API strictly requires Bearer authorization header and prohibits insecure URL query secrets'
  );

  const healthFile = path.join(ROOT, 'src/pages/api/health.ts');
  assert(fs.existsSync(healthFile), 'Lightweight /api/health endpoint exists for uptime monitoring');

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log(`VERIFICATION COMPLETE: ${passedTests} / ${totalTests} checks passed.`);
  if (failedTests === 0) {
    console.log('ALL PHASE 7 PRODUCTION HARDENING CHECKS PASSED SUCCESSFULLY.');
  } else {
    console.error(`FAILED CHECKS: ${failedTests}`);
  }
  console.log('============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Test suite runtime error:', err);
  process.exit(1);
});
