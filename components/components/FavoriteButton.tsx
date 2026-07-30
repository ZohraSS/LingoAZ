"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-2xl transition-transform hover:scale-110"
      aria-label="Toggle favorite"
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}