// Dynamic Age Calculator
function calculateAge() {
    const birthDate = new Date('2009-02-10');
    const now = new Date();
    const ageInMs = now - birthDate;
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(4);
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
    
    if (timeSpent > 120) {
        showEasterEggMessage('Still here? That\'s the obsession I\'m talking about.');
        clearInterval(readingTimeInterval);
    }
}

let readingTimeInterval;

function initReadingTimeReward() {
    readingTimeInterval = setInterval(checkReadingTime, 30000);
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

// Cursor Image Trail Effect
let lastSpawnTime = 0;
const SPAWN_INTERVAL = 100; // milliseconds between spawns
const FADE_DURATION = 1500; // how long fade takes
const IMAGE_SIZE = 30; // size in pixels

// Add your image paths here (can be single or multiple for random selection)
const TRAIL_IMAGES = [
    'images/trail1.png',
    'images/trail2.png',
    'images/trail3.png'
];

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

    // Use actual image (randomly select if multiple images)
    const randomImage = TRAIL_IMAGES[Math.floor(Math.random() * TRAIL_IMAGES.length)];
    img.style.backgroundImage = `url(${randomImage})`;
    img.style.backgroundSize = 'contain';
    img.style.backgroundRepeat = 'no-repeat';
    img.style.backgroundPosition = 'center';

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

// Initialize everything
function init() {
    window.scrollTo(0, 0);
    
    updateAge();
    setInterval(updateAge, 60000);
    
    initSectionToggles();
    initScrollEmphasis();
    initFooterSecret();
    initReadingTimeReward();
    initCursorImageTrail();
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
