# Tooltip Definition Feature Specification

## Overview
Implement a Wikipedia-style hover tooltip system that displays word definitions when users hover over specially marked terms in your portfolio website.

## Feature Goals
- **User Experience**: Provide instant contextual definitions without disrupting reading flow
- **Visual Design**: Clean, accessible tooltips that match portfolio aesthetic
- **Performance**: Lightweight implementation with minimal JavaScript
- **Flexibility**: Easy to mark words for definition tooltips throughout the site

---

## Technical Approach

### Option 1: CSS-Only Tooltips (Pure HTML/CSS)
**Best for**: Static definitions that don't change

```html
<p>
  I'm passionate about
  <span class="term" data-definition="The practice of designing and developing software">
    software engineering
  </span>
  and digital art.
</p>
```

```css
.term {
  position: relative;
  text-decoration: underline;
  text-decoration-style: dotted;
  color: var(--accent-color);
  cursor: help;
}

.term::after {
  content: attr(data-definition);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
  transform: translateX(-50%);

  /* Styling */
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  min-width: 200px;
  max-width: 300px;
  text-align: left;
  white-space: normal;

  /* Hidden by default */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  /* Position above cursor */
  z-index: 1000;
}

/* Arrow pointer */
.term::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 2px);
  transform: translateX(-50%);

  border: 8px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
}

.term:hover::after,
.term:hover::before {
  opacity: 1;
  visibility: visible;
}
```

**Pros**:
- No JavaScript required
- Lightweight and fast
- Works without external dependencies

**Cons**:
- Definitions must be hardcoded in HTML
- No dynamic content loading
- Limited positioning control

---

### Option 2: JavaScript-Enhanced with API Integration
**Best for**: Dynamic definitions from dictionary APIs

```html
<p>
  Understanding
  <span class="term" data-term="algorithm">algorithms</span>
  is crucial for optimization.
</p>
```

```javascript
// tooltip-definitions.js
class TooltipDefinition {
  constructor() {
    this.tooltipElement = null;
    this.cache = new Map();
    this.init();
  }

  init() {
    // Create tooltip container
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'definition-tooltip';
    this.tooltipElement.setAttribute('role', 'tooltip');
    document.body.appendChild(this.tooltipElement);

    // Attach event listeners
    document.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', (e) => this.showTooltip(e));
      term.addEventListener('mouseleave', () => this.hideTooltip());
      term.addEventListener('mousemove', (e) => this.updatePosition(e));
    });
  }

  async showTooltip(event) {
    const term = event.target.dataset.term;

    // Check cache first
    if (this.cache.has(term)) {
      this.displayTooltip(this.cache.get(term), event);
      return;
    }

    // Show loading state
    this.tooltipElement.textContent = 'Loading...';
    this.tooltipElement.classList.add('visible');
    this.updatePosition(event);

    try {
      // Fetch definition from API
      const definition = await this.fetchDefinition(term);
      this.cache.set(term, definition);
      this.displayTooltip(definition, event);
    } catch (error) {
      this.tooltipElement.textContent = 'Definition not available';
    }
  }

  async fetchDefinition(term) {
    // Option 1: Free Dictionary API
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
    );

    if (!response.ok) throw new Error('Not found');

    const data = await response.json();
    const meaning = data[0]?.meanings[0];

    return {
      word: term,
      partOfSpeech: meaning?.partOfSpeech || '',
      definition: meaning?.definitions[0]?.definition || 'No definition found'
    };
  }

  displayTooltip(definition, event) {
    this.tooltipElement.innerHTML = `
      <strong>${definition.word}</strong>
      ${definition.partOfSpeech ? `<em>(${definition.partOfSpeech})</em>` : ''}
      <br>
      <span>${definition.definition}</span>
    `;
    this.tooltipElement.classList.add('visible');
  }

  hideTooltip() {
    this.tooltipElement.classList.remove('visible');
  }

  updatePosition(event) {
    const offset = 15;
    const x = event.clientX + offset;
    const y = event.clientY + offset;

    this.tooltipElement.style.left = `${x}px`;
    this.tooltipElement.style.top = `${y}px`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TooltipDefinition();
});
```

```css
.definition-tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 320px;
  min-width: 200px;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease;

  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.definition-tooltip.visible {
  opacity: 1;
  visibility: visible;
}

.definition-tooltip strong {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
}

.definition-tooltip em {
  color: #aaa;
  font-size: 12px;
}

.term {
  position: relative;
  cursor: help;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--accent-color, #0066cc);
  color: inherit;
  transition: color 0.2s ease;
}

.term:hover {
  color: var(--accent-color, #0066cc);
}
```

**Pros**:
- Dynamic definitions from dictionary APIs
- Caching for better performance
- Rich content with word etymology, examples
- Follows mouse cursor for better UX

