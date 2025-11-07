// Dynamic Age Calculator
function calculateAge() {
    const birthDate = new Date('2009-10-02'); // October 2, 2009
    const now = new Date();
    const ageInMs = now - birthDate;
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(9); // 9 decimals for millisecond precision
}

function updateAge() {
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
}

// Section Expand/Collapse
function initSectionToggles() {
    const toggleButtons = document.querySelectorAll('.section-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = button.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const arrow = button.querySelector('.arrow');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                button.setAttribute('aria-expanded', 'false');
                arrow.textContent = '[>]';
                content.classList.add('hidden');
            } else {
                button.setAttribute('aria-expanded', 'true');
                arrow.textContent = '[v]';
                content.classList.remove('hidden');
            }
        });
    });
}

// Easter Egg: Dark Mode via "stillness" keyword
let keyBuffer = '';
const STILLNESS_KEYWORD = 'stillness';
const CHAOS_KEYWORD = 'chaos';

function handleKeyPress(e) {
    keyBuffer += e.key.toLowerCase();
    
    if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
    }
    
    if (keyBuffer.includes(STILLNESS_KEYWORD)) {
        enableDarkMode();
        keyBuffer = '';
    } else if (keyBuffer.includes(CHAOS_KEYWORD)) {
        disableDarkMode();
        keyBuffer = '';
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    showEasterEggMessage('Clarity comes from stillness');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    showEasterEggMessage('Back to chaos');
}

function loadThemePreference() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Easter Egg Message Display
function showEasterEggMessage(message) {
    const messageEl = document.getElementById('easter-egg-message');
    messageEl.textContent = message;
    messageEl.classList.remove('hidden');
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 500);
    }, 2000);
}

// Scroll-Triggered Word Emphasis
function initScrollEmphasis() {
    const emphasisWords = document.querySelectorAll('.emphasis-word');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('highlighted');
            } else {
                entry.target.classList.remove('highlighted');
            }
        });
    }, observerOptions);
    
    emphasisWords.forEach(word => observer.observe(word));
}

// Easter Egg: Konami Code
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
let konamiIndex = 0;

function handleKonamiCode(e) {
    const key = e.key;
    
    if (key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
            triggerKonamiEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}

function triggerKonamiEasterEgg() {
    const body = document.body;
    body.style.animation = 'glitch 0.3s';
    
    setTimeout(() => {
        body.style.animation = '';
        showEasterEggMessage('You found it. Not everyone does.');
    }, 300);
}

// Easter Egg: Footer Secret
let footerClickCount = 0;
const FOOTER_CLICK_THRESHOLD = 5;
const footerQuotes = [
    'Currently thinking about: the nature of creativity',
    'Persistence is the obsession you can control',
    'ASCII art: ¯\\_(ツ)_/¯',
    'You clicked enough. Here\'s nothing.',
    'Still clicking? That\'s dedication.'
];

function initFooterSecret() {
    const footer = document.querySelector('.footer-signature');
    
    footer.addEventListener('click', (e) => {
        e.preventDefault();
        footerClickCount++;
        
        if (footerClickCount >= FOOTER_CLICK_THRESHOLD) {
            const randomQuote = footerQuotes[Math.floor(Math.random() * footerQuotes.length)];
            showEasterEggMessage(randomQuote);
            footerClickCount = 0;
        }
    });
}

// Reading Time Reward
let pageLoadTime = Date.now();

function checkReadingTime() {
    const currentTime = Date.now();
    const timeSpent = (currentTime - pageLoadTime) / 1000;
    
    if (timeSpent > 20) {
        showEasterEggMessage('Still here? That\'s the obsession I\'m talking about.');
        clearInterval(readingTimeInterval);
    }
}

let readingTimeInterval;

function initReadingTimeReward() {
    readingTimeInterval = setInterval(checkReadingTime, 5000);
}

// Add glitch animation CSS
function injectGlitchAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(2px, 2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
}

// Cursor Image Trail Effect - Optimized with Sprite Sheet
let lastSpawnTime = 0;
let mousePos = { x: 0, y: 0, lastX: 0, lastY: 0 };
const SPAWN_INTERVAL = 70;
const IMAGE_SIZE = 180;
const MAX_POOL_SIZE = 50;
const imagePool = [];
const activeImages = new Set();

// Sprite sheet configuration
let spriteSheet = null;
let spriteSheetLoaded = false;

const SPRITE_CONFIG = {
    url: 'images/sprite-sheet.webp?v=6',  // Cache version - increment when regenerating
    fallback: 'images/sprite-sheet.png?v=6',
    cols: 8,    // 8x7 grid
    rows: 7,    // 8x7 grid
    spriteSize: 180,
    displaySize: 180,
    totalImages: 50,  // Actual number of images in sprite sheet (not all grid slots are filled)
};

const totalSprites = SPRITE_CONFIG.totalImages;

function getPooledElement() {
    if (imagePool.length > 0) {
        return imagePool.pop();
    }
    const div = document.createElement('div');
    div.className = 'cursor-trail-image';
    return div;
}

function returnToPool(element) {
    activeImages.delete(element);
    if (imagePool.length < MAX_POOL_SIZE) {
        element.style.display = 'none';
        imagePool.push(element);
    } else {
        element.remove();
    }
}

function preloadSpriteSheet() {
    if (spriteSheet) return Promise.resolve(spriteSheet);

    const perfStart = performance.now();

    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            spriteSheet = img;
            spriteSheetLoaded = true;
            const loadTime = performance.now() - perfStart;
            console.log(`✓ Sprite sheet loaded in ${loadTime.toFixed(2)}ms`);
            resolve(img);
        };

        img.onerror = () => {
            console.warn('⚠ WebP failed, trying PNG fallback...');
            img.src = SPRITE_CONFIG.fallback;
        };

        img.src = SPRITE_CONFIG.url;
    });
}

