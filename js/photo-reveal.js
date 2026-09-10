(function () {
  const IMG_SRC = 'assets/img/photo.png';

  const wrapper = document.querySelector('.hero-photo');
  const canvas = document.getElementById('photoCanvas');
  if (!wrapper || !canvas) return;

  const ctx = canvas.getContext('2d');

  const BRUSH_WIDTH = 60;
  const COVER_COLOR = '#EDDEB2';

  let dpr = Math.max(window.devicePixelRatio || 1, 1);
  let w = 0, h = 0;

  let colorCanvas, patternCanvas, revealMask, revealCtx;
  let currentImg = null;
  let lastPoint = null;

  function drawContain(targetCtx, img) {
    const canvasRatio = w / h;
    const imgRatio = img.width / img.height;
    let dw, dh, dx, dy;

    if (imgRatio > canvasRatio) {
      dw = w;
      dh = dw / imgRatio;
      dx = 0;
      dy = h - dh;
    } else {
      dh = h;
      dw = dh * imgRatio;
      dy = 0;
      dx = (w - dw) / 2;
    }

    targetCtx.drawImage(img, dx, dy, dw, dh);
  }

  function buildCover(targetCtx) {
    targetCtx.fillStyle = COVER_COLOR;
    targetCtx.fillRect(0, 0, w, h);
  }

  function buildOffscreens() {
    colorCanvas = document.createElement('canvas');
    patternCanvas = document.createElement('canvas');
    revealMask = document.createElement('canvas');

    [colorCanvas, patternCanvas, revealMask].forEach(c => {
      c.width = w;
      c.height = h;
    });

    revealCtx = revealMask.getContext('2d');

    drawContain(colorCanvas.getContext('2d'), currentImg);

    const pctx = patternCanvas.getContext('2d');
    buildCover(pctx);
    pctx.globalCompositeOperation = 'destination-in';
    pctx.drawImage(colorCanvas, 0, 0);
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(patternCanvas, 0, 0);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tctx = tempCanvas.getContext('2d');
    tctx.drawImage(colorCanvas, 0, 0);
    tctx.globalCompositeOperation = 'destination-in';
    tctx.drawImage(revealMask, 0, 0);

    ctx.drawImage(tempCanvas, 0, 0);
  }

  function resize() {
    const rect = wrapper.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    dpr = Math.max(window.devicePixelRatio || 1, 1);
    w = Math.round(rect.width * dpr);
    h = Math.round(rect.height * dpr);

    canvas.width = w;
    canvas.height = h;

    if (!currentImg) {
      drawPlaceholder();
      return;
    }

    const prevMask = revealMask;
    buildOffscreens();

    if (prevMask) {
      revealCtx.drawImage(prevMask, 0, 0, prevMask.width, prevMask.height, 0, 0, w, h);
    }

    render();
  }

  function drawPlaceholder() {
    canvas.width = wrapper.clientWidth * dpr;
    canvas.height = wrapper.clientHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#EDDEB2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#664F0B';
    ctx.font = `${16 * dpr}px Sora, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('foto se nahraje sem', canvas.width / 2, canvas.height / 2);
  }

  function toCanvasCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function scratchTo(point) {
    revealCtx.lineCap = 'round';
    revealCtx.lineJoin = 'round';
    revealCtx.strokeStyle = '#fff';
    revealCtx.lineWidth = BRUSH_WIDTH * dpr;
    revealCtx.fillStyle = '#fff';

    revealCtx.beginPath();
    if (lastPoint) {
      revealCtx.moveTo(lastPoint.x, lastPoint.y);
      revealCtx.lineTo(point.x, point.y);
      revealCtx.stroke();
    } else {
      revealCtx.arc(point.x, point.y, (BRUSH_WIDTH * dpr) / 2, 0, Math.PI * 2);
      revealCtx.fill();
    }

    lastPoint = point;
    render();
  }

  const hint = document.getElementById('scratchHint');

  wrapper.addEventListener('mousemove', (e) => {
    if (!currentImg) return;
    if (hint) hint.classList.add('hidden');
    const p = toCanvasCoords(e.clientX, e.clientY);
    scratchTo(p);
  });

  wrapper.addEventListener('mouseleave', () => {
    lastPoint = null;
  });

  function handleTouch(e) {
    if (!currentImg) return;
    const touch = e.touches[0];
    if (!touch) return;
    e.preventDefault();
    if (hint) hint.classList.add('hidden');
    const p = toCanvasCoords(touch.clientX, touch.clientY);
    scratchTo(p);
  }

  wrapper.addEventListener('touchstart', handleTouch, { passive: false });
  wrapper.addEventListener('touchmove', handleTouch, { passive: false });

  wrapper.addEventListener('touchend', () => {
    lastPoint = null;
  });

  window.addEventListener('resize', resize);

  const img = new Image();
  img.onload = function () {
    currentImg = img;
    resize();
  };
  img.onerror = function () {
    drawPlaceholder();
  };
  img.src = IMG_SRC;

  drawPlaceholder();
})();
