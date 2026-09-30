import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, Shuffle } from "lucide-react";
import { words } from "@/data";

interface Props {
  searchParams: Promise<{
    q?: string;
    type?: string;
    popular?: string;
    recent?: string;
  }>;
}

const validTypes = [
  "word",
  "phrase",
  "expression",
  "phrasal-verb",
  "idiom",
];

const typeLabels: Record<string, string> = {
  word: "Words",
  phrase: "Phrases",
  expression: "Expressions",
  "phrasal-verb": "Phrasal Verbs",
  idiom: "Idioms",
};

export default async function SearchPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const query = (params.q || "").trim().toLowerCase();
  const type = (params.type || "").trim().toLowerCase();

  const isPopular = params.popular === "true";
  const isRecent = params.recent === "true";

  let results = [...words];

  /* ---------------- SEARCH ---------------- */

  if (query) {
    results = results.filter((word) => {
      const searchable = [
        word.word,
        word.az,
        word.ru,
        word.definition,
        word.example,
        ...(word.synonyms || []),
        ...(word.antonyms || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }

  /* ---------------- TYPE ---------------- */

  if (validTypes.includes(type)) {
    results = results.filter(
      (word) => word.type === type
    );
  }

  /* ---------------- POPULAR ---------------- */

  if (isPopular) {
    results = results.filter(
      (word) => word.isPopular === true
    );
  }

  /* ---------------- RECENT ---------------- */

  if (isRecent) {
    /*
      Vocabulary IDs are sequential.
      Higher IDs represent newer entries.
    */
    results = [...results].sort(
      (a, b) => b.id - a.id
    );
  }

  /* ---------------- LIMIT ---------------- */

  results = results.slice(0, 100);

  const title = isPopular
    ? "🔥 Most Popular"
    : isRecent
      ? "⭐ Recently Added"
      : type && typeLabels[type]
        ? typeLabels[type]
        : query
          ? `Search results for "${params.q}"`
          : "🔎 Search Vocabulary";

  const subtitle = isPopular
    ? "Explore popular vocabulary"
    : isRecent
      ? "Explore the newest vocabulary"
      : type && typeLabels[type]
        ? `Explore ${typeLabels[type].toLowerCase()}`
        : query
          ? `${results.length} result${
              results.length === 1 ? "" : "s"
            } found`
          : "Search across the LingoAZ vocabulary";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">

          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={17} />
            Home
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                {title}
              </h1>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>

            <Link
              href="/random"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              <Shuffle size={18} />
              Random Word
            </Link>

          </div>

        </div>

        {/* Search */}

        <form
          action="/search"
          className="mb-10 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="q"
              defaultValue={params.q || ""}
              placeholder="🔍 Search word, translation, definition..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900"
            />

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-7 py-4 font-bold text-white transition hover:bg-emerald-600"
          >
            Search
          </button>
        </form>

        {/* Filters */}

        <div className="mb-8 flex flex-wrap gap-2">

          <Link
            href="/search"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !type && !isPopular && !isRecent
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            All
          </Link>

          {validTypes.map((item) => (
            <Link
              key={item}
              href={`/search?type=${item}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                type === item
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {typeLabels[item]}
            </Link>
          ))}

          <Link
            href="/search?popular=true"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isPopular
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            🔥 Popular
          </Link>

          <Link
            href="/search?recent=true"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isRecent
                ? "bg-blue-500 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            ⭐ Recent
          </Link>

        </div>

        {/* Result count */}

        <div className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Showing {results.length} result
          {results.length === 1 ? "" : "s"}
        </div>

        {/* Results */}

        {results.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {results.map((word) => (

              <Link
                key={word.id}
                href={`/word/${word.id}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <h2 className="truncate text-2xl font-black transition group-hover:text-emerald-500">
                      {word.word}
                    </h2>

                    <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                      {word.type}
                    </p>

                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                    {word.level}
                  </span>

                </div>

                <div className="mt-5 space-y-1 text-sm text-slate-500 dark:text-slate-400">

                  <p>
                    🇬🇧 {word.ipaUK || "—"}
                  </p>

                  <p>
                    🇺🇸 {word.ipaUS || "—"}
                  </p>

                </div>

                <div className="mt-5 space-y-2">

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
                  <p className="mt-5 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {word.definition}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">

                  <span className="font-semibold text-emerald-500">
                    View details
                  </span>

                  <ArrowRight
                    size={20}
                    className="text-emerald-500 transition group-hover:translate-x-1"
                  />

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

            <Search
              size={48}
              className="mx-auto mb-5 text-slate-400"
            />

            <h2 className="text-2xl font-bold">
              Nothing found
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Try another word, translation or filter.
            </p>

            <Link
              href="/search"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Browse all vocabulary
              <ArrowRight size={18} />
            </Link>

          </div>

        )}

      </div>
    </main>
  );
}
