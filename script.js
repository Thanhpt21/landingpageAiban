// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.feature-card, .pricing-card, .about-feature').forEach(el => {
    observer.observe(el);
});

// AI Chat simulation
const messages = document.querySelectorAll('.message');
const typingIndicator = document.querySelector('.typing-indicator');

if (messages.length > 0 && typingIndicator) {
    // Animate messages with delay
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Simulate typing animation
    setTimeout(() => {
        typingIndicator.style.display = 'flex';
    }, 2000);
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 4000);
}

// Form submission
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = ctaForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm.');
            emailInput.value = '';
        }
    });
}

// Pricing card interaction
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        alert(`Bạn đã chọn gói ${planName}! Chúng tôi sẽ chuyển hướng bạn đến trang thanh toán.`);
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// Initialize animations on load
window.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
});