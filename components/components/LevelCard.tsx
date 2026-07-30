import Link from "next/link";
import LevelCard from "@/components/LevelCard";

interface Props {
  level: string;
  count: number;
}

const colors: Record<string, string> = {
  A1: "bg-green-500",
  A2: "bg-lime-500",
  B1: "bg-blue-500",
  B2: "bg-orange-500",
  C1: "bg-red-500",
  C2: "bg-purple-600",
};

export default function LevelCard({ level, count }: Props) {
  return (
    <Link href={`/level/${level}`}>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">

        <div className="flex items-center justify-between">

          <span
            className={`rounded-full px-3 py-1 text-sm font-bold text-white ${colors[level]}`}
          >
            {level}
          </span>

          <span className="text-slate-400">
            {count} words
          </span>

        </div>

        <p className="mt-5 text-lg font-semibold">
          Open vocabulary →
        </p>

      </div>
    </Link>
  );
}