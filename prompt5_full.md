<USER_REQUEST>
# 616 INTEL

## Phase 2 — Community Publishing & Paid Article System

### Product Evolution

616 Intel is no longer only an editorial Marvel news website.

It is now a hybrid:

**Editorial publication + community publishing platform**

The platform has two types of content:

### 1. 616 Intel Editorial

Content published by the site's own editorial team.

### 2. Community Articles

Articles submitted and published by visitors.

The community publishing experience must be extremely simple.

The contributor should NOT need:

* account
* username
* password
* login
* profile
* dashboard

The intended publishing flow is:

```text
WRITE
  ↓
PREVIEW
  ↓
CHOOSE PLAN
  ↓
PAY IF REQUIRED
  ↓
PUBLISH
  ↓
ARTICLE URL
```

---

# 1. CONTRIBUTOR EXPERIENCE

The core philosophy:

> Anyone should be able to write and publish a Marvel article in a few minutes.

Do not create a complicated Medium-style editor.

The writing form should contain exactly the essential fields.

```text
WRITE YOUR ARTICLE

Title
[____________________________]

Movie Name
[____________________________]

Article
[____________________________]
[                            ]
[                            ]
[                            ]

Writer Name
[____________________________]

Character Count:
742 / 1000

[ PREVIEW ]

[ PUBLISH ]
```

The interface should be extremely clean.

---

# 2. ARTICLE STRUCTURE

Every community article has exactly:

```text
TITLE

MOVIE NAME

ARTICLE

WRITER NAME

PUBLISH
```

Do not initially add:

* category selection
* tags
* complicated formatting
* SEO fields
* author profile
* custom URL
* advanced metadata

These can be automatically generated.

---

# 3. ARTICLE EDITOR

The article editor should feel closer to a simple publishing form than a CMS.

Fields:

### Title

Required.

Recommended maximum:

```text
120 characters
```

### Movie Name

Required.

Example:

```text
Avengers: Secret Wars
```

### Article

Required.

Plain text or lightweight rich text.

### Writer Name

Required.

Example:

```text
Raj
```

---

# 4. ARTICLE CHARACTER LIMIT

The first free article has a maximum of:

**1,000 characters**

This is a character limit, not a word limit.

Display a live counter:

```text
742 / 1000 characters
```

Near the limit:

```text
920 / 1000
```

At limit:

```text
1000 / 1000
```

Prevent additional characters after 1,000 for the free article.

---

# 5. PAID ARTICLE LENGTH

Paid publishing should support substantially longer articles.

Recommended initial limit:

```text
10,000 characters
```

This is configurable.

Do not create an artificial restriction of 1,000 characters once the user has paid.

The system should make the distinction clear:

```text
FREE
1 article
Up to 1,000 characters

PAID
Long-form article
Up to 10,000 characters
```

---

# 6. FREE PUBLISHING

Every visitor receives:

**1 free article publication**

The free article must:

* be ≤ 1,000 characters
* contain title
* contain movie name
* contain article
* contain writer name

After successful publication, the free publishing entitlement is consumed.

---

# 7. PAID SINGLE ARTICLE

After the free publication is used:

### India

**₹20 per article**

### Other countries

**$1 per article**

This grants publication of one additional article.

The price should be configurable rather than hardcoded throughout the codebase.

Example configuration:

```typescript
const pricing = {
  india: {
    article: 20,
    subscription: 199,
    currency: "INR"
  },
  international: {
    article: 1,
    subscription: 9,
    currency: "USD"
  }
};
```

---

# 8. SUBSCRIPTION

Offer a monthly subscription.

### India

**₹199/month**

### International

**$9/month**

Subscription grants:

**unlimited article publishing during the active subscription period**

Subject to reasonable anti-spam/editorial policies.

Do not advertise it as unlimited if technical or moderation restrictions apply.

---

# 9. PRICING UI

Create a simple pricing selector.

