document.addEventListener('click', e => {
  const btn = e.target.closest('.session-header');
  if (!btn) return;

  const li       = btn.parentElement;
  const body     = li.querySelector('.session-body');
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  btn.setAttribute('aria-expanded', !expanded);
  if (expanded) {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => { body.style.maxHeight = '0'; });
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    body.addEventListener('transitionend', () => {
      if (btn.getAttribute('aria-expanded') === 'true') body.style.maxHeight = 'none';
    }, { once: true });
  }
});
