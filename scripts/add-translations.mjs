import fs from "node:fs";
import https from "node:https";

const FILE = "data/vocabulary8000.ts";

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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

function translate(text, target) {
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&sl=en" +
    `&tl=${target}` +
    "&dt=t" +
    `&q=${encodeURIComponent(text)}`;

  return download(url).then((data) => {
    const json = JSON.parse(data);

    if (!Array.isArray(json) || !Array.isArray(json[0])) {
      return "";
    }

    return json[0]
      .map((item) => item?.[0] || "")
      .join("")
      .trim();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const text = fs.readFileSync(FILE, "utf8");

const entries = [
  ...text.matchAll(
    /(\s+word:\s*"([^"]+)",[\s\S]*?\s+az:\s*)"([^"]*)",([\s\S]*?\s+ru:\s*)"([^"]*)",/g
  ),
];

console.log("=================================");
console.log("LingoAZ Translation Builder");
console.log("=================================");
console.log(`Entries found: ${entries.length}`);

let updated = text;

const BATCH_SIZE = 40;

for (let start = 0; start < entries.length; start += BATCH_SIZE) {
  const batch = entries.slice(start, start + BATCH_SIZE);

  const words = batch.map((match) => match[2]);

  const input = words.join("\n");

  console.log(
    `Translating ${start + 1}-${Math.min(
      start + BATCH_SIZE,
      entries.length
    )} / ${entries.length}`
  );

  let azText = "";
  let ruText = "";

  try {
    azText = await translate(input, "az");
    await sleep(700);

    ruText = await translate(input, "ru");
    await sleep(700);
  } catch (error) {
    console.error("Translation error:", error.message);
    continue;
  }

  const azLines = azText
    .split(/\r?\n/)
    .map((x) => x.trim());

  const ruLines = ruText
    .split(/\r?\n/)
    .map((x) => x.trim());

  for (let i = 0; i < batch.length; i++) {
    const match = batch[i];

    const az = azLines[i] || "";
    const ru = ruLines[i] || "";

    if (!az && !ru) continue;

    const oldBlock = match[0];

    const newBlock = oldBlock
      .replace(
        `az: "${match[3]}"`,
        `az: "${az.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
      )
      .replace(
        `ru: "${match[5]}"`,
        `ru: "${ru.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
      );

    updated = updated.replace(oldBlock, newBlock);
  }
}

fs.writeFileSync(FILE, updated, "utf8");

const finalText = fs.readFileSync(FILE, "utf8");

const emptyAZ = (
  finalText.match(/az:\s*""/g) || []
).length;

const emptyRU = (
  finalText.match(/ru:\s*""/g) || []
).length;

console.log("");
console.log("=================================");
console.log("TRANSLATION COMPLETE");
console.log("=================================");
console.log(`Empty AZ: ${emptyAZ}`);
console.log(`Empty RU: ${emptyRU}`);
console.log("Updated:", FILE);
console.log("=================================");
