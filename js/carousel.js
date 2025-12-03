// Carrousel moderne pour la page projets
document.addEventListener('DOMContentLoaded', () => {
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
        const gap = 32; // 2rem en pixels
        
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
        
        // Calculer la position de translation de manière synchrone
        const slideWidth = getSlideWidth();
        const translateX = -(index * slideWidth);
        
        // Appliquer la translation au track
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Mettre à jour les classes et indicateurs
        updateCarouselUI(index);
    };
    
    // Fonction pour mettre à jour l'UI du carrousel
    const updateCarouselUI = (index) => {
        
        // Retirer la classe active de tous les slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
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
        }, 600);
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
            const slideWidth = getSlideWidth();
            const translateX = -(currentSlide * slideWidth);
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
    };
    
    // Écouter les changements de taille de fenêtre
    window.addEventListener('resize', handleResize);
    
    // Initialisation
    updateCarousel(currentSlide);
    // Autoplay désactivé
    // startAutoplay();
});

