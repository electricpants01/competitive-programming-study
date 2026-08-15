# ICPC Regional PDFs — Document Catalog

Binary PDFs are stored in **`public/icpc-regionals/`** so Astro / GitHub Pages can serve them.
This folder documents provenance.

| Local file | Contest | Upstream |
|------------|---------|----------|
| `2025-nwerc.pdf` | NWERC 2025 | https://2025.nwerc.eu/problem-set.pdf |
| `2024-nwerc.pdf` | NWERC 2024 | https://2024.nwerc.eu/main/problem-set.pdf |
| `2024-swerc.pdf` | SWERC 2024 | https://swerc.eu/2024/problemset/main_problemset.pdf |
| `2025-latam-regional.pdf` | LatAm Regional 2025 | https://scorelatam.naquadah.com.br/latam-2025/contest.pdf |
| `2024-latam-regional.pdf` | LatAm Regional 2024 | https://scorelatam.naquadah.com.br/latam-2024/contest.pdf |
| `2025-seoul-regional.pdf` | Asia Seoul Regional 2025 | http://static.icpckorea.net/2025/regional/problemset.pdf |
| `2024-seoul-regional.pdf` | Asia Seoul Regional 2024 | http://static.icpckorea.net/2024/regional/problemset.pdf |
| `2025-amritapuri-regional.pdf` | Asia Amritapuri Regional 2025 | https://amritaicpc.in/data/ICPC_Amritapuri_2025___26.pdf |

## Hubs for more years

- ICPC Archives: https://icpcarchive.github.io/
- NWERC: https://nwerc.eu / yearly contest sites
- SWERC: https://swerc.eu/
- LatAm / Maratona: https://scorelatam.naquadah.com.br/
- Seoul: https://icpckorea.org/
- Amritapuri: https://amritaicpc.in/

## Refresh process

1. Download PDF into `public/icpc-regionals/` with a stable kebab filename.
2. Add a row to `public/icpc-regionals-data.js`.
3. Update this table.
4. Keep attribution `source` URL accurate.
5. Do not also list the same PDF under `icpc-prelims`.