**Cons**:
- Requires JavaScript
- API rate limits to consider
- Network latency for first load

---

## Recommended Dictionary APIs

### 1. **Free Dictionary API** (Recommended)
- **URL**: `https://dictionaryapi.dev/`
- **Cost**: Free, no API key required
- **Limit**: No official limit
- **Features**: Definitions, phonetics, synonyms, examples

```javascript
// Example response
{
  "word": "algorithm",
  "meanings": [
    {
      "partOfSpeech": "noun",
      "definitions": [
        {
          "definition": "A process or set of rules to be followed in calculations or problem-solving operations",
          "example": "The algorithm produces a result in 20 seconds"
        }
      ]
    }
  ]
}
```

### 2. **Wiktionary API**
- **URL**: `https://en.wiktionary.org/api/rest_v1/`
- **Cost**: Free
- **Features**: Comprehensive definitions, etymologies, translations

### 3. **WordsAPI** (Premium option)
- **URL**: `https://www.wordsapi.com/`
- **Cost**: Free tier (2,500 requests/day)
- **Features**: Rich data including syllables, pronunciation, frequency

---

## Implementation Recommendations

### For Portfolio Site:
1. **Start with CSS-only approach** for key technical terms
2. **Curate definitions** to be concise and context-specific to your work
3. **Create a glossary JSON file** for your domain-specific terms

```json
// glossary.json
{
  "algorithm": "A step-by-step procedure for solving a problem or accomplishing a task",
  "neural network": "A computing system inspired by biological neural networks",
  "responsive design": "Web design approach that makes web pages render well on various devices",
  "shader": "A program that tells the computer how to render graphics"
}
```

```javascript
// Load custom glossary
async function loadGlossary() {
  const response = await fetch('/data/glossary.json');
  return await response.json();
}
```

### Progressive Enhancement:
1. **Phase 1**: CSS-only tooltips with handpicked definitions
2. **Phase 2**: Add JavaScript for better positioning
3. **Phase 3**: Integrate dictionary API for broader coverage
4. **Phase 4**: Add rich content (images, examples, links)

---

## Accessibility Considerations

```html
<!-- Proper ARIA attributes -->
<span
  class="term"
  data-term="algorithm"
  role="button"
  tabindex="0"
  aria-describedby="tooltip-algorithm"
>
  algorithm
</span>

<div id="tooltip-algorithm" role="tooltip" hidden>
  A step-by-step procedure for solving a problem
</div>
```

### Keyboard Support:
```javascript
term.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.showTooltip(e);
  }
});
```

### Screen Reader Support:
- Use `aria-describedby` to link term to tooltip
- Ensure tooltip content is readable by screen readers
- Provide keyboard navigation (Tab + Enter)

---

## Mobile Considerations

```css
/* Mobile: Tap to show, tap again to hide */
@media (hover: none) and (pointer: coarse) {
  .term::after,
  .term::before {
    display: none; /* Hide CSS-only tooltips on mobile */
  }

  .term:active {
    /* Show definition inline instead */
  }
}
```

```javascript
// Touch device detection
if ('ontouchstart' in window) {
  // Use click/tap instead of hover
  term.addEventListener('click', (e) => {
    e.preventDefault();
    this.toggleTooltip(e);
  });
}
```

---

## Performance Optimization

1. **Debounce API calls**
```javascript
const debouncedFetch = debounce(this.fetchDefinition, 300);
```

2. **Lazy load tooltip script**
```html
<script src="tooltip-definitions.js" defer></script>
```

3. **Use local cache/localStorage**
```javascript
// Cache definitions locally
localStorage.setItem(`def_${term}`, JSON.stringify(definition));
```

4. **Preload common terms**
```javascript
const commonTerms = ['algorithm', 'design', 'portfolio'];
await Promise.all(commonTerms.map(term => this.fetchDefinition(term)));
```

---

## Next Steps

1. ✅ Review this specification
2. [ ] Choose implementation approach (CSS-only vs. JS-enhanced)
3. [ ] Design tooltip styling to match portfolio theme
4. [ ] Create glossary of technical terms for your work
5. [ ] Implement basic version in a test page
6. [ ] Test across devices and browsers
7. [ ] Add accessibility features
8. [ ] Deploy to production

---

## Example Integration for Your Portfolio

```html
<!-- In your about section -->
<section class="about">
  <p>
    I'm a creative developer specializing in
    <span class="term" data-term="webgl">WebGL</span>
    experiences and
    <span class="term" data-term="generative-art">generative art</span>.
    My work combines
    <span class="term" data-term="computational-design">computational design</span>
    with traditional artistic principles.
  </p>
</section>
```

This feature will enhance visitor engagement and demonstrate your attention to detail and user experience design.
