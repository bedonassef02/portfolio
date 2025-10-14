export function initializeIntersectionObserver() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-slideIn')) {
                entry.target.classList.add('animate-slideIn');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}
