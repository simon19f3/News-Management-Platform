"use client";

import { useNews } from "../src/hooks/useNews";
import ArticleCard from "./ArticleCard";
import { ArticleDetailSkeleton } from "./Skeletons"; // Import
import { Facebook, Linkedin, Twitter, Link as LinkIcon, Instagram, ArrowLeft, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  id: string;
  category: string;
}

export default function ArticleDetailClient({ id, category }: Props) {
  const { data, isLoading, error } = useNews({ category });
  const [copied, setCopied] = useState(false);

  // --- LOADING STATE ---
  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  // --- LOGIC ---
  const decodedId = decodeURIComponent(id);
  const article = data?.articles.find((a) => a.id === decodedId);
  const relatedArticles = data?.articles.filter((a) => a.id !== decodedId).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // --- ERROR / NOT FOUND ---
  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link href="/" className="text-primary hover:underline">&larr; Back to Home</Link>
      </div>
    );
  }

  // ... (Keep the rest of your Success Render Logic as is) ...
  // ... (Social links, Render Article, Render Related News) ...
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(article.title);
  
  const socialLinks = [
    { name: "Twitter", icon: <Twitter size={18} />, url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, color: "hover:text-blue-400" },
    { name: "Facebook", icon: <Facebook size={18} />, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, color: "hover:text-blue-600" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, color: "hover:text-blue-700" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link href={`/${category === 'general' ? '' : category}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to {category}
      </Link>

      <article>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/800x400?text=No+Image"; }} />
        </motion.div>

        <div className="mb-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground capitalize font-medium">{article.category}</span>
            <span className="flex items-center gap-1"><Globe size={14} /> {article.source.name}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">{article.title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-muted-foreground">Share:</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full bg-secondary transition-colors ${social.color}`}>
                  {social.icon}
                </a>
              ))}
              <button onClick={handleCopyLink} className="p-2 rounded-full bg-secondary hover:text-pink-600 transition-colors relative">
                {copied ? <LinkIcon size={18} className="text-green-500" /> : <Instagram size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg leading-relaxed text-foreground/90">{article.description}</p>
          <div className="my-8 p-6 bg-secondary/30 rounded-xl border border-border">
            <p className="italic text-muted-foreground mb-4">Read full story at original source.</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition">
              Read at {article.source.name}
            </a>
          </div>
        </div>
      </article>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h3 className="text-2xl font-bold mb-6">Related News</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArticle) => (
              <ArticleCard key={relArticle.id} article={relArticle} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}