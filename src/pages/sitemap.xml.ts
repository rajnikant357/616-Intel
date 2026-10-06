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

  // 1. Core Hub & Intel Wire Index Routes
  entries.push({ url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 });
  entries.push({ url: `${baseUrl}/latest`, changefreq: 'daily', priority: 0.9 });
  entries.push({ url: `${baseUrl}/categories`, changefreq: 'daily', priority: 0.9 });
  entries.push({ url: `${baseUrl}/categories/superhero-action-concepts`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/categories/marvel-characters-teams`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/categories/avengers-cinematic-universe`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/categories/gaming-digital-web-media`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/categories/collectibles-merchandising-industry`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/write`, changefreq: 'weekly', priority: 0.9 });
  entries.push({ url: `${baseUrl}/search`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/news`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/rumors`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/leaks`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/breaking`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/confirmed`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/debunked`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/movies`, changefreq: 'daily', priority: 0.8 });
  entries.push({ url: `${baseUrl}/characters`, changefreq: 'daily', priority: 0.8 });

  // 2. Informational & Legal Compliance Pages
  entries.push({ url: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/disclaimer`, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/terms`, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/privacy`, changefreq: 'monthly', priority: 0.5 });
  entries.push({ url: `${baseUrl}/copyright`, changefreq: 'monthly', priority: 0.5 });

  // 3. All Canonical Marvel Leaks & Reports
  try {
    const articles = await getAllArticles();
    for (const a of articles) {
      const lastmod = a.data.updatedAt || a.data.publishedAt;
      entries.push({
        url: `${baseUrl}/articles/${a.data.slug}`,
        lastmod: lastmod ? new Date(lastmod).toISOString() : undefined,
        changefreq: 'weekly',
        priority: 0.9,
      });
    }
  } catch (e) {
    console.error('Error adding articles to sitemap', e);
  }

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
