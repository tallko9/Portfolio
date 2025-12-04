// Contact popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.getElementById('floating-contact-btn');
    const popupOverlay = document.getElementById('contact-popup-overlay');
    const popupClose = document.getElementById('contact-popup-close');
    const popupForm = document.getElementById('contact-popup-form');
    
    // Ouvrir le popup
    if (floatingBtn && popupOverlay) {
        floatingBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fermer le popup
    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    // Fermer en cliquant sur l'overlay
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Gestion du formulaire popup
    if (popupForm) {
        // Initialiser EmailJS si disponible
        if (typeof emailjs !== 'undefined') {
            emailjs.init("pBMgXiG4tpfVkCxhY");
        }
        
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Envoi en cours...</span>';
            
            // Si EmailJS est disponible, utiliser le service
            if (typeof emailjs !== 'undefined') {
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
                    .catch(function(error) {
                        console.error('Erreur:', error);
                        alert('Une erreur est survenue. Veuillez réessayer.');
                    })
                    .finally(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    });
            } else {
                // Fallback : rediriger vers la page de contact
                const name = encodeURIComponent(document.getElementById('popup-name').value);
                const email = encodeURIComponent(document.getElementById('popup-email').value);
                const subject = encodeURIComponent(document.getElementById('popup-subject').value);
                const message = encodeURIComponent(document.getElementById('popup-message').value);
                
                window.location.href = `html/contacts.html?name=${name}&email=${email}&subject=${subject}&message=${message}`;
            }
        });
    }
});

// QR Code functionality
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour générer le QR code
    function generateQRCode(text, canvasId) {
        // Utiliser une API en ligne pour générer le QR code
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        
        // Utiliser l'API QR Server pour générer le QR code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, size, size);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
        };
        img.onerror = function() {
            // Fallback : dessiner un QR code simple
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QR Code', size / 2, size / 2 - 10);
            ctx.fillText('Non disponible', size / 2, size / 2 + 10);
        };
        img.src = qrUrl;
    }
    
    // Ouvrir le modal QR code
    function openQRCodeModal() {
        const overlay = document.getElementById('qr-code-overlay');
        if (!overlay) return;
        
        // Générer l'URL du CV (ajuster selon votre structure)
        const cvUrl = window.location.origin + '/documents/Cv.pdf';
        generateQRCode(cvUrl, 'qr-code-canvas');
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fermer le modal QR code
    function closeQRCodeModal() {
        const overlay = document.getElementById('qr-code-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Ajouter le bouton QR code dans le footer ou ailleurs (une seule fois)
    const footer = document.querySelector('footer');
    if (footer && !document.getElementById('qr-code-footer-btn')) {
        const qrBtn = document.createElement('button');
        qrBtn.id = 'qr-code-footer-btn';
        qrBtn.className = 'btn secondary';
        qrBtn.innerHTML = '<span>📱 QR Code CV</span>';
        qrBtn.style.marginTop = '16px';
        qrBtn.addEventListener('click', openQRCodeModal);
        footer.appendChild(qrBtn);
    }
    
    // Gestion de la fermeture du modal QR
    const qrClose = document.getElementById('qr-code-close');
    if (qrClose) {
        qrClose.addEventListener('click', closeQRCodeModal);
    }
    
    const qrOverlay = document.getElementById('qr-code-overlay');
    if (qrOverlay) {
        qrOverlay.addEventListener('click', (e) => {
            if (e.target === qrOverlay) {
                closeQRCodeModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrOverlay && qrOverlay.classList.contains('active')) {
            closeQRCodeModal();
        }
    });
});

