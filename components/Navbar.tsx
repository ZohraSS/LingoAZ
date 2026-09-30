"use client";

import Link from "next/link";
import { Heart, Search, Shuffle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-black text-emerald-600"
        >
          🌍 LingoAZ
        </Link>

        <nav className="flex items-center gap-2">

          {/* Favorites */}
          <Link
            href="/favorites"
            aria-label="Favorites"
            title="Favorites"
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Heart size={20} />
          </Link>

          {/* Random Word */}
          <Link
            href="/random"
            aria-label="Random word"
            title="Random word"
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Shuffle size={20} />
          </Link>

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search"
            title="Search"
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Search size={20} />
          </Link>

          {/* Theme */}
          <ThemeToggle />

        </nav>

      </div>
    </header>
  );
}