"use client";

import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { words } from "@/data";

export default function HomeSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return words
      .filter((word) => {
        const wordText = (word.word || "").toLowerCase();
        const azText = (word.az || "").toLowerCase();
        const ruText = (word.ru || "").toLowerCase();
        const definitionText = (word.definition || "").toLowerCase();

        return (
          wordText.includes(q) ||
          azText.includes(q) ||
          ruText.includes(q) ||
          definitionText.includes(q)
        );
      })
      .slice(0, 8);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <div className="relative mx-auto mt-10 w-full max-w-3xl">
      <div className="relative">
        <Search
          size={22}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="🔍 Search any word..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-14 py-5 text-lg text-white shadow-xl outline-none backdrop-blur-xl transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
          {results.length > 0 ? (
            <div className="divide-y divide-slate-800">
              {results.map((word) => (
                <Link
                  key={word.id}
                  href={`/word/${word.id}`}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-800"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="truncate text-lg font-bold text-white">
                        {word.word}
                      </span>

                      <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">
                        {word.level}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-400">
                      {word.az || word.ru || word.definition || ""}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="ml-4 shrink-0 text-slate-500"
                  />
                </Link>
              ))}

              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                className="block px-5 py-4 text-center font-semibold text-emerald-400 transition hover:bg-slate-800"
              >
                View all results →
              </Link>
            </div>
          ) : (
            <div className="px-5 py-6 text-center">
              <p className="font-semibold text-white">
                No words found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try another word or translation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
