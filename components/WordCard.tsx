import { Word } from "@/types/word";
import LevelBadge from "./LevelBadge";
import FavoriteButton from "./FavoriteButton";

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="break-words text-2xl font-bold text-slate-900 dark:text-white">
            {word.word}
          </h2>

          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-400">
            {word.type}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <FavoriteButton id={word.id} />
          <LevelBadge level={word.level} />
        </div>
      </div>

      <div className="mt-5 space-y-2 text-slate-600 dark:text-slate-400">
        <p>
          <span className="mr-2 text-xs font-bold uppercase text-slate-400">
            GB
          </span>
          {word.ipaUK || "—"}
        </p>

        <p>
          <span className="mr-2 text-xs font-bold uppercase text-slate-400">
            US
          </span>
          {word.ipaUS || "—"}
        </p>
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
        <p className="text-slate-900 dark:text-slate-100">
          <strong className="mr-2 text-blue-500">AZ</strong>
          {word.az || "—"}
        </p>

        <p className="text-slate-900 dark:text-slate-100">
          <strong className="mr-2 text-pink-500">RU</strong>
          {word.ru || "—"}
        </p>

        {word.definition && (
          <p className="pt-3 text-slate-600 dark:text-slate-400">
            {word.definition}
          </p>
        )}

        {word.examples?.[0]?.en && (
          <p className="border-t border-slate-200 pt-4 italic text-slate-500 dark:border-slate-800 dark:text-slate-400">
            “{word.examples[0].en}”
          </p>
        )}

        {word.example && (
          <p className="border-t border-slate-200 pt-4 italic text-slate-500 dark:border-slate-800 dark:text-slate-400">
            “{word.example}”
          </p>
        )}
      </div>
    </article>
  );
}
