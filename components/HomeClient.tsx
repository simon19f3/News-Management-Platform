"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { ArticleCardSkeleton } from "./Skeletons";
import { motion } from "framer-motion";
import { useNews } from "../src/hooks/useNews";
import { RefreshCcw } from "lucide-react"; // Import Icon

export default function HomeClient() {
  const [page, setPage] = useState(1);
  
  // Destructure 'refetch' from the hook
  const { data, isLoading, error, refetch, isFetching } = useNews({ category: "general", page });

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

      {/* LOADING STATE */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ERROR STATE WITH RETRY BUTTON */}
      {error && (
        <div className="flex flex-col items-center justify-center p-8 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Failed to load news
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {error.message}
          </p>
          
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full hover:bg-green-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCcw size={18} className={isFetching ? "animate-spin" : ""} />
            {isFetching ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {!isLoading && !error && data && (
        <>
          <motion.div 
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
          
          {data.totalArticles > 10 && (
            <Pagination 
              currentPage={page}
              onPageChange={handlePageChange}
              isPlaceholderData={isLoading} 
            />
          )}
        </>
      )}

      {!isLoading && !error && data?.articles.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No articles found.</div>
      )}
    </main>
  );
}