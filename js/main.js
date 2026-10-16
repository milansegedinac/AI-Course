(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typewriterToken = 0;

  /* ======================================================================
     I18N
     ====================================================================== */
  var dictionaries = { sr: window.__i18n_sr__, en: window.__i18n_en__ };
  var LANG_KEY = 'sokraft-lang';
  var currentLang = 'sr';
  try { currentLang = localStorage.getItem(LANG_KEY) || 'sr'; } catch (e) { /* file:// or private mode */ }

  function getPath(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function applyI18n(lang) {
    var dict = dictionaries[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n'));
      if (value === undefined) return;
      el.dataset.abort = 'true'; // cancel any running count-up animation
      el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });

    if (dict.meta) {
      document.title = dict.meta.title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', dict.meta.description);
    }

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    var switcher = document.querySelector('.lang-switch');
    if (switcher) switcher.setAttribute('data-active', lang);

    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }

    // re-measure any open accordion bodies (text length differs per language)
    requestAnimationFrame(function () {
      document.querySelectorAll('.session-head[aria-expanded="true"]').forEach(function (btn) {
        var body = btn.nextElementSibling;
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      });
    });

    runHeroTypewriter(lang);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyI18n(btn.getAttribute('data-lang'));
    });
  });

  applyI18n(currentLang);

  /* ======================================================================
     Navbar scroll state + scroll progress + scrollspy
     ====================================================================== */
  var navbar = document.getElementById('navbar');
  var progress = document.getElementById('scroll-progress');
  var toTopBtn = document.getElementById('to-top');
  var spySections = ['setup', 'lessons', 'about', 'contact'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var spyLinks = document.querySelectorAll('.nav-link[data-spy]');

  function onScroll() {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 12);
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    if (toTopBtn) toTopBtn.classList.toggle('visible', y > 600);

    // scrollspy
    var currentId = '';
    var probe = y + window.innerHeight * 0.34;
    spySections.forEach(function (sec) {
      if (sec.offsetTop <= probe) currentId = sec.id;
    });
    spyLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-spy') === currentId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ======================================================================
     Mobile menu
     ====================================================================== */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ======================================================================
     Cursor glow (desktop only)
     ====================================================================== */
  var glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    window.addEventListener('mousemove', function (e) {
      glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    }, { passive: true });
  }

  /* ======================================================================
     Reveal on scroll
     ====================================================================== */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ======================================================================
     Stat count-up
     ====================================================================== */
  function animateCount(el) {
    if (el.hasAttribute('data-no-count')) return;
    var raw = el.textContent;
    var match = raw.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;
    var prefix = match[1], target = parseInt(match[2], 10), suffix = match[3];
    if (reduceMotion || isNaN(target)) return;

    delete el.dataset.abort;
    var duration = 1100;
    var start = null;

    function step(ts) {
      if (el.dataset.abort === 'true') return;
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  var countTargets = document.querySelectorAll('.stat-num, .mini-stat strong');
  if ('IntersectionObserver' in window) {
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countTargets.forEach(function (el) { countIo.observe(el); });
  }

  /* ======================================================================
     Curriculum accordion
     ====================================================================== */
  document.querySelectorAll('.session-head').forEach(function (btn) {
    var body = btn.nextElementSibling;
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
    });
  });

  window.addEventListener('resize', function () {
    document.querySelectorAll('.session-head[aria-expanded="true"]').forEach(function (btn) {
      var body = btn.nextElementSibling;
      body.style.maxHeight = body.scrollHeight + 'px';
    });
  });

  /* ======================================================================
     Tilt cards
     ====================================================================== */
  if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(760px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ======================================================================
     Hero video background (local file: assets/sokraft-video-bg.mp4)
     — Fades in once playback actually starts.
     — Falls back to the animated haze background if the video can't play
       (missing file, unsupported codec, prefers-reduced-motion).
     ====================================================================== */
  (function heroVideo() {
    var hero = document.getElementById('hero');
    var video = document.getElementById('hero-video');
    if (!hero || !video) return;

    var settled = false;

    function fallback() {
      if (settled) return;
      settled = true;
      hero.classList.add('hero--no-video');
      try { video.removeAttribute('src'); video.load(); } catch (e) { /* ignore */ }
    }

    function ready() {
      if (settled) return;
      settled = true;
      hero.classList.add('hero--video-ready');
    }

    if (reduceMotion) { fallback(); return; }

    video.addEventListener('playing', ready);
    video.addEventListener('error', fallback);

    // in case playback already started before listeners were attached
    if (!video.paused && video.readyState >= 3) {
      ready();
    } else {
      var p = video.play();
      if (p && p.catch) {
        p.catch(function () { /* autoplay blocked — haze stays until interaction */ });
      }
    }

    // Safety net: if nothing is playing after 8s, settle on the fallback look.
    setTimeout(function () {
      if (!settled && video.readyState < 2) fallback();
    }, 8000);
  })();

  /* ======================================================================
     Hero typewriter headline
     ====================================================================== */
  function runHeroTypewriter(lang) {
    var boldEl = document.getElementById('hero-line-bold');
    var italicEl = document.getElementById('hero-line-italic');
    if (!boldEl || !italicEl) return;
    var dict = dictionaries[lang];
    if (!dict || !dict.hero) return;

    var token = ++typewriterToken;
    var lines = [
      { el: boldEl, text: dict.hero.title.bold },
      { el: italicEl, text: dict.hero.title.italic }
    ];

    boldEl.textContent = '';
    italicEl.textContent = '';

    if (reduceMotion) {
      boldEl.textContent = lines[0].text;
      italicEl.textContent = lines[1].text;
      return;
    }

    var speed = 38;
    var startDelay = 480;
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor animate-blink';

    setTimeout(function () {
      if (token !== typewriterToken) return;
      var lineIndex = 0, charIndex = 0;

      var timer = setInterval(function () {
        if (token !== typewriterToken) { clearInterval(timer); return; }
        var current = lines[lineIndex];
        charIndex++;
        current.el.textContent = current.text.slice(0, charIndex);
        current.el.appendChild(cursor);

        if (charIndex >= current.text.length) {
          lineIndex++;
          charIndex = 0;
          if (lineIndex >= lines.length) {
            clearInterval(timer);
            setTimeout(function () {
              if (token === typewriterToken) cursor.remove();
            }, 560);
          }
        }
      }, speed);
    }, startDelay);
  }

  /* ======================================================================
     Contact form (no backend yet — logs + shows confirmation)
     ====================================================================== */
  var form = document.getElementById('contact-form');
  if (form) {
    var submitLabel = form.querySelector('.submit-label');
    var successMsg = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity || form.reportValidity()) {
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        var dict = dictionaries[currentLang];
        var originalLabel = submitLabel.textContent;

        form.classList.add('is-loading');
        submitLabel.textContent = dict.contact.form.sending;

        setTimeout(function () {
          // eslint-disable-next-line no-console
          console.log('[Sokraft contact form — no backend wired yet]', data);
          form.classList.remove('is-loading');
          submitLabel.textContent = originalLabel;
          successMsg.classList.add('show');
          form.reset();
          setTimeout(function () { successMsg.classList.remove('show'); }, 5000);
        }, 900);
      }
    });
  }

})();
