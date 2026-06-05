function closeSession(btn) {
  const body = btn.parentElement.querySelector('.session-body');
  btn.setAttribute('aria-expanded', 'false');
  body.style.maxHeight = body.scrollHeight + 'px';
  requestAnimationFrame(() => { body.style.maxHeight = '0'; });
}

function openSession(btn) {
  const body = btn.parentElement.querySelector('.session-body');
  btn.setAttribute('aria-expanded', 'true');
  body.style.maxHeight = body.scrollHeight + 'px';
  body.addEventListener('transitionend', () => {
    if (btn.getAttribute('aria-expanded') === 'true') body.style.maxHeight = 'none';
  }, { once: true });
}

document.addEventListener('click', e => {
  // Click on card title → close any open session, or open first if nothing is open
  const h3 = e.target.closest('.curriculum-part h3');
  if (h3) {
    const firstBtn = h3.closest('.curriculum-part').querySelector('.session-header');
    if (!firstBtn) return;
    const anyOpen = document.querySelector('.session-header[aria-expanded="true"]');
    if (anyOpen) {
      closeSession(anyOpen);
    } else {
      openSession(firstBtn);
    }
    return;
  }

  const btn = e.target.closest('.session-header');
  if (!btn) return;

  const expanded = btn.getAttribute('aria-expanded') === 'true';

  // Close any currently open session
  document.querySelectorAll('.session-header[aria-expanded="true"]').forEach(open => {
    if (open !== btn) closeSession(open);
  });

  if (expanded) {
    closeSession(btn);
  } else {
    openSession(btn);
  }
});
