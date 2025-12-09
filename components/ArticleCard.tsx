"use client";
import Link from "next/link";
import { Article } from "../src/app/lib/types";

export default function ArticleCard({ article }: { article: Article }) {
  const encodedId = encodeURIComponent(article.id);
  const categoryParam = article.category || "general";

  return (
    <Link 
      href={`/article?id=${encodedId}&category=${categoryParam}`}
      className="block group h-full"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-primary/30">
        
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300" />
          <img
            src={article.image || "https://placehold.co/600x400?text=News"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
        </div>
        
        {/* Content Container */}
        <div className="p-5 flex flex-col flex-grow relative">
          
          {/* Category Tag */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-primary/10 text-primary rounded-md">
              {article.category || "General"}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="font-bold text-lg text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          
          {/* Description */}
          <p className="text-sm text-foreground/70 line-clamp-3 flex-grow mb-4 font-light leading-relaxed">
            {article.description}
          </p>
          
          {/* Footer Metadata */}
          <div className="pt-4 border-t border-dashed border-foreground/10 flex items-center justify-between text-xs text-foreground/50 font-medium">
            <span className="truncate max-w-[150px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              {article.source.name}
            </span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}