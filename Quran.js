.pragma library

// Surah metadata (names + ayah counts). Regenerated from surahs.json by
// scripts/build-quran.js --quranjs — do not edit by hand.
// BEGIN SURAHS
var SURAHS = [
  { id: 1, name_ar: "الفاتحة", name_translit: "Al-Fatihah", ayahs: 7 },
  { id: 2, name_ar: "البقرة", name_translit: "Al-Baqarah", ayahs: 286 },
  { id: 3, name_ar: "آل عمران", name_translit: "Aal-i-Imran", ayahs: 200 },
  { id: 4, name_ar: "النساء", name_translit: "An-Nisa", ayahs: 176 },
  { id: 5, name_ar: "المائدة", name_translit: "Al-Maidah", ayahs: 120 },
  { id: 6, name_ar: "الأنعام", name_translit: "Al-Anam", ayahs: 165 },
  { id: 7, name_ar: "الأعراف", name_translit: "Al-Araf", ayahs: 206 },
  { id: 8, name_ar: "الأنفال", name_translit: "Al-Anfal", ayahs: 75 },
  { id: 9, name_ar: "التوبة", name_translit: "At-Tawbah", ayahs: 129 },
  { id: 10, name_ar: "يونس", name_translit: "Yunus", ayahs: 109 },
  { id: 11, name_ar: "هود", name_translit: "Hud", ayahs: 123 },
  { id: 12, name_ar: "يوسف", name_translit: "Yusuf", ayahs: 111 },
  { id: 13, name_ar: "الرعد", name_translit: "Ar-Rad", ayahs: 43 },
  { id: 14, name_ar: "ابراهيم", name_translit: "Ibrahim", ayahs: 52 },
  { id: 15, name_ar: "الحجر", name_translit: "Al-Hijr", ayahs: 99 },
  { id: 16, name_ar: "النحل", name_translit: "An-Nahl", ayahs: 128 },
  { id: 17, name_ar: "الإسراء", name_translit: "Al-Isra", ayahs: 111 },
  { id: 18, name_ar: "الكهف", name_translit: "Al-Kahf", ayahs: 110 },
  { id: 19, name_ar: "مريم", name_translit: "Maryam", ayahs: 98 },
  { id: 20, name_ar: "طه", name_translit: "Ta-Ha", ayahs: 135 },
  { id: 21, name_ar: "الأنبياء", name_translit: "Al-Anbiya", ayahs: 112 },
  { id: 22, name_ar: "الحج", name_translit: "Al-Hajj", ayahs: 78 },
  { id: 23, name_ar: "المؤمنون", name_translit: "Al-Muminun", ayahs: 118 },
  { id: 24, name_ar: "النور", name_translit: "An-Nur", ayahs: 64 },
  { id: 25, name_ar: "الفرقان", name_translit: "Al-Furqan", ayahs: 77 },
  { id: 26, name_ar: "الشعراء", name_translit: "Ash-Shuara", ayahs: 227 },
  { id: 27, name_ar: "النمل", name_translit: "An-Naml", ayahs: 93 },
  { id: 28, name_ar: "القصص", name_translit: "Al-Qasas", ayahs: 88 },
  { id: 29, name_ar: "العنكبوت", name_translit: "Al-Ankabut", ayahs: 69 },
  { id: 30, name_ar: "الروم", name_translit: "Ar-Rum", ayahs: 60 },
  { id: 31, name_ar: "لقمان", name_translit: "Luqman", ayahs: 34 },
  { id: 32, name_ar: "السجدة", name_translit: "As-Sajdah", ayahs: 30 },
  { id: 33, name_ar: "الأحزاب", name_translit: "Al-Ahzab", ayahs: 73 },
  { id: 34, name_ar: "سبإ", name_translit: "Saba", ayahs: 54 },
  { id: 35, name_ar: "فاطر", name_translit: "Fatir", ayahs: 45 },
  { id: 36, name_ar: "يس", name_translit: "Ya-Sin", ayahs: 83 },
  { id: 37, name_ar: "الصافات", name_translit: "As-Saffat", ayahs: 182 },
  { id: 38, name_ar: "ص", name_translit: "Sad", ayahs: 88 },
  { id: 39, name_ar: "الزمر", name_translit: "Az-Zumar", ayahs: 75 },
  { id: 40, name_ar: "غافر", name_translit: "Ghafir", ayahs: 85 },
  { id: 41, name_ar: "فصلت", name_translit: "Fussilat", ayahs: 54 },
  { id: 42, name_ar: "الشورى", name_translit: "Ash-Shura", ayahs: 53 },
  { id: 43, name_ar: "الزخرف", name_translit: "Az-Zukhruf", ayahs: 89 },
  { id: 44, name_ar: "الدخان", name_translit: "Ad-Dukhan", ayahs: 59 },
  { id: 45, name_ar: "الجاثية", name_translit: "Al-Jathiyah", ayahs: 37 },
  { id: 46, name_ar: "الأحقاف", name_translit: "Al-Ahqaf", ayahs: 35 },
  { id: 47, name_ar: "محمد", name_translit: "Muhammad", ayahs: 38 },
  { id: 48, name_ar: "الفتح", name_translit: "Al-Fath", ayahs: 29 },
  { id: 49, name_ar: "الحجرات", name_translit: "Al-Hujurat", ayahs: 18 },
  { id: 50, name_ar: "ق", name_translit: "Qaf", ayahs: 45 },
  { id: 51, name_ar: "الذاريات", name_translit: "Adh-Dhariyat", ayahs: 60 },
  { id: 52, name_ar: "الطور", name_translit: "At-Tur", ayahs: 49 },
  { id: 53, name_ar: "النجم", name_translit: "An-Najm", ayahs: 62 },
  { id: 54, name_ar: "القمر", name_translit: "Al-Qamar", ayahs: 55 },
  { id: 55, name_ar: "الرحمن", name_translit: "Ar-Rahman", ayahs: 78 },
  { id: 56, name_ar: "الواقعة", name_translit: "Al-Waqiah", ayahs: 96 },
  { id: 57, name_ar: "الحديد", name_translit: "Al-Hadid", ayahs: 29 },
  { id: 58, name_ar: "المجادلة", name_translit: "Al-Mujadila", ayahs: 22 },
  { id: 59, name_ar: "الحشر", name_translit: "Al-Hashr", ayahs: 24 },
  { id: 60, name_ar: "الممتحنة", name_translit: "Al-Mumtahanah", ayahs: 13 },
  { id: 61, name_ar: "الصف", name_translit: "As-Saff", ayahs: 14 },
  { id: 62, name_ar: "الجمعة", name_translit: "Al-Jumuah", ayahs: 11 },
  { id: 63, name_ar: "المنافقون", name_translit: "Al-Munafiqun", ayahs: 11 },
  { id: 64, name_ar: "التغابن", name_translit: "At-Taghabun", ayahs: 18 },
  { id: 65, name_ar: "الطلاق", name_translit: "At-Talaq", ayahs: 12 },
  { id: 66, name_ar: "التحريم", name_translit: "At-Tahrim", ayahs: 12 },
  { id: 67, name_ar: "الملك", name_translit: "Al-Mulk", ayahs: 30 },
  { id: 68, name_ar: "القلم", name_translit: "Al-Qalam", ayahs: 52 },
  { id: 69, name_ar: "الحاقة", name_translit: "Al-Haqqah", ayahs: 52 },
  { id: 70, name_ar: "المعارج", name_translit: "Al-Maarij", ayahs: 44 },
  { id: 71, name_ar: "نوح", name_translit: "Nuh", ayahs: 28 },
  { id: 72, name_ar: "الجن", name_translit: "Al-Jinn", ayahs: 28 },
  { id: 73, name_ar: "المزمل", name_translit: "Al-Muzzammil", ayahs: 20 },
  { id: 74, name_ar: "المدثر", name_translit: "Al-Muddaththir", ayahs: 56 },
  { id: 75, name_ar: "القيامة", name_translit: "Al-Qiyamah", ayahs: 40 },
  { id: 76, name_ar: "الانسان", name_translit: "Al-Insan", ayahs: 31 },
  { id: 77, name_ar: "المرسلات", name_translit: "Al-Mursalat", ayahs: 50 },
  { id: 78, name_ar: "النبإ", name_translit: "An-Naba", ayahs: 40 },
  { id: 79, name_ar: "النازعات", name_translit: "An-Naziat", ayahs: 46 },
  { id: 80, name_ar: "عبس", name_translit: "Abasa", ayahs: 42 },
  { id: 81, name_ar: "التكوير", name_translit: "At-Takwir", ayahs: 29 },
  { id: 82, name_ar: "الإنفطار", name_translit: "Al-Infitar", ayahs: 19 },
  { id: 83, name_ar: "المطففين", name_translit: "Al-Mutaffifin", ayahs: 36 },
  { id: 84, name_ar: "الإنشقاق", name_translit: "Al-Inshiqaq", ayahs: 25 },
  { id: 85, name_ar: "البروج", name_translit: "Al-Buruj", ayahs: 22 },
  { id: 86, name_ar: "الطارق", name_translit: "At-Tariq", ayahs: 17 },
  { id: 87, name_ar: "الأعلى", name_translit: "Al-Ala", ayahs: 19 },
  { id: 88, name_ar: "الغاشية", name_translit: "Al-Ghashiyah", ayahs: 26 },
  { id: 89, name_ar: "الفجر", name_translit: "Al-Fajr", ayahs: 30 },
  { id: 90, name_ar: "البلد", name_translit: "Al-Balad", ayahs: 20 },
  { id: 91, name_ar: "الشمس", name_translit: "Ash-Shams", ayahs: 15 },
  { id: 92, name_ar: "الليل", name_translit: "Al-Layl", ayahs: 21 },
  { id: 93, name_ar: "الضحى", name_translit: "Ad-Duhaa", ayahs: 11 },
  { id: 94, name_ar: "الشرح", name_translit: "Ash-Sharh", ayahs: 8 },
  { id: 95, name_ar: "التين", name_translit: "At-Tin", ayahs: 8 },
  { id: 96, name_ar: "العلق", name_translit: "Al-Alaq", ayahs: 19 },
  { id: 97, name_ar: "القدر", name_translit: "Al-Qadr", ayahs: 5 },
  { id: 98, name_ar: "البينة", name_translit: "Al-Bayyinah", ayahs: 8 },
  { id: 99, name_ar: "الزلزلة", name_translit: "Az-Zalzalah", ayahs: 8 },
  { id: 100, name_ar: "العاديات", name_translit: "Al-Adiyat", ayahs: 11 },
  { id: 101, name_ar: "القارعة", name_translit: "Al-Qariah", ayahs: 11 },
  { id: 102, name_ar: "التكاثر", name_translit: "At-Takathur", ayahs: 8 },
  { id: 103, name_ar: "العصر", name_translit: "Al-Asr", ayahs: 3 },
  { id: 104, name_ar: "الهمزة", name_translit: "Al-Humazah", ayahs: 9 },
  { id: 105, name_ar: "الفيل", name_translit: "Al-Fil", ayahs: 5 },
  { id: 106, name_ar: "قريش", name_translit: "Quraysh", ayahs: 4 },
  { id: 107, name_ar: "الماعون", name_translit: "Al-Maun", ayahs: 7 },
  { id: 108, name_ar: "الكوثر", name_translit: "Al-Kawthar", ayahs: 3 },
  { id: 109, name_ar: "الكافرون", name_translit: "Al-Kafirun", ayahs: 6 },
  { id: 110, name_ar: "النصر", name_translit: "An-Nasr", ayahs: 3 },
  { id: 111, name_ar: "المسد", name_translit: "Al-Masad", ayahs: 5 },
  { id: 112, name_ar: "الإخلاص", name_translit: "Al-Ikhlas", ayahs: 4 },
  { id: 113, name_ar: "الفلق", name_translit: "Al-Falaq", ayahs: 5 },
  { id: 114, name_ar: "الناس", name_translit: "An-Nas", ayahs: 6 },
]
// END SURAHS

