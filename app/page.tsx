import Link from "next/link";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";
import HomeSearch from "@/components/HomeSearch";

const levels = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">

      {/* Background */}
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

          {/* LIVE SEARCH */}
          <HomeSearch />

          {/* Statistics */}
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
        <section className="mb-16">

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

                    <h3 className="text-3xl font-bold">
                      {level}
                    </h3>

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
        <section className="mb-16">

          <h2 className="mb-8 text-3xl font-bold">
            📂 Browse by Category
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => (

              <Link
                key={category.id}
                href={`/search?category=${encodeURIComponent(category.id)}`}
                className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >

                <div className="text-5xl">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {category.name}
                </h3>

              </Link>

            ))}

          </div>
        </section>

        {/* TYPES */}
        <section className="mb-16">

          <h2 className="mb-8 text-3xl font-bold">
            📝 Vocabulary Types
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {vocabularyTypes.map((type) => (

              <Link
                key={type.id}
                href={`/search?type=${encodeURIComponent(type.id)}`}
                className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >

                <div className="text-5xl">
                  {type.icon}
                </div>

                <h3 className="mt-4 font-semibold">
                  {type.name}
                </h3>

              </Link>

            ))}

          </div>
        </section>

        {/* EXPLORE */}
        <section className="mb-20">

          <h2 className="mb-8 text-3xl font-bold">
            📖 Explore
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/favorites"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                ❤️ Favorites
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Your saved words
              </p>
            </Link>

            <Link
              href="/random"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                🎲 Random Word
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Discover a random word
              </p>
            </Link>

            <Link
              href="/search"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                🔥 Most Popular
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore popular vocabulary
              </p>
            </Link>

            <Link
              href="/search"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                ⭐ Recently Added
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore new vocabulary
              </p>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}