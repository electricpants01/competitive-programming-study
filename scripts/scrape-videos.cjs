#!/usr/bin/env node
/**
 * Video Scraper for CP Study Guide
 * =================================
 * Fetches the top 20 most-viewed videos from each configured YouTube channel,
 * downloads their auto-generated subtitles via yt-dlp, and outputs
 * public/videos-data-{lang}.js files for the static site.
 *
 * Usage:
 *   node scripts/scrape-videos.js           # scrape all languages
 *   node scripts/scrape-videos.js es        # scrape Spanish only
 *   node scripts/scrape-videos.js en        # scrape English only
 *
 * Requirements:
 *   yt-dlp must be installed: brew install yt-dlp
 */

'use strict';

const { execFileSync, spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const os   = require('os');

const { CHANNELS }       = require('./video-channels.cjs');
const { tagsFromText }   = require('./cp-keywords.cjs');

// ── Config ───────────────────────────────────────────────────────────────────
const VIDEOS_PER_CHANNEL = 20;
const YTDLP_BIN          = findYtDlp();
const TMP_DIR            = fs.mkdtempSync(path.join(os.tmpdir(), 'cp-scrape-'));
const OUT_DIR            = path.resolve(__dirname, '..', 'public');

// Minimum seconds between CP-keyword segments to group them (deduplication)
const SEGMENT_GAP_SECS   = 60;
// Max segments to keep per video (keeps file size reasonable)
const MAX_SEGMENTS        = 80;
// Pause between subtitle requests to avoid YouTube HTTP 429 rate limiting
const SUBTITLE_DELAY_MS   = 2000;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Helpers ──────────────────────────────────────────────────────────────────

function findYtDlp() {
  const candidates = [
    '/opt/homebrew/bin/yt-dlp',
    '/usr/local/bin/yt-dlp',
    '/usr/bin/yt-dlp',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  // Fall back to PATH
  try {
    const result = spawnSync('which', ['yt-dlp'], { encoding: 'utf8' });
    if (result.stdout.trim()) return result.stdout.trim();
  } catch (_) {}
  throw new Error('yt-dlp not found. Install with: brew install yt-dlp');
}

/** Run a command safely without going through the shell (avoids % and () interpretation). */
function runArgs(bin, args) {
  console.log(`  $ ${bin} ${args.slice(0, 6).join(' ')}…`);
  return execFileSync(bin, args, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
}

/** Parse a VTT timestamp like "00:01:23.456" → seconds (number) */
function vttTimeToSecs(ts) {
  const parts = ts.split(':').map(Number);
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }
  const [m, s] = parts;
  return m * 60 + s;
}

/**
 * Parse a VTT subtitle file into an array of { t, text } segments.
 * Strips HTML tags, deduplicates consecutive identical lines.
 */
function parseVtt(vttContent) {
  const segments = [];
  const blocks   = vttContent.split(/\n\n+/);
  let   lastText = '';

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    // Find the timestamp line: 00:00:00.000 --> 00:00:00.000
    const tsLine = lines.find(l => l.includes('-->'));
    if (!tsLine) continue;

    const [startTs] = tsLine.split('-->');
    const t = Math.floor(vttTimeToSecs(startTs.trim()));

    // Join remaining lines as text, strip tags
    const text = lines
      .filter(l => !l.includes('-->') && !/^\d+$/.test(l.trim()))
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    if (!text || text === lastText) continue;
    lastText = text;
    segments.push({ t, text });
  }

  return segments;
}

/**
 * Given all segments, keep only those that match CP keywords,
 * deduplicate segments within SEGMENT_GAP_SECS of each other,
 * and cap at MAX_SEGMENTS.
 */
function filterSegments(segments) {
  const matched = [];
  let   lastKept = -Infinity;

  for (const seg of segments) {
    const tags = tagsFromText(seg.text);
    if (tags.length === 0) continue;
    if (seg.t - lastKept < SEGMENT_GAP_SECS) continue;
    matched.push({ t: seg.t, text: seg.text, tags });
    lastKept = seg.t;
    if (matched.length >= MAX_SEGMENTS) break;
  }

  return matched;
}

/** Derive all tags for a video from its filtered segments */
function videoTagsFromSegments(segments) {
  const allTags = new Set();
  for (const seg of segments) {
    (seg.tags || []).forEach(t => allTags.add(t));
  }
  return [...allTags].sort();
}

/** Format seconds as "MM:SS" or "H:MM:SS" */
function fmtDuration(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ── Core pipeline ─────────────────────────────────────────────────────────────

/**
 * Fetch the top N videos from a channel URL using yt-dlp flat-playlist.
 * Returns an array of { id, title, viewCount, duration } objects.
 */
function fetchChannelVideos(channel) {
  console.log(`\n📺  Fetching video list: ${channel.name}`);

  // Channel URL already uses ?sort=p for server-side popularity ordering.
  // yt-dlp returns view_count as "NA" from flat-playlist so we don't sort client-side;
  // we just take the first VIDEOS_PER_CHANNEL entries which YouTube ordered by views.
  const args = [
    '--flat-playlist',
    '--no-warnings',
    '--playlist-end', String(VIDEOS_PER_CHANNEL),
    '--print', '%(id)s\t%(title)s\t%(duration)s',
    channel.url,
  ];

  let output;
  try {
    output = runArgs(YTDLP_BIN, args);
  } catch (err) {
    console.error(`  ⚠️  Failed to fetch playlist for ${channel.name}:`, err.message.slice(0, 200));
    return [];
  }

  const entries = output
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [id, title, durationStr] = line.split('\t');
      return {
        id:       id?.trim(),
        title:    title?.trim() || '(untitled)',
        duration: parseInt(durationStr, 10) || 0,
      };
    })
    .filter(v => v.id && v.id.length === 11); // valid YouTube IDs are 11 chars

  return entries;
}