```text
PUBLISH YOUR ARTICLE

────────────────────────────

FREE
1 ARTICLE

Up to 1,000 characters

₹0 / $0

[ PUBLISH FREE ]

────────────────────────────

SINGLE ARTICLE

1 ARTICLE

₹20 India
$1 International

[ PUBLISH ONE ]

────────────────────────────

MONTHLY

UNLIMITED ARTICLES

₹199/month India
$9/month International

[ GO MONTHLY ]
```

The currency shown should be determined from the visitor's selected/recognized country, with an explicit fallback.

Do not rely solely on IP geolocation for billing decisions.

---

# 10. COUNTRY / CURRENCY

The platform should support:

```text
India → INR
Other supported countries → USD
```

The user should be able to manually switch currency.

Example:

```text
🇮🇳 India ₹
🌎 International $
```

Do not prevent a legitimate international user from viewing the INR price or vice versa solely based on an unreliable location estimate.

The payment provider ultimately determines the supported payment/currency flow.

---

# 11. PAYMENT REQUIREMENT

A purely static website cannot securely determine:

* whether a payment succeeded
* whether a subscription is active
* whether a free article has already been used
* whether a payment has been refunded
* whether a user has consumed an article credit

Therefore:

## Public website

Remain static wherever possible.

## Payment/publishing infrastructure

Use a minimal serverless/API layer.

Possible architecture:

```text
Static Astro Website
        │
        ├── Article UI
        ├── Writer Form
        └── Pricing
               │
               ↓
        Serverless API
               │
               ↓
        Payment Provider
               │
               ↓
       Payment Verification
               │
               ↓
        Publishing Service
```

Do NOT introduce a traditional backend application unless necessary.

---

# 12. NO LOGIN

This is a hard product requirement.

Do not create:

* signup
* login
* password
* username/password authentication
* social login

The publishing experience should remain accountless.

---

# 13. HOW TO IDENTIFY A CONTRIBUTOR WITHOUT LOGIN

Because there is no login, the system needs another way to associate:

* free article usage
* article purchases
* subscriptions
* publishing permissions

The recommended mechanism is:

### Email-based publishing identity

Ask for an email address during payment/publishing.

This does NOT create an account.

Example:

```text
Email
[ you@example.com ]
```

The email is used to:

* send payment receipt
* send publication confirmation
* associate a purchase
* associate subscription status
* prevent obvious abuse

The user's public article only displays:

**Writer Name**

The contributor's email is never publicly displayed.

---

# 14. FREE ARTICLE IDENTITY

For the free article, require:

```text
Email
Writer Name
```

The system can issue an anonymous publishing entitlement tied to a secure token and email.

Do not expose the token to the public.

---

# 15. FREE ARTICLE FLOW

```text
VISITOR
  ↓
CLICK "WRITE"
  ↓
WRITING FORM
  ↓
TITLE
MOVIE
ARTICLE
WRITER NAME
EMAIL
  ↓
CHARACTER COUNT
  ↓
PREVIEW
  ↓
SYSTEM CHECKS FREE ENTITLEMENT
  ↓
FREE AVAILABLE?
  ├── YES → PUBLISH
  │
  └── NO → SHOW PAYMENT OPTIONS
```

---

# 16. PAID ARTICLE FLOW

```text
WRITE ARTICLE
      ↓
PREVIEW
      ↓
PUBLISH
      ↓
FREE ARTICLE ALREADY USED
      ↓
PRICING
      ↓
ONE ARTICLE / MONTHLY
      ↓
PAYMENT
      ↓
PAYMENT VERIFIED
      ↓
PUBLISH
      ↓
ARTICLE URL
      ↓
EMAIL CONFIRMATION
```

---

# 17. SUBSCRIPTION FLOW

```text
CLICK MONTHLY
      ↓
ENTER EMAIL
      ↓
PAYMENT PROVIDER
      ↓
SUBSCRIPTION CREATED
      ↓
PAYMENT VERIFIED
      ↓
PUBLISHING ACCESS ENABLED
      ↓
USER CAN PUBLISH
      ↓
PAYMENT PROVIDER WEBHOOK
      ↓
SUBSCRIPTION STATUS UPDATED
```

