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

    // "Show More" functionality for skills
    const skillsContainer = document.getElementById('all-skills-container');
    const skills = Array.from(skillsContainer.children);
    const skillsPerLine = 5; // As per user's request
    const maxVisibleSkills = skillsPerLine * 2; // Show 2 lines initially

    if (skills.length > maxVisibleSkills) {
        for (let i = maxVisibleSkills; i < skills.length; i++) {
            skills[i].classList.add('hidden');
        }

        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.classList.add('mt-8', 'px-6', 'py-2', 'rounded-full', 'bg-blue-600', 'text-white', 'font-semibold', 'hover:bg-blue-700', 'focus:outline-none');
        skillsContainer.parentNode.appendChild(showMoreButton);

        showMoreButton.addEventListener('click', () => {
            skills.forEach(skill => {
                skill.classList.remove('hidden');
            });
            showMoreButton.classList.add('hidden'); // Hide the "Show More" button after clicking
        });
    }
});