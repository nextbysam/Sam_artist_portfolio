# Sprite Sheet Setup Guide

## Overview

The cursor trail effect now uses a **sprite sheet** instead of loading 20 individual images. This optimization reduces:
- **20 HTTP requests → 1 request**
- **4.6MB → ~600KB** (87% reduction)
- **Load time**: Lazy loads on first mouse movement (0KB initial)

## Quick Start

### 1. Install ImageMagick

**macOS:**
```bash
brew install imagemagick
```

**Ubuntu/Debian:**
```bash
sudo apt-get install imagemagick
```

**Windows:**
Download from https://imagemagick.org/script/download.php

### 2. Generate Sprite Sheet

Run the generator script:
```bash
node update-images.js
```

This will:
- ✅ Scan all images in `/images` folder
- ✅ Create a 5×4 grid (180×180px per sprite)
- ✅ Generate `sprite-sheet.png` and `sprite-sheet.webp`
- ✅ Automatically optimize file sizes

### 3. Test the Site

Open `index.html` in a browser and move your mouse. The sprite sheet will load on first movement and images should trail your cursor.

## Manual Generation (Without Node.js)

If you prefer to generate the sprite sheet manually:

### Using ImageMagick CLI:

```bash
cd images/

# Create sprite sheet
montage *.jpeg \
  -tile 5x4 \
  -geometry 180x180+0+0 \
  -background none \
  sprite-sheet.png

# Optimize PNG
convert sprite-sheet.png -strip -quality 90 sprite-sheet.png

# Create WebP version
convert sprite-sheet.png -strip -quality 85 sprite-sheet.webp
```

### Using Online Tools:

1. **Option 1: Stitches** (https://draeton.github.io/stitches/)
   - Upload all 20 images
   - Set sprite dimensions: 180×180px
   - Set layout: 5 columns
   - Download as PNG

2. **Option 2: TexturePacker** (https://www.codeandweb.com/texturepacker)
   - Free version works for this
   - Import images
   - Set fixed size: 180×180
   - Export as sprite sheet

3. **Then compress:**
   - PNG: Use TinyPNG (https://tinypng.com/)
   - WebP: Use Squoosh (https://squoosh.app/)

## Configuration

To change sprite sheet settings, edit `script.js`:

```javascript
const SPRITE_CONFIG = {
    url: 'images/sprite-sheet.webp',      // WebP version (modern browsers)
    fallback: 'images/sprite-sheet.png',  // PNG fallback (older browsers)
    cols: 5,          // Number of columns in grid
    rows: 4,          // Number of rows in grid
    spriteSize: 180,  // Size of each sprite in pixels
    displaySize: 180, // Display size (can scale if needed)
};
```

## Adding More Images

1. Add your new images to `/images` folder
2. Update `SPRITE_CONFIG` in `script.js` if needed:
   - Change `cols` and `rows` to accommodate more images
   - Example: 25 images = 5×5 grid
3. Regenerate sprite sheet: `node update-images.js`

## Troubleshooting

### Images not appearing?
- Check browser console for errors
- Ensure `sprite-sheet.webp` or `sprite-sheet.png` exists in `/images`
- Verify WebP support (all modern browsers support it)

### Sprite sheet looks wrong?
- Ensure all source images are roughly the same size
- Check that sprite sheet dimensions match config in `script.js`
- Try regenerating: `node update-images.js`

### Performance issues?
- Check file size: WebP should be 500-800KB
- If too large, reduce quality in `update-images.js` (line 88)
- Consider reducing number of images

## Performance Monitoring

Open browser console to see sprite sheet load time:
```
✓ Sprite sheet loaded in 45.30ms
```

Compare before/after in Network tab:
- **Before**: 20 requests, 4.6MB
- **After**: 1 request, 600KB

## Technical Details

**How it works:**
1. All 20 images are combined into one sprite sheet (900×720px)
2. JavaScript uses CSS `background-position` to show different parts
3. Lazy loads on first mouse movement (no initial load penalty)
4. WebP format with PNG fallback for compatibility

**File structure:**
```
images/
  ├── sprite-sheet.webp  (Primary, ~600KB)
  ├── sprite-sheet.png   (Fallback, ~800KB)
  └── [original images]  (No longer loaded by script)
```

## Reverting to Individual Images

If you need to revert:

1. In `script.js`, replace sprite sheet code with:
```javascript
const TRAIL_IMAGES = [
    'images/05A58CEC-CF53-4070-AEFB-D157DEF9510A_1_105_c.jpeg',
    // ... add all 20 images
];
```

2. Update `spawnTrailImage()` function to use individual images

## Resources

- **ImageMagick**: https://imagemagick.org/
- **WebP Format**: https://developers.google.com/speed/webp
- **Sprite Sheets Explained**: https://css-tricks.com/css-sprites/
- **Performance Guide**: See `/drafts/image-optimization-strategies.md`
