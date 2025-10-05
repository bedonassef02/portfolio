import { initializeSmoothScroll } from './smoothScroll.js';
import { initializeWorkExperience } from './workExperience.js';
import { initializeProjects } from './projects.js';
import { initializeSkills } from './skills.js';
import { initializeNavbar } from './navbar.js';
import { initializeIntersectionObserver } from './intersectionObserver.js';
import { initializeAbout } from './about.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSmoothScroll();
    initializeWorkExperience();
    initializeProjects();
    initializeSkills();
    initializeNavbar();
    initializeIntersectionObserver();
    initializeAbout();
});