var DEFAULT_SURAH = 1
var DEFAULT_AYAH = 1

// Common alternate transliterations (and Arabic spellings) that don't match
// the canonical name_translit above. Keys are normalized by _key().
var ALIAS_EXTRAS = {
  "fateha": 1, "fatehah": 1, "fatiha": 1, "fatihah": 1,
  "baqara": 2, "baqra": 2, "bakara": 2, "bakarah": 2,
  "aalimran": 3, "aaleimran": 3, "aleimran": 3, "aliimran": 3, "imran": 3,
  "nisa": 4, "nissa": 4, "nisaa": 4, "nisa'a": 4,
  "maida": 5, "maidah": 5, "ma'ida": 5, "ma'idah": 5,
  "anam": 6, "an'am": 6, "an-am": 6,
  "araf": 7, "a'raf": 7, "al-a'raf": 7,
  "anfal": 8, "anfāl": 8,
  "tawba": 9, "tawbah": 9, "taubah": 9, "tauba": 9, "baraat": 9,
  "younus": 10, "younis": 10, "yunis": 10, "younes": 10,
  "yousef": 12, "yusef": 12, "yusuf": 12,
  "rad": 13, "ra'd": 13, "raad": 13,
  "ibrahem": 14, "abrahem": 14, "ibrahim": 14,
  "nahl": 16,
  "isra": 17, "israa": 17, "baniisrael": 17, "baniisrail": 17,
  "kahf": 18, "cave": 18,
  "mariam": 19, "mariyam": 19, "meryem": 19,
  "taha": 20, "taha'": 20,
  "anbiya": 21, "anbiyaa": 21, "anbiya'": 21,
  "muminun": 23, "muminoon": 23, "mu'minun": 23, "mumenoon": 23,
  "nur": 24, "noor": 24,
  "furqan": 25,
  "shuara": 26, "shu'ara": 26, "shuaraa": 26, "shu'araa": 26,
  "naml": 27,
  "qasas": 28,
  "ankabut": 29, "ankaboot": 29,
  "rum": 30, "room": 30, "arroom": 30,
  "lokman": 31, "luqman": 31,
  "sajda": 32, "sajdah": 32, "sajadah": 32,
  "ahzab": 33,
  "saba": 34, "sabaa": 34, "saba'": 34,
  "fater": 35, "fatir": 35,
  "yasin": 36, "yaseen": 36, "ya-sin": 36, "ya sin": 36, "yaseen": 36,
  "saffat": 37, "as-saffat": 37,
  "saad": 38, "sad": 38,
  "zumar": 39, "zummar": 39,
  "gafer": 40, "ghafir": 40,
  "fusilat": 41, "fussilat": 41, "fussilat": 41,
  "shura": 42, "shoora": 42,
  "zukhruf": 43, "zukhruf": 43,
  "dukhan": 44,
  "jathiya": 45, "jathiyah": 45, "jathiyyah": 45,
  "ahqaf": 46, "ahqaaf": 46,
  "fath": 48,
  "hujurat": 49, "hujuraat": 49,
  "qaf": 50,
  "dhariyat": 51, "zariyat": 51, "dhariyaat": 51, "zariyaat": 51,
  "tur": 52,
  "najm": 53,
  "qamar": 54,
  "rahman": 55, "alrahman": 55, "arrahmaan": 55,
  "waqia": 56, "waqiah": 56, "waqi'ah": 56, "waqiya": 56, "alwaqia": 56,
  "hadid": 57,
  "mujadila": 58, "mujadalah": 58, "mujadala": 58, "mujadilah": 58,
  "hashr": 59,
  "mumtahana": 60, "mumtahanah": 60, "mumtahina": 60, "mumtahinah": 60,
  "saff": 61,
  "jumuah": 62, "jumua": 62, "jumu'a": 62, "jumu'ah": 62,
  "munafiqun": 63, "munafiqoon": 63,
  "taghabun": 64, "taghaboon": 64,
  "talaq": 65,
  "tahrim": 66,
  "mulk": 67, "tabarak": 67, "almulk": 67,
  "qalam": 68,
  "haqqah": 69, "haqqa": 69, "haaqqa": 69,
  "maarij": 70, "ma'arij": 70, "maarij": 70,
  "nooh": 71, "nuh": 71,
  "jinn": 72,
  "muzzammil": 73,
  "muddaththir": 74, "muddathir": 74,
  "qiyamah": 75, "qiyama": 75, "qiyaamah": 75,
  "insan": 76, "insaan": 76, "al-insan": 76,
  "mursalat": 77,
  "naba": 78, "naba'": 78, "naba": 78,
  "naziat": 79, "nazi'at": 79, "naziaat": 79,
  "abasa": 80,
  "takwir": 81,
  "infitar": 82, "infitaar": 82,
  "mutaffifin": 83, "mutaffifeen": 83,
  "inshiqaq": 84,
  "buruj": 85, "buruuj": 85,
  "tariq": 86,
  "ala": 87, "a'la": 87, "alaa": 87, "al-a'la": 87,
  "ghashiyah": 88, "ghashiya": 88,
  "fajr": 89,
  "balad": 90,
  "shams": 91,
  "layl": 92, "lail": 92, "laylah": 92, "al-layl": 92,
  "duha": 93, "duhaa": 93, "dhuha": 93, "ad-duha": 93, "ad-duhaa": 93,
  "sharh": 94, "inshirah": 94, "inshiraa": 94, "ash-sharh": 94,
  "tin": 95,
  "alaq": 96, "ala'q": 96, "iqra": 96, "iqraa": 96, "al-alaq": 96,
  "qadr": 97, "qadar": 97,
  "bayyina": 98, "bayyinah": 98,
  "zalzalah": 99, "zalzala": 99, "zalzalh": 99,
  "adiyat": 100, "adiyaat": 100, "al-adiyat": 100,
  "qaria": 101, "qariah": 101, "qari'ah": 101, "qari'at": 101, "al-qari'ah": 101,
  "takathur": 102, "takaathur": 102,
  "asr": 103, "al-asr": 103,
  "humazah": 104, "humaza": 104, "humazah": 104,
  "fil": 105,
  "quraish": 106, "qurays": 106, "qoraish": 106, "quraysh": 106,
  "maun": 107, "ma'un": 107, "maoon": 107, "al-ma'un": 107,
  "kawthar": 108, "kauthar": 108, "kausar": 108, "al-kawthar": 108,
  "kafirun": 109, "kafiroon": 109, "al-kafirun": 109, "al-kafiroon": 109,
  "nasr": 110, "an-nasr": 110,
  "masad": 111, "lahab": 111, "al-masad": 111, "al-lahab": 111,
  "ikhlas": 112, "iklas": 112, "al-ikhlas": 112, "al-iklas": 112,
  "falaq": 113, "al-falaq": 113,
  "naas": 114, "an-naas": 114
}

