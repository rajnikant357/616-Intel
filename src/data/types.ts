export type ArticleStatus = 'confirmed' | 'reported' | 'rumored' | 'rumor' | 'unverified' | 'debunked' | 'leak' | 'breaking' | 'community';

export type CardVariant = 'featured' | 'standard' | 'compact' | 'horizontal';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: ArticleStatus;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  breaking?: boolean;
  spoilerWarning?: boolean;
  sources?: SourceItem[];
}

export interface SourceItem {
  id: string;
  title: string;
  outlet: string;
  type: 'Original Report' | 'Video Source' | 'Additional Report' | 'Official Statement' | 'Production Leak';
  url: string;
  date?: string;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  duration: string;
  thumbnail: string;
  thumbnailAlt: string;
  category: string;
  publishedAt: string;
  status: ArticleStatus;
  url: string;
  videoUrl?: string;
}

export interface PhotoItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  photoCount: number;
  source: string;
  category: string;
  publishedAt: string;
}

export interface TrendingItem {
  rank: string;
  title: string;
  slug: string;
  category: string;
  status: ArticleStatus;
  readingTime: string;
}

export interface BreakingTickerItem {
  id: string;
  label: string;
  headline: string;
  slug: string;
  status: ArticleStatus;
}
