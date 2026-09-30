"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}

export default function FavoriteButton({ id }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];

    setIsFavorite(saved.includes(id));
  }, [id]);

  function toggleFavorite() {
    const saved = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as number[];

    const updated = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(updated.includes(id));
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      title={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-200 dark:hover:bg-slate-800"
    >
      <Heart
        size={22}
        className={
          isFavorite
            ? "fill-rose-500 text-rose-500"
            : "text-slate-400 hover:text-rose-400"
        }
      />
    </button>
  );
}