/**
 * Download VTT subtitle for a single video and parse it.
 * Returns array of filtered { t, text, tags } segments.
 */
function fetchTranscript(videoId, lang) {
  const tmpBase = path.join(TMP_DIR, videoId);
  const url     = `https://www.youtube.com/watch?v=${videoId}`;

  // Try preferred lang first, fall back to 'en' for ES channels (many have EN auto-subs)
  const subLangs = lang === 'es' ? 'es,es-419,en' : 'en,en-US';

  const args = [
    '--write-auto-sub',
    '--no-warnings',
    '--sub-lang',   subLangs,
    '--sub-format', 'vtt',
    '--skip-download',
    '-o', tmpBase,
    url,
  ];

  try {
    runArgs(YTDLP_BIN, args);
  } catch (_) {
    console.log(`    ⚠️  No subtitles for ${videoId}`);
    return [];
  }

  // Find the downloaded VTT file (may have lang suffix)
  const vttCandidates = [
    `${tmpBase}.es.vtt`,
    `${tmpBase}.es-419.vtt`,
    `${tmpBase}.en.vtt`,
    `${tmpBase}.en-US.vtt`,
  ];

  const vttFile = vttCandidates.find(f => fs.existsSync(f));
  if (!vttFile) {
    console.log(`    ⚠️  VTT file not found for ${videoId}`);
    return [];
  }

  const content  = fs.readFileSync(vttFile, 'utf8');
  const segments = parseVtt(content);
  return filterSegments(segments);
}

/**
 * Process one channel: fetch video list, download transcripts, build video objects.
 */
async function processChannel(channel) {
  const videos    = fetchChannelVideos(channel);
  const processed = [];

  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    console.log(`  [${i + 1}/${videos.length}] ${v.title.slice(0, 70)}`);

    const segments = fetchTranscript(v.id, channel.lang);
    await sleep(SUBTITLE_DELAY_MS); // avoid YouTube 429 rate limiting
    const tags     = videoTagsFromSegments(segments);

    processed.push({
      id:          v.id,
      title:       v.title,
      channel:     channel.id,
      channelName: channel.name,
      thumbnail:   `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`,
      duration:    fmtDuration(v.duration),
      durationSecs: v.duration,
      viewCount:   v.viewCount,
      tags,
      segments,    // keyword-matched segments only
    });
  }

  return processed;
}

/**
 * Write the output JS file for a given language.
 */
function writeOutputFile(lang, channels, videos) {
  const channelMeta = channels.map(c => ({
    id:   c.id,
    name: c.name,
    url:  c.url.replace('/videos', ''),
  }));

  const content = `// Auto-generated by scripts/scrape-videos.js — do not edit manually
// Run: node scripts/scrape-videos.js ${lang}
// Generated: ${new Date().toISOString()}
// Videos: ${videos.length} (${channels.map(c => c.name).join(', ')})

const videosData = ${JSON.stringify({ channels: channelMeta, videos }, null, 2)};
`;

  const outPath = path.join(OUT_DIR, `videos-data-${lang}.js`);
  fs.writeFileSync(outPath, content, 'utf8');

  const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`\n✅  Written: ${outPath} (${sizeKb} KB, ${videos.length} videos)`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const targetLang = process.argv[2]; // 'es', 'en', or undefined (all)
  const langs      = targetLang ? [targetLang] : ['es', 'en'];

  console.log(`\n🎬  CP Video Scraper`);
  console.log(`   yt-dlp: ${YTDLP_BIN}`);
  console.log(`   tmp:    ${TMP_DIR}`);
  console.log(`   output: ${OUT_DIR}`);
  console.log(`   langs:  ${langs.join(', ')}`);

  for (const lang of langs) {
    const channels = CHANNELS[lang];
    if (!channels?.length) {
      console.warn(`⚠️  No channels configured for lang: ${lang}`);
      continue;
    }

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`🌐  Processing language: ${lang.toUpperCase()} (${channels.length} channels)`);

    const allVideos = [];
    for (const channel of channels) {
      try {
        const videos = await processChannel(channel);
        allVideos.push(...videos);
        console.log(`  ✓ ${channel.name}: ${videos.length} videos`);
      } catch (err) {
        console.error(`  ✗ ${channel.name} failed:`, err.message);
      }
    }

    writeOutputFile(lang, channels, allVideos);
  }

  // Cleanup temp dir
  try { fs.rmSync(TMP_DIR, { recursive: true, force: true }); } catch (_) {}

  console.log('\n🏁  Scraping complete!');
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});