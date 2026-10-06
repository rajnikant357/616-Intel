# 616 Intel — Keyword Architecture & Search-Intent Map

## Overview & Methodology
This keyword mapping document aligns 616 Intel's content architecture with search intent across Marvel cinematic, comic, and streaming intelligence. 

In accordance with strict verification standards, search volumes are marked as **Not measured** (avoiding speculative third-party volume estimations). Search intent is classified into:
* **Informational**: Searching for facts, casting confirmations, release dates, or story explanations.
* **Investigatory / Speculative**: Searching for leaks, rumors, behind-the-scenes reporting, and production surveillance.
* **Navigational**: Direct discovery of dedicated dossier hubs, franchise rosters, or category archives.

---

## 1. Core Publication & Category Keyword Matrix

| Target Keyword | Search Intent | Target Route | Target H1 Tag | Secondary Supporting Keywords | Internal Linking Inbound Sources | Structured Data Schema | Search Volume |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Marvel movie rumors | Investigatory | `/rumors` | Marvel Movie Rumors & Leaks | MCU leaks, Marvel rumors 2026, Marvel scoop database | Homepage, Header Nav, Footer, Article Cards | `BreadcrumbList`, `CollectionPage` | Not measured |
| Confirmed Marvel news | Informational | `/confirmed` | Confirmed Marvel Reports & Verified Receipts | Verified MCU news, Marvel official updates, Marvel receipts | Header Nav, Footer, Article Verification Badges | `BreadcrumbList`, `CollectionPage` | Not measured |
| Debunked Marvel leaks | Investigatory | `/debunked` | Debunked Marvel Rumors & Fake Leaks | False Marvel rumors, debunked MCU leaks, fake Marvel scoops | Header Nav, Rumor Trackers, Article Footers | `BreadcrumbList`, `CollectionPage` | Not measured |
| Breaking Marvel news | Informational | `/breaking` | Breaking Marvel News & Urgent Dispatches | Live MCU news, urgent Marvel dispatches, studio leaks | Header Ticker, Homepage Hero, Mobile Nav | `BreadcrumbList`, `CollectionPage` | Not measured |
| Latest Marvel news | Informational | `/latest` | Latest Marvel News & Multiverse Intelligence | Daily Marvel news, MCU updates today, new Marvel scoops | Header Nav, Breadcrumbs, Footer | `BreadcrumbList`, `CollectionPage` | Not measured |
| Marvel set photos | Investigatory | `/photos` | Marvel Set Photos & Location Surveillance | MCU set leaks, Marvel location photos, behind the scenes MCU | Header Nav, Movie Hubs, Photo Embeds | `BreadcrumbList`, `CollectionPage`, `ImageGallery` | Not measured |
| Marvel video breakdowns | Informational | `/videos` | Marvel Video Breakdowns & Investigations | MCU leak breakdowns, Marvel theory videos, Marvel trailer analysis | Header Nav, Video Widgets, Article Embeds | `BreadcrumbList`, `CollectionPage`, `VideoObject` | Not measured |
| Marvel movie production hubs | Navigational | `/movies` | Marvel Movie News, Production Hubs & Slates | MCU movie slate, upcoming Marvel movies, Phase 6 movies | Header Nav, Character Dossiers, Article Meta | `BreadcrumbList`, `CollectionPage` | Not measured |
| Marvel character dossiers | Navigational | `/characters` | Marvel Character Dossiers & Profiles | MCU character database, Marvel characters list, Marvel profiles | Header Nav, Movie Cast Hubs, Article Meta | `BreadcrumbList`, `CollectionPage` | Not measured |
| Marvel fan theories | Informational | `/community` | 616 Intel Community | Marvel community theories, MCU fan speculation, Marvel leaks forum | Header Nav, Community CTAs, Contributor Cards | `BreadcrumbList`, `CollectionPage` | Not measured |

---

## 2. Movie-Specific Keyword Clusters

