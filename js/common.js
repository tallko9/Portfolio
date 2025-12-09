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

// Export pour init.js
window.initScrollToTop = initScrollToTop;

// Fonction pour convertir hex en RGB
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Fonction pour créer une nuance plus claire d'une couleur
const lightenColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent));
    const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent));
    const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent));
    return `rgb(${r}, ${g}, ${b})`;
};

// Fonction pour créer une nuance plus foncée d'une couleur
const darkenColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const r = Math.max(0, Math.round(rgb.r * (1 - percent)));
    const g = Math.max(0, Math.round(rgb.g * (1 - percent)));
    const b = Math.max(0, Math.round(rgb.b * (1 - percent)));
    return `rgb(${r}, ${g}, ${b})`;
};

// Fonction pour créer une couleur avec opacité
const colorWithOpacity = (hex, opacity) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// Liste blanche des balises HTML autorisées dans les traductions
const ALLOWED_HTML_TAGS = new Set(['STRONG', 'EM', 'BR']);

// Attributs d'événements dangereux à bloquer
const DANGEROUS_ATTRIBUTES = /on\w+\s*=/i;

// Vérifie si une chaîne contient uniquement des balises autorisées et sans attributs dangereux
const isSafeHTML = (value) => {
    if (typeof value !== 'string') return false;
    
    // Vérifier qu'il n'y a pas d'attributs d'événements (onclick, onerror, etc.)
    if (DANGEROUS_ATTRIBUTES.test(value)) {
        return false;
    }
    
    // Vérifier que seules les balises autorisées sont présentes
    // Pattern amélioré pour gérer les balises auto-fermantes (<br/>, <br />) et les balises normales
    const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*?)(\/?)>/g;
    let match;
    while ((match = tagRegex.exec(value)) !== null) {
        const tagName = match[1].toUpperCase();
        const attributes = match[2] || '';
        const isSelfClosing = match[3] === '/';
        
        // Vérifier que la balise est autorisée
        if (!ALLOWED_HTML_TAGS.has(tagName)) {
            return false;
        }
        
        // Vérifier les attributs dans cette balise spécifique (même pour les balises auto-fermantes)
        if (attributes && DANGEROUS_ATTRIBUTES.test(attributes)) {
            return false;
        }
    }
    
    return true;
};

// Color theme management
const changeAccentColor = (color) => {
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
    
    // Mettre à jour les dégradés avec des nuances de la couleur choisie
    const lighterColor = lightenColor(color, 0.3);
    const accentRgba = colorWithOpacity(color, 0.15);
    const accentRgbaLight = colorWithOpacity(color, 0.2);
    const accentRgbaHover = colorWithOpacity(color, 0.25);
    const accentRgbaBorder = colorWithOpacity(color, 0.3);
    
    // Mettre à jour les variables CSS pour les dégradés
    document.documentElement.style.setProperty('--accent-lighter', lighterColor);
    document.documentElement.style.setProperty('--accent-rgba', accentRgba);
    document.documentElement.style.setProperty('--accent-rgba-light', accentRgbaLight);
    document.documentElement.style.setProperty('--accent-rgba-hover', accentRgbaHover);
    document.documentElement.style.setProperty('--accent-rgba-border', accentRgbaBorder);
    
    // Mettre à jour le dégradé de fond
    document.documentElement.style.setProperty('--bg-gradient', 
        `radial-gradient(circle at top, ${accentRgba}, transparent 45%), var(--bg-color)`);
    
    const notification = document.createElement('div');
    notification.className = 'color-change-notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
};

const applyStoredColor = () => {
    const storedColor = localStorage.getItem('accentColor');
    const color = storedColor || '#48e0b8';
    changeAccentColor(color);
    const radioButton = document.querySelector(`input[name="accent-color"][value="${color}"]`);
    if (radioButton) radioButton.checked = true;
};


// Settings and color picker initialization
const supportedLanguages = ['fr', 'en'];

const getValidLanguage = (language) => supportedLanguages.includes(language) ? language : 'fr';

// Fonction d'initialisation des fonctionnalités communes
const initCommonFeatures = () => {
    applyStoredColor();
    
    // Menu hamburger pour mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navUl = nav ? nav.querySelector('ul') : null;
    
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
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
            if (navUl.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
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
};

// Export pour init.js
window.initCommonFeatures = initCommonFeatures;

// Initialiser automatiquement (fonctionne avec defer)
initCommonFeatures();

function updateLanguage(language) {
    const safeLanguage = getValidLanguage(language);
    document.documentElement.lang = safeLanguage;
    
    // Mettre à jour tous les boutons CV
    const cvButtons = [
        document.getElementById('cv-download-btn'),
        document.getElementById('hero-cv-download-btn')
    ];
    
    cvButtons.forEach(cvButton => {
        if (cvButton) {
            // Chemin par défaut (fichiers présents dans /documents)
            const fallbackCvPath = safeLanguage === 'fr' ? 'documents/Cv_fr.pdf' : 'documents/Cv_en.pdf';
            // Chemin avec nom complet (si disponible)
            const namedCvPath = safeLanguage === 'fr' ? 'documents/Cv_Sasha_Lorenc_fr.pdf' : 'documents/Cv_Sasha_Lorenc_en.pdf';

            // Les attributs data-cv-fr et data-cv-en deviennent dataset.cvFr et dataset.cvEn en JavaScript
            const datasetKey = `cv${safeLanguage.charAt(0).toUpperCase()}${safeLanguage.slice(1)}`;
            
            // Priorité : attribut data → fallback existant → nom complet
            const targetPath = cvButton.dataset[datasetKey] || fallbackCvPath || namedCvPath;
            
            cvButton.href = targetPath;
        }
    });
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[safeLanguage] && translations[safeLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[safeLanguage][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[safeLanguage][key];
            } else {
                const value = translations[safeLanguage][key];
                // N'autoriser que quelques balises sûres (strong, em, br). Sinon, fallback en texte brut.
                if (isSafeHTML(value)) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        }
    });
}


// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
    let swRegistration = null;
    
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                swRegistration = registration;
                
                // Vérifier les mises à jour seulement une fois par jour
                let lastUpdateCheck = localStorage.getItem('sw_last_update_check');
                const now = Date.now();
                const oneDay = 24 * 60 * 60 * 1000;
                
                if (!lastUpdateCheck || (now - parseInt(lastUpdateCheck)) > oneDay) {
                    registration.update();
                    localStorage.setItem('sw_last_update_check', now.toString());
                }
            })
            .catch(() => {
                // Échec silencieux du Service Worker
            });
    });
    
    // Vérifier les mises à jour seulement au focus de la fenêtre (une fois par session max)
    let focusUpdateDone = false;
    window.addEventListener('focus', () => {
        if (!focusUpdateDone && swRegistration) {
            focusUpdateDone = true;
            swRegistration.update();
        }
    });
} 