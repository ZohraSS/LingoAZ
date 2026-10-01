import fs from "node:fs/promises";

const FILE = "data/vocabulary8000.ts";
const API = "https://api.wiktapi.dev/v1/en/word";
const CONCURRENCY = 8;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractWords(source) {
  return [...source.matchAll(/\bid:\s*(\d+),\s*\n\s*word:\s*"((?:\\.|[^"])*)"/g)]
    .map((m) => ({ id: Number(m[1]), word: JSON.parse(`"${m[2]}"`) }));
}

function clean(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/^[-–—•]+\s*/, "");
}

function collectStrings(value, out = []) {
  if (typeof value === "string") {
    const s = clean(value);
    if (s) out.push(s);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const [key, val] of Object.entries(value)) {
      if (["word", "term", "translation", "translated", "value", "text"].includes(key)) {
        collectStrings(val, out);
      } else if (key === "translations") {
        collectStrings(val, out);
      }
    }
  }
  return out;
}

async function lookup(word, lang) {
  const url = `${API}/${encodeURIComponent(word)}/translations?lang=${lang}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "LingoAZ/1.0 vocabulary-enrichment" },
      });
      if (response.status === 404) return "";
      if (response.status === 429 || response.status >= 500) {
        await sleep(1000 * (attempt + 1));
        continue;
      }
      if (!response.ok) return "";
      const data = await response.json();
      const values = collectStrings(data.translations ?? data);
      const unique = [...new Set(values)].filter(
        (x) => x.toLowerCase() !== word.toLowerCase()
      );
      return unique.slice(0, 3).join(", ");
    } catch {
      await sleep(1000 * (attempt + 1));
    }
  }
  return "";
}

function addField(entry, field, value) {
  if (!value || new RegExp(`\\b${field}:\\s*"`).test(entry)) return entry;
  return entry.replace(
    /(\\n\\s*ru:\s*"[^"]*",)/,
    `$1\\n    ${field}: ${JSON.stringify(value)},`
  );
}

const source = await fs.readFile(FILE, "utf8");
const items = extractWords(source);
let updated = source;
let done = 0;

async function processItem(item) {
  const start = updated;
  const fr = await lookup(item.word, "fr");
  const de = await lookup(item.word, "de");

  const blockStart = updated.indexOf(`id: ${item.id},`);
  if (blockStart < 0) return;

  const nextStart = updated.indexOf("\n  },", blockStart);
  const end = nextStart >= 0 ? nextStart + 5 : updated.length;
  let block = updated.slice(blockStart, end);

  block = addField(block, "fr", fr);
  block = addField(block, "de", de);

  updated = updated.slice(0, blockStart) + block + updated.slice(end);
  done++;
  if (done % 50 === 0) console.log(`Processed ${done}/${items.length}`);
  if (start === updated) return;
}

for (let i = 0; i < items.length; i += CONCURRENCY) {
  await Promise.all(items.slice(i, i + CONCURRENCY).map(processItem));
}

await fs.writeFile(FILE, updated);
console.log(`Finished ${done}/${items.length}`);
