"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { words } from "@/data";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as number[];

      setFavoriteIds(saved);
    } catch {
      setFavoriteIds([]);
    }

    setLoaded(true);
  }, []);

  const favoriteWords = words.filter((word) =>
    favoriteIds.includes(word.id)
  );

  function removeFavorite(id: number) {
    const updated = favoriteIds.filter((item) => item !== id);

    setFavoriteIds(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Heart className="fill-rose-500 text-rose-500" size={32} />

            <h1 className="text-4xl font-black">
              Favorites
            </h1>
          </div>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Your saved vocabulary
          </p>
        </div>

        {!loaded ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            Loading favorites...
          </div>
        ) : favoriteWords.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <Heart
              size={48}
              className="mx-auto mb-5 text-slate-400"
            />

            <h2 className="text-2xl font-bold">
              No favorites yet
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Open a word and click the heart icon to save it here.
            </p>

            <Link
              href="/search"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Explore vocabulary
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              {favoriteWords.length} saved word
              {favoriteWords.length !== 1 ? "s" : ""}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteWords.map((word) => (
                <div
                  key={word.id}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => removeFavorite(word.id)}
                    aria-label={`Remove ${word.word} from favorites`}
                    className="absolute right-5 top-5 rounded-xl p-2 transition hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <Heart
                      size={22}
                      className="fill-rose-500 text-rose-500"
                    />
                  </button>

                  <Link href={`/word/${word.id}`} className="block">
                    <div className="pr-12">
                      <h2 className="text-2xl font-black">
                        {word.word}
                      </h2>

                      <span className="mt-2 inline-block rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                        {word.level}
                      </span>
                    </div>

                    <p className="mt-5 text-slate-500 dark:text-slate-400">
                      GB&nbsp;&nbsp;{word.ipaUK || "—"}
                    </p>

                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                      US&nbsp;&nbsp;{word.ipaUS || "—"}
                    </p>

                    <p className="mt-5">
                      <span className="font-bold text-blue-500">
                        AZ
                      </span>{" "}
                      {word.az || "—"}
                    </p>

                    <p className="mt-2">
                      <span className="font-bold text-pink-500">
                        RU
                      </span>{" "}
                      {word.ru || "—"}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-blue-500 dark:border-slate-800">
                      <span className="font-semibold">
                        View details
                      </span>

                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