The user still does not need an account.

---

# 18. PAYMENT PROVIDER

Do not hardcode a payment provider into the UI architecture.

Create a payment abstraction:

```typescript
createSingleArticlePayment()
createSubscriptionPayment()
verifyPayment()
getSubscriptionStatus()
```

This allows the payment provider to be changed later.

For India, the implementation can support a provider capable of INR payments and recurring subscriptions.

For international users, support USD.

The exact provider should be selected based on:

* India support
* international payments
* recurring billing
* webhooks
* tax requirements
* transaction fees
* supported payment methods

---

# 19. PAYMENT VERIFICATION

Never trust:

```text
?payment=success
```

or a frontend JavaScript variable.

The serverless endpoint must verify payment status with the payment provider.

Only after verification should publishing access be granted.

---

# 20. ARTICLE PUBLISHING

Once payment/free entitlement is verified:

```text
Publishing Service
        ↓
Validate Article
        ↓
Sanitize Content
        ↓
Generate Slug
        ↓
Generate Metadata
        ↓
Store/Publish
        ↓
Generate Public URL
```

---

# 21. IMPORTANT STATIC-SITE CHANGE

Community articles are user-generated content.

Therefore they cannot be physically added to the Git repository as static files at publication time unless a deployment/rebuild pipeline is triggered.

The architecture should therefore distinguish:

### Editorial Content

```text
Git / Astro Content Collections
```

### Community Content

```text
Publishing API
+
Content Storage
+
Static/public rendering or dynamic content delivery
```

The public website can still be overwhelmingly static.

Do not compromise security by attempting to let arbitrary visitors write directly into the repository.

---

# 22. COMMUNITY ARTICLE STORAGE

Community articles need a lightweight content store.

Recommended conceptual model:

```text
CommunityArticle

id
title
movieName
content
writerName
writerEmailHash
slug
status
publishedAt
paymentType
paymentReference
subscriptionReference
createdAt
updatedAt
```

The email should not be unnecessarily exposed or stored in plaintext.

---

# 23. MODERATION

Because anyone can publish, moderation is required.

At minimum support:

```text
PENDING
PUBLISHED
REMOVED
```

For MVP, you can choose:

### Option A

Automatic publishing after payment.

### Option B

Editorial review before publication.

For a public platform allowing anyone to write, **editorial moderation is strongly recommended**.

The UI can still tell the contributor:

> Your article has been submitted and is awaiting publication review.

---

# 24. SPAM PROTECTION

Implement:

* rate limiting
* CAPTCHA/anti-bot protection
* email verification where appropriate
* request validation
* content length limits
* duplicate submission detection
* basic abuse detection

Do not depend solely on frontend restrictions.

---

# 25. CONTENT SANITIZATION

User-generated article content must be sanitized.

Never render raw user HTML directly.

Strip:

* scripts
* iframes unless explicitly supported
* event handlers
* malicious HTML
* javascript URLs

If the initial editor is plain text, render text safely with appropriate line-break handling.

---

# 26. SIMPLE WRITING EXPERIENCE

The writing page should be extremely focused.

Route:

```text
/write/
```

Desktop:

```text
WRITE ON 616 INTEL

Title
──────────────────────────────

Movie Name
──────────────────────────────

Article
──────────────────────────────
                             
                             
                             

Writer Name
──────────────────────────────

Email
──────────────────────────────

742 / 1000 characters

[ PREVIEW ARTICLE ]
```

Mobile should become a single-column form.

---

# 27. NO COMPLEX EDITOR

Do not initially build:

* font selectors
* text colors
* custom layouts
* columns
* tables
* embedded HTML
* custom CSS
* complex rich text toolbar

Keep writing friction extremely low.

---

# 28. ARTICLE PREVIEW

Before publication show exactly how the article will appear.

Preview:

```text
RUMOR

MOVIE NAME

ARTICLE TITLE

Article text...

Written by Writer Name
```

Include:

```text
[ EDIT ]

[ PUBLISH ]
```

