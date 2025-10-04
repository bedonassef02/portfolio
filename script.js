document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('#work-experience button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('hidden');
    });
});

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

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.classList.add('animate-outline');
    });
    img.addEventListener('animationend', () => {
        img.classList.remove('animate-outline');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.skill-category-btn');
    const skillContents = document.querySelectorAll('.skill-category-content');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Remove active class from all buttons and add to the clicked one
            categoryButtons.forEach(btn => btn.classList.remove('active-category', 'bg-blue-600', 'hover:bg-blue-700'));
            categoryButtons.forEach(btn => btn.classList.add('bg-gray-700', 'hover:bg-blue-700'));
            button.classList.add('active-category', 'bg-blue-600', 'hover:bg-blue-700');
            button.classList.remove('bg-gray-700');


            // Hide all skill content and show the selected one
            skillContents.forEach(content => {
                if (content.dataset.category === category || category === 'all') {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
});