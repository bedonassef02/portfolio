document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

    const allNavLinks = [...navLinks, ...mobileNavLinks];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Adjust this value: 0.5 means 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                allNavLinks.forEach(link => {
                    link.classList.remove('nav-link-active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('nav-link-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle initial active link on page load
    const initialActiveLink = () => {
        const currentHash = window.location.hash;
        if (currentHash) {
            allNavLinks.forEach(link => {
                link.classList.remove('nav-link-active');
                if (link.getAttribute('href') === currentHash) {
                    link.classList.add('nav-link-active');
                }
            });
        } else {
            // If no hash, activate the first link (e.g., 'About')
            if (allNavLinks.length > 0) {
                allNavLinks[0].classList.add('nav-link-active');
            }
        }
    };

    initialActiveLink();
});