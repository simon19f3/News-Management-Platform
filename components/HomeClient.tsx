"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination"; // Import the pagination component
import { motion } from "framer-motion";
import { useNews } from "../src/hooks/useNews";
import { Loader2 } from "lucide-react";

export default function HomeClient() {
  // 1. Initialize Page State
  const [page, setPage] = useState(1);

  // 2. Pass page to the hook
  const { data, isLoading, error, isPlaceholderData } = useNews({ 
    category: "general", // Home usually shows general headlines
    page: page 
  });

  // 3. Page Change Handler
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          Top Stories
        </motion.h1>

        <p className="mt-2 text-sm text-foreground/80">
          Latest curated articles fetched via TanStack Query.
        </p>
      </header>

      {/* Loading State (Initial Load only) */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Fetching latest news...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Failed to load news
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {error.message || "Please check your internet connection and try again."}
          </p>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !error && data && (
        <>
          <motion.div 
            key={page} // Animation trigger on page change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
          
          {/* 4. Render Pagination */}
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
          No articles found.
        </div>
      )}
    </main>
  );
}