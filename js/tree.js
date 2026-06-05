function drawTreeConnector() {
  const root      = document.querySelector('.part-intro');
  const child1    = document.querySelector('.part-1');
  const child2    = document.querySelector('.part-2');
  const connector = document.querySelector('.tree-connector');
  if (!root || !child1 || !child2 || !connector) return;

  const connRect = connector.getBoundingClientRect();
  const offX     = connRect.left;

  const rootCX = root.getBoundingClientRect().left   + root.getBoundingClientRect().width  / 2 - offX;
  const c1CX   = child1.getBoundingClientRect().left + child1.getBoundingClientRect().width / 2 - offX;
  const c2CX   = child2.getBoundingClientRect().left + child2.getBoundingClientRect().width / 2 - offX;
  const h      = connRect.height;
  const midY   = h / 2;
  const color  = '#666672';

  let svg = connector.querySelector('svg');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute;top:0;left:0;overflow:visible;pointer-events:none;';
    connector.style.position = 'relative';
    connector.appendChild(svg);
  }

  svg.setAttribute('width',  connRect.width);
  svg.setAttribute('height', h);
  svg.innerHTML = `
    <line x1="${rootCX}" y1="0"      x2="${rootCX}" y2="${midY}" stroke="${color}" stroke-width="2"/>
    <line x1="${c1CX}"   y1="${midY}" x2="${c2CX}"   y2="${midY}" stroke="${color}" stroke-width="2"/>
    <line x1="${c1CX}"   y1="${midY}" x2="${c1CX}"   y2="${h}"    stroke="${color}" stroke-width="2"/>
    <line x1="${c2CX}"   y1="${midY}" x2="${c2CX}"   y2="${h}"    stroke="${color}" stroke-width="2"/>
  `;
}

function updateMobileSpine() {
  const tree      = document.querySelector('.tree');
  const firstCard = document.querySelector('.part-intro');
  const lastCard  = document.querySelector('.part-2');
  if (!tree || !firstCard || !lastCard) return;

  if (window.innerWidth > 700) {
    tree.style.removeProperty('--spine-top');
    tree.style.removeProperty('--spine-bottom');
    return;
  }

  const treeRect      = tree.getBoundingClientRect();
  const firstCardRect = firstCard.getBoundingClientRect();
  const lastCardRect  = lastCard.getBoundingClientRect();

  const firstTickY = firstCardRect.top + firstCardRect.height / 2;
  const lastTickY  = lastCardRect.top  + lastCardRect.height  / 2;

  const spineTop    = firstTickY - treeRect.top;
  const spineBottom = treeRect.bottom - lastTickY - 1;

  tree.style.setProperty('--spine-top',    Math.max(0, spineTop)    + 'px');
  tree.style.setProperty('--spine-bottom', Math.max(0, spineBottom) + 'px');
}

window.addEventListener('resize', () => { drawTreeConnector(); updateMobileSpine(); });

function waitForTranslationsAndDraw() {
  if (document.querySelector('[data-i18n]')?.textContent?.trim()) {
    drawTreeConnector();
    updateMobileSpine();
  } else {
    setTimeout(waitForTranslationsAndDraw, 50);
  }
}

waitForTranslationsAndDraw();
