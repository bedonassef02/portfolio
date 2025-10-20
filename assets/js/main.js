import { initializeSmoothScroll } from './smoothScroll.js';
import { initializeWorkExperience } from './workExperience.js';
import { initializeProjects } from './projects.js';
import { initializeSkills } from './skills.js';
import { initializeNavbar } from './navbar.js';
import { initializeIntersectionObserver } from './intersectionObserver.js';
import { initializeAbout } from './about.js';
import { initializeChatbot } from './chatbot.js';
import { initializeActiveNavLink } from './activeNavLink.js';
import { initializeThemeToggle } from './theme-toggle.js';
import { initializeContactForm } from './contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSmoothScroll();
    initializeWorkExperience();
    initializeProjects();
    initializeSkills();
    initializeNavbar();
    initializeIntersectionObserver();
    initializeAbout();
    initializeChatbot();
    initializeActiveNavLink();
    initializeThemeToggle();
    initializeContactForm();
});
