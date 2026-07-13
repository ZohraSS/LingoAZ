import { Word } from "@/types/word";
import LevelBadge from "./LevelBadge";

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-blue-500 hover:shadow-blue-500/20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{word.word}</h2>

        <LevelBadge level={word.level} />
      </div>

      <p className="mt-2 text-slate-400">
        🇬🇧 {word.ipaUK}
      </p>

      <p className="text-slate-400">
        🇺🇸 {word.ipaUS}
      </p>

      <div className="mt-5 space-y-2">
        <p>
          <strong>🇦🇿</strong> {word.az}
        </p>

        <p>
          <strong>🇷🇺</strong> {word.ru}
        </p>

        <p>
          <strong>Example:</strong> {word.example}
        </p>
      </div>
    </div>
  );
}