---

# 29. WRITER NAME

Writer name is public.

Example:

```text
Written by Rajnikant
```

Allow:

* full name
* pen name

But do not allow impersonation of official Marvel personnel.

Add basic editorial restrictions.

---

# 30. MOVIE NAME

Movie name should initially be free text.

However, normalize it internally when possible.

Example:

```text
Avengers Secret Wars
Avengers: Secret Wars
AVENGERS: SECRET WARS
```

should ideally map to the same movie entity in future.

Do not require contributors to understand internal slugs.

---

# 31. ARTICLE TITLE

Title requirements:

* required
* maximum 120 characters
* no HTML
* no excessive repeated punctuation
* no misleading system-style labels

Example:

```text
New Avengers: Secret Wars Theory Explained
```

---

# 32. ARTICLE CONTENT

Free article:

```text
Maximum: 1,000 characters
```

Paid article:

```text
Maximum: 10,000 characters
```

Display counter continuously.

Example:

```text
8,426 / 10,000
```

---

# 33. SUBSCRIPTION ACCESS

When an active subscription exists:

```text
Publishing Access

✓ Monthly subscription active

Unlimited articles
Up to 10,000 characters each
```

Do not require login.

The contributor can identify themselves through the email used during purchase.

---

# 34. SUBSCRIPTION EXPIRY

When subscription expires:

```text
Your monthly publishing plan has expired.

You can:
[ BUY ONE ARTICLE ]
[ RENEW MONTHLY ]
```

The user retains previously published articles.

Do not delete content because a subscription expired.

---

# 35. PAYMENT RECEIPT

After payment:

```text
Payment successful.

Your article publishing credit is ready.

[ CONTINUE TO PUBLISH ]
```

Send confirmation through the payment provider/email system where available.

---

# 36. ARTICLE URL

Automatically generate clean URLs.

Example:

```text
/articles/avengers-secret-wars-new-theory/
```

If duplicate:

```text
/articles/avengers-secret-wars-new-theory-2/
```

Do not let users manually choose arbitrary URLs.

---

# 37. COMMUNITY ARTICLE BADGE

Community content should be transparently identified.

Example:

```text
COMMUNITY
```

or:

```text
COMMUNITY ARTICLE
```

The page should also show:

```text
Written by Rajnikant
```

This distinguishes it from:

```text
616 INTEL EDITORIAL
```

---

# 38. ARTICLE HEADER TYPES

### Editorial

```text
616 INTEL
Editorial
```

### Community

```text
COMMUNITY
Written by Rajnikant
```

Do not make community articles look like official editorial reports.

This distinction is important for credibility.

---

# 39. COMMUNITY PAGE

Create:

```text
/community/
```

Structure:

```text
WRITE ON 616 INTEL

Anyone can share their Marvel theories,
analysis, opinions and entertainment articles.

[ WRITE YOUR FIRST ARTICLE ]

────────────

LATEST COMMUNITY ARTICLES

Article
Article
Article
```

---

# 40. WRITE PAGE HERO

Create an attractive but simple hero:

```text
WRITE YOUR MARVEL STORY

Have a theory?
Spotted something interesting?
Want to share your analysis?

Write your first article free.

[ START WRITING ]
```

---

# 41. PRICING PAGE

Create:

```text
/pricing/
```

Structure:

```text
WRITE MORE. SHARE MORE.

FREE
1 article
≤ 1,000 characters

₹0 / $0

────────────────

SINGLE ARTICLE
1 additional article

₹20 India
$1 International

────────────────

MONTHLY
Unlimited articles

₹199/month India
$9/month International
```

---

# 42. PRICING COMPARISON

Create a simple comparison:

| Feature     | Free         | Single Article | Monthly      |
| ----------- | ------------ | -------------- | ------------ |
| Articles    | 1            | 1              | Unlimited    |
| Length      | 1,000 chars  | 10,000 chars   | 10,000 chars |
| Account     | Not required | Not required   | Not required |
| Writer Name | Yes          | Yes            | Yes          |
| Publication | Yes          | Yes            | Yes          |

