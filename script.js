/* =============================================
   KUNAL YELNE PORTFOLIO - JAVASCRIPT
   Scroll Animations & Interactivity
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initNavHighlight();
    initScrollIndicator();
    initThemeToggle();
});

/* =============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================= */
function initScrollAnimations() {
    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll(`
        .bento-card,
        .timeline-item,
        .stat-card,
        .skill-card,
        .project-card
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children).filter(
                        child => child.classList.contains('fade-in')
                    );
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* =============================================
   SMOOTH SCROLLING
   ============================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =============================================
   NAVIGATION HIGHLIGHT
   ============================================= */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* =============================================
   SCROLL INDICATOR ROTATION
   ============================================= */
function initScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;

    // Hide indicator when user scrolls past hero
    const heroSection = document.getElementById('hero');

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    indicator.style.opacity = '1';
                } else {
                    indicator.style.opacity = '0';
                }
            });
        }, { threshold: 0.3 });

        observer.observe(heroSection);
    }

    // Click to scroll to work section
    indicator.addEventListener('click', () => {
        const workSection = document.getElementById('work');
        if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* =============================================
   THEME TOGGLE (Dark Mode)
   ============================================= */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Apply initial theme
    html.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const targetTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);

        // Add a little pop animation to the button
        themeToggle.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 200);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
        }
    });
}

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/* =============================================
   NAV ACTIVE STYLES
   ============================================= */
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent) !important;
    }
    
    .scroll-indicator {
        cursor: pointer;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
