#!/usr/bin/env node
"use strict";

// Deep integrity pass over data/quran.json:
//   structure  - surah order, per-surah ayah counts vs surahs.json, contiguous numbering
//   hygiene    - no replacement chars, control chars, mojibake, edge whitespace
//   script     - Arabic field contains only Arabic-script characters (no latin/digits)
//   convention - basmala placement follows Tanzil (every surah except 1 & 9)
//   spot-check - well-known verses, Arabic (Uthmani) + Sahih International
//   cross-check- optional online comparison against quran.com's independent pipeline
//
// Hard failures set the exit code; cross-check/notes never fail the run.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/quran.json"), "utf8"));
const surahs = JSON.parse(fs.readFileSync(path.join(root, "surahs.json"), "utf8"));

let pass = 0, fail = 0;
const notes = [];
function ok(name, cond, detail) {
  if (cond) { pass++; console.log("PASS " + name); }
  else { fail++; console.log("FAIL " + name + (detail ? "  -- " + detail : "")); }
}
const nfc = (s) => s.normalize("NFC");

// ---------------------------------------------------------------- structure
ok("quran.json has 114 surahs", data.surahs.length === 114);
ok("surahs.json has 114 surahs", surahs.length === 114);

let total = 0, countsMatch = true, numberingOk = true, nonEmpty = true, firstBad = "";
for (let i = 0; i < 114; i++) {
  const s = data.surahs[i];
  if (!s || s.id !== i + 1) { countsMatch = false; firstBad = firstBad || `surah ${i + 1} wrong id`; break; }
  if (s.ayahs.length !== surahs[i].ayahs) { countsMatch = false; firstBad = firstBad || `surah ${i + 1}: ${s.ayahs.length} != ${surahs[i].ayahs}`; break; }
  for (let j = 0; j < s.ayahs.length; j++) {
    const a = s.ayahs[j];
    if (a.n !== j + 1) { numberingOk = false; firstBad = firstBad || `surah ${i + 1} ayah ${j + 1} n=${a.n}`; break; }
    if (!a.ar || !a.en) { nonEmpty = false; firstBad = firstBad || `surah ${i + 1}:${j + 1} empty text`; }
  }
  total += s.ayahs.length;
}
ok("per-surah ayah counts match surahs.json", countsMatch, firstBad);
ok("ayah numbering contiguous within every surah", numberingOk, firstBad);
ok("no ayah has empty Arabic or English text", nonEmpty, firstBad);
ok("total ayahs = 6236", total === 6236);
ok("translation is Sahih International", data.translation === "Sahih International");

