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

const themeToggle = document.getElementById('theme-toggle');
const html = document.querySelector('html');

const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    themeToggle.innerHTML = sunIcon;
} else {
    html.classList.remove('dark');
    themeToggle.innerHTML = moonIcon;
}

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeToggle.innerHTML = moonIcon;
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeToggle.innerHTML = sunIcon;
        localStorage.setItem('theme', 'dark');
    }
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.classList.add('animate-outline');
    });
    img.addEventListener('animationend', () => {
        img.classList.remove('animate-outline');
    });
});
