#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const scriptFile = path.join(__dirname, 'script.js');

// Read all files from images directory
const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    })
    .map(file => `'images/${file}'`);

// Read the current script.js
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

// Create the new TRAIL_IMAGES array
const newImagesArray = `// Add your image paths here (can be single or multiple for random selection)
const TRAIL_IMAGES = [
    ${imageFiles.join(',\n    ')}
];`;

// Replace the old TRAIL_IMAGES array
const regex = /\/\/ Add your image paths.*?\];/s;
scriptContent = scriptContent.replace(regex, newImagesArray);

// Write back to script.js
fs.writeFileSync(scriptFile, scriptContent, 'utf8');

console.log(`✓ Updated script.js with ${imageFiles.length} images from /images folder`);
