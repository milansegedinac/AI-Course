/* ── i18n ── */

(function () {
  let currentLang = localStorage.getItem('lang') || 'sr';

  function applyTranslations(translations, prefix, obj) {
    for (const key in obj) {
      const val = obj[key];
      const fullKey = prefix ? prefix + '.' + key : key;
      if (typeof val === 'string') {
        translations[fullKey] = val;
      } else if (typeof val === 'object') {
        applyTranslations(translations, fullKey, val);
      }
    }
  }

  function flatten(obj) {
    const out = {};
    applyTranslations(out, '', obj);
    return out;
  }

  function t(key) {
    return window.__flat__[key] || key;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = t(key);
    });
  }

  function loadLang(lang, callback) {
    const script = document.createElement('script');
    script.src = 'lang/' + lang + '.js?v=' + Date.now();
    script.onload = function () {
      window.__flat__ = flatten(window.__translations__);
      callback && callback();
    };
    document.head.appendChild(script);
  }

  window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    loadLang(lang, apply);
  };

  window.handleSubmit = function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('[type=submit]');
    const orig = btn.textContent;
    btn.textContent = '✓ Sent';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  };

  // Init
  loadLang(currentLang, apply);
})();
