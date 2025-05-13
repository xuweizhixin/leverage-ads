// Leverage AI Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
    }

    // Add mobile nav styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: #fff;
                padding: 1rem;
                border-bottom: 3px solid #121212;
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            }
            
            .nav.active ul {
                flex-direction: column;
                align-items: center;
            }
            
            .nav.active ul li {
                margin: 1rem 0;
            }
            
            .mobile-nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile nav if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transition = 'all 0.3s ease';
        });
    });

    // Animated elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.pain-point, .feature, .tech, .advantage, .case, .price-card, .member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.pain-point, .feature, .tech, .advantage, .case, .price-card, .member');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form actually submit to Formspree
            
            // Simple validation
            const formInputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    e.preventDefault(); // Only prevent if validation fails
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // If successfully submitting, show loading state
            if (isValid) {
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    }
    
    // Check if returning from form submission (Formspree redirects back to page)
    if (window.location.search.includes('submitted=true')) {
        // Show success message
        const contactSection = document.getElementById('contact');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your interest! We will get back to you soon.';
        successMessage.style.padding = '1rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.backgroundColor = '#d4edda';
        successMessage.style.color = '#155724';
        successMessage.style.border = '1px solid #c3e6cb';
        successMessage.style.borderRadius = '4px';
        successMessage.style.textAlign = 'center';
        
        contactSection.querySelector('.contact-form').prepend(successMessage);
        
        // Scroll to the message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove the query parameter from URL without refreshing the page
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }

    // Video Carousel Scroll
    const carousel = document.querySelector('.video-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const btnLeft = carousel.querySelector('.carousel-btn.left');
        const btnRight = carousel.querySelector('.carousel-btn.right');
        const scrollAmount = 300; // px

        btnLeft.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        btnRight.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}); 