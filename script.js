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

    // Projects Carousel functionality
    const projectsCarousel = document.getElementById('projects-carousel');
    const prevProjectBtn = document.getElementById('prev-project');
    const nextProjectBtn = document.getElementById('next-project');
    const projectCards = Array.from(projectsCarousel.children);
    let currentIndex = 0;
    let autoSwipeInterval;
    const projectsToShow = 3; // Number of projects to show at once

    function showProject(index) {
        const cardWidth = projectCards[0].offsetWidth + 32; // card width + gap-8 (32px)
        projectsCarousel.scrollLeft = index * cardWidth;
    }

    function showNextProject() {
        if (currentIndex < projectCards.length - projectsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        showProject(currentIndex);
    }

    function showPrevProject() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = projectCards.length - projectsToShow; // Loop to the end
        }
        showProject(currentIndex);
    }

    function startAutoSwipe() {
        autoSwipeInterval = setInterval(showNextProject, 3000); // Auto-swipe every 3 seconds
    }

    function stopAutoSwipe() {
        clearInterval(autoSwipeInterval);
    }

    if (prevProjectBtn && nextProjectBtn && projectsCarousel && projectCards.length > 0) {
        prevProjectBtn.addEventListener('click', () => {
            stopAutoSwipe();
            showPrevProject();
            startAutoSwipe();
        });
        nextProjectBtn.addEventListener('click', () => {
            stopAutoSwipe();
            showNextProject();
            startAutoSwipe();
        });

        projectsCarousel.addEventListener('mouseenter', stopAutoSwipe);
        projectsCarousel.addEventListener('mouseleave', startAutoSwipe);

        // Initialize carousel to show the first project
        showProject(currentIndex);
        startAutoSwipe(); // Start auto-swipe on load
    }

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