var _aliasMap = null
var _byId = null

// Collapse for matching: lowercase, drop spaces/dashes/apostrophes, keep
// letters (including Arabic) and digits.
function _key(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\s\-'’‘.]+/g, "")
}

// Arabic input normalization: strip tashkeel/diacritics and tatweel, fold
// alef/hamza/ta-marbuta/alef-maqsura variants, then drop the leading "ال".
function _arKey(s) {
  var t = String(s || "")
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ء/g, "")
  t = t.replace(/^ال/, "")
  return t
}

// Strip a leading article ("al", "el", "the", optionally dashed) so
// "al-baqarah", "Al-Baqarah", and "baqarah" resolve to the same surah.
function _stripArticle(s) {
  return String(s || "").replace(/^(?:al|el|the)-?/i, "")
}

function _ensureIndexes() {
  if (_aliasMap) return
  _aliasMap = {}
  _byId = {}
  var i, s, translitKey, arKey
  for (i = 0; i < SURAHS.length; i++) {
    s = SURAHS[i]
    _byId[s.id] = s
    translitKey = _key(_stripArticle(s.name_translit))
    arKey = _arKey(s.name_ar)
    _aliasMap[translitKey] = s.id
    _aliasMap[_key(s.name_translit)] = s.id
    _aliasMap[arKey] = s.id
    _aliasMap["al" + arKey] = s.id
  }
  for (var k in ALIAS_EXTRAS) {
    _aliasMap[_key(_stripArticle(k))] = ALIAS_EXTRAS[k]
    _aliasMap[_arKey(k)] = ALIAS_EXTRAS[k]
  }
}

