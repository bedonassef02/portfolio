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
        let jobDetailsData = [];

    fetch('./work-experience.json')
        .then(response => response.json())
        .then(data => {
            jobDetailsData = data;
            const workExperienceContainer = document.getElementById('work-experience-container');
            workExperienceContainer.innerHTML = `
                <div class="border-l-4 border-blue-600 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
                ${jobDetailsData.map((job, index) => `
                    <div class="mb-8 flex justify-between ${index % 2 !== 0 ? 'flex-row-reverse' : ''} items-center w-full left-timeline">
                        <div class="order-1 w-5/12"></div>
                        <div class="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-12 h-12 rounded-full">
                            <h1 class="mx-auto text-white font-semibold text-lg">${job.id}</h1>
                        </div>
                        <div class="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 class="font-bold text-2xl text-white">${job.title}</h3>
                            <p class="text-base font-semibold text-blue-600">${job.company}</p>
                            <p class="text-sm font-medium text-blue-600">${job.dates}</p>
                            <details class="mt-2 md:block hidden">
                                <summary class="text-blue-500 cursor-pointer flex items-center">
                                    View Details <i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>
                                </summary>
                                ${job.details}
                            </details>
                            <button class="view-details-btn text-blue-500 hover:underline cursor-pointer mt-2 md:hidden" data-job-id="${job.id}">View Details</button>
                        </div>
                    </div>
                `).join('')}
            `;

            // Job Details Modal functionality (moved here)
            const jobDetailsModal = document.getElementById('job-details-modal');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const modalJobTitle = document.getElementById('modal-job-title');
            const modalCompanyName = document.getElementById('modal-company-name');
            const modalJobDates = document.getElementById('modal-job-dates');
            const modalJobDetails = document.getElementById('modal-job-details');

            document.querySelectorAll('.view-details-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const jobId = parseInt(button.dataset.jobId);
                    const job = jobDetailsData.find(item => item.id === jobId);

                    if (job) {
                        modalJobTitle.textContent = job.title;
                        modalCompanyName.textContent = job.company;
                        modalJobDates.textContent = job.dates;
                        modalJobDetails.innerHTML = job.details;
                        jobDetailsModal.classList.remove('hidden');
                    }
                });
            });

            closeModalBtn.addEventListener('click', () => {
                jobDetailsModal.classList.add('hidden');
            });

            jobDetailsModal.addEventListener('click', (e) => {
                if (e.target === jobDetailsModal) {
                    jobDetailsModal.classList.add('hidden');
                }
            });
        })
        .catch(error => console.error('Error fetching work experience:', error));

        let projectDetailsData = [];

    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            projectDetailsData = data;
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = `
                ${projectDetailsData.map(project => `
                    <a href="#" class="project-card block bg-gray-800 rounded-lg shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" data-project-id="${project.id}">
                                                    <img src="${project.imageUrl}" alt="${project.title}" class="rounded-md mx-auto mb-4 w-full h-48 object-cover">                        <h3 class="text-2xl font-bold text-white">${project.title}</h3>
                        <p class="text-sm font-medium text-blue-600 mt-2">Tech Stack: ${project.techStack.map(tech => tech.name).join(', ')}</p>
                    </a>
                `).join('')}
            `;

            // Project Details Modal functionality (moved here)
            const projectDetailsModal = document.getElementById('project-details-modal');
            const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
            const modalProjectTitle = document.getElementById('modal-project-title');
            const modalProjectTechStack = document.getElementById('modal-project-tech-stack');
            const modalProjectDescription = document.getElementById('modal-project-description');
            const modalProjectImage = document.getElementById('modal-project-image');
            const modalProjectLink = document.getElementById('modal-project-link');

            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', () => {
                    const projectId = parseInt(card.dataset.projectId);
                    const project = projectDetailsData.find(item => item.id === projectId);

                    if (project) {
                        modalProjectTitle.textContent = project.title;
                        modalProjectTechStack.innerHTML = project.techStack.map(tech => `
                            <span class="inline-flex items-center mr-2 mb-1">
                                <i class="${tech.iconClass} text-xl mr-1"></i>
                                <span>${tech.name}</span>
                            </span>
                        `).join('');
                        modalProjectDescription.innerHTML = project.description;
                        modalProjectImage.src = project.imageUrl;
                        modalProjectImage.alt = project.title;
                        modalProjectLink.href = project.projectLink;
                        projectDetailsModal.classList.remove('hidden');
                    }
                });
            });

            closeProjectModalBtn.addEventListener('click', () => {
                projectDetailsModal.classList.add('hidden');
            });

            projectDetailsModal.addEventListener('click', (e) => {
                if (e.target === projectDetailsModal) {
                    projectDetailsModal.classList.add('hidden');
                }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));

    let allSkillsData = []; // New variable to store all skills

    fetch('./skills.json')
        .then(response => response.json())
        .then(data => {
            allSkillsData = data; // allSkillsData will now be the structured object
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
                        const itemCategories = item.dataset.categories.split(' '); // This will now only contain one category
                        if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });

            // Trigger click on Backend Development button on page load
            document.querySelector('[data-category="backend-development"]').click();
        })
        .catch(error => console.error('Error fetching skills:', error));

    // Navbar responsiveness
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Job Details Modal functionality
    const jobDetailsModal = document.getElementById('job-details-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalJobTitle = document.getElementById('modal-job-title');
    const modalCompanyName = document.getElementById('modal-company-name');
    const modalJobDates = document.getElementById('modal-job-dates');
    const modalJobDetails = document.getElementById('modal-job-details');

    closeModalBtn.addEventListener('click', () => {
        jobDetailsModal.classList.add('hidden');
    });

    jobDetailsModal.addEventListener('click', (e) => {
        if (e.target === jobDetailsModal) {
            jobDetailsModal.classList.add('hidden');
        }
    });

    // Project Details Modal functionality
    const projectDetailsModal = document.getElementById('project-details-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectTechStack = document.getElementById('modal-project-tech-stack');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectImage = document.getElementById('modal-project-image'); // Get reference to the image element
    const modalProjectLink = document.getElementById('modal-project-link');

    closeProjectModalBtn.addEventListener('click', () => {
        projectDetailsModal.classList.add('hidden');
    });

    // Close modal if clicked outside
    projectDetailsModal.addEventListener('click', (e) => {
        if (e.target === projectDetailsModal) {
            projectDetailsModal.classList.add('hidden');
        }
    });
});