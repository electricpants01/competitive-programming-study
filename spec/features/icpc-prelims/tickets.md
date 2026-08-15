# ICPC Prelims — Tickets

## IP-1 — Guide section + sidebar
**Status:** Done
Add `icpc-prelims` sidebar item, page section, i18n, CSS, `initIcpcPrelims()`.

## IP-2 — Vendor initial PDF set
**Status:** Done  
Download curated prelim / qualifier PDFs into `public/icpc-prelims/`.

## IP-3 — Dhaka 2025 learning editorial
**Status:** Done
Add a difficulty-sorted, visual editorial reader for Problems A–H. Keep compiled C++17
solutions in `solutions/icpc-dhaka-2025-online-preliminary/` but do not expose code in the UI.

## IP-6 — Editorials for every prelims contest
**Status:** Done
Register learning editorials (no C++ in UI) for all catalog contests, with matching
`solutions/icpc-*` C++17 folders. Brazil EN/PT share one editorial.

## IP-4 — Expand Dhaka archive years
**Status:** Done  
Pulled prelim + regional PDFs for 2015–2025 from https://codeforces.com/blog/entry/136296
into `public/icpc-prelims/` and `public/icpc-regionals/`. 2023/2024 prelims used Wayback
mirrors (live bapsoj.org now serves an SPA shell instead of the PDF).

## IP-5 — Optional: shrink large PDFs
**Status:** Open  
South Pacific Level A is ~14 MB; consider compressed re-export or external link only.

## IP-7 — Harden uncertain hard solutions
**Status:** Open
Re-verify Seoul A/I/J/K and some NTU hard problems against full sample / official judge data.