function surahById(id) {
  _ensureIndexes()
  return _byId[id] || null
}

function ayahCount(id) {
  var s = surahById(id)
  return s ? s.ayahs : 0
}

function isValidPlace(surahId, ayah) {
  var s = surahById(surahId)
  if (!s) return false
  if (ayah === undefined || ayah === null) return true
  return typeof ayah === "number" && ayah >= 1 && Math.floor(ayah) === ayah && ayah <= s.ayahs
}

// "2:255" -> { surah: 2, ayah: 255 }. Unknown surah/name -> null. Out-of-range
// ayahs are clamped to the surah (friendlier than rejecting).
function parseReference(input) {
  var raw = String(input || "").trim()
  if (!raw) return null

  // "2:255", "2 255", or "2.255" (separator required so "999" stays a
  // bare surah number, not "99:9")
  var numColon = raw.match(/^(\d{1,3})\s*[:.]\s*(\d{1,3})$/) || raw.match(/^(\d{1,3})\s+(\d{1,3})$/)
  if (numColon) {
    var s1 = surahById(parseInt(numColon[1], 10))
    if (!s1) return null
    return { surah: s1.id, ayah: clampAyah(s1.id, parseInt(numColon[2], 10)) }
  }

  // bare surah number: "2"
  var numOnly = raw.match(/^(\d{1,3})$/)
  if (numOnly) {
    var s2 = surahById(parseInt(numOnly[1], 10))
    if (!s2) return null
    return { surah: s2.id, ayah: 1 }
  }

  // name + number: "al-baqarah 255", "baqarah 255", "البقرة 255", "baqarah255"
  var m = raw.match(/^(.+?)\s+(\d{1,3})$/)
  var namePart = raw
  var ayahNum = 1
  if (m) {
    namePart = m[1]
    ayahNum = parseInt(m[2], 10)
  } else {
    var glued = raw.match(/^([^\d]+?)(\d{1,3})$/)
    if (glued) {
      namePart = glued[1]
      ayahNum = parseInt(glued[2], 10)
    }
  }

  _ensureIndexes()
  var id = _aliasMap[_key(_stripArticle(namePart))]
  if (!id) id = _aliasMap[_arKey(namePart)]
  if (!id) return null
  return { surah: id, ayah: clampAyah(id, ayahNum) }
}

