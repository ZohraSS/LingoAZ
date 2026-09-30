"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { words } from "@/data";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];

    setFavoriteIds(saved);
  }, []);

  const favoriteWords = words.filter((word) =>
    favoriteIds.includes(word.id)
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <div className="mb-10 flex items-center gap-3">
          <Heart className="fill-red-500 text-red-500" size={32} />
          <div>
            <h1 className="text-4xl font-bold">Favorites</h1>
            <p className="mt-1 text-slate-400">
              {favoriteWords.length} saved words
            </p>
          </div>
        </div>

        {favoriteWords.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
            <Heart
              size={48}
              className="mx-auto mb-4 text-slate-600"
            />
            <h2 className="text-2xl font-bold">No favorites yet</h2>
            <p className="mt-2 text-slate-400">
              Add words to favorites and they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {favoriteWords.map((word) => (
              <Link
                key={word.id}
                href={`/word/${word.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {word.word}
                  </h2>

                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-black">
                    {word.level}
                  </span>
                </div>

                <p className="mt-4 text-slate-400">
                  🇦🇿 {word.az || "—"}
                </p>

                <p className="mt-2 text-slate-400">
                  🇷🇺 {word.ru || "—"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
