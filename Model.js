.pragma library

.import "Quran.js" as Quran

var STATE_VERSION = 1

function fileUrlToPath(url) {
  var s = String(url || "")
  if (s.indexOf("file://") === 0) {
    s = s.substring(7)
    if (s.charAt(0) !== "/") s = "/" + s
    try { s = decodeURIComponent(s) } catch (e) {}
  }
  return s
}

// [{ n, ar, en }, ...] for one surah, or [] if the data isn't loaded yet.
function ayahsFor(data, surahId) {
  if (!data || !data.surahs) return []
  var s = data.surahs[surahId - 1]
  if (!s || s.id !== surahId) {
    s = null
    for (var i = 0; i < data.surahs.length; i++) {
      if (data.surahs[i].id === surahId) { s = data.surahs[i]; break }
    }
  }
  return s ? s.ayahs : []
}

function ayahCount(data, surahId) {
  return ayahsFor(data, surahId).length
}

// The basmala opens every surah except 9 (and 1, where it is ayah 1 itself).
// In the bundled text it is prepended to the first ayah, so split it out for
// display: basmalaFor() returns the basmala string, arabicFor() returns the
// ayah text with the basmala prefix removed. The basmala is always the first
// four space-separated words, so no brittle character matching is needed.
var BASMALA_RE = /^ب(?:ّ)?ِسْمِ/

function basmalaFor(data, surahId) {
  if (surahId === 1 || surahId === 9) return ""
  var ayahs = ayahsFor(data, surahId)
  if (!ayahs || ayahs.length === 0) return ""
  var words = (ayahs[0].ar || "").split(" ")
  if (words.length < 4 || !BASMALA_RE.test(words[0])) return ""
  return words.slice(0, 4).join(" ")
}

function arabicFor(data, surahId, ayahN, text) {
  if (ayahN === 1 && surahId !== 1 && surahId !== 9) {
    var b = basmalaFor(data, surahId)
    if (b) return text.slice(b.length).replace(/^\s+/, "")
  }
  return text
}

function clampAyah(data, surahId, ayah) {
  var count = ayahCount(data, surahId)
  if (count <= 0) return 1
  var n = typeof ayah === "number" ? ayah : 1
  if (n < 1) return 1
  if (n > count) return count
  return n
}

// Reads the saved position back, validating against Quran.js and the data.
function parseState(json, data) {
  var parsed = null
  try { parsed = json ? JSON.parse(json) : null } catch (e) { parsed = null }
  var surah = Quran.DEFAULT_SURAH
  var ayah = Quran.DEFAULT_AYAH
  if (parsed && typeof parsed === "object") {
    if (typeof parsed.surah === "number" && Quran.surahById(parsed.surah)) surah = parsed.surah
    if (typeof parsed.ayah === "number" && parsed.ayah >= 1) ayah = parsed.ayah
  }
  ayah = clampAyah(data, surah, ayah)
  return { surah: surah, ayah: ayah }
}

function serializeState(surah, ayah) {
  return JSON.stringify({
    version: STATE_VERSION,
    translation: "Sahih International",
    surah: surah,
    ayah: ayah
  })
}
