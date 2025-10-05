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
            // You can now use jobDetailsData in your application
        })
        .catch(error => console.error('Error fetching work experience:', error));

        let projectDetailsData = [];

    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            projectDetailsData = data;
            // You can now use projectDetailsData in your application
        })
        .catch(error => console.error('Error fetching projects:', error));

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

    // Close modal if clicked outside
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

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.projectId);
            const project = projectDetailsData.find(item => item.id === projectId);

            if (project) {
                modalProjectTitle.textContent = project.title;
                // Populate tech stack with icons
                modalProjectTechStack.innerHTML = project.techStack.map(tech => `
                    <span class="inline-flex items-center mr-2 mb-1">
                        <i class="${tech.iconClass} text-xl mr-1"></i>
                        <span>${tech.name}</span>
                    </span>
                `).join('');
                modalProjectDescription.innerHTML = project.description;
                modalProjectImage.src = project.imageUrl; // Set image src
                modalProjectImage.alt = project.title; // Set image alt
                modalProjectLink.href = project.projectLink;
                projectDetailsModal.classList.remove('hidden');
            }
        });
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectDetailsModal.classList.add('hidden');
    });

    // Close modal if clicked outside
    projectDetailsModal.addEventListener('click', (e) => {
        if (e.target === projectDetailsModal) {
            projectDetailsModal.classList.add('hidden');
        }
    });

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

    // Trigger click on Backend Development button on page load
    document.querySelector('[data-category="backend-development"]').click();
});