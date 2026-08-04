"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { words } from "@/data";
import WordCard from "@/components/WordCard";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function LevelPage() {
  const params = useParams();

  const level = params.level as string;

  if (!levels.includes(level as (typeof levels)[number])) {
    notFound();
  }

  const [search, setSearch] = useState("");

  const filteredWords = useMemo(() => {
    return words.filter(
      (word) =>
        word.level === level &&
        (
          word.word.toLowerCase().includes(search.toLowerCase()) ||
          word.az.toLowerCase().includes(search.toLowerCase()) ||
          word.ru.toLowerCase().includes(search.toLowerCase())
        )
    );
  }, [level, search]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-12">

        <Link
          href="/"
          className="text-emerald-600 font-medium hover:underline"
        >
          ← Home
        </Link>

        <div className="mt-6 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-black">
              {level}
            </h1>

            <p className="mt-2 text-slate-500">
              {filteredWords.length} words
            </p>
          </div>

        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search in this level..."
          className="mt-8 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
            />
          ))}

        </div>

        {filteredWords.length === 0 && (
          <div className="mt-20 rounded-3xl border border-dashed border-slate-300 p-16 text-center dark:border-slate-700">
            <h2 className="text-2xl font-bold">
              Nothing found
            </h2>

            <p className="mt-3 text-slate-500">
              Try another keyword.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}