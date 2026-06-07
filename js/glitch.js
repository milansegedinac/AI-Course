/* ── Glitch art background for hero ── */

(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.classList.add('hero-glitch');
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    draw();
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── RGB channel shift blocks ──────────────────
    const blockCount = 18;
    for (let i = 0; i < blockCount; i++) {
      const y      = rand(0, H);
      const h      = rand(4, 40);
      const shift  = rand(-60, 60);
      const alpha  = rand(0.04, 0.13);
      const ch     = Math.floor(rand(0, 3)); // 0=R 1=G 2=B

      const colors = [
        `rgba(255,30,80,${alpha})`,
        `rgba(0,220,255,${alpha})`,
        `rgba(255,230,0,${alpha})`,
      ];

      ctx.fillStyle = colors[ch];
      ctx.fillRect(shift, y, W, h);
    }

    // ── Scan lines ───────────────────────────────
    for (let y = 0; y < H; y += rand(60, 140)) {
      const h     = rand(1, 3);
      const alpha = rand(0.03, 0.08);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(0, y, W, h);
    }

    // ── Corrupt rectangles ───────────────────────
    const rectCount = 6;
    for (let i = 0; i < rectCount; i++) {
      const x     = rand(0, W * 0.8);
      const y     = rand(0, H);
      const w     = rand(20, 200);
      const h     = rand(2, 12);
      const alpha = rand(0.05, 0.14);
      const ch    = Math.floor(rand(0, 3));
      const colors = [
        `rgba(255,30,80,${alpha})`,
        `rgba(0,220,255,${alpha})`,
        `rgba(255,230,0,${alpha})`,
      ];
      ctx.fillStyle = colors[ch];
      ctx.fillRect(x, y, w, h);
    }

    // ── Vertical glitch slice ────────────────────
    if (Math.random() > 0.4) {
      const x     = rand(W * 0.1, W * 0.9);
      const w     = rand(1, 4);
      const alpha = rand(0.06, 0.15);
      ctx.fillStyle = `rgba(0,220,255,${alpha})`;
      ctx.fillRect(x, 0, w, H);
    }
  }

  // Redraw every 2.5s for subtle animation
  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 2500);
})();
