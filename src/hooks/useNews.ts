import { useQuery } from "@tanstack/react-query";
import { fetchArticles, searchArticles, NewsApiResponse } from "../app/lib/api";

// Interface to handle multiple optional parameters
interface UseNewsParams {
  category?: string;
  query?: string;
  page?: number;
}

// Configuration constants
const STALE_TIME = 5 * 60 * 1000; // 5 minutes (Data is considered "fresh")
const GC_TIME = 15 * 60 * 1000;   // 15 minutes (Data stays in memory/cache)

export function useNews({ category = "general", query = "", page = 1 }: UseNewsParams) {
  return useQuery<NewsApiResponse, Error>({
    // --- Meaningful Query Keys ---
    // We include 'category', 'query', and 'page' in the key.
    // 1. If 'query' changes (user searches), React Query treats it as a NEW request.
    // 2. If 'page' changes (pagination), it caches Page 1 separate from Page 2.
    // 3. If 'category' changes, it caches "sports" separate from "tech".
    queryKey: ["news", category, query, page],
    
    // --- Dynamic Query Function ---
    // Logic to switch between API functions based on inputs
    queryFn: () => {
      // If a search query exists, use the Search API
    if (query.trim()) {
        return searchArticles(query, page);
      }
      return fetchArticles(category, page);
    },

    // --- State Management Configuration ---
    
    // 1. Data remains "fresh" for 5 minutes. 
    // If you switch tabs or components within 5 mins, it won't re-fetch.
    staleTime: STALE_TIME,

    // 2. Garbage Collection time. 
    // If a specific query (e.g., search for "Bitcoin") is unused for 15 mins, 
    // it is cleared from memory to save resources.
    gcTime: GC_TIME,

    // 3. Retry logic: Retry failed requests twice before throwing error
    retry: 2,

    // 4. Disable refetching on window focus to avoid unnecessary network calls
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
}