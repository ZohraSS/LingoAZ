import { Word } from "@/types/word";

import { words as baseWords } from "./words";
import { businessWords } from "./business";
import { vocabulary8000 } from "./vocabulary8000";

const allWords: Word[] = [
  ...baseWords,
  ...businessWords,
  ...vocabulary8000,
];

const seen = new Set<string>();

export const words: Word[] = allWords.filter((word) => {
  const key = word.word.trim().toLowerCase();

  if (seen.has(key)) {
    return false;
  }

  seen.add(key);
  return true;
});

export const totalWords = words.length;
