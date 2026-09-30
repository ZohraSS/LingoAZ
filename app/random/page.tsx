"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shuffle, ArrowLeft } from "lucide-react";
import { words } from "@/data";

export default function RandomPage() {
  const [wordId, setWordId] = useState<number | null>(null);

  function randomWord() {
    const random =
      words[Math.floor(Math.random() * words.length)];

    setWordId(random.id);
  }

  useEffect(() => {
    randomWord();
  }, []);

  const word = words.find((item) => item.id === wordId);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-emerald-400"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Random Word</h1>
            <p className="mt-2 text-slate-400">
              Discover a random word from the vocabulary.
            </p>
          </div>

          <Shuffle size={34} className="text-emerald-400" />
        </div>

        {word && (
          <Link
            href={`/word/${word.id}`}
            className="block rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">{word.word}</h2>

              <span className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-black">
                {word.level}
              </span>
            </div>

            <div className="mt-8 space-y-3 text-lg">
              <p>🇬🇧 {word.ipaUK || "—"}</p>
              <p>🇺🇸 {word.ipaUS || "—"}</p>
              <p className="mt-6">
                🇦🇿 <strong>{word.az || "—"}</strong>
              </p>
              <p>
                🇷🇺 <strong>{word.ru || "—"}</strong>
              </p>
            </div>
          </Link>
        )}

        <button
          onClick={randomWord}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-black transition hover:bg-emerald-400"
        >
          <Shuffle size={20} />
          Another Random Word
        </button>
      </div>
    </main>
  );
}
