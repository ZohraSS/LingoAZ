import Link from "next/link";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";

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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-700/20" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />

        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-700/20" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">

        {/* Hero */}

        <section className="mb-16 text-center">

          <h1 className="text-6xl font-black tracking-tight">
            🌍 LingoAZ
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Learn English vocabulary with pronunciation,
            translations and real examples.
          </p>

          <input
            placeholder="🔍 Search any word..."
            className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-white/40 bg-white/70 px-6 py-5 text-lg shadow-xl backdrop-blur-xl outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900/70"
          />

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-emerald-600">
                {words.length}
              </h3>

              <p className="mt-2 text-slate-500">
                📚 Words
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-blue-600">
                {levels.length}
              </h3>

              <p className="mt-2 text-slate-500">
                🎯 Levels
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-purple-600">
                {categories.length}
              </h3>

              <p className="mt-2 text-slate-500">
                📂 Categories
              </p>
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="text-4xl font-black text-orange-500">
                {vocabularyTypes.length}
              </h3>

              <p className="mt-2 text-slate-500">
                📝 Types
              </p>
            </div>

          </div>

        </section>
                {/* Levels */}

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
                  <h3 className="text-3xl font-bold">
                    {level}
                  </h3>

                  <p className="mt-3 text-slate-500">
                    {count} Words
                  </p>

                  <span className="mt-8 inline-flex rounded-full bg-emerald-500 px-4 py-2 font-semibold text-white">
                    Open →
                  </span>

                </Link>
              );

            })}

          </div>

        </section>

        {/* Categories */}

        <section className="mb-16">

          <h2 className="mb-8 text-3xl font-bold">
            📂 Browse by Category
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => (

              <div
                key={category.id}
                className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >

                <div className="text-5xl">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {category.name}
                </h3>

              </div>

            ))}

          </div>

        </section>

        {/* Vocabulary Types */}

        <section className="mb-16">

          <h2 className="mb-8 text-3xl font-bold">
            📝 Vocabulary Types
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {vocabularyTypes.map((type) => (

              <div
                key={type.id}
                className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >

                <div className="text-5xl">
                  {type.icon}
                </div>

                <h3 className="mt-4 font-semibold">
                  {type.name}
                </h3>

              </div>

            ))}

          </div>

        </section>

        {/* Explore */}

        <section className="mb-20">

          <h2 className="mb-8 text-3xl font-bold">
            📖 Explore
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "🔥 Most Popular",
              "⭐ Recently Added",
              "🎲 Random Word",
              "❤️ Favorites",
            ].map((item) => (

              <div
                key={item}
                className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
              >

                <h3 className="text-lg font-semibold">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}