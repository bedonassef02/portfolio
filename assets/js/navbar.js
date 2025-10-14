export function initializeNavbar() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMenuButton = document.getElementById('close-menu-button');
    const navLinks = document.querySelectorAll('#nav-links a, #mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenuOverlay.classList.toggle('hidden');
        document.body.classList.toggle('modal-open'); // Prevent scrolling when menu is open
    };

    if (menuButton && mobileMenu && mobileMenuOverlay && closeMenuButton) {
        menuButton.addEventListener('click', toggleMobileMenu);
        closeMenuButton.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (navLink) {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('text-blue-600', 'font-bold'));
                    navLink.classList.add('text-blue-600', 'font-bold');
                } else {
                    navLink.classList.remove('text-blue-600', 'font-bold');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
