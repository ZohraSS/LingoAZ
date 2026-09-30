import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { words } from "@/data";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = (params.q || "").trim().toLowerCase();

  const results = query
    ? words
        .filter(
          (word) =>
            word.word.toLowerCase().includes(query) ||
            word.az.toLowerCase().includes(query) ||
            word.ru.toLowerCase().includes(query)
        )
        .slice(0, 100)
    : [];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-emerald-400"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        <h1 className="text-4xl font-bold">Search</h1>

        <form className="mt-8 flex gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search word, Azerbaijani or Russian..."
            className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-6 font-bold text-black"
          >
            <Search size={22} />
          </button>
        </form>

        {query && (
          <p className="mt-6 text-slate-400">
            {results.length} results for{" "}
            <strong className="text-white">"{query}"</strong>
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((word) => (
            <Link
              key={word.id}
              href={`/word/${word.id}`}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {word.word}
                </h2>

                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-black">
                  {word.level}
                </span>
              </div>

              <p className="mt-4">
                🇦🇿 {word.az || "—"}
              </p>

              <p className="mt-2">
                🇷🇺 {word.ru || "—"}
              </p>
            </Link>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="text-2xl font-bold">Nothing found</h2>
            <p className="mt-2 text-slate-400">
              Try another word or translation.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
