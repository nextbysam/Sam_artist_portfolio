#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, 'images');

console.log('🎨 Sprite Sheet Generator for Cursor Trail Images\n');

// Check if ImageMagick is installed
function checkImageMagick() {
    try {
        execSync('convert -version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

// Get all image files from directory
function getImageFiles() {
    const files = fs.readdirSync(imagesDir)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png'].includes(ext);
        })
        .filter(file => !file.startsWith('sprite-sheet')) // Exclude existing sprite sheets
        .sort();
    
    return files.map(file => path.join(imagesDir, file));
}

// Generate sprite sheet using ImageMagick
function generateSpriteSheet() {
    if (!checkImageMagick()) {
        console.error('❌ ImageMagick not found!');
        console.error('\nPlease install ImageMagick:');
        console.error('  macOS:   brew install imagemagick');
        console.error('  Ubuntu:  sudo apt-get install imagemagick');
        console.error('  Windows: https://imagemagick.org/script/download.php\n');
        process.exit(1);
    }

    const imageFiles = getImageFiles();
    
    if (imageFiles.length === 0) {
        console.error('❌ No images found in /images directory');
        process.exit(1);
    }

    console.log(`📁 Found ${imageFiles.length} images`);
    
    // Configuration
    const cols = 5;
    const rows = 4;
    const spriteSize = 180;
    const totalSlots = cols * rows;

    if (imageFiles.length > totalSlots) {
        console.warn(`⚠️  Warning: Found ${imageFiles.length} images but sprite sheet only supports ${totalSlots}`);
        console.warn(`    Using first ${totalSlots} images\n`);
        imageFiles.splice(totalSlots);
    }

    const outputPng = path.join(imagesDir, 'sprite-sheet.png');
    const outputWebp = path.join(imagesDir, 'sprite-sheet.webp');

    console.log(`\n🔨 Generating sprite sheet (${cols}x${rows} grid, ${spriteSize}x${spriteSize}px per sprite)...`);

    try {
        // Step 1: Create PNG sprite sheet
        const montageCmd = `montage ${imageFiles.map(f => `"${f}"`).join(' ')} ` +
            `-tile ${cols}x${rows} ` +
            `-geometry ${spriteSize}x${spriteSize}+0+0 ` +
            `-background none ` +
            `"${outputPng}"`;
        
        execSync(montageCmd, { stdio: 'inherit' });
        console.log('✓ Created sprite-sheet.png');

        // Step 2: Optimize PNG
        const optimizePngCmd = `convert "${outputPng}" -strip -quality 90 "${outputPng}"`;
        execSync(optimizePngCmd, { stdio: 'ignore' });
        console.log('✓ Optimized PNG');

        // Step 3: Create WebP version
        const webpCmd = `convert "${outputPng}" -strip -quality 85 "${outputWebp}"`;
        execSync(webpCmd, { stdio: 'ignore' });
        console.log('✓ Created sprite-sheet.webp');

        // Get file sizes
        const pngSize = (fs.statSync(outputPng).size / 1024).toFixed(2);
        const webpSize = (fs.statSync(outputWebp).size / 1024).toFixed(2);
        const savings = (((fs.statSync(outputPng).size - fs.statSync(outputWebp).size) / fs.statSync(outputPng).size) * 100).toFixed(1);

        console.log('\n📊 Results:');
        console.log(`   PNG:  ${pngSize} KB`);
        console.log(`   WebP: ${webpSize} KB (${savings}% smaller)`);
        console.log(`\n✨ Sprite sheet generated successfully!`);
        console.log(`   Location: ${imagesDir}/sprite-sheet.{png,webp}\n`);

    } catch (error) {
        console.error('❌ Failed to generate sprite sheet');
        console.error(error.message);
        process.exit(1);
    }
}

// Run the generator
generateSpriteSheet();
