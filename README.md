# Mushaf

Offline Quran reader for the Omarchy bar. Uthmani Arabic text with the
Sahih International translation, reference jump, no audio.

Plugin id: `io.github.arhamthedeveloper.mushaf`.

## Install (this machine)

The live copy is:

```sh
omarchy plugin validate ~/.config/omarchy/plugins/io.github.arhamthedeveloper.mushaf
omarchy plugin enable io.github.arhamthedeveloper.mushaf --section right
```

From git later:

```sh
omarchy plugin add https://github.com/<you>/mushaf.git --enable
omarchy bar move io.github.arhamthedeveloper.mushaf --section right
```

## Usage

- **Left-click** the bar chip to open or close the reader.
- **Scroll** the chip to move to the previous or next ayah (wraps at surah
  boundaries, and from An-Nas 6 back to Al-Fatihah 1).
- **Type a reference** (`2:255`, `al-baqarah 255`, `baqarah 255`, `البقرة 255`,
  `yasin 5`, `iqra`) and press Enter to jump.
- **Arrow keys** inside the panel: left/right moves surah, up/down moves ayah.
- Use the **surah button** in the header to browse all 114 surahs, then pick
  one to jump to its first ayah.
- **Escape** closes the panel. The last position is saved to
  `~/.local/state/omarchy/settings/quran-reader.json` and restored on open.

## Data

`data/quran.json` bundles the full text (6,236 ayahs, ~2.4 MB): Uthmani Arabic
plus Sahih International. Text comes from alquran.cloud, sourced from
tanzil.net — see [NOTICE.md](NOTICE.md) for the required attribution and how
to rebuild the file from source.

## Tests

```sh
node tests/test_quran.js
node tests/verify_arabic.js
```

`test_quran.js` covers reference parsing (numbers, transliterations, Arabic
names, aliases), surah/ayah navigation and wraparound, and data-file
integrity. `verify_arabic.js` is a deep integrity pass over the bundled text:
structure and ayah counts, character hygiene (no mojibake/control/zero-width
chars), Arabic-script purity, basmala placement, spot-checks of well-known
verses, and a best-effort online cross-check against quran.com's API.

## Remove

```sh
omarchy plugin remove io.github.arhamthedeveloper.mushaf
```

The reading position in `quran-reader.json` is left in place. This plugin is
not a clock clone; removing it does not touch `omarchy.clock`. It also does
not touch `mus.quran`'s audio player or its state file (`quran.json`).
