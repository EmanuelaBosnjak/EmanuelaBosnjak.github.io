const fs = require("node:fs");
const path = require("node:path");
const sharp = require(
  "C:\\Users\\Emma\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\sharp",
);

const outputDirectory = path.join(process.cwd(), "public", "art");
fs.mkdirSync(outputDirectory, { recursive: true });

const artworks = [
  ["D:\\Pictures\\Art\\IMG_3038.png", "moonlit-wanderer.webp"],
  ["D:\\Pictures\\Art\\clip art\\mashi2.png", "shrine-fox.webp"],
  ["D:\\Pictures\\Art\\clip art\\mashi1.png", "ember-priestess.webp"],
  ["D:\\Pictures\\Art\\clip art\\fullscale.png", "quiet-field.webp"],
  ["D:\\Pictures\\Art\\clip art\\fullscale2.png", "halo-on-the-railing.webp"],
  ["D:\\Pictures\\Art\\clip art\\fanart1.png", "mask-and-flowers.webp"],
  ["D:\\Pictures\\Art\\clip art\\keychainfull.png", "staff-bearer.webp"],
  ["D:\\Pictures\\Art\\clip art\\keychain2.png", "violet-mage.webp"],
  ["D:\\Pictures\\Art\\clip art\\characterdesign1.png", "avatars-collection.webp"],
  ["D:\\Pictures\\Art\\clip art\\display1.png", "reddit-hofmaurerad.webp"],
  ["D:\\Pictures\\Art\\clip art\\display2.png", "avatar-collection-showcase.webp"],
  ["D:\\Pictures\\Art\\clip art\\chara1.png", "blue-kimono-study.webp"],
  ["D:\\Pictures\\Art\\Untitled_Artwork.png", "worm-question.webp"],
];

Promise.all(
  artworks.map(([input, filename]) =>
    sharp(input)
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(path.join(outputDirectory, filename)),
  ),
)
  .then((results) => {
    const total = results.reduce((sum, result) => sum + result.size, 0);
    console.log(`Optimized ${results.length} artworks (${(total / 1024 / 1024).toFixed(2)} MB total).`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
