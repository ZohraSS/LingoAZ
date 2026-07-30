import Link from "next/link";
import { notFound } from "next/navigation";
import { words } from "@/data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WordPage({ params }: Props) {
  const { id } = await params;

  const word = words.find((w) => w.id === Number(id));

  if (!word) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href={`/level/${word.level}`}
        className="text-emerald-600 hover:underline"
      >
        ← Back
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{word.word}</h1>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            {word.level}
          </span>
        </div>

        <p className="mt-2 text-slate-500">
          {word.type?.toUpperCase()}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">🇬🇧 IPA (UK)</h3>
            <p>{word.ipaUK || "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold">🇺🇸 IPA (US)</h3>
            <p>{word.ipaUS || "-"}</p>
          </div>
        </div>

        {word.definition && (
          <div className="mt-8">
            <h3 className="font-semibold">Definition</h3>
            <p className="mt-2">{word.definition}</p>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">🇦🇿 Azerbaijani</h3>
            <p>{word.az || "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold">🇷🇺 Russian</h3>
            <p>{word.ru || "-"}</p>
          </div>
        </div>

        {(word.synonyms?.length ?? 0) > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold">Synonyms</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {word.synonyms!.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {(word.antonyms?.length ?? 0) > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold">Antonyms</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {word.antonyms!.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {(word.examples?.length ?? 0) > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold">Examples</h3>

            {word.examples!.map((example, index) => (
              <div
                key={index}
                className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800"
              >
                <p>🇬🇧 {example.en}</p>
                <p>🇦🇿 {example.az}</p>
                <p>🇷🇺 {example.ru}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}