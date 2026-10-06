# 616 INTEL — Editorial Content & Publishing Architecture Guide

> **"Rumors. Reports. Receipts."**  
> Complete editorial manual for publishing static news, leaks, rumors, dossiers, and media hubs without a CMS or database.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Publishing Workflows](#3-publishing-workflows)
   - [Publishing an Article (MDX)](#publishing-an-article-mdx)
   - [Creating a Movie Hub](#creating-a-movie-hub)
   - [Creating a Character Dossier](#creating-a-character-dossier)
   - [Publishing a Video Dossier](#publishing-a-video-dossier)
   - [Publishing a Photo Gallery](#publishing-a-photo-gallery)
4. [Frontmatter & Schema Specifications](#4-frontmatter--schema-specifications)
   - [Article Frontmatter Reference](#article-frontmatter-reference)
   - [Allowed Enums & Taxonomies](#allowed-enums--taxonomies)
5. [Connecting Static Relationships](#5-connecting-static-relationships)
   - [Article ↔ Movie](#article--movie)
   - [Article ↔ Character](#article--character)
   - [Article ↔ Sources ("Receipts")](#article--sources-receipts)
   - [Article ↔ Related Content](#article--related-content)
6. [Editorial MDX Components](#6-editorial-mdx-components)
   - [Callout Component](#callout-component)
   - [Quote Component](#quote-component)
   - [ArticleImage Component](#articleimage-component)
   - [VideoEmbed Component](#videoembed-component)
   - [SourceBlock Component](#sourceblock-component)
   - [RelatedStories Component](#relatedstories-component)
   - [RelatedMovie Component](#relatedmovie-component)
7. [Publishing Templates](#7-publishing-templates)
8. [Pre-Flight Quality Checklist](#8-pre-flight-quality-checklist)

---

## 1. Architecture Overview

616 Intel operates on a **zero-database, zero-CMS, 100% static publishing pipeline** powered by **Astro 5 Content Collections**.

```text
Markdown / MDX / JSON Content Files
        ↓ (Static Type Validation via Zod)
Content Collections API (`src/content.config.ts`)
        ↓ (Static Relationship Resolution Engine)
Static Route Generator (`getStaticPaths`)
        ↓ (Astro Build Engine)
Production Static HTML / CSS / Client JS Assets
```

Every article, movie, character profile, video, and gallery is committed as a structured file in git. When the site builds:
- Relationships are indexed bidirectionally across slugs.
- Dynamic routes (`/articles/[slug]`, `/movies/[slug]`, `/characters/[slug]`, `/videos/[slug]`, `/photos/[slug]`) are pre-rendered.
- Archive indices (`/latest/`, `/rumors/`, `/breaking/`, `/confirmed/`, `/debunked/`) automatically aggregate matching records.

---

## 2. Folder Structure

All publication content lives inside `src/content/`:

```text
src/
├── content/
│   ├── articles/      # All editorial articles (.mdx or .md)
│   ├── movies/        # Movie intelligence hubs (.json)
│   ├── characters/    # Character dossiers (.json)
│   ├── videos/        # Video breakdowns & analysis (.json)
│   ├── galleries/     # Set photo & leak galleries (.json)
│   └── authors/       # Editorial masthead profiles (.json)
├── templates/         # Starter templates for new content
│   ├── news.mdx
│   ├── rumor.mdx
│   ├── breaking.mdx
│   ├── analysis.mdx
│   ├── movie.json
│   ├── character.json
│   ├── video.json
│   └── gallery.json
└── content.config.ts  # Central Zod schema definitions
```

---

## 3. Publishing Workflows

### Publishing an Article (MDX)

1. **Pick or copy a template** from `src/templates/`:
   - `news.mdx`: For verified studio announcements and trade reports.
   - `rumor.mdx`: For unverified scoops, whispers, and insider leaks.
   - `breaking.mdx`: For urgent live-dispatch stories.
   - `analysis.mdx`: For deep-dive lore and narrative breakdowns.
2. **Save the file** in `src/content/articles/` with a slugified kebab-case name:
   `src/content/articles/my-article-slug.mdx`
3. **Populate required frontmatter** (see schema below).
4. **Write the article body** using standard Markdown and editorial components.
5. **Run validation**:
   ```powershell
   npx astro check
   npm run build
   ```
6. The article is instantly live at `/articles/my-article-slug/` and linked across associated movie hubs, character profiles, and category feeds.

---

### Creating a Movie Hub

1. Copy `src/templates/movie.json`.
2. Save to `src/content/movies/<movie-slug>.json` (e.g., `avengers-secret-wars.json`).
3. Set `slug: "avengers-secret-wars"`.
4. Add relevant characters, release dates, and production status.
5. All articles with `movie: ["avengers-secret-wars"]` in their frontmatter will automatically appear in this movie's intelligence hub at `/movies/avengers-secret-wars/`.

---

### Creating a Character Dossier

1. Copy `src/templates/character.json`.
2. Save to `src/content/characters/<character-slug>.json` (e.g., `doctor-doom.json`).
3. Set `slug: "doctor-doom"`.
4. List associated movie slugs in the `movies` array.
5. Articles tagging `characters: ["doctor-doom"]` will automatically populate the character's live intel feed at `/characters/doctor-doom/`.

---

### Publishing a Video Dossier

1. Copy `src/templates/video.json`.
2. Save to `src/content/videos/<video-slug>.json`.
3. Provide an embeddable YouTube/Vimeo URL and high-res thumbnail.
4. Link `relatedArticles` and `relatedMovies` by slug.
5. Automatically published to `/videos/` and `/videos/<video-slug>/`.

---

### Publishing a Photo Gallery

1. Copy `src/templates/gallery.json`.
2. Save to `src/content/galleries/<gallery-slug>.json`.
3. Fill the `photos` array with image URLs, captions, credits, and verification sources.
4. Automatically published to `/photos/` and `/photos/<gallery-slug>/`.

---

## 4. Frontmatter & Schema Specifications

### Article Frontmatter Reference

```yaml
---
# REQUIRED FIELDS
title: "Studio Confirms Latveria Production Scouts for Avengers: Doomsday"
slug: "avengers-doomsday-latveria-scouts"
description: "Location scouts have deployed to Central Europe to establish the practical visual aesthetic for Doom's sovereign fortress."
category: "Production"
type: "PRODUCTION"          # See Allowed Types
status: "CONFIRMED"          # See Allowed Statuses
publishedAt: "2026-09-29"   # ISO date format: YYYY-MM-DD
author: "616 Intel Editorial"
heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600"
heroImageAlt: "Scenic mountainous European fortress terrain"
excerpt: "Location scouting teams have arrived in Central Europe to establish practical filming sites for Doom's sovereign fortress."

# OPTIONAL / CONDITIONAL FIELDS
updatedAt: "2026-09-29"
spoilerLevel: "MILD"         # NONE | MILD | MAJOR | FULL (default: NONE)
featured: true               # true | false (default: false)
breaking: false              # true | false (default: false)

tags:
  - Avengers
  - Production
  - Doctor Doom

# RELATIONSHIPS (All by slug)
movie:
  - "avengers-doomsday"
  - "avengers-secret-wars"

characters:
  - "doctor-doom"

actors:
  - "Robert Downey Jr."

sources:
  - label: "Production Weekly Notice"
    name: "Production Weekly UK"
    url: "https://productionweekly.com"
    type: "REPORT"           # OFFICIAL | REPORT | INTERVIEW | SOCIAL | PHOTO | VIDEO
    publishedAt: "Sep 28, 2026"
    description: "Location unit listing 408-A."

relatedArticles:
  - "demo-secret-wars-report"
---
```

---

### Allowed Enums & Taxonomies

#### Article `type`
- `NEWS`: Official announcements, casting news, studio press releases.
- `RUMOR`: Unverified insider reports, leaks, whispers.
- `LEAK`: Set footage, script leaks, costume leaks, internal assets.
- `REPORT`: Investigative journalism, trade dispatches.
- `BREAKING`: Urgent live developments.
- `ANALYSIS`: Deep dives, narrative dissection, comic history.
- `THEORY`: Forward-looking narrative theories and breakdowns.
- `EXPLAINER`: Background context, timeline recaps, character primers.
- `CASTING`: Auditions, talent negotiations, signed contracts.
- `PRODUCTION`: Filming schedules, soundstage bookings, crew hires.
- `SET PHOTO`: Practical photography leaks from sets.
- `VIDEO`: Video essays, breakdowns, footage analysis.

#### Article `status`
- `CONFIRMED`: Verified by Marvel Studios, primary talent, or major trade outlets (Variety, Deadline, THR).
- `REPORTED`: Sourced from credible journalists, but without formal studio acknowledgement.
- `RUMORED`: Sourced from scooper communities, Reddit, Discord, or production whispers.
- `UNVERIFIED`: Single-source tip or newly emergent claim undergoing evaluation.
- `DEBUNKED`: Refuted by direct evidence, official denial, or contradictory footage.

#### Article `spoilerLevel`
- `NONE`: No plot points or story surprises revealed.
- `MILD`: Minor setup, background cameos, or costume appearances.
- `MAJOR`: Major plot twists, character deaths, third-act reveals.
- `FULL`: Complete ending or climax details disclosed.

#### Movie `status`
- `ANNOUNCED`: Officially confirmed on the release slate.
- `PRE_PRODUCTION`: Scripting, concept art, casting underway.
- `IN_PRODUCTION`: Principal photography actively rolling.
- `POST_PRODUCTION`: Editing, visual effects, reshoots.
- `RELEASED`: Available in theatres or streaming.

---

## 5. Connecting Static Relationships

616 Intel builds a relationship graph at build-time using **slug references**. No foreign keys or database join tables are used.

### Article ↔ Movie
In your article frontmatter:
```yaml
movie:
  - "avengers-secret-wars"
```
The article will:
1. Render a **Movie Intelligence Card** in its sidebar via `<RelatedMovie />`.
2. Automatically appear on `/movies/avengers-secret-wars/` in the "Associated Intel & Reports" section.

### Article ↔ Character
In your article frontmatter:
```yaml
characters:
  - "doctor-doom"
  - "mr-fantastic"
```
The article will automatically appear on `/characters/doctor-doom/` and `/characters/mr-fantastic/`.

### Article ↔ Sources ("Receipts")
In your article frontmatter:
```yaml
sources:
  - label: "Primary Industry Report"
    name: "Deadline Hollywood"
    url: "https://deadline.com"
    type: "REPORT"
    publishedAt: "Sep 28, 2026"
    description: "Exclusive report citing multiple agency reps."
```
The article will render an interactive **"Editorial Receipts & Sources"** block at the end of the text.

---

## 6. Editorial MDX Components

All MDX articles can import and utilize our bespoke editorial component suite:

### Callout Component
Used to highlight key findings, verified records, or confidence warnings.

```mdx
import Callout from '../../components/editorial/Callout.astro';

<Callout variant="confirmed" title="CONFIRMED RECORD">
  Marvel Studios has officially registered copyright paperwork for this title.
</Callout>

<Callout variant="unverified" title="UNVERIFIED WHISPERS">
  This detail stems from an anonymous soundstage contractor and lacks secondary corroboration.
</Callout>

<Callout variant="debunked" title="DEBUNKED CLAIM">
  The reported director has explicitly denied involvement during an interview with Empire.
</Callout>

<Callout variant="warning" title="MAJOR SPOILER WARNING">
  The following section contains full climax story details from test screenings.
</Callout>

<Callout variant="info" title="LORE DOSSIER">
  Background context from the 1984 Secret Wars comic run.
</Callout>
```

---

### Quote Component
Formats insider statements and trade excerpts with editorial attribution.

```mdx
import Quote from '../../components/editorial/Quote.astro';

<Quote
  quote="We are approaching this production with a commitment to practical sets and miniature effects unseen in the franchise since Phase 1."
  author="Production Insider"
  source="Pinewood Studios Briefing"
/>
```

---

### ArticleImage Component
High-res image with editorial framing, caption, and credit line.

```mdx
import ArticleImage from '../../components/editorial/ArticleImage.astro';

<ArticleImage
  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600"
  alt="Soundstage construction"
  caption="Sub-level soundstage rig prepared for zero-gravity wirework."
  credit="616 Intel Unit Scout"
/>
```

---

### VideoEmbed Component
Responsive, privacy-friendly iframe for video dossiers.

```mdx
import VideoEmbed from '../../components/editorial/VideoEmbed.astro';

<VideoEmbed
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
  title="Secret Wars Dossier Breakdown"
  caption="Full 12-minute breakdown of set photos and comic parallels."
/>
```

---

### SourceBlock Component
Dedicated inline source receipt block.

```mdx
import SourceBlock from '../../components/editorial/SourceBlock.astro';

<SourceBlock
  sources={[
    {
      label: "Call Sheet #42",
      name: "Atlanta Pinewood Productions",
      url: "https://example.com/sheet",
      type: "REPORT",
      publishedAt: "Sep 2026"
    }
  ]}
/>
```

---

## 7. Publishing Templates

Pre-configured boilerplate files ready to copy and paste:

| Template | File Location | Intended Use |
| :--- | :--- | :--- |
| **News** | `src/templates/news.mdx` | Studio confirmed news, release dates, trades confirmation |
| **Rumor** | `src/templates/rumor.mdx` | Unconfirmed scoops, whispers, set leaks |
| **Breaking** | `src/templates/breaking.mdx` | Live breaking news dispatches |
| **Analysis** | `src/templates/analysis.mdx` | Long-read lore and industry deep dives |
| **Movie Hub** | `src/templates/movie.json` | New film or series intelligence hub |
| **Character** | `src/templates/character.json` | New MCU character profile |
| **Video** | `src/templates/video.json` | Video essay or footage breakdown entry |
| **Gallery** | `src/templates/gallery.json` | Set photo or leak image gallery |

---

## 8. Pre-Flight Quality Checklist

Before committing or pushing any new editorial content, verify each step:

- [ ] **Slug uniqueness**: The `slug` field matches the filename (excluding extension) and is unique across its collection.
- [ ] **Valid enum values**: `type`, `status`, and `spoilerLevel` match allowed values in `src/content.config.ts`.
- [ ] **Valid ISO date**: `publishedAt` follows `YYYY-MM-DD` formatting.
- [ ] **Descriptive alt text**: `heroImageAlt` provides descriptive visual context for screen readers.
- [ ] **Cross-reference slugs exist**: Every slug listed in `movie`, `characters`, `relatedArticles`, or `sources` corresponds to a valid existing entry.
- [ ] **Static type check passes**:
  ```powershell
  npx astro check
  ```
- [ ] **Static build succeeds**:
  ```powershell
  npm run build
  ```
  Ensure all routes generate with `0 errors` and `0 broken links`.
