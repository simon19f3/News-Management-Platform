export type ArticleSource = {
  id: string | null;
  name: string;
  url: string;
  country: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  lang: string;
  category: string;
  source: ArticleSource;
};