---

# 43. NO ACCOUNT DOES NOT MEAN NO IDENTITY

Internally the platform still needs a secure publishing identity.

Use:

```text
Email
+
secure entitlement token
+
payment reference
```

The user should never be exposed to account-management complexity.

---

# 44. PRIVACY

Email addresses used for publishing/payment must never be displayed publicly.

Community article page:

```text
Written by Rajnikant
```

Not:

```text
rajnikant@example.com
```

Provide appropriate privacy documentation.

---

# 45. REFUNDS

The payment layer must have a defined refund policy.

Do not allow frontend code to determine refund eligibility.

Refunds should be handled according to the payment provider and site's published policy.

---

# 46. PAYMENT SECURITY

Never:

* store card numbers
* store CVV
* process raw card data
* trust frontend payment status
* expose payment secrets
* put payment secret keys in the Astro frontend

Use hosted/secure payment-provider checkout wherever possible.

---

# 47. ANTI-ABUSE

Because publishing is paid, the system must prevent obvious abuse.

Implement:

```text
Rate limiting
CAPTCHA
Request throttling
Content validation
Duplicate detection
Payment verification
```

For example:

A single client should not be able to submit hundreds of article requests per minute.

---

# 48. EDITORIAL MODERATION

Create an internal moderation mechanism even if there is no public admin dashboard yet.

Community article status:

```text
PENDING
PUBLISHED
REJECTED
REMOVED
```

Store rejection/removal reason internally.

---

# 49. CONTENT POLICY

Community writers may publish:

* theories
* reviews
* opinions
* analysis
* entertainment news
* speculation
* fan discussion

They should not be allowed to impersonate:

* Marvel Studios
* Disney
* actors
* official representatives

The article system should not allow users to present themselves as official sources.

---

# 50. COMMUNITY ARTICLE DISCLAIMER

For community content, display:

> Community articles represent the views and information submitted by their authors and do not necessarily represent the views of 616 Intel.

For rumors:

> This article contains unverified information or speculation.

---

# 51. HOMEPAGE COMMUNITY SECTION

Add a section:

```text
FROM THE COMMUNITY

Fresh perspectives from Marvel fans and writers.

[ ARTICLE ]
[ ARTICLE ]
[ ARTICLE ]

[ VIEW ALL COMMUNITY ARTICLES → ]
```

Do not mix community content into editorial sections without clearly labeling it.

---

# 52. COMMUNITY ARTICLE CARD

Example:

```text
COMMUNITY

Avengers: Secret Wars Theory:
What Could Happen Next?

Written by Rajnikant

2 min read

[ READ ARTICLE → ]
```

---

# 53. CONTRIBUTOR CONVERSION FLOW

The primary funnel should be:

```text
Visitor
 ↓
Reads articles
 ↓
Sees "Write on 616 Intel"
 ↓
Opens writer page
 ↓
Writes article
 ↓
First article free
 ↓
Publishes
 ↓
Returns to write again
 ↓
₹20 / $1 article
or
₹199 / $9 monthly
```

The free first article is the acquisition mechanism.

---

# 54. FREE ARTICLE MESSAGE

When someone has not used their free publication:

```text
YOUR FIRST ARTICLE IS FREE

Publish one article up to 1,000 characters
at no cost.

[ PUBLISH FREE ]
```

After it is consumed:

```text
YOUR FREE ARTICLE HAS BEEN USED

Keep publishing:

₹20 / $1 per article
or
₹199 / $9 per month
```

---

# 55. PRICING CTA

After successful free publication:

```text
Enjoyed writing on 616 Intel?

Publish more articles for:

₹20 / $1 each

or

₹199 / $9 monthly

[ VIEW PLANS ]
```

Keep this informational rather than aggressive.

---

# 56. PAYMENT RETURN FLOW

After payment provider checkout:

```text
/payment/success/
```

or an equivalent secure callback flow.

The server verifies the transaction before granting access.

Never grant publishing access merely because the visitor reaches a success URL.

---

