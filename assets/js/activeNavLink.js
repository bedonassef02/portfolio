export function initializeActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

    const allNavLinks = [...navLinks, ...mobileNavLinks];

    // Centralized function to set the active link
    const setActiveLink = (href) => {
        allNavLinks.forEach(link => {
            link.classList.remove('nav-link-active');
        });
        const targetLink = document.querySelector(`a[href="${href}"]`);
        if (targetLink) {
            targetLink.classList.add('nav-link-active');
        }
    };

    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.75 // Increased threshold for more stable active state
    };

    let lastActiveSectionHref = '#about'; // Initialize with '#about'

    const observer = new IntersectionObserver((entries) => {
        let activeSectionId = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                activeSectionId = entry.target.id;
            }
        });

        if (activeSectionId) {
            lastActiveSectionHref = `#${activeSectionId}`;
            setActiveLink(lastActiveSectionHref);
        } else {
            // If no section is significantly intersecting, check scroll position
            if (window.scrollY === 0) {
                setActiveLink('#about');
                lastActiveSectionHref = '#about';
            } else if (lastActiveSectionHref) {
                // Keep the last active section highlighted if not at the top
                setActiveLink(lastActiveSectionHref);
            }
        }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle initial active link on page load and hash changes
    const handleInitialAndHashChange = () => {
        const currentHash = window.location.hash;
        if (currentHash) {
            setActiveLink(currentHash);
        } else {
            setActiveLink('#about');
        }
    };

    // Set initial active link
    handleInitialAndHashChange();

    // Listen for hash changes (e.g., from smooth scroll or direct URL modification)
    window.addEventListener('hashchange', handleInitialAndHashChange);

    // Add click listeners to all nav links for immediate feedback
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // The smoothScroll.js will handle the actual scrolling and hash update.
            // We just need to ensure the active class is set immediately.
            const href = link.getAttribute('href');
            if (href) {
                setActiveLink(href);
            }
        });
    });
}