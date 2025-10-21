export function initializeAbout() {
    const toggleButton = document.getElementById('toggle-about-text');
    const truncatedText = document.getElementById('truncated-about-text');
    const fullText = document.getElementById('full-about-text');

    if (toggleButton && truncatedText && fullText) {
        // Function to check if it's a mobile view (based on Tailwind's 'md' breakpoint)
        const isMobile = () => window.innerWidth < 768;

        const applyVisibility = () => {
            if (isMobile()) {
                // On mobile, show truncated text and button, hide full text initially
                truncatedText.classList.remove('hidden');
                fullText.classList.add('hidden');
                toggleButton.classList.remove('hidden');
                toggleButton.textContent = 'Show More';
            } else {
                // On desktop, show full text, hide truncated text and button
                truncatedText.classList.add('hidden');
                fullText.classList.remove('hidden');
                toggleButton.classList.add('hidden');
            }
        };

        // Apply visibility on load and resize
        applyVisibility();
        window.addEventListener('resize', applyVisibility);

        toggleButton.addEventListener('click', () => {
            if (fullText.classList.contains('hidden')) {
                fullText.classList.remove('hidden');
                truncatedText.classList.add('hidden');
                toggleButton.textContent = 'Show Less';
            } else {
                fullText.classList.add('hidden');
                truncatedText.classList.remove('hidden');
                toggleButton.textContent = 'Show More';
            }
        });
    }
}
