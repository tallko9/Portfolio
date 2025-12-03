// Scroll to top functionality
let isScrollingToTop = false;
let scrollAnimationId = null;

const initScrollToTop = () => {
    const scrollToTop = document.getElementById("scroll-to-top");
    
    if (!scrollToTop) return;
    
    const scrollFunction = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollPosition > 20) {
            scrollToTop.style.display = "block";
        } else {
            scrollToTop.style.display = "none";
        }
        
        // Si l'utilisateur scroll pendant le mouvement automatique, arrêter le scroll
        if (isScrollingToTop) {
            if (scrollAnimationId) {
                cancelAnimationFrame(scrollAnimationId);
                scrollAnimationId = null;
            }
            isScrollingToTop = false;
        }
    };

    window.addEventListener('scroll', scrollFunction);
    
    // Initialiser l'état du bouton au chargement
    scrollFunction();

    scrollToTop.addEventListener('click', () => {
        // Arrêter tout scroll en cours
        if (scrollAnimationId) {
            cancelAnimationFrame(scrollAnimationId);
            scrollAnimationId = null;
        }
        
        isScrollingToTop = true;
        const startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const startTime = performance.now();
        const duration = 600; // Durée en millisecondes (plus rapide)
        
        const animateScroll = (currentTime) => {
            if (!isScrollingToTop) {
                return; // Arrêter si l'utilisateur a scrollé
            }
            
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Fonction d'easing pour un mouvement plus fluide
            const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentPosition = startPosition * (1 - easeInOutCubic);
            
            window.scrollTo(0, currentPosition);
            
            if (progress < 1 && isScrollingToTop) {
                scrollAnimationId = requestAnimationFrame(animateScroll);
            } else {
                isScrollingToTop = false;
                scrollAnimationId = null;
            }
        };
        
        scrollAnimationId = requestAnimationFrame(animateScroll);
    });
};

// Initialiser après le chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
    initScrollToTop();
}

// Color theme management
const changeAccentColor = (color) => {
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
    
    const notification = document.createElement('div');
    notification.className = 'color-change-notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
};

const applyStoredColor = () => {
    const storedColor = localStorage.getItem('accentColor');
    if (storedColor) {
        document.documentElement.style.setProperty('--accent-color', storedColor);
        const radioButton = document.querySelector(`input[name="accent-color"][value="${storedColor}"]`);
        if (radioButton) radioButton.checked = true;
    }
};

// Settings and color picker initialization
const supportedLanguages = ['fr', 'en'];

const getValidLanguage = (language) => supportedLanguages.includes(language) ? language : 'fr';

document.addEventListener('DOMContentLoaded', () => {
    applyStoredColor();
    
    // Menu hamburger pour mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navUl = nav ? nav.querySelector('ul') : null;
    
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.classList.toggle('active');
            navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navUl.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    const settingsIcon = document.getElementById('settings-icon');
    const colorPicker = document.getElementById('color-picker');
    const languageSelector = document.getElementById('language-selector');

    document.querySelectorAll('input[name="accent-color"]').forEach(radio => {
        radio.addEventListener('change', () => changeAccentColor(radio.value));
    });

    if (settingsIcon && colorPicker) {
        settingsIcon.addEventListener('click', () => {
            const isExpanded = colorPicker.style.display !== 'none';
            colorPicker.style.display = isExpanded ? 'none' : 'block';
            settingsIcon.setAttribute('aria-expanded', String(!isExpanded));
        });
        
        document.addEventListener('click', (e) => {
            if (!colorPicker.contains(e.target) && !settingsIcon.contains(e.target)) {
                colorPicker.style.display = 'none';
                settingsIcon.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Language management
    const savedLanguage = getValidLanguage(localStorage.getItem('language'));
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        updateLanguage(savedLanguage);
        
        languageSelector.addEventListener('change', (e) => {
            const language = getValidLanguage(e.target.value);
            localStorage.setItem('language', language);
            updateLanguage(language);
        });
    } else {
        updateLanguage(savedLanguage);
    }
});

function updateLanguage(language) {
    const safeLanguage = getValidLanguage(language);
    document.documentElement.lang = safeLanguage;
    const cvButton = document.getElementById('cv-download-btn');
    if (cvButton) {
        const datasetKey = `cv${safeLanguage.charAt(0).toUpperCase()}${safeLanguage.slice(1)}`;
        const targetPath = cvButton.dataset[datasetKey] || cvButton.dataset.cvDefault;
        if (targetPath) {
            cvButton.href = targetPath;
        }
    }
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[safeLanguage] && translations[safeLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[safeLanguage][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[safeLanguage][key];
            } else {
                element.textContent = translations[safeLanguage][key];
            }
        }
    });
} 