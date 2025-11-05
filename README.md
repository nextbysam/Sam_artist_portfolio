# Sam_artist_portfolio

Personal portfolio website featuring minimalist design and interactive cursor trail effect.

## Features

- **Dynamic age calculator** with millisecond precision
- **Expandable sections** for content organization
- **Interactive cursor trail** with optimized sprite sheet system
- **Easter eggs** including dark mode (`stillness` keyword) and Konami code
- **Responsive design** with mobile optimization
- **Accessibility** with keyboard navigation and reduced-motion support

## Image Optimization

The cursor trail effect uses an optimized sprite sheet system:
- **87% smaller** (600KB vs 4.6MB)
- **1 HTTP request** instead of 20
- **Lazy loading** on first mouse movement

### Setup Sprite Sheet

```bash
# Install ImageMagick
brew install imagemagick  # macOS

# Generate sprite sheet
node update-images.js
```

See [SPRITE_SHEET_SETUP.md](SPRITE_SHEET_SETUP.md) for detailed instructions.

## Development

Simply open `index.html` in a browser. No build process required.

## Structure

```
├── index.html          # Main HTML file
├── script.js           # Interactive features and cursor trail
├── styles.css          # Styling
├── update-images.js    # Sprite sheet generator
├── images/             # Image assets
└── drafts/             # Strategy documents
```
