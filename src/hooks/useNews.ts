import { useQuery } from "@tanstack/react-query";
import { fetchArticles, searchArticles, NewsApiResponse } from "../app/lib/api";

interface UseNewsParams {
  category?: string;
  query?: string;
  page?: number;
}

const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 15 * 60 * 1000;

export function useNews({ category = "general", query = "", page = 1 }: UseNewsParams) {
  return useQuery<NewsApiResponse, Error>({
    queryKey: ["news", category, query, page],
    
    queryFn: () => {
      if (query.trim()) {
        return searchArticles(query, page);
      }
      return fetchArticles(category, page);
    },

    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    
    // REQUIREMENT: Check 3 times total (1 initial + 2 retries) before showing error
    retry: 2, 
    
    refetchOnWindowFocus: false,
  });
}