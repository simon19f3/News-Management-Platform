"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Newspaper, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { clsx } from "clsx";

const categories = [
  "sports",
  "politics",
  "entertainment",
  "business",
  "technology",
  "health",
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const performSearch = () => {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
    setShowSearch(false);
    setSearchQuery("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleDesktopSearchClick = () => {
    if (showSearch && searchQuery.trim()) {
      performSearch();
    } else {
      setShowSearch(!showSearch);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 dark:border-white/5 backdrop-blur-xl bg-background/70 shadow-sm transition-colors duration-500">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between md:justify-start relative">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50 mr-4 shrink-0">
            <motion.div
              whileHover={{ rotate: 3 }}
              className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/30"
            >
              <Newspaper size={20} />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">
              News<span className="text-primary">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul 
            className={clsx(
              "hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-8 mx-2 transition-opacity duration-300 ease-in-out",
              // THE FIX: Fade out nav links when search is active to prevent overlap
              showSearch ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            {categories.map((cat) => {
              const isActive = pathname === `/${cat}`;
              return (
                <li key={cat} className="relative shrink-0">
                  <Link
                    href={`/${cat}`}
                    className={clsx(
                      "text-sm font-medium capitalize transition-colors duration-300 hover:text-primary py-2",
                      isActive ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(22,163,74,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3 z-50 ml-auto md:ml-0 shrink-0">
            
            {/* Desktop Search Bar Container */}
            <div className="hidden md:flex items-center relative">
              <AnimatePresence>
                {showSearch && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }} // Increased width for better look
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="absolute right-10 top-1/2 -translate-y-1/2 z-50 overflow-hidden" 
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-background border border-primary/20 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary shadow-lg"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              
              <button 
                onClick={handleDesktopSearchClick}
                className={clsx(
                  "p-2 rounded-full transition-colors relative z-50",
                  showSearch ? "bg-primary text-white" : "hover:bg-secondary/50 text-foreground/80 hover:text-primary"
                )}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setShowSearch(false);
              }}
              className="p-2 rounded-full hover:bg-secondary/50 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 text-foreground transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 w-full z-40 md:hidden overflow-hidden rounded-b-3xl"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" />
            
            <div className="relative z-50 container mx-auto px-6 py-8 flex flex-col gap-6">
              <ul className="flex flex-col space-y-4">
                {categories.map((cat, i) => {
                  const isActive = pathname === `/${cat}`;
                  return (
                    <motion.li
                      key={cat}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={`/${cat}`}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "block text-2xl font-bold capitalize transition-all duration-300",
                          isActive 
                            ? "text-primary translate-x-2" 
                            : "text-foreground/70 hover:text-foreground hover:translate-x-2"
                        )}
                      >
                        {cat}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }}
                className="mt-2 pt-6 border-t border-foreground/10"
              >
                <form 
                  onSubmit={handleFormSubmit} 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/30 border border-foreground/5 text-foreground/60 focus-within:ring-1 focus-within:ring-primary focus-within:text-foreground"
                >
                  <button 
                    type="submit" 
                    className="text-foreground/60 hover:text-primary transition-colors"
                    aria-label="Submit Search"
                  >
                    <Search size={18} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-sm text-foreground placeholder:text-foreground/50"
                  />
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}