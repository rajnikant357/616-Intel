import type { APIRoute } from 'astro';
import { getAllArticles, getAllCategories } from '../utils/content';
import { DOOMSDAY_VIDEOS } from '../data/doomsdayVideos';

export const prerender = true;

interface VideoMetadata {
  thumbnailLoc: string;
  title: string;
  description: string;
  contentLoc: string;
  playerLoc: string;
  duration: number; // in seconds
  publicationDate: string;
  familyFriendly?: 'yes' | 'no';
  tags?: string[];
  category?: string;
  uploader?: {
    name: string;
    info?: string;
  };
}

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
  video?: VideoMetadata;
  videos?: VideoMetadata[];
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString().replace(/\/+$/, '') : undefined)
    || import.meta.env.SITE?.replace(/\/+$/, '')
    || process.env.PUBLIC_SITE_URL?.replace(/\/+$/, '')
    || 'https://616intel.prometrion.com';

  const entryMap = new Map<string, SitemapEntry>();
  const today = new Date().toISOString().split('T')[0];

  const addEntry = (entry: SitemapEntry) => {
    if (!entryMap.has(entry.url)) {
      entryMap.set(entry.url, entry);
    }
  };

  // 1. Core Hub & Intel Wire Index Routes (with Google Video Sitemap Schema for Homepage Trailer)
  addEntry({ 
    url: `${baseUrl}/`, 
    lastmod: today, 
    changefreq: 'daily', 
    priority: 1.0,
    video: {
      thumbnailLoc: `${baseUrl}/Final%20trailer.png`,
      title: 'Avengers Doomsday Final Trailer Out? New Trailer of Avengers Doomsday | Final Hindi Trailer',
      description: 'Stream the official final trailer for Marvel Studios\' Avengers: Doomsday featuring Robert Downey Jr. as Victor von Doom, Pedro Pascal, Tom Holland, and the Multiverse Avengers in the Russo Brothers\' Phase 6 epic with complete audio.',
      contentLoc: 'https://www.youtube.com/watch?v=Wb8Tq_HD4E8',
      playerLoc: 'https://www.youtube-nocookie.com/embed/Wb8Tq_HD4E8',
      duration: 198,
      publicationDate: '2026-10-15T09:00:00+00:00',
      familyFriendly: 'yes',
      tags: [
        'doomsday final trailer out',
        'final trailer out?',
        'avengers doomsday final trailer out?',
        'New trailer of avengers doomsday',
        'final Hindi trailer of doomsday',
        'Doomsday final trailer hindi',
        'Avengers Doomsday',
        'Avengers Doomsday Final Trailer',
        'Doctor Doom',
        'Robert Downey Jr',
        'Marvel Studios',
        'Multiverse Incursion',
        'Secret Wars',
        'MCU Phase 6',
        'The Russo Brothers'
      ],
      category: 'Entertainment',
      uploader: {
        name: '616 Intel',
        info: baseUrl,
      },
    }
  });
  // Dedicated Avengers: Doomsday Video Intelligence Hub (with all 14 official playlist videos)
  addEntry({
    url: `${baseUrl}/avengers-doomsday`,
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0,
    videos: DOOMSDAY_VIDEOS.map((v) => ({
      thumbnailLoc: v.thumbnail,
      title: v.title,
      description: v.articleSummary,
      contentLoc: `https://www.youtube.com/watch?v=${v.videoId}`,
      playerLoc: `https://www.youtube-nocookie.com/embed/${v.videoId}`,
      duration: v.durationSeconds,
      publicationDate: `${v.releaseDate}T09:00:00+00:00`,
      familyFriendly: 'yes',
      tags: v.seoKeywords,
      category: v.category,
      uploader: {
        name: 'Marvel Studios / 616 Intel',
        info: baseUrl,
      },
    })),
  });
  addEntry({ url: `${baseUrl}/latest`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/news`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/rumors`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/leaks`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/breaking`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/confirmed`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/debunked`, lastmod: today, changefreq: 'daily', priority: 0.8 });
  addEntry({ url: `${baseUrl}/movies`, lastmod: today, changefreq: 'daily', priority: 0.8 });
  addEntry({ url: `${baseUrl}/characters`, lastmod: today, changefreq: 'daily', priority: 0.8 });
  addEntry({ url: `${baseUrl}/categories`, lastmod: today, changefreq: 'daily', priority: 0.8 });
  addEntry({ url: `${baseUrl}/search`, lastmod: today, changefreq: 'daily', priority: 0.7 });
  addEntry({ url: `${baseUrl}/write`, lastmod: today, changefreq: 'weekly', priority: 0.7 });
  addEntry({ url: `${baseUrl}/booking`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  addEntry({ url: `${baseUrl}/booking/doomsday-18-dec`, lastmod: today, changefreq: 'daily', priority: 0.8 });

  // 2. Curated & Dynamic Category Archives (matching src/pages/categories/[slug].astro)
  const categoryMetadata: Record<string, string> = {
    'Superhero Action & Concepts': 'superhero-action-concepts',
    'Marvel Characters & Teams': 'marvel-characters-teams',
    'Avengers & Cinematic Universe': 'avengers-cinematic-universe',
    'Avengers: Doomsday (2026)': 'avengers-doomsday-2026',
    'Gaming, Digital & Web Media': 'gaming-digital-web-media',
    'Collectibles, Merchandising & Industry': 'collectibles-merchandising-industry',
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  try {
    const categories = await getAllCategories();
    for (const catName of categories) {
      const slug = categoryMetadata[catName] || slugify(catName);
      addEntry({
        url: `${baseUrl}/categories/${slug}`,
        lastmod: today,
        changefreq: 'daily',
        priority: 0.8,
      });
    }
  } catch (e) {
    console.error('Error adding dynamic categories to sitemap', e);
    // Fallback standard categories
    const fallbackCategories = [
      'superhero-action-concepts',
      'marvel-characters-teams',
      'avengers-cinematic-universe',
      'avengers-doomsday-2026',
      'gaming-digital-web-media',
      'collectibles-merchandising-industry',
    ];
    for (const slug of fallbackCategories) {
      addEntry({
        url: `${baseUrl}/categories/${slug}`,
        lastmod: today,
        changefreq: 'daily',
        priority: 0.8,
      });
    }
  }

  // 3. Featured Pillar Topics & All Editorial Articles
  const curatedArticleSlugs = new Set([
    'superhero-action',
    'doctor-doom-character',
    'avengers-doomsday',
    'marvel-rivals',
    'fantastic-four',
    'spider-man-brand-new-day',
    'who-is-the-strongest-villain-in-marvel',
    'who-is-the-strongest-person-in-avengers-doomsday',
    'star-cast-of-avengers-doomsday',
    'is-avengers-doomsday-bigger-than-endgame',
    'who-is-smarter-than-dr-doom',
    'who-can-defeat-dr-doom-easily',
    'can-doomsday-beat-the-avengers',
    'can-tony-stark-defeat-dr-doom',
    'has-thor-ever-beaten-dr-doom',
    'can-odin-defeat-dr-doom',
    'who-wins-knull-or-doomsday',
    'who-can-defeat-doomsday-easily',
    'is-dr-doom-smarter-than-batman',
  ]);

  try {
    const allArticles = await getAllArticles();
    for (const article of allArticles) {
      const slug = article.data?.slug || article.id;
      if (!slug) continue;

      let lastmod = today;
      const rawDate = article.data?.updatedAt || article.data?.publishedAt;
      if (rawDate) {
        try {
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            lastmod = d.toISOString().split('T')[0];
          }
        } catch {
          lastmod = today;
        }
      }

      const isPillar = curatedArticleSlugs.has(slug);
      addEntry({
        url: `${baseUrl}/articles/${slug}`,
        lastmod,
        changefreq: isPillar ? 'daily' : 'weekly',
        priority: isPillar ? 0.9 : 0.7,
      });
    }
  } catch (e) {
    console.error('Error adding articles to sitemap', e);
  }

  // 4. Directory, Information & Legal Compliance Pages
  addEntry({ url: `${baseUrl}/about`, lastmod: today, changefreq: 'monthly', priority: 0.6 });
  addEntry({ url: `${baseUrl}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.6 });
  addEntry({ url: `${baseUrl}/disclaimer`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  addEntry({ url: `${baseUrl}/privacy`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  addEntry({ url: `${baseUrl}/terms`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  addEntry({ url: `${baseUrl}/copyright`, lastmod: today, changefreq: 'monthly', priority: 0.5 });

  // Render XML with official Google Video Sitemap extension schema
  const entries = Array.from(entryMap.values());
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries
  .map((e) => {
    let videoXml = '';
    const videoList = e.videos || (e.video ? [e.video] : []);
    for (const v of videoList) {
      videoXml += `
    <video:video>
      <video:thumbnail_loc>${escapeXml(v.thumbnailLoc)}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${escapeXml(v.contentLoc)}</video:content_loc>
      <video:player_loc allow_embed="yes" autoplay="ap=1">${escapeXml(v.playerLoc)}</video:player_loc>
      <video:duration>${v.duration}</video:duration>
      <video:publication_date>${escapeXml(v.publicationDate)}</video:publication_date>
      <video:family_friendly>${v.familyFriendly || 'yes'}</video:family_friendly>
      <video:live>no</video:live>${v.category ? `\n      <video:category>${escapeXml(v.category)}</video:category>` : ''}${v.uploader ? `\n      <video:uploader${v.uploader.info ? ` info="${escapeXml(v.uploader.info)}"` : ''}>${escapeXml(v.uploader.name)}</video:uploader>` : ''}${v.tags && v.tags.length > 0 ? '\n' + v.tags.map((t) => `      <video:tag>${escapeXml(t)}</video:tag>`).join('\n') : ''}
    </video:video>`;
    }

    return `  <url>
    <loc>${escapeXml(e.url)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ''}${videoXml}
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
