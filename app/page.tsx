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

const categoryKeywords: Record<string, string[]> = {
  business: [
    "business", "company", "office", "job", "work", "career",
    "manager", "management", "employee", "employer", "meeting",
    "project", "market", "customer", "client", "sales", "finance",
    "salary", "promotion", "leadership", "deadline", "contract",
    "deal", "profit", "boss", "professional",
  ],

  travel: [
    "travel", "trip", "journey", "flight", "airport", "airline",
    "airplane", "hotel", "hostel", "reservation", "booking",
    "passport", "visa", "luggage", "baggage", "ticket", "train",
    "bus", "taxi", "tour", "tourist", "tourism", "destination",
    "vacation", "holiday", "beach", "map", "guide", "departure",
    "arrival", "station", "road", "transport", "suitcase",
  ],

  health: [
    "health", "healthy", "doctor", "hospital", "medicine", "medical",
    "patient", "disease", "illness", "pain", "treatment", "symptom",
    "body", "exercise", "fitness", "diet", "food", "sleep", "stress",
    "mental", "blood", "heart", "skin", "injury", "emergency",
    "clinic", "nurse", "vitamin",
  ],

  education: [
    "education", "school", "university", "college", "student",
    "teacher", "lesson", "class", "course", "study", "learn",
    "learning", "exam", "test", "homework", "subject", "degree",
    "knowledge", "research", "academic", "library", "book",
    "lecture", "training", "skill", "professor", "education",
  ],

  technology: [
    "technology", "computer", "software", "hardware", "internet",
    "website", "application", "app", "data", "database", "system",
    "network", "security", "cyber", "digital", "online", "device",
    "phone", "mobile", "code", "developer", "programming", "cloud",
    "server", "artificial", "intelligence", "account", "password",
    "email",
  ],

  music: [
    "music", "song", "singer", "artist", "band", "album", "concert",
    "performance", "instrument", "guitar", "piano", "drum", "voice",
    "sound", "dance", "rhythm", "melody", "record", "radio", "stage",
    "musician", "lyrics", "playlist", "track",
  ],

  "daily-life": [
    "home", "house", "family", "friend", "food", "drink", "shopping",
    "clothes", "morning", "evening", "day", "night", "life", "time",
    "people", "city", "street", "car", "money", "phone", "message",
    "call", "weather", "weekend", "restaurant", "market", "daily",
  ],
};

function getCategoryWords(categoryId: string) {
  const keywords = categoryKeywords[categoryId] ?? [];

  const exact = words.filter(
    (word) => word.category === categoryId
  );

  const matches = words.filter((word) => {
    const text = [
      word.word,
      word.definition ?? "",
      word.az,
      word.ru,
      ...(word.relatedWords ?? []),
      ...(word.synonyms ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return keywords.some((keyword) => text.includes(keyword));
  });

  const unique = new Map<number, (typeof words)[number]>();

  [...exact, ...matches].forEach((word) => {
    unique.set(word.id, word);
  });

  return Array.from(unique.values()).slice(0, 100);
}

function getTypeWords(typeId: string) {
  return words
    .filter((word) => word.type === typeId)
    .slice(0, 100);
}

function getPopularWords() {
  const popular = words.filter((word) => word.isPopular);

  if (popular.length > 0) {
    return popular.slice(0, 4);
  }

  return words.slice(0, 4);
}

function getRecentWords() {
  const withDates = words.filter((word) => word.createdAt);

  if (withDates.length > 0) {
    return [...withDates]
      .sort((a, b) =>
        (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
      )
      .slice(0, 4);
  }

  return [...words].reverse().slice(0, 4);
}

export default function HomePage() {
  const popularWords = getPopularWords();
  const recentWords = getRecentWords();

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

            {categories.map((category) => {

              const categoryWords = getCategoryWords(category.id);

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >

                  <div className="flex items-start justify-between">
                    <div className="text-5xl">
                      {category.icon}
                    </div>

                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                      {categoryWords.length}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {category.name}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {categoryWords.slice(0, 4).map((word) => (
                      <div
                        key={word.id}
                        className="flex items-center justify-between rounded-xl bg-slate-100/70 px-3 py-2 text-sm dark:bg-slate-800/60"
                      >
                        <span className="font-medium">
                          {word.word}
                        </span>

                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {word.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Explore up to 100 words →
                  </div>

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

              const typeWords = getTypeWords(type.id);

              return (
                <Link
                  key={type.id}
                  href={`/search?type=${encodeURIComponent(type.id)}`}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
                >

                  <div className="flex items-start justify-between">
                    <div className="text-5xl">
                      {type.icon}
                    </div>

                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                      {typeWords.length}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {type.name}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {typeWords.slice(0, 3).map((word) => (
                      <div
                        key={word.id}
                        className="rounded-xl bg-slate-100/70 px-3 py-2 text-sm dark:bg-slate-800/60"
                      >
                        {word.word}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-sm font-semibold text-blue-600 dark:text-blue-400">
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

          <div className="grid gap-5 md:grid-cols-2">

            {/* MOST POPULAR */}
            <Link
              href="/search?popular=true"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
            >

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  🔥 Most Popular
                </h3>

                <span className="text-sm text-emerald-500">
                  View all →
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore popular vocabulary
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {popularWords.map((word) => (
                  <div
                    key={word.id}
                    className="rounded-xl bg-slate-100/70 px-3 py-3 dark:bg-slate-800/60"
                  >
                    <div className="font-semibold">
                      {word.word}
                    </div>

                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {word.az}
                    </div>
                  </div>
                ))}
              </div>

            </Link>

            {/* RECENTLY ADDED */}
            <Link
              href="/search?recent=true"
              className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
            >

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  ⭐ Recently Added
                </h3>

                <span className="text-sm text-blue-500">
                  View all →
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Explore new vocabulary
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {recentWords.map((word) => (
                  <div
                    key={word.id}
                    className="rounded-xl bg-slate-100/70 px-3 py-3 dark:bg-slate-800/60"
                  >
                    <div className="font-semibold">
                      {word.word}
                    </div>

                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {word.az}
                    </div>
                  </div>
                ))}
              </div>

            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}
