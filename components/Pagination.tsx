"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  isPlaceholderData?: boolean;
}

export default function Pagination({ 
  currentPage, 
  onPageChange,
  isPlaceholderData = false 
}: PaginationProps) {
  
  return (
    <div className="flex items-center justify-center gap-6 mt-12 mb-8">
      {/* PREVIOUS BUTTON */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || isPlaceholderData}
        className={clsx(
          "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 border",
          // Default State:
          "border-foreground/10 text-foreground bg-transparent",
          // Hover State (The Fix): Text becomes Green, Border becomes Green
          "hover:text-primary hover:border-primary hover:bg-primary/5",
          // Disabled State:
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-foreground disabled:hover:border-foreground/10 disabled:hover:bg-transparent"
        )}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>

      {/* PAGE INDICATOR */}
      <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
        Page {currentPage}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isPlaceholderData}
        className={clsx(
          "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 border",
          // Default State:
          "border-foreground/10 text-foreground bg-transparent",
          // Hover State (The Fix): Text becomes Green, Border becomes Green
          "hover:text-primary hover:border-primary hover:bg-primary/5",
          // Disabled State:
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-foreground disabled:hover:border-foreground/10 disabled:hover:bg-transparent"
        )}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}