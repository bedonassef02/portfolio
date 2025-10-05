import { openModal, closeModal } from './utils.js';

export function initializeProjects() {
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
                        openModal(projectDetailsModal);
                    }
                });
            });

            closeProjectModalBtn.addEventListener('click', () => {
                closeModal(projectDetailsModal);
            });

            projectDetailsModal.addEventListener('click', (e) => {
                if (e.target === projectDetailsModal) {
                    closeModal(projectDetailsModal);
                }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
}
