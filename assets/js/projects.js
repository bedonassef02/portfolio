import { openModal, closeModal } from './utils.js';

export function initializeProjects() {
    let projectDetailsData = [];

    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            projectDetailsData = data;
            const projectsContainer = document.getElementById('projects-container');
            const INITIAL_PROJECT_DISPLAY_LIMIT = 3;
            let projectsDisplayed = INITIAL_PROJECT_DISPLAY_LIMIT;

            const renderProjects = (projectsToRender) => {
                projectsContainer.innerHTML = `
                    ${projectsToRender.map(project => `
                        <a href="#" class="project-card block bg-gray-800 rounded-lg shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" data-project-id="${project.id}">
                                                        <img src="${project.imageUrl}" alt="${project.title}" class="rounded-md mx-auto mb-4 w-full h-48 object-cover">                            <h3 class="text-2xl font-bold text-white">${project.title}</h3>
                            <p class="text-sm font-medium text-blue-600 mt-2">Tech Stack: ${project.techStack.map(tech => tech.name).join(', ')}</p>
                        </a>
                    `).join('')}
                `;
            };

            renderProjects(projectDetailsData.slice(0, INITIAL_PROJECT_DISPLAY_LIMIT));

            const showMoreBtnContainer = document.createElement('div');
            showMoreBtnContainer.className = 'flex flex-col items-center mt-8';

            const projectCountInfo = document.createElement('p');
            projectCountInfo.id = 'project-count-info';
            projectCountInfo.className = 'text-gray-400 text-lg mb-4';
            showMoreBtnContainer.appendChild(projectCountInfo);

            if (projectDetailsData.length > INITIAL_PROJECT_DISPLAY_LIMIT) {
                const showMoreBtn = document.createElement('button');
                showMoreBtn.id = 'show-more-projects-btn';
                showMoreBtn.className = 'px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50';
                showMoreBtn.textContent = 'Show More Projects';
                showMoreBtnContainer.appendChild(showMoreBtn);
                projectsContainer.parentNode.appendChild(showMoreBtnContainer);

                projectCountInfo.textContent = `Showing ${INITIAL_PROJECT_DISPLAY_LIMIT} of ${projectDetailsData.length} projects`;

                showMoreBtn.addEventListener('click', () => {
                    renderProjects(projectDetailsData);
                    showMoreBtnContainer.style.display = 'none';
                    projectCountInfo.textContent = `Showing ${projectDetailsData.length} of ${projectDetailsData.length} projects`;
                    attachProjectCardListeners();
                });
            } else {
                projectCountInfo.textContent = `Showing ${projectDetailsData.length} of ${projectDetailsData.length} projects`;
                projectsContainer.parentNode.appendChild(showMoreBtnContainer);
            }

            const attachProjectCardListeners = () => {
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
            };
            attachProjectCardListeners();

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
