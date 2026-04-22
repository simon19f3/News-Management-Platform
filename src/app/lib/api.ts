import { Article } from "./types";
import { mockNews } from "./mock";

/* ================================
   TYPES (NewsData.io Raw Response)
================================ */

type NewsDataArticle = {
  article_id: string;
  title: string;
  description: string | null;
  content: string | null;
  link: string;
  image_url: string | null;
  pubDate: string;
  language: string;
  category: string[];
  source_id: string | null;
  source_name: string;
  source_url?: string;
  country: string[];
};

type NewsDataResponse = {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
};

/* ================================
   NORMALIZED APP RESPONSE (IMPORTANT)
================================ */

export type NewsResponse = {
  totalArticles: number;
  articles: Article[];
};

/* ================================
   CONFIG
================================ */

const API_KEY = "pub_825bf55287fb41c5834ddae7c18df01a"; // move to env in production
const BASE_URL = "https://newsdata.io/api/1";

/* ================================
   MAPPER (Single Article)
================================ */

function mapNewsDataArticle(
  a: NewsDataArticle,
  fallbackCategory: string
): Article {
  return {
    id: a.article_id || a.link,
    title: a.title?.trim() || "Untitled",
    description: a.description?.trim() || "No description available.",
    content: a.content?.trim() || "",
    url: a.link,
    image: a.image_url || "https://placehold.co/600x400?text=News",
    publishedAt: a.pubDate,
    lang: a.language || "en",
    category: a.category?.[0] || fallbackCategory,
    source: {
      id: a.source_id || null,
      name: a.source_name || "Unknown Source",
      url: a.source_url || "#",
      country: a.country?.[0] || "",
    },
  };
}

/* ================================
   TRANSFORMER
================================ */

function transformData(
  data: NewsDataResponse,
  category: string
): Article[] {
  if (!data?.results || !Array.isArray(data.results)) return [];

  return data.results
    .filter((a: NewsDataArticle) => Boolean(a?.link))
    .map((a: NewsDataArticle) => mapNewsDataArticle(a, category));
}

/* ================================
   FETCH ARTICLES (Archive Endpoint)
================================ */

export async function fetchArticles(
  query: string = "example",
  page: number = 1
): Promise<NewsResponse> {
  const url = new URL(`${BASE_URL}/archive`);

  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("q", query);
  url.searchParams.append("language", "en");

  // dynamic date range (last 7 days)
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 7);

  url.searchParams.append("from_date", past.toISOString().split("T")[0]);
  url.searchParams.append("to_date", today.toISOString().split("T")[0]);

  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    /* ========= QUOTA HANDLING ========= */
    if (res.status === 429 || res.status === 403) {
      console.warn("API quota exceeded. Using mock data.");
      return {
        totalArticles: mockNews.articles.length,
        articles: mockNews.articles,
      };
    }

    /* ========= BAD REQUEST ========= */
    if (res.status === 400) {
      return { totalArticles: 0, articles: [] };
    }

    /* ========= OTHER ERRORS ========= */
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `API Error: ${res.status}`);
    }

    const data: NewsDataResponse = await res.json();

    return {
      totalArticles: data.totalResults || 0,
      articles: transformData(data, "general"),
    };

  } catch (error: unknown) {
    if (
      error instanceof TypeError ||
      (error as Error).message === "Failed to fetch"
    ) {
      throw new Error("No internet connection. Please check your network.");
    }

    console.error("Fetch Error:", error);
    throw new Error(
      (error as Error).message || "Failed to fetch news."
    );
  }
}

/* ================================
   SEARCH ARTICLES
================================ */

export async function searchArticles(
  query: string,
  page: number = 1
): Promise<NewsResponse> {
  const url = new URL(`${BASE_URL}/archive`);

  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("q", query);
  url.searchParams.append("language", "en");
  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (res.status === 429 || res.status === 403) {
      console.warn("Quota exceeded. Using mock search.");

      const filtered = mockNews.articles.filter((a: Article) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
      );

      return {
        totalArticles: filtered.length,
        articles: filtered,
      };
    }

    if (res.status === 400) {
      return { totalArticles: 0, articles: [] };
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `API Error: ${res.status}`);
    }

    const data: NewsDataResponse = await res.json();

    return {
      totalArticles: data.totalResults || 0,
      articles: transformData(data, "search"),
    };

  } catch (error: unknown) {
    if (
      error instanceof TypeError ||
      (error as Error).message === "Failed to fetch"
    ) {
      throw new Error("No internet connection. Please check your network.");
    }

    console.error("Search Error:", error);
    throw new Error(
      (error as Error).message || "Unable to load search results."
    );
  }
}
