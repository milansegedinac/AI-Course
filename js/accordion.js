/* ── Accordion ── */

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.session-header');
  if (!btn) return;

  const li       = btn.parentElement;
  const body     = li.querySelector('.session-body');
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  btn.setAttribute('aria-expanded', String(!expanded));

  if (expanded) {
    // Collapse
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        body.style.maxHeight = '0';
      });
    });
  } else {
    // Expand
    body.style.maxHeight = body.scrollHeight + 'px';
    body.addEventListener('transitionend', function onEnd() {
      body.removeEventListener('transitionend', onEnd);
      if (btn.getAttribute('aria-expanded') === 'true') {
        body.style.maxHeight = 'none';
        // Scroll so the button is visible at top of viewport
        const navH = document.querySelector('.nav')?.offsetHeight || 60;
        const rect = btn.getBoundingClientRect();
        if (rect.top < navH + 8) {
          window.scrollBy({ top: rect.top - navH - 12, behavior: 'smooth' });
        }
      }
    });
  }
});