# 57. PAYMENT FAILURE

Create:

```text
/payment/failed/
```

Display:

```text
PAYMENT NOT COMPLETED

Your publishing access has not been charged/granted.

[ TRY AGAIN ]

[ RETURN TO ARTICLE ]
```

---

# 58. PAYMENT CANCELLATION

If the user closes/cancels checkout:

```text
/payment/cancelled/
```

Display:

```text
PAYMENT CANCELLED

Your article is still saved locally in this session.

[ RETURN TO WRITING ]
```

If draft persistence is implemented, never claim it is permanently stored unless it actually is.

---

# 59. DRAFT HANDLING

Because there is no login:

The safest MVP behavior is:

**Keep the draft in the browser's localStorage/session state.**

Example:

```text
draft.title
draft.movie
draft.article
draft.writerName
draft.email
```

Do not store sensitive payment information in localStorage.

The user can return to their unfinished draft on the same browser.

---

# 60. PUBLISHING CONFIRMATION

After publication:

```text
ARTICLE PUBLISHED

Your article is now live on 616 Intel.

[ VIEW ARTICLE ]

[ WRITE ANOTHER ARTICLE ]
```

If moderation is enabled:

```text
ARTICLE SUBMITTED

Your article has been submitted for editorial review.

[ RETURN TO COMMUNITY ]
```

---

# 61. ARTICLE SEO

Community articles should receive:

* title
* description
* canonical URL
* Open Graph metadata
* Article structured data
* author information
* publication date

But clearly identify the author as the community writer.

---

# 62. GEO FOR COMMUNITY CONTENT

Structure community articles clearly:

```text
What is this article about?

Movie:
Avengers: Secret Wars

Author:
Rajnikant

Article:
...
```

This makes the content understandable to search engines and AI systems.

Do not keyword-stuff titles or articles.

---

# 63. COMMUNITY ARTICLE INDEX

Generate:

```text
/community/
```

with:

* newest articles
* popular editorial selections
* movie filters

For MVP, popularity should not be fabricated.

Use chronological order or manually selected content.

---

# 64. STATIC VS DYNAMIC ARCHITECTURE

The website should remain mostly static:

```text
                616 INTEL
                    │
          ┌─────────┴─────────┐
          │                   │
       STATIC             SERVERLESS
       CONTENT             SERVICES
          │                   │
     Editorial               Payments
     Articles                Publishing
     Movies                  Verification
     Videos                  Entitlements
     Galleries               Moderation
     SEO
```

This preserves the speed/SEO advantages of the original project while making paid community publishing technically viable.

---

# 65. WHAT REMAINS STATIC

Keep these static:

* homepage shell
* editorial articles
* movie pages
* character pages
* video pages
* photo pages
* category pages
* about
* privacy
* terms
* pricing
* community landing page
* design system

---

# 66. WHAT NEEDS SERVERLESS LOGIC

Only the sensitive operations:

```text
Payment creation
Payment verification
Subscription verification
Free entitlement verification
Article submission
Article publication
Moderation state
```

This should be as small as possible.

---

# 67. NO TRADITIONAL USER DATABASE

Do not build a traditional account database.

A lightweight publishing/payment data store is still required to prevent:

```text
free article abuse
fake payment confirmation
subscription abuse
duplicate transactions
```

This is not a user-profile system.

---

# 68. DATA MODEL

Minimal publishing record:

```typescript
type ContributorEntitlement = {
  id: string;

  emailHash: string;

  freeArticleUsed: boolean;

  purchasedArticles: number;

  subscriptionStatus:
    | "NONE"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED";

  subscriptionExpiresAt?: string;

  createdAt: string;
};
```

Article:

```typescript
type CommunityArticle = {
  id: string;

  title: string;
  movieName: string;
  content: string;

  writerName: string;

  slug: string;

  status:
    | "PENDING"
    | "PUBLISHED"
    | "REJECTED"
    | "REMOVED";

  publishedAt?: string;

  entitlementType:
    | "FREE"
    | "SINGLE"
    | "SUBSCRIPTION";

  createdAt: string;
};
```

