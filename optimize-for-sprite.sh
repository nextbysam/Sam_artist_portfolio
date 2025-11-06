#!/bin/bash

# Optimize images for sprite sheet generation
# This script will help curate and optimize 30-35 images

cd "$(dirname "$0")"

echo "🎨 Sprite Sheet Image Optimizer"
echo "================================"

# Create backup and working directories
mkdir -p images/backup
mkdir -p images/optimized
mkdir -p images/archive

# Count current images (excluding sprite sheets)
TOTAL_IMAGES=$(find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*" | wc -l | tr -d ' ')

echo ""
echo "📊 Current state:"
echo "   Total images: $TOTAL_IMAGES"
echo "   Target: 30-35 images"
echo ""

# Step 1: Backup current sprite sheets
if [ -f "images/sprite-sheet.webp" ]; then
    echo "📦 Backing up current sprite sheet..."
    cp images/sprite-sheet.webp images/backup/
    cp images/sprite-sheet.png images/backup/
    echo "   ✓ Saved to images/backup/"
fi

# Step 2: List all images for manual review
echo ""
echo "📋 Creating image inventory..."
find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*" -exec ls -lh {} \; | awk '{print $9, "(" $5 ")"}' > images/image-inventory.txt
echo "   ✓ Saved to images/image-inventory.txt"

# Step 3: Archive large drone images (they're huge and probably too detailed for trail)
echo ""
echo "🗄️  Archiving very large images (>10MB)..."
ARCHIVED=0
for img in images/*.{jpg,JPG,jpeg}; do
    if [ -f "$img" ]; then
        SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        if [ $SIZE -gt 10485760 ]; then  # 10MB
            FILENAME=$(basename "$img")
            echo "   Moving: $FILENAME ($(numfmt --to=iec $SIZE 2>/dev/null || echo "$SIZE bytes"))"
            mv "$img" images/archive/
            ARCHIVED=$((ARCHIVED + 1))
        fi
    fi
done 2>/dev/null

echo "   ✓ Archived $ARCHIVED large images to images/archive/"

# Count remaining
REMAINING=$(find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*" | wc -l | tr -d ' ')
echo ""
echo "📊 After archiving: $REMAINING images remaining"

if [ $REMAINING -gt 35 ]; then
    echo ""
    echo "⚠️  You have $REMAINING images (target is 30-35)"
    echo ""
    echo "Options:"
    echo "  1. Manually review images/image-inventory.txt and delete unwanted images"
    echo "  2. Continue anyway and randomly select 35 images"
    echo ""
    read -p "Continue with random selection? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🎲 Randomly selecting 35 images..."
        TEMP_LIST=$(mktemp)
        find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*" | sort -R | head -35 > "$TEMP_LIST"
        
        # Move non-selected to archive
        while IFS= read -r img; do
            if ! grep -q "$img" "$TEMP_LIST"; then
                mv "$img" images/archive/
            fi
        done < <(find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*")
        
        rm "$TEMP_LIST"
        echo "   ✓ Selected 35 random images, moved rest to archive"
    else
        echo "👋 Manually curate your images in /images, then run this script again."
        exit 0
    fi
fi

# Step 4: Optimize remaining images
REMAINING=$(find images -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.png" \) ! -name "sprite-sheet*" | wc -l | tr -d ' ')

echo ""
echo "🔧 Optimizing $REMAINING images to 500x500px..."

COUNT=0
for img in images/*.{jpg,JPG,jpeg,png}; do
    if [ -f "$img" ] && [[ ! "$img" =~ sprite-sheet ]]; then
        FILENAME=$(basename "$img")
        echo -n "   Processing: $FILENAME ... "
        
        # Optimize: resize to 500x500, compress
        convert "$img" \
            -resize 500x500^ \
            -gravity center \
            -extent 500x500 \
            -quality 85 \
            -strip \
            "images/optimized/$FILENAME" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            # Get sizes
            ORIGINAL_SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
            NEW_SIZE=$(stat -f%z "images/optimized/$FILENAME" 2>/dev/null || stat -c%s "images/optimized/$FILENAME" 2>/dev/null)
            SAVINGS=$(echo "scale=1; ($ORIGINAL_SIZE - $NEW_SIZE) * 100 / $ORIGINAL_SIZE" | bc 2>/dev/null || echo "N/A")
            
            echo "✓ (saved ${SAVINGS}%)"
            COUNT=$((COUNT + 1))
        else
            echo "❌ failed"
        fi
    fi
done 2>/dev/null

echo ""
echo "✅ Optimized $COUNT images"

# Step 5: Replace originals with optimized versions
echo ""
echo "📦 Replacing originals with optimized versions..."
rm -f images/*.{jpg,JPG,jpeg,png} 2>/dev/null
mv images/optimized/* images/ 2>/dev/null
rmdir images/optimized

echo "   ✓ Done"

# Step 6: Generate sprite sheet
echo ""
echo "🎨 Generating new sprite sheet..."
node update-images.js

echo ""
echo "================================"
echo "✨ Optimization Complete!"
echo ""
echo "Next steps:"
echo "  1. Check the new sprite sheet size"
echo "  2. Update script.js with the cols/rows values shown above"
echo "  3. Test the animation in browser"
echo ""
echo "Backup location: images/backup/"
echo "Archived images: images/archive/"
