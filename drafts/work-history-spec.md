# Work History Section - Minimalist Specification

## Design Philosophy

Based on your portfolio's existing aesthetic:
- **Ultra-minimalist**: SF Mono font, monochrome palette, subtle interactions
- **Text-focused**: No visual clutter, emphasis on content and readability
- **Expandable sections**: Consistent with existing Philosophy, Now, and Work sections
- **Apple-inspired**: Clean, deliberate spacing, purposeful typography

## Visual Design

### Structure
```
[>] Work
    ↓ (expands)
    Selected Work History

    Company Name · Role
    Date range
    Brief description of impact/contribution

    —

    Company Name · Role
    Date range
    Brief description of impact/contribution
```

### Typography & Spacing
- Company name: `14px`, `font-weight: 500` (same as h3)
- Role: `14px`, `font-weight: 400`, `color: var(--accent-color)`
- Date: `12px`, `color: var(--accent-color)`, monospace
- Description: `14px`, `line-height: 1.7`, `opacity: 0.92`
- Divider between entries: `—` character, `margin: 24px 0`

### Layout Pattern
Each work entry follows a vertical rhythm:
1. **Header line**: `Company · Role` (using middle dot separator)
2. **Date**: Separate line, subtle gray
3. **Description**: 1-2 sentences max, focuses on *impact* not *tasks*
4. **Divider**: Subtle separator between entries

## HTML Structure

```html
<section class="expandable-section" id="work-history-section">
    <button class="section-toggle" aria-expanded="false" aria-controls="work-history-content">
        <span class="arrow">[>]</span> Work
    </button>
    <div class="section-content hidden" id="work-history-content">
        <h2>Selected Work History</h2>

        <div class="work-entry">
            <div class="work-header">
                <h3 class="work-company">Company Name</h3>
                <span class="work-role-separator">·</span>
                <span class="work-role">Role Title</span>
            </div>
            <time class="work-date" datetime="2024-01">January 2024 - Present</time>
            <p class="work-description">
                Brief, impactful description focusing on what you created/solved, not what you did.
            </p>
        </div>

        <div class="work-divider">—</div>

        <div class="work-entry">
            <!-- Next entry -->
        </div>
    </div>
</section>
```

## CSS Additions

```css
/* Work History Section */
.work-entry {
    margin-bottom: 28px;
}

.work-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 6px;
}

.work-company {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    color: var(--text-color);
}

.work-role-separator {
    color: var(--accent-color);
    font-weight: 400;
}

.work-role {
    font-size: 14px;
    font-weight: 400;
    color: var(--accent-color);
}

.work-date {
    display: block;
    font-size: 12px;
    color: var(--accent-color);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
}

.work-description {
    font-size: 14px;
    line-height: 1.7;
    letter-spacing: -0.01em;
    opacity: 0.92;
    margin: 0;
}

.work-divider {
    margin: 24px 0;
    color: var(--accent-color);
    text-align: left;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .work-header {
        flex-direction: column;
        gap: 4px;
        align-items: flex-start;
    }

    .work-role-separator {
        display: none;
    }

    .work-role {
        display: block;
    }

    .work-divider {
        margin: 20px 0;
    }
}
```

## Content Guidelines

### Writing Style
1. **Focus on impact, not tasks**:
   - ❌ "Managed a team of engineers and built features"
   - ✅ "Led development of X that solved Y for Z users"

2. **Be specific but concise**:
   - ❌ "Worked on various projects improving performance"
   - ✅ "Reduced API latency by 60% through query optimization"

3. **Show creation over consumption**:
   - ❌ "Participated in code reviews and meetings"
   - ✅ "Built internal tool that reduced deployment time from 2hr to 15min"

4. **One powerful sentence > multiple weak ones**:
   - Keep each description to 1-2 sentences maximum
   - Each sentence should stand on its own merit

### Example Entries

```html
<div class="work-entry">
    <div class="work-header">
        <h3 class="work-company">AWLSEN</h3>
        <span class="work-role-separator">·</span>
        <span class="work-role">Founder</span>
    </div>
    <time class="work-date" datetime="2025-11">November 2025 - Present</time>
    <p class="work-description">
        Building a home for AGI. Products at the intersection of liberal arts and technology.
    </p>
</div>

<div class="work-divider">—</div>

<div class="work-entry">
    <div class="work-header">
        <h3 class="work-company">Previous Company</h3>
        <span class="work-role-separator">·</span>
        <span class="work-role">Engineering Lead</span>
    </div>
    <time class="work-date" datetime="2023-01">January 2023 - October 2025</time>
    <p class="work-description">
        Led team that shipped product X used by 100k+ creators. Reduced infrastructure costs by 40%.
    </p>
</div>
```

## JavaScript Integration

The existing `initSectionToggles()` function in `script.js` will automatically handle the expand/collapse functionality. No additional JavaScript needed unless you want special interactions.

### Optional Enhancement: Reading Time Indicator

If work history becomes substantial, could add a subtle "~2 min read" indicator:

```javascript
function calculateWorkHistoryReadingTime() {
    const content = document.getElementById('work-history-content');
    if (!content) return;

    const text = content.innerText;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    if (readingTime > 1) {
        const header = document.querySelector('#work-history-section .section-toggle');
        header.innerHTML += ` <span class="reading-time">~${readingTime} min</span>`;
    }
}
```

## Variations to Consider

### 1. **Timeline-style** (More visual)
Add vertical line with dots:
```
2025 ● AWLSEN · Founder
     │ Building a home for AGI...
     │
2023 ● Company · Role
     │ Description...
```

### 2. **Reverse chronological with years as headers**
```
2025
    AWLSEN · Founder
    Description...

2023
    Company · Role
    Description...
```

### 3. **Inline dates** (More compact)
```
AWLSEN · Founder (2025 - Present)
Description...
```

## Recommendation

**Go with the structured approach** (first design) because:
1. ✅ Matches your existing `.now-entry` pattern
2. ✅ Maintains vertical rhythm with other sections
3. ✅ Scalable - works with 2 or 20 entries
4. ✅ Clean separation between company/role/date/description
5. ✅ Mobile-friendly with natural stacking

## Integration Checklist

- [ ] Add HTML structure to `index.html` after Philosophy section
- [ ] Add CSS to `styles.css`
- [ ] Replace placeholder content with real work history
- [ ] Test expand/collapse functionality
- [ ] Verify mobile responsiveness
- [ ] Ensure dark mode looks good
- [ ] Verify accessibility (keyboard navigation, screen readers)
- [ ] Add 1-3 meaningful work entries (quality > quantity)

## Accessibility Notes

- Use semantic `<time>` elements with `datetime` attribute
- Maintain proper heading hierarchy (h2 → h3)
- Ensure sufficient color contrast in both light/dark modes
- Button has proper `aria-expanded` and `aria-controls` attributes
- Keyboard navigation works (tab, enter, escape)

---

**Philosophy Alignment**: Like your "Stateless Obsession" philosophy, this work section focuses on **what matters** - impact and creation - not bureaucratic details or exhaustive lists. Every entry should justify its existence.
