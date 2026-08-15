# CP Slide Decks — Data / Pipeline

```
slides/<topic>/
  NN-subtopic-N.html
  NN-subtopic-N.png      # generated
  generate-pngs.cjs      # must be .cjs (repo root is "type": "module")
  package.json           # local puppeteer
```

Run:

```bash
cd slides/<topic>
npm install puppeteer
node generate-pngs.cjs
```

Do not install Puppeteer into the Astro root solely for this pipeline if a local topic install already exists.
