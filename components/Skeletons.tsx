"use client"; // Ensure this is a client component to use the hook


import { useTheme } from "../contexts/ThemeContext";

// 1. The Card Skeleton (Your updated version)
export function ArticleCardSkeleton() {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-2xl overflow-hidden h-full flex flex-col shadow-sm animate-pulse 
    ${theme === 'dark' ? "dark:bg-white/5 dark:border-white/10" : "bg-gray-300 border border-gray-200"}`}>
      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gray-100 dark:bg-white/10" />
     
      {/* Content Placeholder */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        {/* Category Tag */}
        <div className="h-5 w-20 bg-gray-100 dark:bg-white/20 rounded-md" />
       
        {/* Title (2 lines) */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-gray-100 dark:bg-white/10 rounded-md" />
          <div className="h-6 w-2/3 bg-gray-100 dark:bg-white/10 rounded-md" />
        </div>
       
        {/* Description (3 lines) */}
        <div className="space-y-2 mt-2">
          <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-md" />
          <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-md" />
          <div className="h-3 w-4/5 bg-gray-100 dark:bg-white/5 rounded-md" />
        </div>
       
        {/* Footer Meta */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between">
          <div className="h-3 w-24 bg-gray-100 dark:bg-white/10 rounded-md" />
          <div className="h-3 w-16 bg-gray-100 dark:bg-white/10 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// 2. The Detail Page Skeleton (Adjusted to match)
export function ArticleDetailSkeleton() {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-pulse">
      {/* Back Button */}
      <div className={`h-4 w-32 rounded mb-6 ${theme === 'dark' ? "dark:bg-white/20" : "bg-gray-300"}`} />

      {/* Main Image - Using Gray-300 for contrast in light mode */}
      <div className={`w-full h-[400px] rounded-2xl mb-8 border
        ${theme === 'dark' 
          ? "dark:bg-white/5 dark:border-white/10" 
          : "bg-gray-300 border-gray-200"
        }`} 
      />

      {/* Meta Data */}
      <div className="flex gap-4 mb-4">
        <div className={`h-6 w-24 rounded-full ${theme === 'dark' ? "dark:bg-white/20" : "bg-gray-300"}`} />
        <div className={`h-6 w-32 rounded ${theme === 'dark' ? "dark:bg-white/10" : "bg-gray-300"}`} />
        <div className={`h-6 w-32 rounded ${theme === 'dark' ? "dark:bg-white/10" : "bg-gray-300"}`} />
      </div>

      {/* Title */}
      <div className={`h-10 w-3/4 rounded mb-4 ${theme === 'dark' ? "dark:bg-white/10" : "bg-gray-300"}`} />
      <div className={`h-10 w-1/2 rounded mb-8 ${theme === 'dark' ? "dark:bg-white/10" : "bg-gray-300"}`} />

      {/* Content Blocks */}
      <div className="space-y-4">
        <div className={`h-4 w-full rounded ${theme === 'dark' ? "dark:bg-white/5" : "bg-gray-300"}`} />
        <div className={`h-4 w-full rounded ${theme === 'dark' ? "dark:bg-white/5" : "bg-gray-300"}`} />
        <div className={`h-4 w-5/6 rounded ${theme === 'dark' ? "dark:bg-white/5" : "bg-gray-300"}`} />
        <div className={`h-4 w-full rounded ${theme === 'dark' ? "dark:bg-white/5" : "bg-gray-300"}`} />
      </div>
    </div>
  );
}