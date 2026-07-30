import Link from "next/link";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold">🌍 LingoAZ</h1>

        <p className="mt-2 text-gray-500">
          Learn English Smarter
        </p>

        <input
          placeholder="🔍 Search words..."
          className="mt-6 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </section>

      {/* Levels */}
      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold">
          📚 Browse by Level
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => {
            const count = words.filter(
              (word) => word.level === level
            ).length;

            return (
              <Link
                key={level}
                href={`/level/${level}`}
                className="rounded-2xl border p-6 transition hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold">{level}</h3>

                <p className="mt-2 text-gray-500">
                  {count} Words
                </p>

                <span className="mt-6 inline-block font-medium text-blue-600">
                  Open →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold">
          📂 Browse by Category
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border p-5"
            >
              <div className="text-3xl">{category.icon}</div>

              <h3 className="mt-3 font-semibold">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold">
          📝 Vocabulary Types
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {vocabularyTypes.map((type) => (
            <div
              key={type.id}
              className="rounded-2xl border p-5"
            >
              <div className="text-3xl">{type.icon}</div>

              <h3 className="mt-3 font-semibold">
                {type.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Explore */}
      <section>
        <h2 className="mb-5 text-2xl font-semibold">
          📖 Explore
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "🔥 Most Popular",
            "⭐ Recently Added",
            "🎲 Random Word",
            "❤️ Favorites",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border p-5"
            >
              <h3 className="font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}