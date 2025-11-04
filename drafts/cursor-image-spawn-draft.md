# Cursor Image Spawn & Fade Animation Draft

## Concept
As the cursor moves across the page, small images spawn at the cursor position and slowly fade away - creating a minimalist trailing effect.

## Implementation Plan

### 1. Where to Add in Codebase

**HTML (index.html):**
- No changes needed to HTML structure
- Animation will work by dynamically creating/removing DOM elements

**CSS (styles.css):**
- Add after line 229 (after easter-egg styles, before media queries)
- New class: `.cursor-trail-image`

**JavaScript (script.js):**
- Add new function: `initCursorImageTrail()`
- Call it in `init()` function around line 223

### 2. CSS Implementation

```css
/* Cursor Trail Image Animation */
.cursor-trail-image {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 1;
    transition: opacity 1.5s ease-out, transform 1.5s ease-out;
    will-change: opacity, transform;
}

.cursor-trail-image.fade {
    opacity: 0;
    transform: scale(0.5);
}
```

### 3. JavaScript Implementation

```javascript
// Cursor Image Trail Effect
let lastSpawnTime = 0;
const SPAWN_INTERVAL = 100; // milliseconds between spawns
const FADE_DURATION = 1500; // how long fade takes
const IMAGE_SIZE = 20; // size in pixels

function initCursorImageTrail() {
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();

        // Throttle spawning
        if (now - lastSpawnTime < SPAWN_INTERVAL) {
            return;
        }

        lastSpawnTime = now;
        spawnTrailImage(e.clientX, e.clientY);
    });
}

function spawnTrailImage(x, y) {
    const img = document.createElement('div');
    img.className = 'cursor-trail-image';

    // Style the element
    img.style.left = `${x - IMAGE_SIZE / 2}px`;
    img.style.top = `${y - IMAGE_SIZE / 2}px`;
    img.style.width = `${IMAGE_SIZE}px`;
    img.style.height = `${IMAGE_SIZE}px`;

    // Option 1: Simple colored dot
    img.style.backgroundColor = 'var(--accent-color)';
    img.style.borderRadius = '50%';

    // Option 2: Use an actual image (uncomment if you want to use images)
    // img.style.backgroundImage = 'url(/path/to/image.png)';
    // img.style.backgroundSize = 'cover';

    document.body.appendChild(img);

    // Trigger fade animation
    requestAnimationFrame(() => {
        img.classList.add('fade');
    });

    // Remove from DOM after animation completes
    setTimeout(() => {
        img.remove();
    }, FADE_DURATION);
}
```

### 4. Configuration Options

**Minimalist Approach (Recommended):**
- Small dots (10-20px)
- Subtle accent color
- Longer fade (1.5-2s)
- Lower spawn rate (100-150ms)

**More Visible Approach:**
- Larger elements (30-40px)
- Brighter colors
- Faster fade (0.5-1s)
- Higher spawn rate (50-75ms)

**Image Options:**
1. **Simple dots** - minimal, clean (recommended for your aesthetic)
2. **ASCII characters** - fitting with monospace theme ('•', '·', '∘')
3. **Small icons** - if you have brand imagery
4. **Emoji** - playful but might not fit the aesthetic

### 5. Performance Considerations

- Use `pointer-events: none` to prevent interaction issues
- Use `will-change` for better animation performance
- Remove elements from DOM after animation completes
- Throttle spawning with `SPAWN_INTERVAL`
- Consider disabling on mobile (touch devices)

### 6. Accessibility

- Respect `prefers-reduced-motion` (already handled in your CSS)
- Could disable entirely if user has motion sensitivity
- No interaction required - purely visual enhancement

### 7. Dark Mode Support

Since you have dark mode via "stillness" keyword:
```javascript
// In spawnTrailImage(), use CSS variable:
img.style.backgroundColor = 'var(--accent-color)';
// This will automatically adapt to light/dark mode
```

### 8. Optional Enhancements

- **Random sizes**: Slight size variation for organic feel
- **Random opacity**: Start with varying opacity (0.3-0.7)
- **Velocity-based**: Larger/more frequent spawns with faster cursor movement
- **Section-specific**: Different images/colors in different sections
- **Disable in sections**: Turn off during reading (philosophy section)

### 9. Testing Checklist

- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Performance is smooth (no lag)
- [ ] Elements properly removed from DOM
- [ ] Respects prefers-reduced-motion
- [ ] Works on different screen sizes
- [ ] Doesn't interfere with clicking/interaction

### 10. Where Exactly to Add

**styles.css:**
```
Line 229 (after .easter-egg-message.hidden)
Insert new cursor trail styles
Line 231 (before @media queries)
```

**script.js:**
```
Line 211 (after injectGlitchAnimation function)
Insert new cursor trail functions
Line 223 (in init() function, after initReadingTimeReward())
Add: initCursorImageTrail();
```

## Final Notes

Start with the minimalist dot approach. It fits your aesthetic best:
- Small (10-15px) dots
- Uses `var(--accent-color)` for consistency
- 100ms spawn interval
- 1.5s fade duration
- Simple circular shape

Test first, then adjust based on feel. The goal is subtle enhancement, not distraction.
