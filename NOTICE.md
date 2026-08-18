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

## Bar plugin structure (Canon)

The plugin architecture, panel/bar widget structure, and navigation UX are
derived from [Canon](https://github.com/RamenPacket84/canon), a Bible reader
for the Omarchy bar.

> MIT License
>
> Copyright (c) 2026 Ramen Packet
>
> Permission is hereby granted, free of charge, to any person obtaining a
> copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
>
> The above copyright notice and this permission notice shall be included
> in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
> OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Bundled font (Amiri Quran)

The Uthmani Arabic text is rendered with the **Amiri Quran** typeface,
bundled in `assets/fonts/AmiriQuran.ttf` and loaded at runtime via
`FontLoader`, so no font installation is required.

> Copyright 2010-2022 The Amiri Project Authors
> (https://github.com/aliftype/amiri).
>
> This Font Software is licensed under the SIL Open Font License, Version
> 1.1. The full license text is included verbatim in
> [`assets/fonts/OFL.txt`](assets/fonts/OFL.txt) and available at
> https://openfontlicense.org/.

## Rebuilding the data

`data/quran.json` is generated, not hand-edited. To rebuild it:

```sh
curl -o /tmp/ar.json "https://api.alquran.cloud/v1/quran/quran-uthmani"
curl -o /tmp/en.json "https://api.alquran.cloud/v1/quran/en.sahih"
node scripts/build-quran.js /tmp/ar.json /tmp/en.json surahs.json data/quran.json
node scripts/build-quran.js --quranjs surahs.json Quran.js
node tests/test_quran.js
```