---

# 69. PAYMENT RECORD

Keep payment information minimal.

```typescript
type PaymentRecord = {
  id: string;

  providerPaymentId: string;

  entitlementType:
    | "SINGLE_ARTICLE"
    | "SUBSCRIPTION";

  amount: number;

  currency: "INR" | "USD";

  status:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  createdAt: string;
};
```

Never store card information.

---

# 70. MANUAL EDITORIAL CONTENT REMAINS SEPARATE

Do not merge community articles directly into editorial source files.

Use:

```text
Editorial
src/content/articles/

Community
publishing service
```

This keeps editorial control and content integrity intact.

---

# 71. COMMUNITY ARTICLE DESIGN

Community pages should use the same Phase 1 design system but visually identify the source.

Example:

```text
COMMUNITY ARTICLE

Avengers: Secret Wars:
My Theory About the Multiverse

Written by Rajnikant

September 29, 2026
```

Use a subtle community badge.

---

# 72. NO LOGIN UX

Never display:

```text
Sign in
Create account
My account
Dashboard
```

Instead:

```text
WRITE
```

and:

```text
PUBLISH
```

The complexity stays behind the scenes.

---

# 73. WRITE BUTTON

Add a prominent global CTA:

Desktop:

```text
[ ✎ WRITE ]
```

Mobile:

```text
✎
```

or:

```text
WRITE
```

Place it in:

* header
* community page
* article pages
* footer

---

# 74. ARTICLE PAGE CTA

At the end of every article:

```text
HAVE A MARVEL TAKE?

Write your own article on 616 Intel.

[ WRITE YOUR ARTICLE → ]
```

---

# 75. COMMUNITY DISCOVERY

Add:

```text
LATEST FROM THE COMMUNITY
```

to the homepage.

Keep it separate from:

```text
LATEST 616 INTEL REPORTS
```

This distinction is fundamental to editorial credibility.

---

# 76. PHASE 2 UPDATED ACCEPTANCE CRITERIA

Phase 2 is complete when a visitor can:

### Free writer

```text
Open Write
 ↓
Enter title
 ↓
Enter movie
 ↓
Write ≤1,000 characters
 ↓
Enter writer name
 ↓
Enter email
 ↓
Preview
 ↓
Publish
 ↓
Receive article URL
```

### Second article

```text
Write article
 ↓
System detects free publication consumed
 ↓
Pricing displayed
 ↓
Choose ₹20/$1
 ↓
Payment
 ↓
Payment verified
 ↓
Article published
```

### Subscription

```text
Write article
 ↓
Choose monthly
 ↓
₹199/$9 payment
 ↓
Subscription verified
 ↓
Publish
 ↓
Continue publishing
```

### Editorial content

Existing editorial content continues to work independently.

---

# 77. FINAL PRODUCT MODEL

After this phase, 616 Intel becomes:

```text
                    616 INTEL
                        │
        ┌───────────────┴────────────────┐
        │                                │
   616 EDITORIAL                    COMMUNITY
        │                                │
 News / Reports                      Anyone
 Rumors                              can write
 Movies                              │
 Videos                              │
 Photos                              │
        │                             │
        └───────────────┬─────────────┘
                        │
                  PUBLIC WEBSITE
                        │
               ┌────────┴────────┐
               │                 │
             FREE              PAID
               │                 │
          1 article         ₹20 / $1
          ≤1000 chars      per article
                              │
                         ₹199 / $9
                          monthly
```

---

# 78. IMPORTANT IMPLEMENTATION PRINCIPLE

The product should feel like:

> **"I can write something about Marvel and publish it here in under five minutes."**

Not:

> "I need to become a member of another blogging platform."

The absence of login is a feature.

The simplicity of:

**Title → Movie → Article → Writer → Publish**

should remain the defining interaction.

At the same time, payment, entitlement, abuse prevention and publication verification must happen securely behind the scenes.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-09-29T01:29:05+05:30.
</ADDITIONAL_METADATA>