function clampAyah(surahId, ayah) {
  var count = ayahCount(surahId)
  if (count <= 0) return 1
  if (ayah < 1) return 1
  if (ayah > count) return count
  return ayah
}

// compact: "2:255" (bar chip). Full: "Al-Baqarah 2:255" (panel header).
function formatRef(surahId, ayah, compact) {
  var s = surahById(surahId)
  var name = s ? (compact ? String(s.id) : s.name_translit) : String(surahId || "")
  if (!ayah) return name
  if (compact) return name + ":" + ayah
  return name + " " + surahId + ":" + ayah
}

function nextAyah(surahId, ayah) {
  var s = surahById(surahId)
  if (!s) return { surah: DEFAULT_SURAH, ayah: DEFAULT_AYAH }
  if (ayah < s.ayahs) return { surah: surahId, ayah: ayah + 1 }
  var next = surahId < SURAHS.length ? surahId + 1 : 1
  return { surah: next, ayah: 1 }
}

function prevAyah(surahId, ayah) {
  if (ayah > 1) return { surah: surahId, ayah: ayah - 1 }
  var prev = surahId > 1 ? surahId - 1 : SURAHS.length
  var s = surahById(prev)
  return { surah: prev, ayah: s ? s.ayahs : 1 }
}

function nextSurah(surahId) {
  if (!surahById(surahId)) return DEFAULT_SURAH
  return surahId < SURAHS.length ? surahId + 1 : 1
}

function prevSurah(surahId) {
  if (!surahById(surahId)) return DEFAULT_SURAH
  return surahId > 1 ? surahId - 1 : SURAHS.length
}
