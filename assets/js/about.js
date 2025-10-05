export function initializeAbout() {
    const toggleButton = document.getElementById('toggle-about-text');
    const fullText = document.getElementById('full-about-text');

    if (toggleButton && fullText) {
        toggleButton.addEventListener('click', () => {
            if (fullText.classList.contains('hidden')) {
                fullText.classList.remove('hidden');
                toggleButton.textContent = 'Show Less';
            } else {
                fullText.classList.add('hidden');
                toggleButton.textContent = 'Show More';
            }
        });
    }
}
