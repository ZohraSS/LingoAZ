"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useParams } from "next/navigation";

import { words } from "@/data";
import FavoriteButton from "@/components/FavoriteButton";
import LevelBadge from "@/components/LevelBadge";

export default function WordPage() {
  const params = useParams();

  const id = Number(params.id);

  const word = words.find((item) => item.id === id);

  if (!word) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft size={18} />
            Home
          </Link>

          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h1 className="text-3xl font-bold">
              Word not found
            </h1>

            <p className="mt-3 text-slate-400">
              This word does not exist in the vocabulary.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <Link
          href={`/level/${word.level}`}
          className="inline-flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={18} />
          Back to {word.level}
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

          <div className="p-8 md:p-10">

            <div className="flex items-start justify-between gap-6">

              <div>
                <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                  {word.word}
                </h1>

                <p className="mt-2 text-sm uppercase tracking-widest text-slate-500">
                  {word.type}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FavoriteButton id={word.id} />
                <LevelBadge level={word.level} />
              </div>

            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 md:grid-cols-2">

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  British English
                </span>

                <p className="mt-2 text-lg text-slate-200">
                  {word.ipaUK || "—"}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  American English
                </span>

                <p className="mt-2 text-lg text-slate-200">
                  {word.ipaUS || "—"}
                </p>
              </div>

            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Azerbaijani
                </p>

                <p className="mt-3 text-2xl font-semibold">
                  {word.az || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-400">
                  Russian
                </p>

                <p className="mt-3 text-2xl font-semibold">
                  {word.ru || "—"}
                </p>
              </div>

            </div>

            {word.definition && (
              <section className="mt-10">
                <h2 className="text-xl font-bold">
                  Definition
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  {word.definition}
                </p>
              </section>
            )}

            {word.examples && word.examples.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold">
                  Examples
                </h2>

                <div className="mt-4 space-y-4">
                  {word.examples.map((example, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                    >
                      <p className="text-lg italic text-slate-200">
                        “{example.en}”
                      </p>

                      {example.az && (
                        <p className="mt-3 text-sm text-blue-400">
                          AZ: {example.az}
                        </p>
                      )}

                      {example.ru && (
                        <p className="mt-2 text-sm text-rose-400">
                          RU: {example.ru}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {word.example && (
              <section className="mt-10">
                <h2 className="text-xl font-bold">
                  Example
                </h2>

                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-lg italic text-slate-300">
                    “{word.example}”
                  </p>
                </div>
              </section>
            )}

            {(word.synonyms?.length || word.antonyms?.length) ? (
              <section className="mt-10 grid gap-6 md:grid-cols-2">

                {word.synonyms && word.synonyms.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold">
                      Synonyms
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {word.synonyms.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {word.antonyms && word.antonyms.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold">
                      Antonyms
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {word.antonyms.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </section>
            ) : null}

          </div>
        </article>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/level/${word.level}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400"
          >
            <ArrowLeft size={18} />
            More {word.level} words
          </Link>
        </div>

      </div>
    </main>
  );
}
