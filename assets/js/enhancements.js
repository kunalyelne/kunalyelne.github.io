// Portfolio Enhancements JavaScript
// Enhanced interactions, animations, and visual effects

'use strict';

// ===== LOADING SCREEN REMOVED FOR SNAPPY EXPERIENCE ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations immediately for snappy load
    initializeAnimations();
    createParticleBackground();
});

// ===== SUBTLE PARTICLE BACKGROUND ===== //
function createParticleBackground() {
    // Only add minimal particles on desktop
    if (window.innerWidth > 768) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 2 + 1; // Smaller particles
            const startX = Math.random() * window.innerWidth;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 30000);
        }

        // Create fewer particles at longer intervals
        setInterval(createParticle, 3000);
        
        // Create only 2-3 initial particles
        for (let i = 0; i < 3; i++) {
            setTimeout(createParticle, i * 1000);
        }
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== //
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'forwards';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animationElements = [
        { selector: '.sidebar', animation: 'fade-in-left' },
        { selector: '.article-title', animation: 'fade-in-up' },
        { selector: '.service-item', animation: 'fade-in-up stagger-item' },
        { selector: '.timeline-item', animation: 'fade-in-left stagger-item' },
        { selector: '.skills-item', animation: 'fade-in-up stagger-item' },
        { selector: '.project-item', animation: 'scale-in stagger-item' },
        { selector: '.research-post-item', animation: 'fade-in-up stagger-item' }
    ];

    animationElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(...animation.split(' '));
            element.style.animationPlayState = 'paused';
            
            // Add staggered delay for multiple items
            if (animation.includes('stagger-item')) {
                element.style.animationDelay = `${index * 0.1}s`;
            }
            
            observer.observe(element);
        });
    });
}

// ===== ENHANCED SMOOTH SCROLLING ===== //
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('[data-nav-link]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.innerHTML.toLowerCase();
            const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
            
            if (targetElement) {
                // Smooth scroll with custom easing
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ENHANCED TYPING EFFECT ===== //
function createTypingEffect(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// ===== SKILL BARS ANIMATION DISABLED ===== //
function animateSkillBars() {
    // Skills animation disabled for clean, elegant appearance
    // Skills are now displayed simply as cards without progress bars
}

// ===== SUBTLE HOVER EFFECTS ===== //
function initializeHoverEffects() {
    // Subtle card hover effects
    const cards = document.querySelectorAll('.service-item, .skills-item, .research-post-item > a');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Subtle button effects
    const buttons = document.querySelectorAll('.form-btn, .navbar-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== PARALLAX SCROLLING EFFECT ===== //
function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.transform = `translateY(${rate * 0.1}px)`;
        }
        
        // Apply parallax to floating elements
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((element, index) => {
            const rate = scrolled * -0.2 * (index + 1);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Cursor trail effect removed for cleaner experience

// ===== SIMPLE NAVBAR SCROLL EFFECT ===== //
function initializeNavbarScrollEffect() {
    // Keep navbar simple and always visible
    // No hiding/showing behavior - just maintain position
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'none';
    }
}

// ===== TEXT REVEAL ANIMATION ===== //
function initializeTextRevealAnimation() {
    const textElements = document.querySelectorAll('.h2, .h3, .timeline-item-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Split text into spans for each character
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotate(5deg);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transition-delay: ${index * 50}ms;
            `;
            element.appendChild(span);
        });
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0) rotate(0deg)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== ENHANCED PROJECT FILTER ANIMATION REMOVED ===== //
// Project filtering is now handled by the main script.js to avoid conflicts

// ===== FLOATING ACTION BUTTONS ===== //
function createFloatingActionButtons() {
    const fab = document.createElement('div');
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1f2937;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(31, 41, 55, 0.3);
        opacity: 0;
        transform: translateY(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        text-align: center;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        const isDark = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'dark';
        this.style.transform = 'translateY(-3px) scale(1.1)';
        if (isDark) {
            this.style.background = '#4b5563';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
        } else {
            this.style.background = '#374151';
            this.style.boxShadow = '0 15px 40px rgba(31, 41, 55, 0.4)';
        }
    });
    
    backToTop.addEventListener('mouseleave', function() {
        const isDark = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'dark';
        this.style.transform = 'translateY(0) scale(1)';
        if (isDark) {
            this.style.background = '#374151';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            this.style.background = '#1f2937';
            this.style.boxShadow = '0 10px 30px rgba(31, 41, 55, 0.3)';
        }
    });
    
    fab.appendChild(backToTop);
    document.body.appendChild(fab);
    
    // Add dark mode detection for the button
    function updateButtonTheme() {
        const isDark = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            backToTop.style.background = '#374151';
            backToTop.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            backToTop.style.background = '#1f2937';
            backToTop.style.boxShadow = '0 10px 30px rgba(31, 41, 55, 0.3)';
        }
    }
    
    // Check theme changes
    const observer = new MutationObserver(updateButtonTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
        }
    });
}

// ===== INITIALIZE ALL ENHANCEMENTS ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize essential enhancement features
    setTimeout(() => {
        initializeSmoothScrolling();
        animateSkillBars();
        initializeHoverEffects();
        initializeNavbarScrollEffect();
        createFloatingActionButtons();
        // Project filtering is handled by main script.js
    }, 800);
});

// ===== PROJECT FILTER INITIALIZATION REMOVED ===== //
// This is now handled by the main script.js to avoid conflicts

// ===== PERFORMANCE OPTIMIZATION ===== //
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// ===== PRELOAD CRITICAL ANIMATIONS ===== //
function preloadAnimations() {
    // Preload critical animation frames
    const style = document.createElement('style');
    style.textContent = `
        .preload-animation {
            animation: preload 0.001s;
        }
        @keyframes preload {
            0%, 100% { opacity: 0.99; }
        }
    `;
    document.head.appendChild(style);
}

preloadAnimations();

// ===== ACCESSIBILITY ENHANCEMENTS ===== //
function initializeAccessibility() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--premium-transition', '0.1s');
        document.documentElement.style.setProperty('--premium-bounce', '0.1s');
        
        // Disable complex animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
}

initializeAccessibility();

// ===== FIXED DARK MODE SUPPORT ===== //
function fixDarkModeToggle() {
    const modeToggle = document.getElementById('mode-toggle');
    const modeIcon = document.getElementById('mode-icon');
    
    if (modeToggle && modeIcon) {
        // Remove any existing listeners to prevent conflicts
        const newToggle = modeToggle.cloneNode(true);
        modeToggle.parentNode.replaceChild(newToggle, modeToggle);
        
        newToggle.addEventListener('click', function() {
            const themeLink = document.getElementById('theme-link');
            const body = document.body;
            const newIcon = document.getElementById('mode-icon');
            
            if (themeLink.href.includes('darkmode.css')) {
                themeLink.href = './assets/css/lightmode.css';
                newIcon.classList.remove('fa-moon');
                newIcon.classList.add('fa-sun');
                newIcon.style.color = '#333';
                body.removeAttribute('data-theme');
            } else {
                themeLink.href = './assets/css/darkmode.css';
                newIcon.classList.remove('fa-sun');
                newIcon.classList.add('fa-moon');
                newIcon.style.color = '#fff';
                body.setAttribute('data-theme', 'dark');
            }
        });
    }
}

// Initialize fixed dark mode with delay to ensure DOM is ready
setTimeout(() => {
    fixDarkModeToggle();
}, 1000);

