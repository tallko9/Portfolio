// Scroll to top functionality
const scrollToTop = document.getElementById("scroll-to-top");

const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
};

window.addEventListener('scroll', scrollFunction);

scrollToTop.addEventListener('click', () => {
    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };
    scrollToTop();
});

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
document.addEventListener('DOMContentLoaded', () => {
    applyStoredColor();
    
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
            settingsIcon.setAttribute('aria-expanded', !isExpanded);
        });
        
        document.addEventListener('click', (e) => {
            if (!colorPicker.contains(e.target) && !settingsIcon.contains(e.target)) {
                colorPicker.style.display = 'none';
                settingsIcon.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Language management
    const savedLanguage = localStorage.getItem('language') || 'fr';
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        updateLanguage(savedLanguage);
        
        languageSelector.addEventListener('change', (e) => {
            const language = e.target.value;
            localStorage.setItem('language', language);
            updateLanguage(language);
        });
    }
});

function updateLanguage(language) {
    document.documentElement.lang = language;
    const cvButton = document.getElementById('cv-download-btn');
    if (cvButton) {
        cvButton.href = `../documents/Cv_${language}.pdf`;
    }
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
} 