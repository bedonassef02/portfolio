export function initializeIntersectionObserver() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slideIn');
            } else {
                entry.target.classList.remove('animate-slideIn');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}
