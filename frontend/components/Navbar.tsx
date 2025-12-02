"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isDark = theme === "dark";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-theme backdrop-blur-xl bg-background/70 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 3 }}
              className="p-2 bg-primary rounded-xl text-white shadow-md"
            >
              <Newspaper size={20} />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">
              News<span className="text-primary">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {categories.map((cat) => {
              const isActive = pathname === `/${cat}`;
              return (
                <li key={cat} className="relative">
                  <Link
                    href={`/${cat}`}
                    className={clsx(
                      "text-sm font-medium capitalize transition-colors duration-300 hover:text-primary",
                      isActive ? "text-primary" : "opacity-75"
                    )}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Button (placeholder for future feature) */}
            <button className="hidden md:flex p-2 rounded-full hover:bg-secondary transition">
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition"
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

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-theme bg-background/95 backdrop-blur-md overflow-hidden shadow-lg"
          >
            <ul className="flex flex-col p-6 space-y-4">
              {categories.map((cat, i) => (
                <motion.li
                  key={cat}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/${cat}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-semibold capitalize opacity-80 hover:opacity-100 hover:text-primary"
                  >
                    {cat}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
