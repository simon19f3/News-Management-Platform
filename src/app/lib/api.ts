import { Article } from "./types";

export type NewsApiResponse = {
  totalArticles: number;
  articles: Article[];
};

// ✔ Load API key from env
const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "";
const BASE_URL = "https://gnews.io/api/v4";

function transformData(data: any, category: string): Article[] {
  if (!data?.articles || !Array.isArray(data.articles)) {
    return [];
  }

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
      name: a.source?.name || "Unknown Source",
      url: a.source?.url || "#",
      country: "us"
    }
  }));
}

export async function fetchArticles(category: string = "general", page: number = 1): Promise<NewsApiResponse> {
  if (!API_KEY) throw new Error("Missing GNews API key");

  const url = new URL(`${BASE_URL}/top-headlines`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("category", category);
  url.searchParams.append("lang", "en");
  url.searchParams.append("max", "10");
  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    const data = await res.json();
    return {
      totalArticles: data.totalArticles || 0,
      articles: transformData(data, category),
    };
  } catch (error) {
    console.error(`Fetch failed for category "${category}":`, error);
    return { totalArticles: 0, articles: [] };
  }
}

export async function searchArticles(query: string, page: number = 1): Promise<NewsApiResponse> {
  if (!API_KEY) throw new Error("Missing GNews API key");

  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("q", query);
  url.searchParams.append("lang", "en");
  url.searchParams.append("max", "10");
  url.searchParams.append("sortby", "publishedAt");
  url.searchParams.append("page", page.toString());

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      if (res.status === 400) {
        console.warn(`GNews API returned 400 for query "${query}". Treating as 0 results.`);
        return { totalArticles: 0, articles: [] };
      }

      const errorData = await res.json().catch(() => ({}));
      const msg = errorData.message || 
                  (errorData.errors ? JSON.stringify(errorData.errors) : `API Error: ${res.status}`);
      throw new Error(msg);
    }

    const data = await res.json();
    return {
      totalArticles: data.totalArticles || 0,
      articles: transformData(data, "search"),
    };

  } catch (error: any) {
    console.error("Network or API Error in searchArticles:", error.message);
    throw new Error(error.message || "Unable to load search results.");
  }
}