function getSpritePosition(index) {
    const col = index % SPRITE_CONFIG.cols;
    const row = Math.floor(index / SPRITE_CONFIG.cols);
    return {
        x: col * SPRITE_CONFIG.spriteSize,
        y: row * SPRITE_CONFIG.spriteSize,
    };
}

function spawnTrailImage(x, y) {
    if (!spriteSheetLoaded) return;

    const img = getPooledElement();
    
    const spriteIndex = Math.floor(Math.random() * totalSprites);
    const pos = getSpritePosition(spriteIndex);
    
    const scale = SPRITE_CONFIG.displaySize / SPRITE_CONFIG.spriteSize;
    const sheetDisplayWidth = SPRITE_CONFIG.spriteSize * SPRITE_CONFIG.cols * scale;
    const sheetDisplayHeight = SPRITE_CONFIG.spriteSize * SPRITE_CONFIG.rows * scale;
    
    img.style.cssText = `
        left: ${x - SPRITE_CONFIG.displaySize/2}px;
        top: ${y - SPRITE_CONFIG.displaySize/2}px;
        width: ${SPRITE_CONFIG.displaySize}px;
        height: ${SPRITE_CONFIG.displaySize}px;
        opacity: 0.9;
        transform: scale(1) rotate(0deg);
        display: block;
        background-image: url(${SPRITE_CONFIG.url});
        background-size: ${sheetDisplayWidth}px ${sheetDisplayHeight}px;
        background-position: -${pos.x * scale}px -${pos.y * scale}px;
        background-repeat: no-repeat;
    `;
    
    if (!img.parentElement) {
        document.body.appendChild(img);
    }
    
    activeImages.add(img);
    
    requestAnimationFrame(() => {
        const randomRotate = (Math.random() - 0.5) * 30;
        img.style.opacity = '0';
        img.style.transform = `scale(0.3) rotate(${randomRotate}deg)`;
    });
    
    setTimeout(() => returnToPool(img), 2500);
}

