#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function load(name) {
  const src = fs.readFileSync(path.join(__dirname, "..", name), "utf8")
    .split("\n")
    .filter((l) => !l.trim().startsWith(".pragma") && !l.trim().startsWith(".import"))
    .join("\n");
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: name });
  return sandbox;
}

const Q = load("Quran.js");
const M = load("Model.js");
let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name); }
}

ok("114 surahs", Q.SURAHS.length === 114);
ok("al-fatihah 7 ayahs", Q.ayahCount(1) === 7);
ok("al-baqarah 286 ayahs", Q.ayahCount(2) === 286);
ok("an-nas 6 ayahs", Q.ayahCount(114) === 6);

ok("2:255", (() => {
  const p = Q.parseReference("2:255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("2 255", (() => {
  const p = Q.parseReference("2 255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("bare surah number", (() => {
  const p = Q.parseReference("2");
  return p && p.surah === 2 && p.ayah === 1;
})());
ok("three digits not surah:ayah", Q.parseReference("999") === null);
ok("al-baqarah 255", (() => {
  const p = Q.parseReference("al-baqarah 255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("baqarah 255 (no article)", (() => {
  const p = Q.parseReference("baqarah 255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("Arabic البقرة 255", (() => {
  const p = Q.parseReference("البقرة 255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("glued baqarah255", (() => {
  const p = Q.parseReference("baqarah255");
  return p && p.surah === 2 && p.ayah === 255;
})());
ok("yasin 5", (() => {
  const p = Q.parseReference("yasin 5");
  return p && p.surah === 36 && p.ayah === 5;
})());
ok("iqra alias", Q.parseReference("iqra").surah === 96);
ok("kahf 18", (() => {
  const p = Q.parseReference("kahf 18");
  return p && p.surah === 18 && p.ayah === 18;
})());
ok("al-falaq 3", (() => {
  const p = Q.parseReference("al-falaq 3");
  return p && p.surah === 113 && p.ayah === 3;
})());
ok("an-nas 6", (() => {
  const p = Q.parseReference("an-nas 6");
  return p && p.surah === 114 && p.ayah === 6;
})());
ok("out-of-range ayah clamped", (() => {
  const p = Q.parseReference("2:999");
  return p && p.surah === 2 && p.ayah === 286;
})());
ok("invalid surah name", Q.parseReference("zzz 99") === null);
ok("invalid surah number", Q.parseReference("999") === null);
ok("empty input", Q.parseReference("") === null);

ok("next ayah within surah", (() => {
  const n = Q.nextAyah(1, 1);
  return n.surah === 1 && n.ayah === 2;
})());
ok("next ayah wraps to next surah", (() => {
  const n = Q.nextAyah(1, 7);
  return n.surah === 2 && n.ayah === 1;
})());
ok("next ayah wraps 114 -> 1", (() => {
  const n = Q.nextAyah(114, 6);
  return n.surah === 1 && n.ayah === 1;
})());
ok("prev ayah within surah", (() => {
  const n = Q.prevAyah(2, 1);
  return n.surah === 1 && n.ayah === 7;
})());
ok("prev ayah wraps 1 -> 114", (() => {
  const n = Q.prevAyah(1, 1);
  return n.surah === 114 && n.ayah === 6;
})());
ok("next surah wraps", Q.nextSurah(114) === 1);
ok("prev surah wraps", Q.prevSurah(1) === 114);
ok("compact ref", Q.formatRef(2, 255, true) === "2:255");
ok("full ref", Q.formatRef(2, 255, false) === "Al-Baqarah 2:255");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data/quran.json"), "utf8"));
ok("quran.json 114 surahs", data.surahs.length === 114);
ok("quran.json 6236 ayahs", data.totalAyahs === 6236);
ok("translation is sahih", data.translation === "Sahih International");

// Tanzil's Uthmani text orders shadda before the vowel; NFC reorders combining
// marks canonically, so normalize both sides before substring checks.
const nfc = (s) => s.normalize("NFC");

// every surah in the data file must match the index in Quran.js
let dataTotal = 0;
let countsMatch = true;
for (let i = 0; i < 114; i++) {
  const s = data.surahs[i];
  if (s.id !== i + 1) { countsMatch = false; break; }
  if (s.ayahs.length !== Q.ayahCount(s.id)) { countsMatch = false; break; }
  dataTotal += s.ayahs.length;
}
ok("data surah order/counts match Quran.js", countsMatch);
ok("data total matches", dataTotal === 6236);

ok("spot check 2:255 (ayat al-kursi)", (() => {
  const b = data.surahs[1].ayahs[254];
  return b.n === 255 && nfc(b.ar).indexOf(nfc("إِلَٰهَ إِلَّا هُوَ")) !== -1;
})());
ok("spot check 112:1 (al-ikhlas)", (() => {
  const s = data.surahs[111].ayahs[0];
  return nfc(s.ar).indexOf(nfc("قُلْ هُوَ ٱللَّهُ أَحَدٌ")) !== -1;
})());
ok("spot check 1:1 (basmala)", (() => {
  const s = data.surahs[0].ayahs[0];
  return nfc(s.ar).indexOf(nfc("بِسْمِ ٱللَّهِ")) !== -1 && s.en.indexOf("In the name of Allah") !== -1;
})());

// basmala splitting: the basmala is prepended to ayah 1 in the bundle, but
// the panel shows it as a separate header. basmalaFor() extracts it,
// arabicFor() returns the ayah text without it.
const BAS = nfc("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
ok("basmala: none for surah 1 (1:1 is the basmala)", M.basmalaFor(data, 1) === "");
ok("basmala: none for surah 9", M.basmalaFor(data, 9) === "");
ok("basmala: extracted for surah 2", nfc(M.basmalaFor(data, 2)) === BAS);
ok("basmala: shadda variant for surah 97", nfc(M.basmalaFor(data, 97)).indexOf(nfc("بِّسْمِ")) === 0);
ok("basmala: present in all surahs except 1 and 9", (() => {
  for (let s = 1; s <= 114; s++) {
    const want = s !== 1 && s !== 9;
    if ((M.basmalaFor(data, s) !== "") !== want) return false;
  }
  return true;
})());
ok("basmala: stripped from ayah 1 of surah 2", nfc(M.arabicFor(data, 2, 1, data.surahs[1].ayahs[0].ar)) === nfc("الٓمٓ"));
ok("basmala: ayah 1 of surah 1 kept intact", M.arabicFor(data, 1, 1, data.surahs[0].ayahs[0].ar) === data.surahs[0].ayahs[0].ar);
ok("basmala: non-first ayahs untouched", M.arabicFor(data, 2, 2, data.surahs[1].ayahs[1].ar) === data.surahs[1].ayahs[1].ar);
ok("basmala: every stripped ayah 1 is non-empty", (() => {
  for (let s = 2; s <= 114; s++) {
    if (s === 9) continue;
    if (M.arabicFor(data, s, 1, data.surahs[s - 1].ayahs[0].ar).trim() === "") return false;
  }
  return true;
})());

console.log(fail === 0 ? `\n${pass} passed` : `\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
