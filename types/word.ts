export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type WordType =
  | "word"
  | "phrase"
  | "expression"
  | "phrasal-verb"
  | "idiom";

export type Category =
  | "business"
  | "travel"
  | "health"
  | "education"
  | "technology"
  | "music"
  | "daily-life";

export interface Example {
  en: string;
  az: string;
  ru: string;
}

export interface Word {
  id: number;

  word: string;

  type: WordType;

  level: Level;

  category?: Category;

  ipaUK: string;
  ipaUS: string;

  definition?: string;

  az: string;
  ru: string;

  synonyms?: string[];
  antonyms?: string[];

  relatedWords?: string[];

  examples?: Example[];

  example?: string;

  isPopular?: boolean;
  createdAt?: string;
  audio?: string;
}