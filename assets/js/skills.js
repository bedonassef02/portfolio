export function initializeSkills() {
    let allSkillsData = [];

    fetch('./skills.json')
        .then(response => response.json())
        .then(data => {
            allSkillsData = data;
            const skillsContainer = document.getElementById('skills-container');
            let skillsHtml = '';
            for (const category in allSkillsData) {
                allSkillsData[category].forEach(skill => {
                    skillsHtml += `
                        <div class="skill-item bg-gray-800 rounded-lg shadow-xl p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" data-categories="${category}">
                            <i class="${skill.iconClass}"></i>
                            <h4 class="text-xl font-bold text-white">${skill.name}</h4>
                        </div>
                    `;
                });
            }
            skillsContainer.innerHTML = skillsHtml;

            const categoryButtons = document.querySelectorAll('.skill-category-btn');
            const skillItems = document.querySelectorAll('.skill-item');

            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const selectedCategory = button.dataset.category;

                    categoryButtons.forEach(btn => {
                        btn.classList.remove('active-category', 'bg-blue-600');
                        btn.classList.add('bg-gray-700');
                    });
                    button.classList.add('active-category', 'bg-blue-600');
                    button.classList.remove('bg-gray-700');

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

            document.querySelector('[data-category="backend-development"]').click();
        })
        .catch(error => console.error('Error fetching skills:', error));
}
