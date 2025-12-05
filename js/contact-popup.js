// Bouton flottant de contact - Version simple et fonctionnelle
(function() {
    // Fonction d'initialisation
    function init() {
    // Vérifier si on est sur la page de contact
    const isContactPage = window.location.pathname.includes('contacts.html') || 
                          window.location.pathname.includes('contact') ||
                          document.querySelector('section.contact');
    
    // Si on est sur la page de contact, ne pas afficher le bouton
    if (isContactPage) {
        const btn = document.getElementById('floating-contact-btn');
        if (btn) {
            btn.style.display = 'none';
        }
        return;
    }
    
    // Récupérer les éléments
    const floatingBtn = document.getElementById('floating-contact-btn');
    const popupOverlay = document.getElementById('contact-popup-overlay');
    const popupClose = document.getElementById('contact-popup-close');
    const popupForm = document.getElementById('contact-popup-form');
    
    if (!floatingBtn || !popupOverlay) {
        return;
    }
    
    // Ouvrir le popup au clic sur le bouton
    floatingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Charger EmailJS si nécessaire
        if (typeof window.loadEmailJS === 'function' && !window.emailjsLoaded) {
            window.loadEmailJS();
        }
        
        // Ouvrir le popup
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fermer le popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Fermer avec le bouton X
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    // Fermer en cliquant sur l'overlay
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Gestion du formulaire
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Envoi en cours...</span>';
            
            // Attendre que EmailJS soit chargé si nécessaire
            const sendEmail = () => {
                if (typeof emailjs === 'undefined') {
                    // EmailJS pas encore chargé, attendre un peu
                    setTimeout(sendEmail, 100);
                    return;
                }
                
                const templateParams = {
                    from_name: document.getElementById('popup-name').value,
                    reply_to: document.getElementById('popup-email').value,
                    subject: document.getElementById('popup-subject').value,
                    message: document.getElementById('popup-message').value
                };
                
                emailjs.send('service_bjrqu1q', 'template_391zlnl', templateParams)
                    .then(function() {
                        alert('Message envoyé avec succès !');
                        popupForm.reset();
                        closePopup();
                    })
                    .catch(function() {
                        alert('Une erreur est survenue. Veuillez réessayer.');
                    })
                    .finally(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    });
            };
            
            // Initialiser EmailJS si nécessaire
            if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
                emailjs.init("pBMgXiG4tpfVkCxhY");
            }
            
            sendEmail();
        });
    }
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM déjà chargé (avec defer)
        init();
    }
})();
