import Link from "next/link";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const categoryNames: Record<string, string> = {
  business: "Business",
  travel: "Travel",
  health: "Health",
  education: "Education",
  technology: "Technology",
  music: "Music",
  "daily-life": "Daily Life",
};

const typeNames: Record<string, string> = {
  word: "Words",
  phrase: "Phrases",
  expression: "Expressions",
  "phrasal-verb": "Phrasal Verbs",
  idiom: "Idioms",
};

export default function HomePage() {
  const popularWords = words
    .filter((word) => word.isPopular)
    .slice(0, 12);

  const recentlyAdded = [...words]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : b.id;
      return dateB - dateA;
    })
    .slice(0, 12);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-700/20" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />
        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-700/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">

        {/* HERO */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
            🌍 LingoAZ
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Learn English vocabulary with pronunciation,
            translations and real examples.
          </p>

          <Link
            href="/search"
            className="mx-auto mt-10 block w-full max-w-3xl"
          >
            <div className="rounded-2xl border border-white/40 bg-white/70 px-6 py-5 text-left text-lg text-slate-500 shadow-xl backdrop-blur-xl transition hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
              🔍 Search any word...
            </div>
          </Link>

          {/* STATISTICS */}
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-emerald-600">
                {words.length.toLocaleString()}
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                📚 Words
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-blue-600">
                {levels.length}
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                🎯 Levels
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-purple-600">
                {categories.length}
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                📂 Categories
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-orange-500">
                {vocabularyTypes.length}
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                📝 Types
              </p>
            </div>
          </div>
        </section>

        {/* LEVELS */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">
            📚 Browse by Level
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level) => {
              const count = words.filter(
                (word) => word.level === level
              ).length;

              return (
                <Link
                  key={level}
                  href={`/level/${level}`}
                  className="rounded-3xl border border-white/40 bg-white/70 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold">{level}</h3>

                    <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold text-white">
                      {count}
                    </span>
                  </div>

                  <p className="mt-3 text-slate-500 dark:text-slate-400">
                    Vocabulary words
                  </p>

                  <span className="mt-8 inline-flex rounded-full bg-emerald-500 px-4 py-2 font-semibold text-white">
                    Open →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">
            📂 Browse by Category
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const categoryWords = words
                .filter((word) => word.category === category.id)
                .slice(0, 100);

              return (
                <Link
                  key={category.id}
                  href={`/search?category=${encodeURIComponent(category.id)}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-5xl">
                      {category.icon}
                    </div>

                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
                      {categoryWords.length}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Up to 100 vocabulary words
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {categoryWords.slice(0, 12).map((word) => (
                      <span
                        key={word.id}
                        className="rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                      >
                        {word.word}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 text-sm font-semibold text-emerald-600">
                    View all →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* VOCABULARY TYPES */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">
            📝 Vocabulary Types
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {vocabularyTypes.map((type) => {
              const typeWords = words
                .filter((word) => word.type === type.id)
                .slice(0, 100);

              return (
                <Link
                  key={type.id}
                  href={`/search?type=${encodeURIComponent(type.id)}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="text-5xl">
                    {type.icon}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="font-bold">
                      {type.name}
                    </h3>

                    <span className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-bold text-white">
                      {typeWords.length}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    {typeWords.slice(0, 6).map((word) => (
                      <div
                        key={word.id}
                        className="truncate text-sm text-slate-600 dark:text-slate-300"
                      >
                        • {word.word}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-sm font-semibold text-blue-600">
                    Explore →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* EXPLORE */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold">
            📖 Explore
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* POPULAR */}
            <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    🔥 Most Popular
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Popular vocabulary
                  </p>
                </div>

                <Link
                  href="/search"
                  className="text-sm font-semibold text-emerald-600"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {popularWords.map((word) => (
                  <Link
                    key={word.id}
                    href={`/word/${word.id}`}
                    className="rounded-xl border border-slate-200 bg-white/60 p-3 text-sm font-medium transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                  >
                    {word.word}
                  </Link>
                ))}
              </div>
            </div>

            {/* RECENT */}
            <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    ⭐ Recently Added
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Latest vocabulary
                  </p>
                </div>

                <Link
                  href="/search"
                  className="text-sm font-semibold text-blue-600"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {recentlyAdded.map((word) => (
                  <Link
                    key={word.id}
                    href={`/word/${word.id}`}
                    className="rounded-xl border border-slate-200 bg-white/60 p-3 text-sm font-medium transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                  >
                    {word.word}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
