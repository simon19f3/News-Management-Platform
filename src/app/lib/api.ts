import { Article } from "./types";
import { mockNews } from "./mock";

export type NewsApiResponse = {
  totalArticles: number;
  articles: Article[];
};

const API_KEY = 99b17bfa97fef57cb5083b449fbb01c2// Your GNews API Key
const BASE_URL = "https://gnews.io/api/v4";

function transformData(data: any, category: string): Article[] {
  if (!data?.articles || !Array.isArray(data.articles)) return [];

  return data.articles.map((a: any) => ({
    id: a.url,
    title: a.title,
    description: a.description || "No description available.",
    content: a.content || "",
    url: a.url,
    image: a.image || "https://placehold.co/600x400?text=News",
    publishedAt: a.publishedAt,
    lang: "en",
    category: category,
    source: {
      id: null,
      name: a.source?.name || "Unknown",
      url: a.source?.url || "#",
      country: "us"
    }
  }));
}

export async function fetchArticles(category: string = "general", page: number = 1): Promise<NewsApiResponse> {
  const url = new URL(`${BASE_URL}/top-headlines`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("category", category);
  url.searchParams.append("lang", "en");
  url.searchParams.append("max", "10");
  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    // 1. Handle API Quota Exceeded (403) -> Fallback to Mock
    if (res.status === 403) {
      console.warn(`API Quota Exceeded. Switching to Mock Data.`);
      const filtered = category === "general" 
        ? mockNews.articles 
        : mockNews.articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
      return { totalArticles: filtered.length, articles: filtered };
    }

    // 2. Handle other API errors
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    const data = await res.json();
    return {
      totalArticles: data.totalArticles || 0,
      articles: transformData(data, category),
    };

  } catch (error: any) {
    // 3. Handle Offline / Network Errors specially
    if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
      // We do NOT log this to console.error to avoid noise in the dev terminal
      throw new Error("No internet connection. Please check your network.");
    }

    console.error(`Fetch failed for category "${category}":`, error);
    throw new Error(error.message || "Failed to connect to news service.");
  }
}

export async function searchArticles(query: string, page: number = 1): Promise<NewsApiResponse> {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("q", query);
  url.searchParams.append("lang", "en");
  url.searchParams.append("max", "10");
  url.searchParams.append("sortby", "publishedAt");
  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (res.status === 403) {
      console.warn(`API Quota Exceeded. Switching to Mock Data.`);
      const filtered = mockNews.articles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
      );
      return { totalArticles: filtered.length, articles: filtered };
    }

    if (res.status === 400) {
      return { totalArticles: 0, articles: [] };
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    const data = await res.json();
    return {
      totalArticles: data.totalArticles || 0,
      articles: transformData(data, "search"),
    };

  } catch (error: any) {
    // Handle Offline / Network Errors specially
    if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
      throw new Error("No internet connection. Please check your network.");
    }

    console.error("Search Error:", error);
    throw new Error(error.message || "Unable to load search results.");
  }
}