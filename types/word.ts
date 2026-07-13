export type WordType = "word" | "phrase" | "expression";

export interface Word {
  id: number;
  type: WordType;

  word: string;

  ipaUK: string;
  ipaUS: string;

  az: string;
  ru: string;

  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

  synonyms: string[];
  antonyms: string[];

  example: string;
}