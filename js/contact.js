const initContactForm = function() {
    // Initialisation d'EmailJS
    emailjs.init("pBMgXiG4tpfVkCxhY");

    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    // Fonction pour ajuster automatiquement la hauteur
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
    
    if (messageTextarea) {
        // Définir une hauteur minimale
        messageTextarea.style.height = '120px';
        
        // Ajouter les événements pour l'auto-resize
        messageTextarea.addEventListener('input', autoResize);
        
        // Gestion du compteur de caractères
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher l'indicateur de chargement
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Envoi en cours...</span>';

            // Modification des paramètres pour correspondre au template
            const templateParams = {
                from_name: document.getElementById('name').value,
                reply_to: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Envoi de l'email
            emailjs.send('service_bjrqu1q', 'template_391zlnl', templateParams)
                .then(function() {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                    charCount.textContent = '0';
                })
                .catch(function() {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="btn-text">Envoyer</span><span class="btn-icon"></span>';
                });
        });
    }
};

// Export pour init.js
window.initContactForm = initContactForm;

// Initialiser si init.js n'est pas chargé
if (!window.initLoaded) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
} 