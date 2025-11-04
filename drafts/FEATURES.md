# Website Features & Easter Eggs

## Core Features

### 1. Dynamic Age Display
Your age updates with 4 decimal precision based on your birthdate (Feb 10, 2009). Updates every minute.

### 2. Expandable Sections
Click the `[>]` arrows to expand/collapse sections:
- **Philosophy** (expanded by default)
- **Now** (your current activities)
- **Work** (project portfolio)

### 3. Responsive Design
Mobile-optimized with touch-friendly controls and simplified layout.

## Easter Eggs

### Priority 1 (Implemented)

#### 🌙 Isolation Mode (Dark Theme)
- **Trigger:** Type "stillness" anywhere on the page
- **Effect:** Smooth transition to dark mode with message "Clarity comes from stillness"
- **Reset:** Type "chaos" to return to light mode
- **Persistent:** Your theme preference is saved in localStorage

#### ✨ Scroll-Triggered Word Emphasis
- **Trigger:** Scroll through the Philosophy section
- **Effect:** Key words (creating, obsession, revolutionary, artist, isolation, focus) subtly emphasize as they enter viewport
- **Philosophy:** Guides readers to important concepts

### Priority 2 (Implemented)

#### 🎮 Konami Code Secret
- **Trigger:** Press ↑↑↓↓←→←→BA on keyboard
- **Effect:** Screen glitches briefly, then shows message "You found it. Not everyone does."
- **Philosophy:** Rewards curious explorers

#### 🔍 Footer Hidden Messages
- **Trigger:** Click the `../.` footer 5+ times
- **Effect:** Random rotating quotes appear:
  - "Currently thinking about: the nature of creativity"
  - "Persistence is the obsession you can control"
  - "ASCII art: ¯\\_(ツ)_/¯"
  - And more...

#### ⏱️ Reading Time Reward
- **Trigger:** Stay on page for 2+ minutes
- **Effect:** Message appears: "Still here? That's the obsession I'm talking about."
- **Philosophy:** Rewards focused attention

## Technical Stack

- **Pure HTML/CSS/JavaScript** (no frameworks or dependencies)
- **Total size:** ~15KB (uncompressed)
- **Performance:** 60fps animations, lazy-loaded effects
- **Accessibility:** Keyboard navigable, screen reader friendly, respects prefers-reduced-motion

## Customization Guide

### Update Your Information

**In `index.html`:**
1. Replace email: `sam@samupadhyay.com`
2. Replace social links: GitHub, Twitter, Instagram URLs
3. Update "Now" section with current activities
4. Add your projects in "Work" section

**In `script.js`:**
- Change birthdate: Line 3 `new Date('2009-02-10')`

### Adjust Colors

**In `styles.css` `:root` section:**
```css
--bg-color: #e8e8e8;        /* background */
--text-color: #1a1a1a;      /* text */
--accent-color: #666666;     /* accents */
```

### Add More Easter Eggs

See commented sections in `script.js` for adding:
- Custom keyboard shortcuts
- Cursor trail effects
- Sound effects
- Additional scroll animations

## Deployment

### Quick Deploy Options:

1. **GitHub Pages:**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```
   Enable GitHub Pages in repository settings → Pages → Source: main branch

2. **Netlify:**
   - Drag and drop the folder to Netlify
   - Or connect your GitHub repo

3. **Vercel:**
   ```bash
   vercel --prod
   ```

## Performance Tips

- All animations use CSS transforms (GPU accelerated)
- Intersection Observer for scroll effects (efficient)
- No external requests (instant load)
- Optimized for mobile networks

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Philosophy Alignment

Each feature connects to your stated philosophy:

| Feature | Philosophy Connection |
|---------|----------------------|
| Konami Code | "You break rules. You experiment." |
| Isolation Mode | "Isolation isn't loneliness; it's where focus becomes sacred." |
| Dynamic Age | "I'm still experimenting, still learning." |
| Word Emphasis | "Ideas come through clarity, not chaos." |
| Footer Messages | "You go deep, obsessively" |
| Minimalist Design | "Competition is for those who accept the status quo" |

---

*Built with obsession, not competition.*
