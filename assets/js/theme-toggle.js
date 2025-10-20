export function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const mobileSunIcon = document.getElementById('mobile-sun-icon');
    const mobileMoonIcon = document.getElementById('mobile-moon-icon');

    // Function to apply theme and update icon visibility
    function applyTheme(theme) {
        if (theme === 'light-mode') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            sunIcon.classList.remove('hidden');
            sunIcon.classList.add('block');
            moonIcon.classList.remove('block');
            moonIcon.classList.add('hidden');
            mobileSunIcon.classList.remove('hidden');
            mobileSunIcon.classList.add('block');
            mobileMoonIcon.classList.remove('block');
            mobileMoonIcon.classList.add('hidden');
        } else { // dark-mode
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            sunIcon.classList.remove('block');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            moonIcon.classList.add('block');
            mobileSunIcon.classList.remove('block');
            mobileSunIcon.classList.add('hidden');
            mobileMoonIcon.classList.remove('hidden');
            mobileMoonIcon.classList.add('block');
        }
        localStorage.setItem('theme', theme);
    }

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to dark mode if no theme is saved
        applyTheme('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark-mode');
        } else {
            applyTheme('light-mode');
        }
    });

    mobileThemeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark-mode');
        } else {
            applyTheme('light-mode');
        }
    });
}