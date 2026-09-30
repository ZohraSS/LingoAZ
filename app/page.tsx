import Link from "next/link";
import { words } from "@/data";
import { categories } from "@/data/categories";
import { vocabularyTypes } from "@/data/types";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const categoryInfo: Record<
  string,
  {
    description: string;
    keywords: string[];
  }
> = {
  business: {
    description: "Work, career, finance and professional English.",
    keywords: [
      "business",
      "company",
      "career",
      "job",
      "salary",
      "manager",
      "employee",
      "office",
      "market",
      "project",
    ],
  },

  travel: {
    description: "Useful vocabulary for trips, transport and holidays.",
    keywords: [
      "travel",
      "trip",
      "flight",
      "airport",
      "hotel",
      "tour",
      "journey",
      "holiday",
      "ticket",
      "passport",
    ],
  },

  health: {
    description: "Health, body, medicine and everyday wellness vocabulary.",
    keywords: [
      "health",
      "healthy",
      "doctor",
      "medicine",
      "hospital",
      "body",
      "pain",
      "medical",
      "exercise",
      "treatment",
    ],
  },

  education: {
    description: "School, university, learning and academic vocabulary.",
    keywords: [
      "education",
      "school",
      "student",
      "teacher",
      "study",
      "university",
      "college",
      "lesson",
      "course",
      "academic",
    ],
  },

  technology: {
    description: "Technology, computers, internet and digital vocabulary.",
    keywords: [
      "technology",
      "computer",
      "internet",
      "software",
      "digital",
      "data",
      "system",
      "website",
      "application",
      "online",
    ],
  },

  music: {
    description: "Music, songs, artists and entertainment vocabulary.",
    keywords: [
      "music",
      "song",
      "sing",
      "singer",
      "melody",
      "sound",
      "band",
      "concert",
      "album",
      "dance",
    ],
  },

  "daily-life": {
    description: "Common vocabulary for everyday life and communication.",
    keywords: [
      "home",
      "family",
      "food",
      "house",
      "morning",
      "daily",
      "friend",
      "people",
      "life",
      "buy",
    ],
  },
};

function getCategoryData(categoryId: string) {
  const info = categoryInfo[categoryId];

  if (!info) {
    return {
      count: 0,
      examples: [],
      description: "Explore useful English vocabulary.",
    };
  }

  const matched = words.filter((word) => {
    const text = [
      word.word,
      word.az,
      word.ru,
      word.definition ?? "",
      word.example ?? "",
      ...word.synonyms,
    ]
      .join(" ")
      .toLowerCase();

    return info.keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );
  });

  return {
    count: matched.length,
    examples: matched.slice(0, 3).map((word) => word.word),
    description: info.description,
  };
}

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

            {categories.map((category) => {

              const data = getCategoryData(category.id);

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >

                  <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {data.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {data.count} vocabulary items
                    </span>

                    <span className="text-lg text-slate-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                  {data.examples.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {data.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  )}

                </Link>
              );
            })}

          </div>
        </section>

        {/* VOCABULARY TYPES */}
        <section className="mb-16">

          <h2 className="mb-8 text-3xl font-bold">
            📝 Vocabulary Types
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {vocabularyTypes.map((type) => {

              const count = words.filter(
                (word) => word.type === type.id
              ).length;

              const descriptions: Record<string, string> = {
                word: "Individual English words with pronunciation and translations.",
                phrase: "Useful groups of words for natural everyday communication.",
                expression: "Common expressions used by native English speakers.",
                "phrasal-verb":
                  "Verb combinations with particles that create new meanings.",
                idiom: "Fixed expressions whose meaning is different from the literal words.",
              };

              return (
                <Link
                  key={type.id}
                  href={`/search?type=${encodeURIComponent(type.id)}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >

                  <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                    {type.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {type.name}
                  </h3>

                  <p className="mt-3 min-h-[60px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {descriptions[type.id] ??
                      "Explore this vocabulary type."}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {count} items
                    </span>

                    <span className="text-lg text-slate-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>

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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/favorites"
              className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                ❤️ Favorites
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Save words you want to learn.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-emerald-600">
                Open Favorites →
              </span>
            </Link>

            <Link
              href="/random"
              className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                🎲 Random Word
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Discover a random vocabulary item.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-emerald-600">
                Try Random →
              </span>
            </Link>

            <Link
              href="/search"
              className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                🔥 Most Popular
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore frequently used vocabulary.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-emerald-600">
                Explore →
              </span>
            </Link>

            <Link
              href="/search"
              className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-semibold">
                ⭐ Recently Added
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Discover the latest vocabulary.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-emerald-600">
                Explore →
              </span>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}