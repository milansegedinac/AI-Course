const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'sr'];


function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((obj, k) => obj && obj[k], translations);
    if (value !== undefined) el.textContent = value;
  });
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  const script = document.createElement('script');
  script.src = `lang/${lang}.js?v=${Date.now()}`;
  script.onload = () => applyTranslations(window.__translations__);
  document.head.appendChild(script);
}

function getBrowserLang() {
  const lang = (navigator.language || '').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

const savedLang = localStorage.getItem('lang') || getBrowserLang();
setLanguage(savedLang);
