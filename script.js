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
    const jobDetailsData = [
        {
            id: 1,
            title: "Backend Developer",
            company: "Corporate Synergy Solutions",
            dates: "August 2025 - October 2025",
            details: `
                <p class="mt-2 text-gray-300">Project: Auto Detailing SaaS Platform</p>
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Architected and implemented a multi-tenant SaaS backend for auto detailing shops, streamlining bookings, employee management, and payments.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented AI-driven photo quoting, improving job estimation accuracy</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Developed a scheduling and calendar system with real-time bay availability, task checklists, and self-service customer booking.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented secure payment workflows with Stripe subscriptions, token-based authentication, and Google Secret Manager.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Developed role-based portals with secure authentication and permission systems.</span>
                    </li>
                </ul>
            `
        },
        {
            id: 2,
            title: "Full-Stack PHP Developer",
            company: "TSR Ventures & Solutions",
            dates: "October 2024 - July 2025",
            details: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Designed and developed a custom PHP framework to improve developer efficiency.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built a Digital Asset Management System (DAMS) with media uploads, metadata extraction, and indexing.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Developed reusable backend modules, reducing code duplication by 30%.</span>
                    </li>
                </ul>
            `
        }
    ];

    const projectDetailsData = [
        {
            id: 1,
            title: "EGYPTIAN LANDMARKS APP | GRADUATION PROJECT",
            techStack: "Nest.js, Next.js, MongoDB, TensorFlow",
            description: `
                <p class="text-lg text-gray-300 mb-2">Implemented AI-powered image recognition for landmark identification</p>
                <p class="text-lg text-gray-300 mb-2">Built comprehensive admin dashboard with content management</p>
                <p class="text-lg text-gray-300 mb-2">Integrated intelligent chatbot using LLM for interactive user engagement</p>
                <p class="text-lg text-gray-300 mb-2">Remotly /bedonassef02</p>
            `
        },
        {
            id: 2,
            title: "DYNAMIC ASSET SERVING SYSTEM",
            techStack: "PHP 8.4+, JavaScript, Google Maps API",
            description: `
                <p class="text-lg text-gray-300 mb-2">Built real-time asset processing system for dynamic delivery of JavaScript and CSS files</p>
                <p class="text-lg text-gray-300 mb-2">Integrated Google Maps API for advanced direction services and route visualization</p>
                <p class="text-lg text-gray-300 mb-2">Implemented intelligent caching strategies for optimized performance</p>
            `
        },
        {
            id: 3,
            title: "MICROSERVICE E-COMMERCE PLATFORM",
            techStack: "Nest.js, RabbitMQ, Redis, Docker",
            description: `
                <p class="text-lg text-gray-300 mb-2">Designed and implemented distributed microservices architecture</p>
                <p class="text-lg text-gray-300 mb-2">Built event-driven communication system using RabbitMQ for inter-service messaging</p>
                <p class="text-lg text-gray-300 mb-2">Implemented CQRS pattern improving query performance</p>
                <p class="text-lg text-gray-300 mb-2">Developed comprehensive authentication service with 2FA and OAuth2 integration</p>
                <p class="text-lg text-gray-300 mb-2">Created automated backup system ensuring data availability</p>
            `
        },
        {
            id: 4,
            title: "MOBILE-STORE",
            techStack: "Express.js, TypeScript, MySQL, Redis, Stripe API, Docker",
            description: `
                <p class="text-lg text-gray-300 mb-2">Created an e-commerce platform for mobile devices with a focus on security and user experience.</p>
                <p class="text-lg text-gray-300 mb-2">Built high-performance REST API</p>
                <p class="text-lg text-gray-300 mb-2">Integrated Stripe payment gateway</p>
                <p class="text-lg text-gray-300 mb-2">Implemented Redis caching layer improving performance</p>
                <p class="text-lg text-gray-300 mb-2">Developed OAuth authentication supporting Google and GitHub</p>
                <p class="text-lg text-gray-300 mb-2">Created comprehensive cart and wishlist system</p>
            `
        },
        {
            id: 5,
            title: "PANEL MISR",
            techStack: "Laravel, MySQL",
            description: `
                <p class="text-lg text-gray-300 mb-2">Engineered the Panel Misr website, delivering a robust and scalable solution</p>
                <p class="text-lg text-gray-300 mb-2">Delivered full-stack solution for enterprise client</p>
                <p class="text-lg text-gray-300 mb-2">Optimized database queries reducing load time</p>
                <p class="text-lg text-gray-300 mb-2">Built responsive admin panel with advanced reporting features</p>
            `
        },
        {
            id: 6,
            title: "MI-MUSIC",
            techStack: "Nest.js, MongoDB, Google OAuth",
            description: `
                <p class="text-lg text-gray-300 mb-2">Designed a music streaming application with a focus on performance and security, using Nest.js and MongoDB.</p>
                <p class="text-lg text-gray-300 mb-2">Integrated Google OAuth and email notifications for enhanced user interactio</p>
            `
        }
    ];

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

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.projectId);
            const project = projectDetailsData.find(item => item.id === projectId);

            if (project) {
                modalProjectTitle.textContent = project.title;
                modalProjectTechStack.textContent = `Tech Stack: ${project.techStack}`;
                modalProjectDescription.innerHTML = project.description;
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