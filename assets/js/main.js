// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('hidden');
        mobileMenuOverlay.classList.add('opacity-100');
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('hidden');
        mobileMenuOverlay.classList.remove('opacity-100');
    }
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
    });
}

if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll('.reveal');
const staggerElements = document.querySelectorAll('.stagger-children');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });

    staggerElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// ========================================
// ACTIVE NAV LINK HIGHLIGHT
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-gray-400');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.remove('text-gray-400');
                    link.classList.add('text-white');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================
const navbar = document.querySelector('nav');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark-900/95', 'shadow-lg');
        navbar.classList.remove('bg-dark-900/80');
    } else {
        navbar.classList.remove('bg-dark-900/95', 'shadow-lg');
        navbar.classList.add('bg-dark-900/80');
    }
}

window.addEventListener('scroll', updateNavbar);

// ========================================
// TYPING EFFECT FOR HERO (Optional)
// ========================================
const typingText = document.getElementById('typing-text');
if (typingText) {
    const words = ['scalable SaaS platforms', 'enterprise solutions', 'AI-powered systems', 'robust APIs'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}

// ========================================
// CONTACT FORM SUBMISSION
// ========================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

const displayMessage = (message, isSuccess) => {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'mt-4 text-center text-lg font-semibold ';
        if (isSuccess) {
            formMessage.classList.add('text-green-400');
        } else {
            formMessage.classList.add('text-red-400');
        }
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'mt-4 text-center text-lg font-semibold';
        }, 5000);
    }
};

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));

        try {
            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                submitBtn.classList.remove('from-blue-500', 'to-purple-500');
                submitBtn.classList.add('from-green-500', 'to-teal-500');
                displayMessage('Message sent successfully! I\'ll get back to you soon.', true);
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('from-blue-500', 'to-purple-500');
                    submitBtn.classList.remove('from-green-500', 'to-teal-500');
                }, 3000);
            } else {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                displayMessage('Failed to send message. Please try again later.', false);
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            displayMessage('An error occurred. Please try again later.', false);
        }
    });
}

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ========================================
// VISITOR TRACKING
// ========================================
function initializeVisitorTracking() {
    // Helper to get or create a persistent Visitor ID
    function getVisitorId() {
        let vid = localStorage.getItem('visitor_id');
        if (!vid) {
            // Generate a random ID: timestamp + random string
            vid = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitor_id', vid);
        }
        return vid;
    }

    // Helper to get query params
    function getQueryParams() {
        const params = {};
        new URLSearchParams(window.location.search).forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    const visitorData = {
        page_url: window.location.href,
        visitor_id: getVisitorId(),
        referrer: document.referrer || 'Direct',
        query_params: getQueryParams(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || navigator.userLanguage || 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString()
    };

    // Send data to Xano
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/capture_visitor_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
    })
        .then(response => {
            if (!response.ok) {
                // Silently log error to avoid console clutter for user
                console.warn('Analytics: Failed to capture data');
            }
        })
        .catch(error => {
            // Silently handle network errors
            console.warn('Analytics: Network error');
        });
}

// Initialize tracking when DOM is ready
document.addEventListener('DOMContentLoaded', initializeVisitorTracking);

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cLooking for source code? Feel free to reach out!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c📧 bedonassef71@gmail.com', 'font-size: 12px; color: #a1a1aa;');
