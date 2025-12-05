// Page transitions animations
const initPageTransitions = () => {
    // Animation d'entrée de page (fade-in)
    const main = document.querySelector('main');
    const body = document.body;
    
    if (main) {
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            main.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        });
    }
    
    // Gestion des liens internes avec animation de sortie
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Vérifier si c'est un lien interne (pas externe, pas une ancre, pas download, pas target)
            const isInternal = href && 
                !href.startsWith('#') && 
                !href.startsWith('http://') && 
                !href.startsWith('https://') && 
                !href.startsWith('mailto:') && 
                !href.startsWith('tel:') &&
                !link.hasAttribute('download') && 
                !link.hasAttribute('target') &&
                href !== 'javascript:void(0)';
            
            if (isInternal) {
                e.preventDefault();
                
                // Animation de sortie
                if (main) {
                    main.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
                    main.style.opacity = '0';
                    main.style.transform = 'translateY(-20px)';
                } else {
                    body.style.transition = 'opacity 0.3s ease-in';
                    body.style.opacity = '0';
                }
                
                // Naviguer après l'animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Le header reste fixe et visible (pas d'animation)
    const header = document.querySelector('header');
    if (header) {
        // S'assurer que le header est toujours visible et fixe
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
        header.style.transition = 'none';
    }
    
    // Animation des sections au scroll (intersection observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
};

// Export pour init.js
window.initPageTransitions = initPageTransitions;

// Initialiser si init.js n'est pas chargé
if (!window.initLoaded) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageTransitions);
    } else {
        initPageTransitions();
    }
}

