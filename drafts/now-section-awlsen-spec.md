# Now Section Update - AWLSEN Spec

## Overview
Update the "Now" section to reflect Sam's current obsession with building AWLSEN and creating a home for AGI, maintaining the minimalistic monospace typography theme.

## Background Research on AWLSEN

AWLSEN represents the convergence of six visionaries who exemplified the intersection of liberal arts and technology:

- **A**lbert Einstein - Theoretical physicist who valued imagination over knowledge ("Imagination is more important than knowledge")
- **W**alt Disney - Storyteller and innovator who merged creativity with technology
- **L**eonardo Da Vinci - Renaissance polymath, artist-engineer who saw no boundary between art and science
- **S**teve Jobs - Product visionary who believed technology should marry liberal arts
- **E**dwin Land - Inventor and Polaroid founder who pioneered instant photography through scientific artistry
- **N**ikola Tesla - Inventor and electrical engineer whose imagination drove technological revolution

These individuals share common traits:
- Polymathic thinking across disciplines
- Valuing imagination and creativity as core to innovation
- Challenging status quo and conventional thinking
- Building revolutionary products/ideas at the arts-technology nexus
- Relentless obsession with their vision

## Proposed Content

### Primary Entry (Current Focus)
```
Currently, I am trying to build a home for AGI. Me and my friend(s) are starting AWLSEN
(an enduring company that values imagination more than knowledge. whose products stands
at the intersection of liberal arts and technology). I am obsessing about this problem.
```

### Secondary Context (What AWLSEN Means)
```
AWLSEN is based on Albert Einstein, Walt Disney, Leonardo Da Vinci, Steve Jobs,
Edwin Land, and Nikola Tesla - the polymaths who saw no separation between art and
science, who valued imagination as the engine of innovation, who built the impossible
because they could see what didn't exist yet.
```

## HTML Structure

Location: `index.html` lines 100-115

```html
<section class="expandable-section" id="now-section">
    <button class="section-toggle" aria-expanded="false" aria-controls="now-content">
        <span class="arrow">[>]</span> Now
    </button>
    <div class="section-content hidden" id="now-content">
        <h2>What I'm Doing Now</h2>

        <div class="now-entry now-primary">
            <time datetime="2025-11">November 2025</time>
            <p>
                Currently, I am trying to build a home for AGI. Me and my friend(s) are starting
                <span class="term" data-definition="AWLSEN represents Albert Einstein, Walt Disney, Leonardo Da Vinci, Steve Jobs, Edwin Land, and Nikola Tesla - polymaths who stood at the intersection of liberal arts and technology, who valued imagination more than knowledge, who saw what didn't exist yet and built it.">AWLSEN</span>
                (an enduring company that values imagination more than knowledge. whose products stands
                at the intersection of liberal arts and technology). I am obsessing about this problem.
            </p>
        </div>

        <div class="now-entry now-philosophy">
            <p class="now-subtitle">The AWLSEN Philosophy</p>
            <p>
                AWLSEN is based on <strong>A</strong>lbert Einstein, <strong>W</strong>alt Disney,
                <strong>L</strong>eonardo Da Vinci, <strong>S</strong>teve Jobs, <strong>E</strong>dwin Land,
                and <strong>N</strong>ikola Tesla - the polymaths who saw no separation between art and
                science, who valued imagination as the engine of innovation, who built the impossible
                because they could see what didn't exist yet.
            </p>
        </div>
    </div>
</section>
```

## CSS Updates

Add to `styles.css` after line 377:

```css
/* Now Section - Enhanced Typography */
.now-primary {
    margin-bottom: 32px;
}

.now-primary p {
    font-size: 15px;
    line-height: 1.8;
    letter-spacing: -0.01em;
}

.now-philosophy {
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

body.dark-mode .now-philosophy {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.now-subtitle {
    font-size: 13px;
    color: var(--accent-color);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
}

.now-philosophy p:not(.now-subtitle) {
    font-size: 14px;
    line-height: 1.7;
    opacity: 0.88;
}

.now-philosophy strong {
    font-weight: 600;
    opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
    .now-primary p {
        font-size: 14px;
    }

    .now-philosophy p:not(.now-subtitle) {
        font-size: 13px;
    }
}
```

## Typography Theme Consistency

The design maintains your existing minimalistic monospace aesthetic:

1. **Font Family**: SF Mono / Monaco (consistent with site)
2. **Size Hierarchy**:
   - Primary text: 15px (slightly larger for emphasis on current focus)
   - Philosophy text: 14px (standard body)
   - Subtitle: 13px (metadata styling)
3. **Letter Spacing**: -0.01em (consistent with site)
4. **Line Height**: 1.7-1.8 (readable, matches philosophy section)
5. **Color Variables**: Uses existing `--text-color` and `--accent-color`

## Interactive Elements

- **AWLSEN Term**: Wrapped in `.term` class with tooltip definition explaining the six visionaries
- **Bold Names**: Each founder's name gets `<strong>` tag to emphasize the acronym structure
- Maintains existing expand/collapse functionality

## Content Tone

Matches your existing voice:
- Direct, unfiltered ("I am obsessing about this problem")
- Philosophical but grounded
- Focus on creation over competition
- Revolutionary mindset (aligned with "crazy ones" section)

## Implementation Notes

1. Remove existing placeholder content (lines 107-113)
2. Add new structure with primary and philosophy entries
3. Insert CSS additions after `.now-entry time` rules
4. Tooltip for AWLSEN provides context without cluttering main text
5. Philosophy section provides depth for those who expand the section

## Alternative: Minimal Version

If the full version feels too wordy, here's a more concise option:

```html
<div class="now-entry">
    <time datetime="2025-11">November 2025</time>
    <p>
        Building a home for AGI with <span class="term" data-definition="Albert Einstein, Walt Disney, Leonardo Da Vinci, Steve Jobs, Edwin Land, Nikola Tesla - polymaths who stood at the intersection of arts and technology.">AWLSEN</span>.
        An enduring company that values imagination more than knowledge.
        Products at the intersection of liberal arts and technology. Obsessing.
    </p>
</div>
```

This version:
- Uses fewer words
- More staccato rhythm (matches your style)
- Keeps tooltip for AWLSEN context
- Drops the philosophy subsection
- More direct and punchy
