import type { APIRoute } from 'astro';
import { getAllArticles } from '../utils/content';

export const prerender = true;

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

export const GET: APIRoute = async () => {
  const baseUrl = 'https://616intel.com';
  const entries: SitemapEntry[] = [];
  const today = new Date().toISOString().split('T')[0];

  // 1. Primary Navigation Pages (Header & Mobile Nav Buttons)
  entries.push({ url: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: 1.0 });
  entries.push({ url: `${baseUrl}/latest`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  entries.push({ url: `${baseUrl}/categories`, lastmod: today, changefreq: 'daily', priority: 0.9 });
  entries.push({ url: `${baseUrl}/search`, lastmod: today, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/write`, lastmod: today, changefreq: 'weekly', priority: 0.8 });

  // 2. Curated Editorial & Featured Pillar Topics (Nav Buttons & Footer Links)
  const curatedArticleSlugs = [
    'superhero-action',
    'doctor-doom-character',
    'avengers-doomsday',
    'marvel-rivals',
    'fantastic-four',
    'spider-man-brand-new-day',
  ];

  try {
    const allArticles = await getAllArticles();
    const articleMap = new Map(allArticles.map((a) => [a.data.slug, a]));

    for (const slug of curatedArticleSlugs) {
      const article = articleMap.get(slug);
      let lastmod = today;
      if (article?.data?.updatedAt || article?.data?.publishedAt) {
        const rawDate = article.data.updatedAt || article.data.publishedAt;
        try {
          lastmod = new Date(rawDate).toISOString().split('T')[0];
        } catch {
          lastmod = today;
        }
      }

      entries.push({
        url: `${baseUrl}/articles/${slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.9,
      });
    }
  } catch (e) {
    console.error('Error adding curated articles to sitemap', e);
    for (const slug of curatedArticleSlugs) {
      entries.push({
        url: `${baseUrl}/articles/${slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9,
      });
    }
  }

  // 3. Curated Category Archives (Footer Category Links)
  const categoryPaths = [
    'superhero-action-concepts',
    'marvel-characters-teams',
    'avengers-cinematic-universe',
    'gaming-digital-web-media',
    'collectibles-merchandising-industry',
  ];

  for (const catSlug of categoryPaths) {
    entries.push({
      url: `${baseUrl}/categories/${catSlug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 4. Directory, Information & Legal Compliance Pages (MobileNav & Footer Links)
  entries.push({ url: `${baseUrl}/about`, lastmod: today, changefreq: 'monthly', priority: 0.6 });
  entries.push({ url: `${baseUrl}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.6 });
  entries.push({ url: `${baseUrl}/disclaimer`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/privacy`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/terms`, lastmod: today, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/copyright`, lastmod: today, changefreq: 'monthly', priority: 0.5 });

  // Render XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
