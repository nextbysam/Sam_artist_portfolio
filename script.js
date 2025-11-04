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

// Cursor Image Trail Effect - Improved with Element Pooling
let lastSpawnTime = 0;
let mousePos = { x: 0, y: 0, lastX: 0, lastY: 0 };
const SPAWN_INTERVAL = 70;
const IMAGE_SIZE = 80;
const MAX_POOL_SIZE = 50;
const imagePool = [];
const activeImages = new Set();

const TRAIL_IMAGES = [
    'images/05A58CEC-CF53-4070-AEFB-D157DEF9510A_1_105_c.jpeg',
    'images/06A18401-2AF6-4711-A781-F7614C7FA776_1_105_c.jpeg',
    'images/0D7A0269-FBC6-4264-B26D-EAF71CD15477_1_105_c.jpeg',
    'images/16ADCE47-8EDD-4A67-895F-233BC099CEBC_1_105_c.jpeg',
    'images/2CA1CC52-09ED-42DB-8D19-3FF8E1062CB1_1_105_c.jpeg',
    'images/30F88B0A-9F23-4EAB-89C2-4B8A97A090FB_1_105_c.jpeg',
    'images/3CD8BAE1-0320-41EF-830C-CD042D3F7001_4_5005_c.jpeg',
    'images/3FD3A4BE-900B-4C07-8625-3257929B7321_1_105_c.jpeg',
    'images/7519194D-7F30-40B9-8C72-A57E82F5FAFF_1_105_c.jpeg',
    'images/7FC1BA15-6F09-4F6F-B3C4-681B061F6FD4_1_105_c.jpeg',
    'images/8DF8A331-A7C4-4FDD-83BF-0AB56FD48AE6_4_5005_c.jpeg',
    'images/97DCE991-5453-4CA5-A3AF-71DCCC2829DD_4_5005_c.jpeg',
    'images/9AF02E33-4816-4E51-9454-DEF34E694753_1_105_c.jpeg',
    'images/A12B156C-B37E-40CD-9BF5-79B9B8DC62A1_1_105_c.jpeg',
    'images/B3A460F8-F6E7-4476-83B4-10294EC0FFF7_4_5005_c.jpeg',
    'images/B6475C10-5D3F-4549-8549-DAEA4379BB96_4_5005_c.jpeg',
    'images/CB3DEE66-064B-4740-BCA2-BAD5A7CA8161_1_105_c.jpeg',
    'images/D22C44C7-1262-4582-8478-7326F1F29524_1_105_c.jpeg',
    'images/EF2F26CD-2321-4E72-AA34-65C82CCF4AC4_1_105_c.jpeg',
    'images/F9ABCE9D-3310-42DE-91E7-2762744D49F0_1_105_c.jpeg'
];

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

function spawnTrailImage(x, y) {
    const img = getPooledElement();
    
    img.style.cssText = `
        left: ${x - IMAGE_SIZE/2}px;
        top: ${y - IMAGE_SIZE/2}px;
        width: ${IMAGE_SIZE}px;
        height: ${IMAGE_SIZE}px;
        opacity: 0.9;
        transform: scale(1) rotate(0deg);
        display: block;
    `;
    
    const randomImage = TRAIL_IMAGES[Math.floor(Math.random() * TRAIL_IMAGES.length)];
    img.style.backgroundImage = `url(${randomImage})`;
    img.style.backgroundSize = 'contain';
    img.style.backgroundRepeat = 'no-repeat';
    img.style.backgroundPosition = 'center';
    
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
    
    document.addEventListener('mousemove', (e) => {
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
