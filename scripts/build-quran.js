#!/usr/bin/env node
"use strict";

// One-shot converter. Not used at runtime.
//
// Usage:
//   node scripts/build-quran.js <ar.json> <en.json> <surahs.json> <data/quran.json>
//   node scripts/build-quran.js --surahs-block <surahs.json>   # print SURAHS array for Quran.js
//
// Sources (download once, keep the files around for rebuilds):
//   ar.json  - https://api.alquran.cloud/v1/quran/quran-uthmani  (tanzil.net Uthmani text)
//   en.json  - https://api.alquran.cloud/v1/quran/en.sahih       (Sahih International)
//   surahs.json - the plugin's surah index (names + ayah counts)
//
// The script validates that both texts are aligned with each other and with
// the index (114 surahs, 6236 ayahs total), then emits data/quran.json in the
// shape Model.js expects:
//   { translation, source, totalAyahs, surahs: [ { id, ayahs: [ { n, ar, en } ] } ] }

const fs = require("fs");

function load(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function surahsBlock(index) {
  const lines = index.map((s) => {
    return `  { id: ${s.id}, name_ar: ${JSON.stringify(s.name_ar)}, name_translit: ${JSON.stringify(s.name_translit)}, ayahs: ${s.ayahs} },`;
  });
  return "var SURAHS = [\n" + lines.join("\n") + "\n]\n";
}

if (process.argv[2] === "--surahs-block") {
  const index = load(process.argv[3]);
  if (index.length !== 114) throw new Error("expected 114 surahs in index");
  process.stdout.write(surahsBlock(index));
  process.exit(0);
}

// Regenerate the SURAHS array inside Quran.js between BEGIN/END markers.
if (process.argv[2] === "--quranjs") {
  const index = load(process.argv[3]);
  const quranJs = process.argv[4];
  if (!quranJs) {
    console.error("usage: build-quran.js --quranjs <surahs.json> <Quran.js>");
    process.exit(2);
  }
  if (index.length !== 114) throw new Error("expected 114 surahs in index");
  const src = fs.readFileSync(quranJs, "utf8");
  const re = /\/\/ BEGIN SURAHS[\s\S]*?\/\/ END SURAHS/;
  if (!re.test(src)) throw new Error("Quran.js is missing the BEGIN SURAHS / END SURAHS markers");
  const block = "// BEGIN SURAHS\n" + surahsBlock(index) + "// END SURAHS";
  fs.writeFileSync(quranJs, src.replace(re, block));
  console.log("updated", quranJs, "SURAHS entries", index.length);
  process.exit(0);
}

const srcAr = process.argv[2];
const srcEn = process.argv[3];
const srcIndex = process.argv[4];
const dest = process.argv[5];
if (!srcAr || !srcEn || !srcIndex || !dest) {
  console.error("usage: build-quran.js <ar.json> <en.json> <surahs.json> <data/quran.json>");
  process.exit(2);
}

const ar = load(srcAr).data.surahs;
const en = load(srcEn).data.surahs;
const index = load(srcIndex);

if (ar.length !== 114 || en.length !== 114) throw new Error("expected 114 surahs in both texts");
if (index.length !== 114) throw new Error("expected 114 surahs in index");

const byId = {};
for (const s of index) byId[s.id] = s;

const out = [];
let total = 0;
for (let i = 0; i < 114; i++) {
  const a = ar[i];
  const e = en[i];
  const meta = byId[a.number];
  if (!meta) throw new Error("index missing surah " + a.number);
  if (a.ayahs.length !== e.ayahs.length) {
    throw new Error("surah " + a.number + ": ar/en ayah count mismatch (" + a.ayahs.length + " vs " + e.ayahs.length + ")");
  }
  if (a.ayahs.length !== meta.ayahs) {
    throw new Error("surah " + a.number + ": index says " + meta.ayahs + ", text has " + a.ayahs.length);
  }
  const ayahs = [];
  for (let v = 0; v < a.ayahs.length; v++) {
    ayahs.push({
      n: v + 1,
      ar: a.ayahs[v].text.replace(/\s+/g, " ").trim(),
      en: e.ayahs[v].text.replace(/\s+/g, " ").trim(),
    });
  }
  out.push({ id: a.number, ayahs });
  total += ayahs.length;
}

if (total !== 6236) throw new Error("total ayahs " + total + " != 6236");

const payload = {
  translation: "Sahih International",
  source: "alquran.cloud (quran-uthmani / en.sahih, tanzil.net texts)",
  totalAyahs: total,
  surahs: out,
};

fs.writeFileSync(dest, JSON.stringify(payload));
console.log("wrote", dest, "surahs", out.length, "ayahs", total, "bytes", fs.statSync(dest).size);
