const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to optimize with target max dimensions
const images = [
  { file: 'camaro.jpg', maxWidth: 1920, quality: 80 },
  { file: 'chickens.jpg', maxWidth: 1920, quality: 80 },
  { file: 'goat1.jpg', maxWidth: 1920, quality: 80 },
  { file: 'goat2.jpg', maxWidth: 1920, quality: 80 },
  { file: 'goat3.jpg', maxWidth: 1920, quality: 80 },
  { file: 'goat4.jpg', maxWidth: 1920, quality: 80 },
  { file: 'layens.jpg', maxWidth: 1920, quality: 80 },
  { file: 'langstroth.jpg', maxWidth: 1920, quality: 80 },
  { file: 'bmw.png', maxWidth: 1920, quality: 80 },
  { file: 'candle.jpg', maxWidth: 1920, quality: 80 },
  { file: '3d.jpg', maxWidth: 1920, quality: 80 },
];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  for (const img of images) {
    const inputPath = path.join(__dirname, img.file);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${img.file} - file not found`);
      continue;
    }

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);

      // Backup original
      const backupPath = path.join(__dirname, `${img.file}.backup`);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
        console.log(`📦 Backed up ${img.file}`);
      }

      // Optimize
      await sharp(inputPath)
        .resize(img.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: img.quality, progressive: true })
        .toFile(inputPath + '.tmp');

      // Replace original with optimized
      fs.renameSync(inputPath + '.tmp', inputPath);

      const newStats = fs.statSync(inputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✅ ${img.file}: ${originalSize} MB → ${newSize} MB (${savings}% smaller)`);
    } catch (error) {
      console.error(`❌ Error optimizing ${img.file}:`, error.message);
    }
  }

  console.log('\n✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
