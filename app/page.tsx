"use client";

import { useMemo, useState } from "react";

import { words } from "@/data";
import SearchBar from "@/components/SearchBar";
import WordCard from "@/components/WordCard";


export default function Home() {
  const [query, setQuery] = useState("");

  const filteredWords = useMemo(() => {
    return words.filter(
      (item) =>
        item.word.toLowerCase().includes(query.toLowerCase()) ||
        item.az.toLowerCase().includes(query.toLowerCase()) ||
        item.ru.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-center text-6xl font-black text-blue-500">
          🌍 LingoAZ
        </h1>

        <p className="mt-4 text-center text-slate-400 text-xl">
          Learn Languages Freely
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filteredWords.length > 0 ? (
            filteredWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
              <h2 className="text-2xl font-bold">No words found 😢</h2>

              <p className="mt-3 text-slate-400">
                Try another search.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}