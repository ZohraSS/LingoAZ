import fs from "node:fs";
import https from "node:https";

const CEFR_URL =
  "https://raw.githubusercontent.com/Maximax67/Words-CEFR-Dataset/main/datasets/word_list_cefr.csv";

const C1C2_URL =
  "https://raw.githubusercontent.com/openlanguageprofiles/olp-en-cefrj/master/octanove-vocabulary-profile-c1c2-1.0.csv";

const FREQUENCY_URL =
  "https://raw.githubusercontent.com/Maximax67/English-Valid-Words/main/valid_words_sorted_by_frequency.csv";

const TOTAL_TARGET = 8000;

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        return resolve(download(res.headers.location));
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }

      let data = "";

      res.setEncoding("utf8");

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function clean(value) {
  return String(value ?? "")
    .replace(/^\uFEFF/, "")
    .trim();
}

function normalize(word) {
  return clean(word)
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function escape(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function typeFromPos(pos = "") {
  const p = pos.toLowerCase();

  if (
    p.includes("phrase") ||
    p.includes("expression") ||
    p.includes("idiom")
  ) {
    return "expression";
  }

  return "word";
}

function parseCEFR(csv) {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const result = [];

  for (const line of lines.slice(1)) {
    const parts = line.split(";");

    const word = clean(parts[0]);
    const pos = clean(parts[1]);
    const level = clean(parts[2]);

    if (!word) continue;

    if (
      !["A1", "A2", "B1", "B2", "C1", "C2"].includes(level)
    ) {
      continue;
    }

    result.push({
      word,
      pos,
      level,
    });
  }

  return result;
}

function parseC1C2(csv) {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const result = [];

  for (const line of lines.slice(1)) {
    const parts = line.split(",");

    const word = clean(parts[0]);
    const pos = clean(parts[1]);
    const level = clean(parts[2]);

    if (!word) continue;

    if (!["C1", "C2"].includes(level)) {
      continue;
    }

    result.push({
      word,
      pos,
      level,
    });
  }

  return result;
}

function parseFrequency(csv) {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const result = [];

  for (const line of lines.slice(1)) {
    const parts = line.split(",");
    const word = clean(parts[1]);

    if (word) {
      result.push(word);
    }
  }

  return result;
}

const wordsFile = fs.readFileSync("data/words.ts", "utf8");
const businessFile = fs.readFileSync("data/business.ts", "utf8");

const existingWords = [
  ...wordsFile.matchAll(/word:\s*"([^"]+)"/g),
].map((match) => match[1]);

const businessWords = [
  ...businessFile.matchAll(/word:\s*"([^"]+)"/g),
].map((match) => match[1]);

const protectedWords = [
  ...existingWords,
  ...businessWords,
];

const protectedSet = new Set(
  protectedWords.map(normalize)
);

const requiredNewWords =
  TOTAL_TARGET - protectedSet.size;

console.log("=================================");
console.log("LingoAZ 8,000 Vocabulary Builder");
console.log("=================================");
console.log(`Existing raw entries: ${protectedWords.length}`);
console.log(`Existing unique: ${protectedSet.size}`);
console.log(`New required: ${requiredNewWords}`);
console.log("");

console.log("Downloading CEFR dataset...");
const cefrCSV = await download(CEFR_URL);
const cefrRows = parseCEFR(cefrCSV);

console.log(`CEFR entries: ${cefrRows.length}`);

console.log("Downloading C1/C2 dataset...");
const c1c2CSV = await download(C1C2_URL);
const c1c2Rows = parseC1C2(c1c2CSV);

console.log(`C1/C2 entries: ${c1c2Rows.length}`);

console.log("Downloading frequency dataset...");
const frequencyCSV = await download(FREQUENCY_URL);
const frequencyWords = parseFrequency(frequencyCSV);

console.log(`Frequency entries: ${frequencyWords.length}`);

const cefrMap = new Map();

for (const row of cefrRows) {
  const key = normalize(row.word);

  if (!cefrMap.has(key)) {
    cefrMap.set(key, row);
  }
}

