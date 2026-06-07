/* ── Tree SVG connector ── */

(function () {
  function drawConnector() {
    const connector = document.querySelector('.tree-connector');
    if (!connector) return;

    const rootRow   = document.querySelector('.tree-root-row');
    const children  = document.querySelector('.tree-children');
    if (!rootRow || !children) return;

    const childCards = children.querySelectorAll('.curriculum-part');
    if (childCards.length < 2) return;

    // Clear any existing SVG
    connector.innerHTML = '';

    const cRect  = connector.getBoundingClientRect();
    const rRect  = rootRow.getBoundingClientRect();
    const c1Rect = childCards[0].getBoundingClientRect();
    const c2Rect = childCards[1].getBoundingClientRect();

    const svgW = cRect.width;
    const svgH = cRect.height;

    // Root card bottom-center (relative to connector)
    const startX = rRect.left + rRect.width / 2 - cRect.left;
    const startY = 0;

    // Children top-centers (relative to connector)
    const end1X = c1Rect.left + c1Rect.width / 2 - cRect.left;
    const end2X = c2Rect.left + c2Rect.width / 2 - cRect.left;
    const endY  = svgH;

    const midY = svgH / 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgW);
    svg.setAttribute('height', svgH);
    svg.style.display = 'block';
    svg.style.overflow = 'visible';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#0a0a0a');
    path.setAttribute('stroke-width', '3');

    // Down from root, split, down to children
    const d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${midY}`,
      `L ${end1X} ${midY}`,
      `L ${end1X} ${endY}`,
      `M ${startX} ${midY}`,
      `L ${end2X} ${midY}`,
      `L ${end2X} ${endY}`,
    ].join(' ');

    path.setAttribute('d', d);
    svg.appendChild(path);
    connector.appendChild(svg);
  }

  // Draw after layout + fonts settle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(drawConnector, 100));
  } else {
    setTimeout(drawConnector, 100);
  }

  window.addEventListener('resize', drawConnector);
})();
