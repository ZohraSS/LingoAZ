"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { words } from "@/data";

export default function RandomPage() {
  const [wordId, setWordId] = useState<number | null>(null);

  function pickRandomWord() {
    if (!words.length) return;

    const randomIndex = Math.floor(Math.random() * words.length);
    setWordId(words[randomIndex].id);
  }

  useEffect(() => {
    pickRandomWord();
  }, []);

  const word = words.find((item) => item.id === wordId);

  if (!word) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-slate-500">
            Loading random word...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40">
            <Shuffle
              size={30}
              className="text-violet-600 dark:text-violet-400"
            />
          </div>

          <h1 className="text-4xl font-black">
            Random Word
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Discover something new
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 md:p-10">

          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-4xl font-black">
                {word.word}
              </h2>

              <p className="mt-2 uppercase tracking-widest text-slate-400">
                {word.type}
              </p>
            </div>

            <span className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white">
              {word.level}
            </span>
          </div>

          <div className="mt-8 space-y-2 text-lg text-slate-500 dark:text-slate-400">
            <p>
              🇬🇧 {word.ipaUK || "—"}
            </p>

            <p>
              🇺🇸 {word.ipaUS || "—"}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <p>
              <strong className="text-blue-500">
                AZ
              </strong>{" "}
              {word.az || "—"}
            </p>

            <p>
              <strong className="text-pink-500">
                RU
              </strong>{" "}
              {word.ru || "—"}
            </p>
          </div>

          {word.definition && (
            <p className="mt-8 text-lg text-slate-600 dark:text-slate-300">
              {word.definition}
            </p>
          )}

          {word.example && (
            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
              <p className="italic text-slate-500 dark:text-slate-400">
                “{word.example}”
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={pickRandomWord}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-700"
            >
              <Shuffle size={18} />
              Another Word
            </button>

            <Link
              href={`/word/${word.id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              View Details
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
