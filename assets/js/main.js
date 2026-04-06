/* =====================================================
   PORTFOLIO — main.js  |  Complete Refactor 2026
   ===================================================== */

const html = document.documentElement;

// ── THEME ─────────────────────────────────────────────
const themeToggle       = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon         = document.getElementById('theme-icon');
const themeIconMobile   = document.getElementById('theme-icon-mobile');

function applyTheme(theme) {
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
  }
  const isDark = theme === 'dark';
  const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
  const tip       = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  if (themeIcon)        { themeIcon.className = iconClass; }
  if (themeIconMobile)  { themeIconMobile.className = iconClass; }
  if (themeToggle)      { themeToggle.setAttribute('aria-label', tip); themeToggle.title = tip; }
  if (themeToggleMobile){ themeToggleMobile.setAttribute('aria-label', tip); themeToggleMobile.title = tip; }
  localStorage.setItem('pf-theme', theme);
}

function toggleTheme() {
  html.classList.add('theme-transitioning');
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  setTimeout(() => html.classList.remove('theme-transitioning'), 350);
}

// Init from localStorage, default to dark
applyTheme(localStorage.getItem('pf-theme') || 'dark');

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);


// ── MOBILE MENU ────────────────────────────────────────
const mobileMenuBtn     = document.getElementById('mobile-menu-btn');
const mobileMenu        = document.getElementById('mobile-menu');
const mobileOverlay     = document.getElementById('mobile-menu-overlay');
const closeMobileBtn    = document.getElementById('close-mobile-menu');

function openMobileMenu() {
  mobileMenu?.classList.remove('translate-x-full');
  mobileMenu?.classList.add('translate-x-0');
  mobileOverlay?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenu?.classList.add('translate-x-full');
  mobileMenu?.classList.remove('translate-x-0');
  mobileOverlay?.classList.add('hidden');
  document.body.style.overflow = '';
}

mobileMenuBtn?.addEventListener('click', e => { e.stopPropagation(); openMobileMenu(); });
closeMobileBtn?.addEventListener('click', closeMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));


// ── SMOOTH SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── NAVBAR ON SCROLL ───────────────────────────────────
const navbar = document.getElementById('navbar');
function updateNavbar() {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();


// ── ACTIVE NAV LINK ────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav .nav-link');

function updateActiveNav() {
  const y = window.scrollY + 130;
  let found = false;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (!found && y >= top && y < bottom) {
      found = true;
      const id = sec.getAttribute('id');
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });


// ── SCROLL REVEAL (IntersectionObserver) ───────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObs.observe(el));


// ── COUNTER ANIMATION ──────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-counter').forEach(el => counterObs.observe(el));

function runCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  function tick(now) {
    const pct     = Math.min((now - start) / duration, 1);
    const eased   = 1 - Math.pow(1 - pct, 3);
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
    if (pct < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}


// ── TYPING EFFECT ──────────────────────────────────────
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const phrases = ['Scalable Apps', 'SaaS Platforms', 'AI Agents', 'Smart Workflows'];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (deleting) {
      typingEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 380);
        return;
      }
    } else {
      typingEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        setTimeout(() => { deleting = true; type(); }, 2200);
        return;
      }
    }
    setTimeout(type, deleting ? 42 : 88);
  }
  setTimeout(type, 1400);
}


// ── PROJECT FILTER ─────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-grid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats    = (card.dataset.category || '').split(' ');
      const visible = filter === 'all' || cats.includes(filter);

      if (visible) {
        card.classList.remove('is-hidden');
        // fade-in animation on re-show
        card.style.opacity   = '0';
        card.style.transform = 'translateY(18px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity    = '1';
            card.style.transform  = '';
          });
        });
        setTimeout(() => { card.style.transition = ''; }, 450);
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});


// ── CONTACT FORM ───────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formMsg     = document.getElementById('form-message');

function showMsg(text, ok) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.style.color = ok ? 'var(--ok-fg)' : '#f87171';
  setTimeout(() => { formMsg.textContent = ''; }, 5000);
}

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const submitBtn   = contactForm.querySelector('button[type="submit"]');
  const origHtml    = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-sm"></i> Sending…';
  submitBtn.disabled  = true;

  const data = {};
  new FormData(contactForm).forEach((v, k) => { data[k] = v; });

  try {
    const res = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('server');

    submitBtn.innerHTML = '<i class="fas fa-check text-sm"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #14b8a6)';
    showMsg("Message sent! I'll get back to you within 24 hours.", true);
    contactForm.reset();

    setTimeout(() => {
      submitBtn.innerHTML  = origHtml;
      submitBtn.style.background = '';
      submitBtn.disabled   = false;
    }, 3200);
  } catch {
    submitBtn.innerHTML = origHtml;
    submitBtn.disabled  = false;
    showMsg('Something went wrong. Email me directly at bedonassef71@gmail.com', false);
  }
});
