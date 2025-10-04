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



document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.skill-category-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;

            // Update active button styling
            categoryButtons.forEach(btn => {
                btn.classList.remove('active-category', 'bg-blue-600');
                btn.classList.add('bg-gray-700');
            });
            button.classList.add('active-category', 'bg-blue-600');
            button.classList.remove('bg-gray-700');

            // Show/hide skill items based on selected category
            skillItems.forEach(item => {
                const itemCategories = item.dataset.categories.split(' ');
                if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});