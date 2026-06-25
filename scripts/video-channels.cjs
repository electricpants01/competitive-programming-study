/**
 * Channel configuration for the video scraper.
 * Each entry maps to one YouTube channel.
 *
 * URLs use ?sort=p so YouTube returns videos in popularity order
 * (most-viewed first), even though yt-dlp flat-playlist returns view_count
 * as "NA" — the server-side ordering still reflects popularity.
 */

const CHANNELS = {
  es: [
    {
      id: 'elsantodel90',
      name: 'elsantodel90',
      handle: '@agustin.elsantodel90',
      url: 'https://www.youtube.com/@agustin.elsantodel90/videos?sort=p',
      lang: 'es',
    },
    {
      id: 'pacha2880',
      name: 'pacha2880',
      handle: '@pacha2880',
      url: 'https://www.youtube.com/@pacha2880/videos?sort=p',
      lang: 'es',
    },
    {
      id: 'algoritmiaEscom',
      name: 'Club de Algoritmia ESCOM',
      handle: '@algoritmiaESCOM',
      url: 'https://www.youtube.com/@algoritmiaESCOM/videos?sort=p',
      lang: 'es',
    },
    {
      id: 'trainingCampArgentina',
      name: 'Training Camp Argentina',
      handle: '@trainingcampargentina8088',
      url: 'https://www.youtube.com/@trainingcampargentina8088/videos?sort=p',
      lang: 'es',
    },
  ],
  en: [
    {
      id: 'neetcode',
      name: 'NeetCode',
      handle: '@NeetCode',
      url: 'https://www.youtube.com/@NeetCode/videos?sort=p',
      lang: 'en',
    },
    {
      id: 'tleEliminators',
      name: 'TLE Eliminators',
      handle: '@TLE_Eliminators',
      url: 'https://www.youtube.com/@TLE_Eliminators/videos?sort=p',
      lang: 'en',
    },
    {
      id: 'repovive',
      name: 'Repovive TV',
      handle: '@repovive',
      url: 'https://www.youtube.com/@repovive/videos?sort=p',
      lang: 'en',
    },
    {
      id: 'errichto',
      name: 'Errichto Algorithms',
      handle: '@Errichto',
      url: 'https://www.youtube.com/@Errichto/videos?sort=p',
      lang: 'en',
    },
  ],
};

module.exports = { CHANNELS };