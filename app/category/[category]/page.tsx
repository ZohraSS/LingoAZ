import Link from "next/link";
import { notFound } from "next/navigation";
import { words } from "@/data";
import WordCard from "@/components/WordCard";

const categoryConfig = {
  business: {
    title: "💼 Business",
    description: "Essential English vocabulary for work, business and professional communication.",
    keywords: [
      "business",
      "company",
      "office",
      "job",
      "work",
      "career",
      "manager",
      "management",
      "employee",
      "employer",
      "meeting",
      "project",
      "market",
      "customer",
      "client",
      "sales",
      "finance",
      "money",
      "salary",
      "promotion",
      "leadership",
      "deadline",
      "contract",
      "deal",
    ],
  },

  travel: {
    title: "✈️ Travel",
    description: "Essential English vocabulary for airports, hotels, transport and travelling.",
    keywords: [
      "travel",
      "trip",
      "journey",
      "flight",
      "airport",
      "airline",
      "airplane",
      "hotel",
      "hostel",
      "reservation",
      "booking",
      "passport",
      "visa",
      "luggage",
      "baggage",
      "ticket",
      "train",
      "bus",
      "taxi",
      "car",
      "tour",
      "tourist",
      "tourism",
      "destination",
      "vacation",
      "holiday",
      "beach",
      "city",
      "map",
      "guide",
      "departure",
      "arrival",
      "station",
      "road",
      "trip",
    ],
  },

  health: {
    title: "🏥 Health",
    description: "Useful English vocabulary for health, medicine and wellbeing.",
    keywords: [
      "health",
      "healthy",
      "doctor",
      "hospital",
      "medicine",
      "medical",
      "patient",
      "disease",
      "illness",
      "pain",
      "treatment",
      "symptom",
      "body",
      "exercise",
      "fitness",
      "diet",
      "food",
      "sleep",
      "stress",
      "mental",
      "blood",
      "heart",
      "skin",
      "injury",
      "emergency",
    ],
  },

  education: {
    title: "🎓 Education",
    description: "Essential English vocabulary for school, university and learning.",
    keywords: [
      "education",
      "school",
      "university",
      "college",
      "student",
      "teacher",
      "lesson",
      "class",
      "course",
      "study",
      "learn",
      "learning",
      "exam",
      "test",
      "homework",
      "subject",
      "degree",
      "knowledge",
      "research",
      "academic",
      "library",
      "book",
      "lecture",
      "training",
      "skill",
    ],
  },

  technology: {
    title: "💻 Technology",
    description: "Modern English vocabulary for technology, software, internet and digital life.",
    keywords: [
      "technology",
      "computer",
      "software",
      "hardware",
      "internet",
      "website",
      "application",
      "app",
      "data",
      "database",
      "system",
      "network",
      "security",
      "cyber",
      "digital",
      "online",
      "device",
      "phone",
      "mobile",
      "code",
      "developer",
      "programming",
      "cloud",
      "server",
      "ai",
      "artificial",
      "intelligence",
      "account",
      "password",
      "email",
    ],
  },

  music: {
    title: "🎵 Music",
    description: "English vocabulary related to music, songs, artists and performances.",
    keywords: [
      "music",
      "song",
      "singer",
      "artist",
      "band",
      "album",
      "concert",
      "performance",
      "instrument",
      "guitar",
      "piano",
      "drum",
      "voice",
      "sound",
      "dance",
      "rhythm",
      "melody",
      "record",
      "radio",
      "stage",
      "musician",
    ],
  },

  "daily-life": {
    title: "🏠 Daily Life",
    description: "Everyday English vocabulary for communication and daily activities.",
    keywords: [
      "home",
      "house",
      "family",
      "friend",
      "food",
      "drink",
      "shopping",
      "clothes",
      "morning",
      "evening",
      "day",
      "night",
      "life",
      "time",
      "people",
      "city",
      "street",
      "car",
      "money",
      "phone",
      "message",
      "call",
      "weather",
      "weekend",
      "restaurant",
      "market",
    ],
  },
} as const;

type Category = keyof typeof categoryConfig;

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!(category in categoryConfig)) {
    notFound();
  }

  const config = categoryConfig[category as Category];

  const normalizedKeywords = config.keywords.map((item) =>
    item.toLowerCase()
  );

  // 1. Əvvəl real category field-i ilə axtarırıq
  const exactMatches = words.filter(
    (word) => word.category === category
  );

  // 2. Category field boşdursa, sözün özünə görə uyğunlaşdırırıq
  const keywordMatches = words.filter((word) => {
    const text = [
      word.word,
      word.definition ?? "",
      word.az,
      word.ru,
      ...(word.relatedWords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return normalizedKeywords.some((keyword) =>
      text.includes(keyword)
    );
  });

  // Təkrarları sil + maksimum 100 söz
  const unique = new Map<number, (typeof words)[number]>();

  [...exactMatches, ...keywordMatches].forEach((word) => {
    unique.set(word.id, word);
  });

  const categoryWords = Array.from(unique.values()).slice(0, 100);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/"
          className="mb-8 inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          ← Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-black sm:text-5xl">
            {config.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {config.description}
          </p>

          <div className="mt-5 inline-flex rounded-full bg-emerald-500 px-4 py-2 font-bold text-white">
            {categoryWords.length} words
          </div>
        </div>

        {categoryWords.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-5xl">📚</div>

            <h2 className="mt-5 text-2xl font-bold">
              No vocabulary found
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Vocabulary for this category will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categoryWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