| Movie Target | Target Route | Target H1 Tag | High-Intent Keyword Cluster | Internal Linking Inbound Sources | Structured Data Schema | Search Volume |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Avengers: Doomsday | `/movies/avengers-doomsday` | Avengers: Doomsday News, Rumors & Leaks | *avengers doomsday leaks*, *doctor doom casting*, *avengers doomsday rumors*, *rdj doctor doom news* | Homepage Featured, `/rumors`, `/characters/doctor-doom` | `Movie`, `BreadcrumbList` | Not measured |
| Avengers: Secret Wars | `/movies/avengers-secret-wars` | Avengers: Secret Wars News, Rumors & Leaks | *secret wars leaks*, *avengers secret wars rumors*, *battleworld mcu*, *secret wars multiverse roster* | `/movies/avengers-doomsday`, Homepage, `/rumors` | `Movie`, `BreadcrumbList` | Not measured |
| Fantastic Four: First Steps | `/movies/fantastic-four-first-steps` | The Fantastic Four: First Steps News, Rumors & Leaks | *fantastic four first steps leaks*, *galactus mcu*, *mister fantastic pedro pascal*, *f4 retro future* | `/characters/mr-fantastic`, `/photos`, Homepage | `Movie`, `BreadcrumbList` | Not measured |
| Blade | `/movies/blade` | Blade News, Rumors & Leaks | *blade reboot mcu leaks*, *mahershala ali blade news*, *blade delay rumors*, *midnight sons mcu* | `/characters/blade`, `/confirmed`, `/rumors` | `Movie`, `BreadcrumbList` | Not measured |
| Spider-Man 4 | `/movies/spider-man-4` | Spider-Man 4 News, Rumors & Leaks | *spider-man 4 mcu rumors*, *tom holland spider-man 4 leaks*, *spider-man 4 street level or multiverse* | `/characters/spider-man`, Homepage, `/breaking` | `Movie`, `BreadcrumbList` | Not measured |

---

## 3. Character Dossier Keyword Clusters

| Character Target | Target Route | Target H1 Tag | High-Intent Keyword Cluster | Inbound Linking Sources | Structured Data Schema | Search Volume |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Doctor Doom | `/characters/doctor-doom` | Doctor Doom News, Rumors & MCU Updates | *doctor doom mcu*, *robert downey jr doom leaks*, *victor von doom mcu role* | `/movies/avengers-doomsday`, `/movies/fantastic-four-first-steps` | `ProfilePage` (`Person`), `BreadcrumbList` | Not measured |
| Blade (Eric Brooks) | `/characters/blade` | Blade News, Rumors & MCU Updates | *blade mcu status*, *eric brooks mahershala ali*, *blade midnight sons rumors* | `/movies/blade`, `/confirmed` | `ProfilePage` (`Person`), `BreadcrumbList` | Not measured |
| Mister Fantastic | `/characters/mr-fantastic` | Mister Fantastic News, Rumors & MCU Updates | *reed richards mcu*, *pedro pascal reed richards*, *council of reeds leaks* | `/movies/fantastic-four-first-steps`, `/movies/avengers-secret-wars` | `ProfilePage` (`Person`), `BreadcrumbList` | Not measured |
| Spider-Man | `/characters/spider-man` | Spider-Man News, Rumors & MCU Updates | *peter parker mcu leaks*, *tom holland spider-man rumors*, *spider-man street level mcu* | `/movies/spider-man-4`, Homepage, `/rumors` | `ProfilePage` (`Person`), `BreadcrumbList` | Not measured |

---

## 4. Editorial Article Intent & Entity Mapping

Each editorial article published on 616 Intel targets long-tail search queries while strengthening the authority of connected movie and character hubs.

| Editorial Article Slug | Search Intent | Target Query Pattern | Associated Movie Entity | Associated Character Entity | Structured Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `demo-avengers-doomsday-leak` | Investigatory | *avengers doomsday plot leak battleworld* | `avengers-doomsday` | `doctor-doom` | `NewsArticle`, `BreadcrumbList` |
| `demo-fantastic-four-set-photos` | Investigatory | *fantastic four retro future set photos* | `fantastic-four-first-steps` | `mr-fantastic` | `NewsArticle`, `BreadcrumbList` |
| `demo-blade-production-restart` | Informational | *blade 2026 filming restart date confirmed* | `blade` | `blade` | `NewsArticle`, `BreadcrumbList` |
| `demo-spiderman-nyc-location` | Investigatory | *spider man 4 street level filming nyc* | `spider-man-4` | `spider-man` | `NewsArticle`, `BreadcrumbList` |
| `demo-weapon-x-casting-call` | Investigatory | *mcu wolverine weapon x casting call* | — | — | `NewsArticle`, `BreadcrumbList` |

---

## 5. Community Articles Quality & Indexing Policy

Community articles created via `/write` are assessed dynamically by the Quality Gate (`src/utils/communityQuality.ts`).
* **Indexable Articles (`isIndexable: true`)**:
  * Minimum 250 characters and 40 words.
  * Meaningful, non-spam title (≥10 characters).
  * Valid movie entity association.
  * Low link density and absence of promotional/SEO spam strings.
  * Included in `/sitemap.xml` with standard `Article` schema and Google-indexable directives.
* **Low-Quality / Thin / Test Submissions (`isIndexable: false`)**:
  * Automatically marked with `<meta name="robots" content="noindex, nofollow" />`.
  * Explicitly excluded from `/sitemap.xml`.
  * Protects overall domain crawl equity, index health, and E-E-A-T score.
