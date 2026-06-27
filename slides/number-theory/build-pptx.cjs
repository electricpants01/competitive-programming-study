const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname);
const OUTPUT_FILE = path.join(SLIDES_DIR, 'number-theory.pptx');

async function buildPptx() {
  const pptx = new PptxGenJS();

  // Match the 1920×1080 (16:9) source images
  pptx.layout = 'LAYOUT_WIDE'; // 13.33" × 7.5" — standard widescreen 16:9

  const files = fs.readdirSync(SLIDES_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`Found ${files.length} PNGs to assemble...\n`);

  for (const file of files) {
    const imgPath = path.join(SLIDES_DIR, file);
    const slide = pptx.addSlide();

    // Full-bleed image covering the entire slide
    slide.addImage({
      path: imgPath,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });

    console.log(`  ✅ ${file}`);
  }

  await pptx.writeFile({ fileName: OUTPUT_FILE });
  console.log(`\n✅ Done! Saved to: ${OUTPUT_FILE}`);
}

buildPptx().catch(err => {
  console.error('Error building PPTX:', err);
  process.exit(1);
});