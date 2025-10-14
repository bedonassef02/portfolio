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


}
