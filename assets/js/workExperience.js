import { openModal, closeModal } from './utils.js';

export function initializeWorkExperience() {
    let jobDetailsData = [];

    fetch('./assets/data/work-experience.json')
        .then(response => response.json())
        .then(data => {
            jobDetailsData = data;
            const workExperienceContainer = document.getElementById('work-experience-container');
            workExperienceContainer.innerHTML = `
                <div class="border-l-4 border-[#007bff] absolute h-full top-0 left-1/2 transform -translate-x-1/2 hidden md:block"></div>
                ${jobDetailsData.map((job, index) => `
                    <!-- Desktop View -->
                    <div class="mb-8 hidden md:flex justify-between ${index % 2 !== 0 ? 'flex-row-reverse' : ''} items-center w-full left-timeline">
                        <div class="order-1 w-5/12"></div>
                        <div class="z-20 flex items-center order-1 bg-[#007bff] shadow-xl w-12 h-12 rounded-full">
                            <h1 class="mx-auto text-white font-semibold text-lg">${job.id}</h1>
                        </div>
                        <div class="order-1 bg-[var(--color-background-medium)] rounded-lg shadow-xl w-5/12 px-6 py-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                            <h3 class="font-bold text-2xl text-white">${job.title}</h3>
                            <p class="text-base font-semibold text-[#007bff]">${job.company}</p>
                            <p class="text-sm font-medium text-[#007bff]">${job.dates}</p>
                            <details class="mt-2">
                                <summary class="text-[#007bff] cursor-pointer flex items-center">
                                    View Details <i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>
                                </summary>
                                ${job.details}
                            </details>
                        </div>
                    </div>

                    <!-- Mobile View -->
                    <div class="mb-8 flex flex-col items-center w-full md:hidden relative">
                        <div class="bg-[var(--color-background-medium)] rounded-lg shadow-xl w-full pl-12 pr-6 py-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
                            <div class="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 flex items-center bg-[#007bff] shadow-xl w-12 h-12 rounded-full">
                                <h1 class="mx-auto text-white font-semibold text-lg">${job.id}</h1>
                            </div>
                            <h3 class="font-bold text-2xl text-white">${job.title}</h3>
                            <p class="text-base font-semibold text-[#007bff]">${job.company}</p>
                            <p class="text-sm font-medium text-[#007bff]">${job.dates}</p>
                            <button class="view-details-btn text-[#007bff] hover:underline cursor-pointer mt-2" data-job-id="${job.id}">View Details</button>
                        </div>
                    </div>
                `).join('')}
            `;

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
                        openModal(jobDetailsModal);
                    }
                });
            });

            closeModalBtn.addEventListener('click', () => {
                closeModal(jobDetailsModal);
            });

            jobDetailsModal.addEventListener('click', (e) => {
                if (e.target === jobDetailsModal) {
                    closeModal(jobDetailsModal);
                }
            });
        })
        .catch(error => console.error('Error fetching work experience:', error));

    document.querySelectorAll('#work-experience button').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('hidden');
        });
    });
}
