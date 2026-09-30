"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { words } from "@/data";
import { categories } from "@/data/categories";
import WordCard from "@/components/WordCard";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = String(params.category);

  const [search, setSearch] = useState("");

  const category = categories.find(
    (item) => item.id === categoryId
  );

  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      if (word.category !== categoryId) return false;

      const query = search.toLowerCase().trim();

      if (!query) return true;

      return (
        word.word.toLowerCase().includes(query) ||
        word.az.toLowerCase().includes(query) ||
        word.ru.toLowerCase().includes(query)
      );
    });
  }, [categoryId, search]);

  if (!category) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-400"
          >
            <ArrowLeft size={18} />
            Home
          </Link>

          <h1 className="mt-10 text-4xl font-black">
            Category not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <div className="text-6xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-4xl font-black md:text-5xl">
              {category.name}
            </h1>

            <p className="mt-2 text-slate-400">
              {filteredWords.length} words
            </p>
          </div>
        </div>

        <div className="relative mt-10">
          <Search
            size={21}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search in ${category.name}...`}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-5 pl-14 pr-6 text-lg text-white outline-none transition focus:border-emerald-500"
          />
        </div>

        {filteredWords.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredWords.map((word) => (
              <WordCard
                key={word.id}
                word={word}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-700 p-12 text-center">
            <h2 className="text-2xl font-bold">
              No words found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another keyword.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
