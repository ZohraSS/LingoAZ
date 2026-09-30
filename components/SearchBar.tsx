"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ value = "", onChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(
    value || searchParams.get("q") || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim();

      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/search");
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, router]);

  function handleChange(value: string) {
    setQuery(value);
    onChange?.(value);
  }

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="🔍 Search any word..."
        className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />
    </div>
  );
}
