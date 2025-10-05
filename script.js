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
            techStack: [
                { name: "Nest.js", iconClass: "devicon-nestjs-plain text-red-500" },
                { name: "Next.js", iconClass: "devicon-nextjs-plain text-white" },
                { name: "MongoDB", iconClass: "devicon-mongodb-plain text-green-500" },
                { name: "TensorFlow", iconClass: "fas fa-brain text-orange-500" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented AI-powered image recognition for landmark identification</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built comprehensive admin dashboard with content management</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Integrated intelligent chatbot using LLM for interactive user engagement</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Remotly /bedonassef02</span>
                    </li>
                </ul>
            `,
            projectLink: "https://github.com/bedonassef/EGYPTIAN-LANDMARKS-APP"
        },
        {
            id: 2,
            title: "DYNAMIC ASSET SERVING SYSTEM",
            techStack: [
                { name: "PHP 8.4+", iconClass: "devicon-php-plain text-blue-600" },
                { name: "JavaScript", iconClass: "devicon-javascript-plain text-yellow-500" },
                { name: "Google Maps API", iconClass: "fas fa-map-marked-alt text-red-500" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built real-time asset processing system for dynamic delivery of JavaScript and CSS files</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Integrated Google Maps API for advanced direction services and route visualization</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented intelligent caching strategies for optimized performance</span>
                    </li>
                </ul>
            `,
            projectLink: "#"
        },
        {
            id: 3,
            title: "MICROSERVICE E-COMMERCE PLATFORM",
            techStack: [
                { name: "Nest.js", iconClass: "devicon-nestjs-plain text-red-500" },
                { name: "RabbitMQ", iconClass: "fas fa-exchange-alt text-orange-500" },
                { name: "Redis", iconClass: "devicon-redis-plain text-red-500" },
                { name: "Docker", iconClass: "devicon-docker-plain text-blue-400" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Designed and implemented distributed microservices architecture</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built event-driven communication system using RabbitMQ for inter-service messaging</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented CQRS pattern improving query performance</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Developed comprehensive authentication service with 2FA and OAuth2 integration</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Created automated backup system ensuring data availability</span>
                    </li>
                </ul>
            `,
            projectLink: "https://github.com/bedonassef/e-commerce-microservice"
        },
        {
            id: 4,
            title: "MOBILE-STORE",
            techStack: [
                { name: "Express.js", iconClass: "devicon-express-plain text-gray-400" },
                { name: "TypeScript", iconClass: "devicon-typescript-plain text-blue-500" },
                { name: "MySQL", iconClass: "devicon-mysql-plain text-blue-500" },
                { name: "Redis", iconClass: "devicon-redis-plain text-red-500" },
                { name: "Stripe API", iconClass: "fab fa-stripe text-purple-500" },
                { name: "Docker", iconClass: "devicon-docker-plain text-blue-400" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Created an e-commerce platform for mobile devices with a focus on security and user experience.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built high-performance REST API</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Integrated Stripe payment gateway</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Implemented Redis caching layer improving performance</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Developed OAuth authentication supporting Google and GitHub</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Created comprehensive cart and wishlist system</span>
                    </li>
                </ul>
            `,
            projectLink: "https://github.com/bedonassef/mobile-store"
        },
        {
            id: 5,
            title: "PANEL MISR",
            techStack: [
                { name: "Laravel", iconClass: "devicon-laravel-plain text-red-500" },
                { name: "MySQL", iconClass: "devicon-mysql-plain text-blue-500" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Engineered the Panel Misr website, delivering a robust and scalable solution</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Delivered full-stack solution for enterprise client</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Optimized database queries reducing load time</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Built responsive admin panel with advanced reporting features</span>
                    </li>
                </ul>
            `,
            projectLink: "#"
        },
        {
            id: 6,
            title: "MI-MUSIC",
            techStack: [
                { name: "Nest.js", iconClass: "devicon-nestjs-plain text-red-500" },
                { name: "MongoDB", iconClass: "devicon-mongodb-plain text-green-500" },
                { name: "Google OAuth", iconClass: "fab fa-google text-blue-500" }
            ],
            imageUrl: "https://placehold.co/600x400",
            description: `
                <ul class="list-none text-gray-300 mt-2 space-y-2">
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Designed a music streaming application with a focus on performance and security, using Nest.js and MongoDB.</span>
                    </li>
                    <li class="flex items-baseline relative pl-6">
                        <i class="fas fa-check-circle text-blue-400 mr-2 flex-shrink-0"></i>
                        <span>Integrated Google OAuth and email notifications for enhanced user interactio</span>
                    </li>
                </ul>
            `,
            projectLink: "https://github.com/bedonassef/MI-MUSIC"
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