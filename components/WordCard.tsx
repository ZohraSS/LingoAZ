import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Word } from "@/types/word";
import LevelBadge from "./LevelBadge";
import FavoriteButton from "./FavoriteButton";

interface Props { word: Word; }

export default function WordCard({ word }: Props) {
  return (
    <article className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{word.icon || "📚"}</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{word.word}</h2>
          </div>
          <p className="mt-1 text-sm uppercase tracking-wide text-slate-400">{word.type}</p>
        </div>
        <div className="flex items-center gap-2"><LevelBadge level={word.level} /><FavoriteButton id={word.id} /></div>
      </div>

      <div className="mt-6 space-y-2 text-slate-500 dark:text-slate-400">
        <p><span className="mr-2 font-medium">GB</span>{word.ipaUK || "—"}</p>
        <p><span className="mr-2 font-medium">US</span>{word.ipaUS || "—"}</p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <p><span className="mr-2 font-bold text-blue-500">AZ</span><span className="font-medium text-slate-900 dark:text-white">{word.az || "—"}</span></p>
        <p><span className="mr-2 font-bold text-rose-500">RU</span><span className="font-medium text-slate-900 dark:text-white">{word.ru || "—"}</span></p>
        <p><span className="mr-2 font-bold text-violet-500">FR</span><span className="font-medium text-slate-900 dark:text-white">{word.fr || "—"}</span></p>
        <p><span className="mr-2 font-bold text-amber-500">DE</span><span className="font-medium text-slate-900 dark:text-white">{word.de || "—"}</span></p>
      </div>

      {word.definition && <p className="mt-7 border-t border-slate-200 pt-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">{word.definition}</p>}
      {word.example && <p className="mt-5 border-t border-slate-200 pt-5 text-slate-500 italic dark:border-slate-700 dark:text-slate-400">“{word.example}”</p>}

      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
        <Link href={`/word/${word.id}`} className="flex items-center justify-between font-medium text-blue-500 transition hover:text-blue-400">
          <span>View details</span><ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}