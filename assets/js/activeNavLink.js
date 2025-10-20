export function initializeActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

    const allNavLinks = [...navLinks, ...mobileNavLinks];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Adjust this value: 0.5 means 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        let anySectionIntersecting = false;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anySectionIntersecting = true;
                const currentSectionId = entry.target.id;
                allNavLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('nav-link-active');
                    } else {
                        link.classList.remove('nav-link-active');
                    }
                });
            }
        });

        if (!anySectionIntersecting) {
            // If no section is intersecting, ensure 'About' is active
            const aboutLink = document.querySelector('a[href="#about"]');
            if (aboutLink) {
                allNavLinks.forEach(link => link.classList.remove('nav-link-active')); // Remove all active classes first
                aboutLink.classList.add('nav-link-active');
            }
        }
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
            // If no hash, activate the 'About' link by default
            const aboutLink = document.querySelector('a[href="#about"]');
            if (aboutLink) {
                allNavLinks.forEach(link => link.classList.remove('nav-link-active')); // Clear all active classes
                aboutLink.classList.add('nav-link-active');
            }
        }
    };

    initialActiveLink();
}