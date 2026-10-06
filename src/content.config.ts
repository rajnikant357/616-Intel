import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 1. Articles Collection (Pure text-first Marvel leaks and rumor articles)
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    type: z.string().default('INTEL_DISPATCH'),
    status: z.string().default('CONFIRMED'),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    author: z.string().default('616 Intel Editorial'),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    relatedArticles: z.array(z.string()).default([]),
    readingTime: z.string().optional(),
    sources: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
          type: z.string().optional(),
          publishedAt: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .default([]),
  }),
});

// 2. Authors Collection
const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx,json}' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string(),
    bio: z.string(),
    social: z
      .object({
        x: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  articles,
  authors,
};