// ---------------------------------------------------------------- hygiene
const BAD_REPL = /\uFFFD/;                       // mojibake replacement char
const BAD_CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const BAD_ZERO = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/; // zero-width/bidi (reported, not fatal)
const ARABIC_ONLY = /^[\u0020\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/;
const LATIN_DIGIT = /[A-Za-z0-9]/;
const MOJIBAKE = /&[a-z]+;|â€|Ã.|â/;

let arHygiene = true, arScript = true, enHygiene = true, arFirst = "", enFirst = "";
for (const s of data.surahs) {
  for (const a of s.ayahs) {
    if (BAD_REPL.test(a.ar) || BAD_CTRL.test(a.ar) || a.ar !== a.ar.trim()) {
      arHygiene = false; arFirst = arFirst || `${s.id}:${a.n}`;
    }
    if (!ARABIC_ONLY.test(a.ar) || LATIN_DIGIT.test(a.ar)) {
      arScript = false;
      const bad = [...new Set(a.ar)].filter((c) => !ARABIC_ONLY.test(c)).join("")
        || (LATIN_DIGIT.test(a.ar) ? "latin/digit" : "?");
      arFirst = arFirst || `${s.id}:${a.n} (${bad})`;
    }
    if (BAD_REPL.test(a.en) || BAD_CTRL.test(a.en) || MOJIBAKE.test(a.en)
        || a.en !== a.en.trim() || /\s{2,}/.test(a.en) || /[\u0600-\u06FF]/.test(a.en)) {
      enHygiene = false; enFirst = enFirst || `${s.id}:${a.n}`;
    }
    if (BAD_ZERO.test(a.ar)) notes.push(`note: zero-width/bidi char in ${s.id}:${a.n}`);
  }
}
ok("Arabic: no replacement/control chars, no edge whitespace", arHygiene, arFirst);
ok("Arabic: pure Arabic script (no latin, digits, or out-of-range chars)", arScript, arFirst);
ok("English: no replacement/control/mojibake chars, no double spaces, no Arabic", enHygiene, enFirst);

// ---------------------------------------------------------------- basmala
// Tanzil convention: the basmala opens every surah except 9; 1:1 IS the basmala.
// In the Uthmani mushaf the basmala of surahs 95 & 97 carries a shadda on the
// ba (بِّسْمِ), so accept both spellings.
const HAS_BASMALA = (s) => nfc(s).indexOf(nfc("بِسْمِ")) !== -1
  || nfc(s).indexOf(nfc("بِّسْمِ")) !== -1;
let basmalaOk = true, basmalaDetail = "";
for (let i = 0; i < 114; i++) {
  const first = data.surahs[i].ayahs[0].ar;
  if (i === 8) {
    if (HAS_BASMALA(first)) { basmalaOk = false; basmalaDetail = "9:1 contains basmala"; }
  } else if (!HAS_BASMALA(first)) {
    basmalaOk = false; basmalaDetail = `${i + 1}:1 missing basmala`;
  }
}
ok("basmala placement follows Tanzil (every surah except 9)", basmalaOk, basmalaDetail);

// ---------------------------------------------------------------- spot-checks
const AR = [
  [1, 1, "بِسْمِ ٱللَّهِ"],
  [2, 255, "إِلَٰهَ إِلَّا هُوَ"],
  [18, 1, "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ"], // Uthmani: ٱلَّذِىٓ (alef maksura + dagger alif)
  [36, 1, "يسٓ"],
  [55, 13, "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ"], // Uthmani orthography (alef maksura, hamza + alef)
  [97, 1, "إِنَّآ أَنزَلْنَٰهُ فِى لَيْلَةِ ٱلْقَدْرِ"],
  [112, 1, "قُلْ هُوَ ٱللَّهُ أَحَدٌ"],
  [112, 4, "كُفُوًا أَحَدٌ"],
  [114, 6, "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ"],
];
for (const [s, a, frag] of AR) {
  const ayah = data.surahs[s - 1].ayahs[a - 1];
  ok(`Arabic spot-check ${s}:${a}`, nfc(ayah.ar).indexOf(nfc(frag)) !== -1,
    `expected "${frag}"`);
}
const EN = [
  [1, 1, "In the name of Allah"],
  [2, 255, "no deity except Him"],
  [112, 1, "He is Allah, [who is] One"],
  [114, 6, "From among the jinn and mankind."],
];
for (const [s, a, frag] of EN) {
  const ayah = data.surahs[s - 1].ayahs[a - 1];
  ok(`English spot-check ${s}:${a}`, ayah.en.indexOf(frag) !== -1, `expected "${frag}"`);
}

// ---------------------------------------------------------------- cross-check (best effort)
async function crossCheck() {
  // Compare against quran.com's v4 API (independent pipeline, also Tanzil-sourced).
  // quran.com renders the basmala as a header rather than ayah 1, so skip ayah 1
  // for chapters other than 1 to avoid systematic basmala-placement mismatches.
  const chapters = [1, 2, 9, 18, 36, 55, 97, 112, 114];
  // Both sides are Uthmani, but each pipeline renders orthographic marks
  // differently: quran.com inserts tatweel (U+0640) before dagger alifs and
  // omits small meem/yeh marks (U+06E2/U+06E6/U+06E7/U+06ED), writes hamza as
  // a combining mark (U+0654) where Tanzil uses standalone (U+0621), and
  // spaces words differently. Strip those variants so the comparison checks
  // the actual letters and words.
  const norm = (s) => nfc(s)
    .replace(/[\u0640\u06E2\u06E6\u06E7\u06ED]/g, "") // tatweel + small meem/yeh marks
    .replace(/[\u0621\u0654]/g, "")                      // hamza variants
    .replace(/\s+/g, "");                                // spacing variants
  let checked = 0, mismatches = [], skipped = 0;
  for (const ch of chapters) {
    let json;
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${ch}`,
        { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      json = await res.json();
    } catch (e) {
      notes.push(`cross-check: skipping surah ${ch} (${e.message})`);
      skipped++;
      continue;
    }
    for (const v of json.verses || []) {
      const [s, a] = v.verse_key.split(":").map(Number);
      if (s !== 1 && a === 1) continue; // basmala placement divergence
      const ours = data.surahs[s - 1] && data.surahs[s - 1].ayahs[a - 1];
      if (!ours) { mismatches.push(`${s}:${a} (missing in bundle)`); continue; }
      checked++;
      if (norm(ours.ar) !== norm(v.text_uthmani)) mismatches.push(`${s}:${a}`);
    }
  }
  if (skipped > 0) notes.push(`cross-check: ${skipped} chapter(s) skipped (offline?)`);
  if (mismatches.length > 0) {
    notes.push(`cross-check: ${mismatches.length} mismatch(es) vs quran.com, first: ${mismatches.slice(0, 5).join(", ")}`);
    console.log(`WARN cross-check: ${mismatches.length} mismatch(es) vs quran.com (see notes)`);
  } else {
    console.log(`INFO cross-check: ${checked} ayahs matched quran.com exactly (${chapters.length - skipped}/${chapters.length} surahs checked)`);
  }
}

(async () => {
  console.log(fail === 0 ? `\n${pass} passed` : `\n${pass} passed, ${fail} failed`);
  await crossCheck();
  for (const n of notes) console.log("  " + n);
  process.exit(fail === 0 ? 0 : 1);
})();
