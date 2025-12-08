// Carrousel moderne pour la page projets
const initCarousel = () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;
    let autoplayInterval = null;
    const autoplayDelay = 5000; // 5 secondes
    
    // Fonction pour obtenir la largeur d'un slide avec le gap
    const getSlideWidth = () => {
        if (!slides[0]) return 0;
        
        // Utiliser offsetWidth qui est plus stable que getBoundingClientRect
        // car il ne change pas pendant les transitions
        const slideWidth = slides[0].offsetWidth;
        
        // Sur mobile, pas de gap visible (slides masqués)
        // Sur desktop, gap de 2rem (32px)
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 0 : 32;
        
        // La distance entre le début de deux slides consécutifs
        // est la largeur d'un slide + le gap
        return slideWidth + gap;
    };
    
    // Fonction pour mettre à jour le carrousel
    const updateCarousel = (index, direction = 'next') => {
        if (isTransitioning) return;
        
        // Vérifier que l'index est valide
        if (index < 0 || index >= totalSlides) return;
        
        isTransitioning = true;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Sur mobile, pas de translation, juste changer l'affichage
            // La translation sera gérée par CSS (display: none/block)
        } else {
            // Sur desktop, utiliser la translation
            const slideWidth = getSlideWidth();
            const translateX = -(index * slideWidth);
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
        
        // Mettre à jour les classes et indicateurs
        updateCarouselUI(index);
    };
    
    // Fonction pour mettre à jour l'UI du carrousel
    const updateCarouselUI = (index) => {
        const isMobile = window.innerWidth <= 768;
        
        // Retirer la classe active de tous les slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
            // Sur mobile, masquer complètement les slides inactifs
            if (isMobile) {
                slide.style.display = i === index ? 'block' : 'none';
                slide.style.width = '100%';
                slide.style.maxWidth = '100%';
            } else {
                slide.style.display = 'block';
            }
        });
        
        // Sur mobile, s'assurer que le track ne fait pas de translation
        if (isMobile && carouselTrack) {
            carouselTrack.style.transform = 'none';
            carouselTrack.style.width = '100%';
            carouselTrack.style.maxWidth = '100%';
        }
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Mettre à jour les boutons (ne pas désactiver pour permettre la boucle)
        if (prevBtn) prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = index === totalSlides - 1 ? '0.5' : '1';
        
        // Réinitialiser la transition après l'animation
        setTimeout(() => {
            isTransitioning = false;
        }, isMobile ? 300 : 600);
    };
    
    // Fonction pour aller au slide suivant
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(currentSlide, 'next');
    };
    
    // Fonction pour aller au slide précédent
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(currentSlide, 'prev');
    };
    
    // Fonction pour aller à un slide spécifique
    const goToSlide = (index) => {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateCarousel(currentSlide);
        }
    };
    
    // Fonction pour démarrer l'autoplay
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, autoplayDelay);
    };
    
    // Fonction pour arrêter l'autoplay
    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    };
    
    // Fonction pour réinitialiser l'autoplay
    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };
    
    // Event listeners pour les boutons avec protection contre les doubles clics
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                nextSlide();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                prevSlide();
            }
        });
    }
    
    // Event listeners pour les indicateurs avec protection
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning && index !== currentSlide) {
                goToSlide(index);
            }
        });
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Pause au survol (désactivé car autoplay désactivé)
    // const carouselContainer = document.querySelector('.carousel-container');
    // if (carouselContainer) {
    //     carouselContainer.addEventListener('mouseenter', stopAutoplay);
    //     carouselContainer.addEventListener('mouseleave', startAutoplay);
    // }
    
    // Support du swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };
    
    // Fonction pour recalculer la position après redimensionnement
    const handleResize = () => {
        if (!isTransitioning) {
            const isMobile = window.innerWidth <= 768;
            
            // Réinitialiser l'affichage des slides sur mobile
            slides.forEach((slide, i) => {
                if (isMobile) {
                    slide.style.display = i === currentSlide ? 'block' : 'none';
                    slide.style.width = '100%';
                    slide.style.maxWidth = '100%';
                } else {
                    slide.style.display = 'block';
                }
            });
            
            if (isMobile) {
                // Sur mobile, pas de translation
                if (carouselTrack) {
                    carouselTrack.style.transform = 'none';
                    carouselTrack.style.width = '100%';
                    carouselTrack.style.maxWidth = '100%';
                }
            } else {
                // Sur desktop, recalculer la position
                const slideWidth = getSlideWidth();
                const translateX = -(currentSlide * slideWidth);
                if (carouselTrack) {
                    carouselTrack.style.transform = `translateX(${translateX}px)`;
                }
            }
            
            // Mettre à jour l'UI pour s'assurer que les slides sont correctement affichés
            updateCarouselUI(currentSlide);
        }
    };
    
    // Écouter les changements de taille de fenêtre avec debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Initialisation
    updateCarousel(currentSlide);
    // Autoplay désactivé
    // startAutoplay();
};

// Export pour init.js
window.initCarousel = initCarousel;

// Initialiser automatiquement (fonctionne avec defer)
initCarousel();