function initCursorImageTrail() {
    // Disable on mobile/touch devices
    if ('ontouchstart' in window) {
        return;
    }
    
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const container = document.querySelector('.container');
    const BUFFER_ZONE = IMAGE_SIZE + 120; // Increased buffer: image size + extra margin for safety
    const CONTAINER_MARGIN = 100; // Additional margin around container to keep images away from text
    
    let preloadStarted = false;
    
    document.addEventListener('mousemove', (e) => {
        // Lazy load sprite sheet on first mouse movement
        if (!preloadStarted) {
            preloadSpriteSheet();
            preloadStarted = true;
        }
        
        // Don't spawn images until sprite sheet is loaded
        if (!spriteSheetLoaded) return;
        // Only spawn images in the siderails (margins on left/right of content)
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        
        // Add extra margin buffer around container to keep images away from text
        const isInSiderails = (
            e.clientX < containerRect.left - CONTAINER_MARGIN || 
            e.clientX > containerRect.right + CONTAINER_MARGIN
        );
        
        if (!isInSiderails) return;
        
        // Also block spawning in vertical proximity to container (top/bottom margins)
        const isVerticallyNearContainer = (
            e.clientY >= containerRect.top - CONTAINER_MARGIN &&
            e.clientY <= containerRect.bottom + CONTAINER_MARGIN
        );
        
        if (isVerticallyNearContainer && 
            e.clientX >= containerRect.left - CONTAINER_MARGIN && 
            e.clientX <= containerRect.right + CONTAINER_MARGIN) {
            return;
        }
        
        // Disable spawning near tooltip terms with buffer zone
        const termElements = document.querySelectorAll('.term');
        for (const term of termElements) {
            const rect = term.getBoundingClientRect();
            const isNearTerm = (
                e.clientX >= rect.left - BUFFER_ZONE &&
                e.clientX <= rect.right + BUFFER_ZONE &&
                e.clientY >= rect.top - BUFFER_ZONE &&
                e.clientY <= rect.bottom + BUFFER_ZONE
            );
            
            if (isNearTerm) {
                return; // Don't spawn images near tooltip words
            }
        }
        
        const now = Date.now();
        const dist = Math.hypot(e.clientX - mousePos.lastX, e.clientY - mousePos.lastY);
        
        if (dist > 15 && now - lastSpawnTime > SPAWN_INTERVAL) {
            spawnTrailImage(e.clientX, e.clientY);
            mousePos.lastX = e.clientX;
            mousePos.lastY = e.clientY;
            lastSpawnTime = now;
        }
    });
    
    window.addEventListener('resize', () => {
        activeImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.left < -200 || rect.top < -200 ||
                rect.left > window.innerWidth + 200 ||
                rect.top > window.innerHeight + 200) {
                returnToPool(img);
            }
        });
    });
}

// Dynamic Tooltip Positioning and HTML Tooltip Support
function initTooltipPositioning() {
    const terms = document.querySelectorAll('.term');
    
    // Tooltip dimensions from CSS
    const TOOLTIP_HEIGHT = 350; // Increased for longer definitions (was 200)
    const TOOLTIP_MARGIN = 12; // Gap between term and tooltip (from CSS: calc(100% + 12px))
    const ARROW_HEIGHT = 8; // Arrow height (from CSS border: 8px)
    const SAFE_BUFFER = 30; // Additional buffer from top of viewport (increased from 20)
    
    terms.forEach(term => {
        // Support HTML tooltips via data-definition-html attribute
        const htmlContent = term.getAttribute('data-definition-html');
        if (htmlContent) {
            // Create a tooltip element for HTML content
            const tooltip = document.createElement('div');
            tooltip.className = 'term-tooltip';
            tooltip.innerHTML = htmlContent;
            term.appendChild(tooltip);
            
            // Also create arrow
            const arrow = document.createElement('div');
            arrow.className = 'term-tooltip-arrow';
            term.appendChild(arrow);
        }
        
        term.addEventListener('mouseenter', function(e) {
            // Calculate immediately and deterministically
            const termRect = this.getBoundingClientRect();
            
            // Calculate total space needed above the term
            const spaceNeededAbove = TOOLTIP_HEIGHT + TOOLTIP_MARGIN + ARROW_HEIGHT + SAFE_BUFFER;
            
            // Mathematical decision: if not enough space above, show below
            if (termRect.top < spaceNeededAbove) {
                this.classList.add('tooltip-below');
            } else {
                this.classList.remove('tooltip-below');
            }
        });
        
        term.addEventListener('mouseleave', function() {
            // Clean up class on leave
            this.classList.remove('tooltip-below');
        });
    });
}

// Initialize everything
function init() {
    window.scrollTo(0, 0);
    
    updateAge();
    setInterval(updateAge, 10); // Update every 10ms for real-time millisecond precision
    
    initSectionToggles();
    initScrollEmphasis();
    initFooterSecret();
    initReadingTimeReward();
    initCursorImageTrail();
    initTooltipPositioning();
    loadThemePreference();
    injectGlitchAnimation();
    
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleKonamiCode);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
