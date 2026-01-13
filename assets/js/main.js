// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('hidden');
    });
}

if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
    });
}

if (mobileMenuOverlay && mobileMenu) {
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
    });
}

// Close mobile menu when clicking a link
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('hidden');
        });
    });
}
