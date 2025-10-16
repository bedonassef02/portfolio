import { initializeSmoothScroll } from './smoothScroll.js';
import { initializeWorkExperience } from './workExperience.js';
import { initializeProjects } from './projects.js';
import { initializeSkills } from './skills.js';
import { initializeNavbar } from './navbar.js';
import { initializeIntersectionObserver } from './intersectionObserver.js';
import { initializeAbout } from './about.js';
import { initializeChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSmoothScroll();
    initializeWorkExperience();
    initializeProjects();
    initializeSkills();
    initializeNavbar();
    initializeIntersectionObserver();
    initializeAbout();
    initializeChatbot();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchableItems = [
        { name: 'About', id: 'about' },
        { name: 'Work Experience', id: 'work-experience' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
        { name: 'Upwork Success Story', id: 'upwork-success' }
    ];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = ''; // Clear previous results

        if (query.length === 0) {
            searchResults.classList.add('hidden');
            return;
        }

        const filteredItems = searchableItems.filter(item =>
            item.name.toLowerCase().includes(query)
        );

        if (filteredItems.length > 0) {
            filteredItems.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('p-2', 'hover:bg-[#007bff]', 'hover:text-white', 'cursor-pointer', 'transition-colors', 'duration-200');
                li.textContent = item.name;
                li.addEventListener('click', () => {
                    document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
                    searchInput.value = '';
                    searchResults.classList.add('hidden');
                });
                searchResults.appendChild(li);
            });
            searchResults.classList.remove('hidden');
        } else {
            searchResults.classList.add('hidden');
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.add('hidden');
        }
    });
});
