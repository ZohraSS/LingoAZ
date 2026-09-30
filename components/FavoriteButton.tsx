"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}

export default function FavoriteButton({ id }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as number[];

      setIsFavorite(saved.includes(id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  function toggleFavorite() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as number[];

      const updated = saved.includes(id)
        ? saved.filter((item) => item !== id)
        : [...saved, id];

      localStorage.setItem("favorites", JSON.stringify(updated));

      setIsFavorite(updated.includes(id));

      window.dispatchEvent(new Event("favorites-updated"));
    } catch {
      // ignore localStorage errors
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <Heart
        size={22}
        className={
          isFavorite
            ? "fill-pink-500 text-pink-500"
            : "text-slate-400 transition hover:text-pink-500"
        }
      />
    </button>
  );
}