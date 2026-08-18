# Notices

## Quran text and translation

The Arabic text bundled in `data/quran.json` is the Uthmani script
(`quran-uthmani`) and the English translation is Sahih International
(`en.sahih`). Both are the verbatim texts served by
[alquran.cloud](https://alquran.cloud), which sources them from
[Tanzil.net](https://tanzil.net).

Tanzil.net license terms for Quran text and translations:

> The Quran text and translations provided by Tanzil may be used for any
> purpose, provided that they are distributed or quoted without modification,
> with the following attribution: "Quran text and translations provided by
> Tanzil.net".

Sahih International translation:

> © 1997 Dar Abul-Qasim. Used with permission. Free for non-commercial use,
> including distribution within free software applications, provided the text
> is not modified.

This plugin distributes both texts unmodified, offline, in a free
(non-commercial) application. Attribution:

- Quran text and translations provided by Tanzil.net
- Sahih International translation © 1997 Dar Abul-Qasim, used with permission
- Data retrieved via api.alquran.cloud

## Rebuilding the data

`data/quran.json` is generated, not hand-edited. To rebuild it:

```sh
curl -o /tmp/ar.json "https://api.alquran.cloud/v1/quran/quran-uthmani"
curl -o /tmp/en.json "https://api.alquran.cloud/v1/quran/en.sahih"
node scripts/build-quran.js /tmp/ar.json /tmp/en.json surahs.json data/quran.json
node scripts/build-quran.js --quranjs surahs.json Quran.js
node tests/test_quran.js
```
