import Link from "next/link";
import { notFound } from "next/navigation";
import { words } from "@/data";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

type Props = {
  params: Promise<{
    level: string;
  }>;
};

export default async function LevelPage({ params }: Props) {
  const { level } = await params;

  if (!levels.includes(level as (typeof levels)[number])) {
    notFound();
  }

  const levelWords = words.filter((word) => word.level === level);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/"
        className="text-emerald-600 hover:underline"
      >
        ← Home
      </Link>

      <h1 className="mt-6 text-4xl font-bold">{level}</h1>

      <p className="mt-2 text-slate-500">
        {levelWords.length} Words
      </p>

      <div className="mt-8 grid gap-4">
        {levelWords.map((word) => (
          <Link
            key={word.id}
            href={`/word/${word.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {word.word}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {word.type}
                </p>
              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                {word.level}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}