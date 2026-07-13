interface Props {
  level: string;
}

export default function LevelBadge({ level }: Props) {
  const colors: Record<string, string> = {
    A1: "bg-green-500",
    A2: "bg-lime-500",
    B1: "bg-yellow-500",
    B2: "bg-orange-500",
    C1: "bg-red-500",
    C2: "bg-purple-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
        colors[level]
      }`}
    >
      {level}
    </span>
  );
}