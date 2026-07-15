import { Word } from "@/types/word";

import { words as baseWords } from "./words";
import { businessWords } from "./business";

export const words: Word[] = [
  ...baseWords,
  ...businessWords,
];