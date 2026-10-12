import type { APIRoute } from 'astro';
import { getAllArticles, getAllCategories } from '../utils/content';

export const prerender = true;

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
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

  // 1. Core Hub & Intel Wire Index Routes
  addEntry({ url: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: 1.0 });
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

  // 2. Curated & Dynamic Category Archives (matching src/pages/categories/[slug].astro)
  const categoryMetadata: Record<string, string> = {
    'Superhero Action & Concepts': 'superhero-action-concepts',
    'Marvel Characters & Teams': 'marvel-characters-teams',
    'Avengers & Cinematic Universe': 'avengers-cinematic-universe',
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

  // Render XML
  const entries = Array.from(entryMap.values());
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.url)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ''}
  </url>`
  )
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
