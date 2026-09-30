import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Word } from "@/types/word";
import LevelBadge from "./LevelBadge";

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props) {
  return (
    <Link href={`/word/${word.id}`} className="group block">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-xl hover:shadow-blue-500/10">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white transition group-hover:text-blue-400">
              {word.word}
            </h2>

            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
              {word.type}
            </p>
          </div>

          <LevelBadge level={word.level} />
        </div>

        <div className="mt-5 space-y-1.5 text-sm">
          <p className="text-slate-400">
            <span className="mr-2 text-slate-500">GB</span>
            {word.ipaUK || "—"}
          </p>

          <p className="text-slate-400">
            <span className="mr-2 text-slate-500">US</span>
            {word.ipaUS || "—"}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <span className="mr-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              AZ
            </span>
            <span className="text-slate-100">
              {word.az || "—"}
            </span>
          </div>

          <div>
            <span className="mr-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              RU
            </span>
            <span className="text-slate-100">
              {word.ru || "—"}
            </span>
          </div>
        </div>

        {word.definition && (
          <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-400">
            {word.definition}
          </p>
        )}

        {(word.example || word.examples?.[0]?.en) && (
          <div className="mt-5 border-t border-slate-800 pt-4">
            <p className="line-clamp-2 text-sm italic text-slate-500">
              “{word.example || word.examples?.[0]?.en}”
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
          <span className="text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
            View details
          </span>

          <ArrowRight
            size={18}
            className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
          />
        </div>

        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition group-hover:bg-blue-500/10" />
      </div>
    </Link>
  );
}
