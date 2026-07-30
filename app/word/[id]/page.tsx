"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";

const levels = [
  {
    level: "A1",
    name: "Beginner",
    color: "bg-green-500",
  },
  {
    level: "A2",
    name: "Elementary",
    color: "bg-lime-500",
  },
  {
    level: "B1",
    name: "Intermediate",
    color: "bg-blue-500",
  },
  {
    level: "B2",
    name: "Upper Intermediate",
    color: "bg-orange-500",
  },
  {
    level: "C1",
    name: "Advanced",
    color: "bg-red-500",
  },
  {
    level: "C2",
    name: "Proficient",
    color: "bg-purple-600",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-black">
              🌍 LingoAZ
            </h1>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Learn English Smarter
            </p>
          </div>

          <ThemeToggle />

        </div>

        {/* Search */}

        <input
          placeholder="🔍 Search words..."
          className="mt-8 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"
        />

        {/* Levels */}

        <section className="mt-14">

          <h2 className="mb-6 text-3xl font-bold">
            📚 Browse by Level
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {levels.map((item) => {

              const count = words.filter(
                (w) => w.level === item.level
              ).length;

              return (
                <Link
                  key={item.level}
                  href={`/level/${item.level}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >

                  <span
                    className={`${item.color} rounded-full px-3 py-1 text-sm font-bold text-white`}
                  >
                    {item.level}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    {count} Words
                  </p>

                  <p className="mt-8 font-semibold text-emerald-600">
                    Open →
                  </p>

                </Link>
              );
            })}

          </div>

        </section>

        {/* Categories */}

        <section className="mt-16">

          <h2 className="mb-6 text-3xl font-bold">
            📂 Browse by Category
          </h2>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">

            {categories.map((category) => (

              <div
                key={category.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="text-4xl">
                  {category.icon}
                </div>

                <h3 className="mt-4 font-semibold">
                  {category.name}
                </h3>

              </div>

            ))}

          </div>

        </section>

        {/* Types */}

        <section className="mt-16">

          <h2 className="mb-6 text-3xl font-bold">
            📝 Vocabulary Types
          </h2>

          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">

            {vocabularyTypes.map((type) => (

              <div
                key={type.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="text-4xl">
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

        <section className="mt-16 mb-20">

          <h2 className="mb-6 text-3xl font-bold">
            📖 Explore
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {[
              "❤️ Favorites",
              "🎲 Random Word",
              "⭐ Recently Added",
              "🔥 Most Popular",
            ].map((item) => (

              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold">
                  {item}
                </h3>
              </div>

            ))}

          </div>

        </section>

      </section>
    </main>
  );
}