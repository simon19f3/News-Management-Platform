"use client";

import { useState } from "react"; // 1. Import useState
import { useNews } from "../src/hooks/useNews";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination"; // 2. Import the UI
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
  category: string;
}

export default function CategoryClient({ category }: Props) {
  // 3. Create State for Page Number
  const [page, setPage] = useState(1);

  // 4. Pass page to the hook
  const { data, isLoading, error, isPlaceholderData } = useNews({ 
    category, 
    page 
  });

  // 5. Handler for changing pages
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold capitalize text-foreground">
          {category} News
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Page {page} • Real-time updates via TanStack Query.
        </p>
      </header>

      {/* Loading State (Only for initial load) */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground font-medium">Fetching articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 dark:text-red-400">
          <AlertCircle size={24} />
          <div>
            <p className="font-bold">Error loading news</p>
            <p className="text-sm opacity-90">{error.message}</p>
          </div>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !error && data && (
        <>
          <motion.div
            // Key change triggers animation on page switch
            key={page} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>

          {/* 6. Render Pagination */}
          <Pagination 
            currentPage={page}
            onPageChange={handlePageChange}
            isPlaceholderData={isPlaceholderData}
          />
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && data?.articles.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No articles found on this page.
        </div>
      )}
    </main>
  );
}