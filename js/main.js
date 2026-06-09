/* =============================================
   AI Course — main.js
   i18n + accordion + navbar scroll
   ============================================= */

// ---- i18n ----

// Both lang files loaded synchronously in index.html,
// captured into isolated globals before each overwrites window.__translations__
const LANGS = {
  en: window.__i18n_en__,
  sr: window.__i18n_sr__
};

let currentLang = localStorage.getItem('ai-course-lang') || 'en';

function flatGet(obj, key) {
  const parts = key.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return null;
    cur = cur[p];
  }
  return cur;
}

function applyTranslations(lang) {
  const t = LANGS[lang] || LANGS.en;
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = flatGet(t, key);
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = flatGet(t, key);
    if (val != null) el.setAttribute('placeholder', val);
  });

  document.documentElement.lang = lang;
}

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('ai-course-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations(lang);
}

// ---- INIT ----

document.addEventListener('DOMContentLoaded', () => {

  // 1. Set initial lang
  applyTranslations(currentLang);

  // 2. Lang switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    if (btn.dataset.lang === currentLang) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // 3. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // 4. Hamburger menu
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // 5. Accordion
  document.querySelectorAll('.session-header').forEach(header => {
    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') === 'true';
      const body = header.nextElementSibling;

      // Close all others in same list
      const list = header.closest('.sessions-list');
      list.querySelectorAll('.session-header[aria-expanded="true"]').forEach(other => {
        if (other !== header) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle this one
      const next = !expanded;
      header.setAttribute('aria-expanded', next);
      body.style.maxHeight = next ? body.scrollHeight + 'px' : null;
    });
  });

  // 6. Smooth scroll offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // 7. Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      console.log('Form submitted:', Object.fromEntries(data));
      // Replace button text with success
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Message sent';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
    });
  }

});
