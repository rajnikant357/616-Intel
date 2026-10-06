import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type AuthorEntry = CollectionEntry<'authors'>;

// --- ARTICLE HELPERS ---

export async function getAllArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles');
  return articles.sort((a, b) => {
    return new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime();
  });
}

export async function getArticleBySlug(slug: string): Promise<ArticleEntry | undefined> {
  const articles = await getAllArticles();
  return articles.find((article) => article.data.slug === slug || article.id === slug);
}

export async function getArticlesByCategory(category: string): Promise<ArticleEntry[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.data.category.toLowerCase() === category.toLowerCase());
}

export async function getArticlesByTag(tag: string): Promise<ArticleEntry[]> {
  const articles = await getAllArticles();
  const searchTag = tag.toLowerCase();
  return articles.filter((a) => a.data.tags.some((t) => t.toLowerCase() === searchTag));
}

export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const categories = new Set<string>();
  articles.forEach((a) => {
    if (a.data.category) categories.add(a.data.category);
  });
  return Array.from(categories).sort();
}

export async function getRelatedArticles(article: ArticleEntry, limit = 5): Promise<ArticleEntry[]> {
  const allArticles = await getAllArticles();
  const otherArticles = allArticles.filter((a) => a.data.slug !== article.data.slug);

  // 1. Explicit relationships
  if (article.data.relatedArticles && article.data.relatedArticles.length > 0) {
    const explicit = otherArticles.filter((a) =>
      article.data.relatedArticles.includes(a.data.slug) || article.data.relatedArticles.includes(a.id)
    );
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  // 2. Score based on category and shared tags
  const scored = otherArticles.map((other) => {
    let score = 0;
    if (article.data.category === other.data.category) {
      score += 3;
    }
    if (article.data.tags && other.data.tags) {
      const sharedTags = article.data.tags.filter((t) => other.data.tags.includes(t));
      score += sharedTags.length * 2;
    }
    return { article: other, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

// --- AUTHOR HELPERS ---

export async function getAllAuthors(): Promise<AuthorEntry[]> {
  return await getCollection('authors');
}

export async function getAuthorBySlug(slug: string): Promise<AuthorEntry | undefined> {
  const authors = await getAllAuthors();
  return authors.find((a) => a.data.slug === slug || a.id === slug);
}

// --- STATIC SEARCH INDEX REGISTRY ---

export interface SearchIndexEntry {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
}

export async function getStaticSearchIndex(): Promise<SearchIndexEntry[]> {
  const articles = await getAllArticles();
  return articles.map((a) => ({
    title: a.data.title,
    slug: `/articles/${a.data.slug}`,
    description: a.data.description,
    category: a.data.category,
    tags: a.data.tags || [],
  }));
}
