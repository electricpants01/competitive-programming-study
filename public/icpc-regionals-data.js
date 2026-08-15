/**
 * ICPC Regional finals problem-set catalog.
 * PDFs live in public/icpc-regionals/ and are served with BASE_URL.
 * Do not invent entries without a matching file on disk.
 * Prelims / qualifiers / sub-regionals belong in icpc-prelims-data.js.
 */
const icpcRegionalsData = {
  regions: [
    { id: 'europe-nwerc', name: 'Europe NWERC' },
    { id: 'europe-swerc', name: 'Europe SWERC' },
    { id: 'latin-america', name: 'Latin America' },
    { id: 'asia-seoul', name: 'Asia Seoul' },
    { id: 'asia-amritapuri', name: 'Asia Amritapuri' },
  ],
  contests: [
    {
      id: '2025-nwerc',
      year: 2025,
      region: 'europe-nwerc',
      title: 'ICPC Northwestern Europe Regional Contest 2025 (NWERC)',
      file: '2025-nwerc.pdf',
      source: 'https://2025.nwerc.eu/problem-set.pdf',
      notes: 'Official NWERC 2025 problem set.',
    },
    {
      id: '2024-nwerc',
      year: 2024,
      region: 'europe-nwerc',
      title: 'ICPC Northwestern Europe Regional Contest 2024 (NWERC)',
      file: '2024-nwerc.pdf',
      source: 'https://2024.nwerc.eu/main/problem-set.pdf',
      notes: 'Official NWERC 2024 problem set.',
    },
    {
      id: '2024-swerc',
      year: 2024,
      region: 'europe-swerc',
      title: 'ICPC Southwestern Europe Regional Contest 2024 (SWERC)',
      file: '2024-swerc.pdf',
      source: 'https://swerc.eu/2024/problemset/main_problemset.pdf',
      notes: 'Official SWERC 2024 main problem set.',
    },
    {
      id: '2025-latam-regional',
      year: 2025,
      region: 'latin-america',
      title: 'ICPC Latin American Regional 2025',
      file: '2025-latam-regional.pdf',
      source: 'https://scorelatam.naquadah.com.br/latam-2025/contest.pdf',
      notes: 'Full LatAm regional (post-subregional).',
    },
    {
      id: '2024-latam-regional',
      year: 2024,
      region: 'latin-america',
      title: 'ICPC Latin American Regional 2024',
      file: '2024-latam-regional.pdf',
      source: 'https://scorelatam.naquadah.com.br/latam-2024/contest.pdf',
      notes: 'Full LatAm regional 2024.',
    },
    {
      id: '2025-seoul-regional',
      year: 2025,
      region: 'asia-seoul',
      title: 'ICPC Asia Seoul Regional Contest 2025',
      file: '2025-seoul-regional.pdf',
      source: 'http://static.icpckorea.net/2025/regional/problemset.pdf',
      notes: 'Official Seoul regional finals problem set.',
    },
    {
      id: '2024-seoul-regional',
      year: 2024,
      region: 'asia-seoul',
      title: 'ICPC Asia Seoul Regional Contest 2024',
      file: '2024-seoul-regional.pdf',
      source: 'http://static.icpckorea.net/2024/regional/problemset.pdf',
      notes: 'Official Seoul regional finals problem set.',
    },
    {
      id: '2025-amritapuri-regional',
      year: 2025,
      region: 'asia-amritapuri',
      title: 'ICPC Asia Amritapuri Regional Contest 2025',
      file: '2025-amritapuri-regional.pdf',
      source: 'https://amritaicpc.in/data/ICPC_Amritapuri_2025___26.pdf',
      notes: 'Amritapuri regional problem booklet.',
    },
  ],
};
