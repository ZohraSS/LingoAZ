import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { words } from "@/data";
import { categories } from "@/data/categories";
import type { Category } from "@/types/word";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const categoryKeywords: Record<Category, string[]> = {
  business: [
    "business", "company", "market", "money", "profit", "sale",
    "customer", "client", "manager", "employee", "office", "job",
    "career", "salary", "meeting", "project", "contract", "bank",
    "finance", "investment", "trade", "price", "product", "service",
    "promotion", "leadership", "deadline", "feedback", "strategy",
  ],

  travel: [
    "travel", "trip", "journey", "tour", "flight", "airport",
    "hotel", "hostel", "ticket", "passport", "visa", "luggage",
    "baggage", "destination", "tourist", "tourism", "beach",
    "vacation", "holiday", "reservation", "booking", "train",
    "bus", "taxi", "car", "road", "map", "guide", "visit",
    "departure", "arrival", "boarding", "station", "museum",
    "restaurant", "abroad", "country", "city",
  ],

  health: [
    "health", "healthy", "doctor", "hospital", "medicine",
    "medical", "patient", "disease", "illness", "pain", "fever",
    "body", "heart", "blood", "muscle", "exercise", "diet",
    "food", "sleep", "stress", "emergency", "treatment",
    "therapy", "drug", "injury", "accident", "skin", "head",
    "eye", "ear", "nose", "chest", "knee",
  ],

  education: [
    "education", "school", "student", "teacher", "university",
    "college", "class", "classroom", "lesson", "course", "study",
    "learn", "learning", "exam", "examination", "test", "degree",
    "academic", "research", "book", "paper", "library", "subject",
    "knowledge", "scholarship", "training", "homework",
    "professor", "education",
  ],

  technology: [
    "technology", "computer", "internet", "software", "hardware",
    "application", "app", "website", "system", "data", "database",
    "network", "security", "digital", "online", "device", "phone",
    "mobile", "screen", "keyboard", "program", "code", "developer",
    "server", "cloud", "AI", "artificial", "intelligence",
    "technology", "access", "link", "tool",
  ],

  music: [
    "music", "song", "singer", "artist", "band", "album",
    "concert", "guitar", "piano", "drum", "instrument", "sound",
    "voice", "record", "radio", "dance", "performance",
    "stage", "melody", "rhythm", "track", "listen", "sing",
  ],

  "daily-life": [
    "home", "house", "family", "food", "meal", "breakfast",
    "lunch", "dinner", "morning", "evening", "night", "friend",
    "shopping", "store", "market", "car", "street", "traffic",
    "weather", "clothes", "room", "door", "kitchen", "garden",
    "clean", "cook", "walk", "work", "life", "daily", "time",
    "weekend", "party", "phone",
  ],
};

const categoryNames: Record<Category, string> = {
  business: "Business",
  travel: "Travel",
  health: "Health",
  education: "Education",
  technology: "Technology",
  music: "Music",
  "daily-life": "Daily Life",
};

const categoryDescriptions: Record<Category, string> = {
  business: "Essential English vocabulary for business, work and finance.",
  travel: "Useful English vocabulary for airports, hotels, trips and tourism.",
  health: "Important English vocabulary for health, medicine and wellbeing.",
  education: "Useful English vocabulary for school, university and learning.",
  technology: "Modern English vocabulary for technology, digital life and IT.",
  music: "English vocabulary related to music, songs, artists and performance.",
  "daily-life": "Common English vocabulary used in everyday life.",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryId = category.toLowerCase() as Category;

  const categoryInfo = categories.find(
    (item) => item.id === categoryId
  );

  if (!categoryInfo || !categoryNames[categoryId]) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black">Category not found</h1>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white"
          >
            ← Back Home
          </Link>
        </div>
      </main>
    );
  }

  const keywords = categoryKeywords[categoryId];

  /*
   * First use explicitly assigned categories.
   * If the current dataset does not yet contain category tags,
   * use keyword relevance as a fallback.
   */
  const explicitlyCategorized = words.filter(
    (word) => word.category === categoryId
  );

  const sourceWords =
    explicitlyCategorized.length > 0
      ? explicitlyCategorized
      : words;

  const scoredWords = sourceWords
    .map((word) => {
      const text = [
        word.word,
        word.az,
        word.ru,
        word.definition ?? "",
        ...(word.relatedWords ?? []),
        ...(word.synonyms ?? []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;

      for (const keyword of keywords) {
        const normalizedKeyword = keyword.toLowerCase();

        if (word.word.toLowerCase() === normalizedKeyword) {
          score += 100;
        } else if (word.word.toLowerCase().includes(normalizedKeyword)) {
          score += 50;
        } else if (text.includes(normalizedKeyword)) {
          score += 10;
        }
      }

      if (word.isPopular) {
        score += 20;
      }

      if (word.level === "A1") score += 3;
      if (word.level === "A2") score += 3;
      if (word.level === "B1") score += 2;

      return {
        word,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.word.word.localeCompare(b.word.word);
    })
    .slice(0, 100);

  const categoryWords = scoredWords.map((item) => item.word);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        {/* Header */}
        <section className="mb-10">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-4 text-6xl">
                {categoryInfo.icon}
              </div>

              <h1 className="text-4xl font-black sm:text-5xl">
                {categoryNames[categoryId]}
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                {categoryDescriptions[categoryId]}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5 text-center">
              <div className="text-4xl font-black text-emerald-400">
                {categoryWords.length}
              </div>

              <div className="mt-1 text-sm text-slate-400">
                Vocabulary
              </div>
            </div>

          </div>

        </section>

        {/* Words */}
        {categoryWords.length > 0 ? (
          <section>

            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="text-emerald-400" size={24} />

              <h2 className="text-2xl font-bold">
                {categoryNames[categoryId]} Vocabulary
              </h2>

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                Top {categoryWords.length}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {categoryWords.map((word) => (

                <Link
                  key={word.id}
                  href={`/word/${word.id}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-emerald-500/10"
                >

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="text-xl font-bold transition group-hover:text-emerald-400">
                      {word.word}
                    </h3>

                    <span className="shrink-0 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-black">
                      {word.level}
                    </span>

                  </div>

                  <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                    {word.type.replace("-", " ")}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm text-slate-300">
                    {word.az || word.definition || "English vocabulary"}
                  </p>

                  {word.ipaUK && (
                    <p className="mt-3 text-xs text-slate-500">
                      🇬🇧 {word.ipaUK}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">

                    <span className="text-sm font-medium text-emerald-400">
                      View details
                    </span>

                    <span className="text-lg text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-400">
                      →
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          </section>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
            <div className="text-5xl">📚</div>

            <h2 className="mt-5 text-2xl font-bold">
              Vocabulary is coming soon
            </h2>

            <p className="mt-2 text-slate-400">
              We are preparing vocabulary for this category.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
