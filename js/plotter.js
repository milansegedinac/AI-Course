/* ── Plotter art — 1960s generative style ── */

(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const ns  = 'http://www.w3.org/2000/svg';
  const W   = 700;
  const H   = 600;

  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.classList.add('hero-plotter');

  // ── Layer 1: wavy vertical lines ──────────────────
  const LINES  = 42;
  const PTS    = 120;
  const AMP    = 16;
  const PERIOD = 110;

  for (let i = 0; i < LINES; i++) {
    const xBase = i * W / (LINES - 1);
    const phase = i * 0.52;
    const pts   = [];

    for (let j = 0; j <= PTS; j++) {
      const y = j * H / PTS;
      const x = xBase + AMP * Math.sin(2 * Math.PI * y / PERIOD + phase)
                       + (AMP * 0.4) * Math.sin(2 * Math.PI * y / (PERIOD * 2.3) + phase * 0.7);
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    const pl = document.createElementNS(ns, 'polyline');
    pl.setAttribute('points', pts.join(' '));
    pl.setAttribute('fill', 'none');
    pl.setAttribute('stroke', 'rgba(255,255,255,0.22)');
    pl.setAttribute('stroke-width', '0.9');
    svg.appendChild(pl);
  }

  // ── Layer 2: wavy horizontal lines ────────────────
  const HLINES  = 28;
  const HPTS    = 120;
  const HAMP    = 10;
  const HPERIOD = 130;

  for (let i = 0; i < HLINES; i++) {
    const yBase = i * H / (HLINES - 1);
    const phase = i * 0.65;
    const pts   = [];

    for (let j = 0; j <= HPTS; j++) {
      const x = j * W / HPTS;
      const y = yBase + HAMP * Math.sin(2 * Math.PI * x / HPERIOD + phase);
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    const pl = document.createElementNS(ns, 'polyline');
    pl.setAttribute('points', pts.join(' '));
    pl.setAttribute('fill', 'none');
    pl.setAttribute('stroke', 'rgba(255,255,255,0.10)');
    pl.setAttribute('stroke-width', '0.7');
    svg.appendChild(pl);
  }

  hero.appendChild(svg);
})();
