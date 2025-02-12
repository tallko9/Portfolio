document.addEventListener('DOMContentLoaded', function() {
    // Character counter management
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Form validation and submission via Email.js
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.classList.add('sending');
                
                emailjs.init("pBMgXiG4tpfVkCxhY");
                
                const templateParams = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                emailjs.send('service_s1wv65t', 'template_391zlnl', templateParams)
                    .then(function(response) {
                        alert('Message sent successfully!');
                        contactForm.reset();
                        charCount.textContent = '0';
                        submitBtn.classList.remove('sending');
                    }, function(error) {
                        alert('An error occurred. Please try again.');
                        submitBtn.classList.remove('sending');
                        console.error('Error:', error);
                    });
            }
        });
    }
}); 