const selected = [];
const selectedSet = new Set(protectedSet);

/*
 * 1. C1/C2 first.
 */
for (const row of c1c2Rows) {
  const key = normalize(row.word);

  if (!key || selectedSet.has(key)) {
    continue;
  }

  selected.push({
    word: row.word,
    type: typeFromPos(row.pos),
    level: row.level,
  });

  selectedSet.add(key);

  if (selected.length >= requiredNewWords) {
    break;
  }
}

/*
 * 2. A1-B2 CEFR vocabulary.
 */
if (selected.length < requiredNewWords) {
  for (const row of cefrRows) {
    if (!["A1", "A2", "B1", "B2"].includes(row.level)) {
      continue;
    }

    const key = normalize(row.word);

    if (!key || selectedSet.has(key)) {
      continue;
    }

    selected.push({
      word: row.word,
      type: typeFromPos(row.pos),
      level: row.level,
    });

    selectedSet.add(key);

    if (selected.length >= requiredNewWords) {
      break;
    }
  }
}

/*
 * 3. Frequency fallback only if needed.
 */
if (selected.length < requiredNewWords) {
  for (const word of frequencyWords) {
    const key = normalize(word);

    if (!key || selectedSet.has(key)) {
      continue;
    }

    if (
      key.length < 2 ||
      !/^[a-z][a-z'-]*$/i.test(key)
    ) {
      continue;
    }

    const cefr = cefrMap.get(key);

    selected.push({
      word,
      type: "word",
      level: cefr?.level ?? "B2",
    });

    selectedSet.add(key);

    if (selected.length >= requiredNewWords) {
      break;
    }
  }
}

if (selected.length !== requiredNewWords) {
  throw new Error(
    `Could only create ${selected.length} unique words. Required ${requiredNewWords}.`
  );
}

const output = [];

output.push(`import type { Word } from "@/types/word";`);
output.push("");
output.push(`export const vocabulary8000: Word[] = [`);

const firstId = protectedWords.length + 1;

selected.forEach((item, index) => {
  output.push(`  {`);
  output.push(`    id: ${firstId + index},`);
  output.push(`    word: "${escape(item.word)}",`);
  output.push(`    type: "${item.type}",`);
  output.push(`    level: "${item.level}",`);
  output.push(`    ipaUK: "",`);
  output.push(`    ipaUS: "",`);
  output.push(`    definition: "",`);
  output.push(`    az: "",`);
  output.push(`    ru: "",`);
  output.push(`    synonyms: [],`);
  output.push(`    antonyms: [],`);
  output.push(`    relatedWords: [],`);
  output.push(`    examples: [],`);
  output.push(`    example: "",`);
  output.push(`    isPopular: false,`);
  output.push(`  },`);
});

output.push(`];`);
output.push("");

fs.writeFileSync(
  "data/vocabulary8000.ts",
  output.join("\n"),
  "utf8"
);

const finalCounts = {
  A1: 0,
  A2: 0,
  B1: 0,
  B2: 0,
  C1: 0,
  C2: 0,
};

for (const item of selected) {
  finalCounts[item.level]++;
}

console.log("");
console.log("=================================");
console.log("GENERATION COMPLETE");
console.log("=================================");
console.log(`Existing unique: ${protectedSet.size}`);
console.log(`Generated: ${selected.length}`);
console.log(`Final unique: ${selectedSet.size}`);
console.log("");
console.log("Generated level distribution:");
console.log(`A1: ${finalCounts.A1}`);
console.log(`A2: ${finalCounts.A2}`);
console.log(`B1: ${finalCounts.B1}`);
console.log(`B2: ${finalCounts.B2}`);
console.log(`C1: ${finalCounts.C1}`);
console.log(`C2: ${finalCounts.C2}`);
console.log("");
console.log(`IDs: ${firstId} - ${firstId + selected.length - 1}`);
console.log("Created: data/vocabulary8000.ts");
console.log("=================================");
