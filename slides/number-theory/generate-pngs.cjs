#!/usr/bin/env node
/**
 * generate-pngs.js
 * Generates 1920×1080 PNG screenshots of all HTML slides using Puppeteer.
 *
 * Usage:
 *   node generate-pngs.js
 *
 * Prerequisites:
 *   npm install puppeteer
 *
 * Output: PNG files alongside each HTML file (same filename, .png extension)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname);

async function generatePNGs() {
  // Find all HTML slide files in this directory
  const files = fs.readdirSync(SLIDES_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();

  if (files.length === 0) {
    console.error('No HTML files found in', SLIDES_DIR);
    process.exit(1);
  }

  console.log(`Found ${files.length} slides to render...\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  let success = 0;
  let errors = 0;

  for (const file of files) {
    const htmlPath = path.join(SLIDES_DIR, file);
    const pngPath = htmlPath.replace(/\.html$/, '.png');
    const fileUrl = `file://${htmlPath}`;

    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 10000 });
      // Brief pause to let any CSS animations settle
      await new Promise(r => setTimeout(r, 200));
      await page.screenshot({ path: pngPath, type: 'png' });
      console.log(`  ✅ ${file} → ${path.basename(pngPath)}`);
      success++;
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      errors++;
    }
  }

  await browser.close();

  console.log(`\nDone! ${success} PNGs generated, ${errors} errors.`);
  if (errors > 0) process.exit(1);
}

generatePNGs().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});