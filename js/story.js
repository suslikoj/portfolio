(function () {
  const wrap = document.getElementById('storyRoadWrap');
  const svg = document.getElementById('roadSvg');
  const ribbon = document.getElementById('roadRibbon');
  const centerline = document.getElementById('roadCenterline');
  const markersHost = document.getElementById('roadMarkers');
  const bodyViewportEl = document.getElementById('storyBodyViewport');
  const bodyEl = document.getElementById('storyBody');
  const textEl = document.getElementById('storyText');
  const progressEl = document.getElementById('storyProgress');
  const headingEl = document.getElementById('storyHeading');
  const photosEl = document.getElementById('storyPhotos');
  const lightboxEl = document.getElementById('storyLightbox');
  const lightboxImgEl = document.getElementById('storyLightboxImg');
  const lightboxCloseEl = document.getElementById('storyLightboxClose');

  if (!wrap || !svg || typeof STORY_STOPS === 'undefined') return;

  const total = STORY_STOPS.length;

  // ---- perspective model ----
  // depth: 0 = right at the viewer, positive = ahead (far), small negative = just passed.
  // t: hyperbolic "closeness" derived from depth — 1 at depth 0, ->0 far away, >1 just passed.
  const NEAR_REF = 1.15;

  function closeness(depth) {
    return NEAR_REF / (NEAR_REF + Math.max(depth, -0.85));
  }

  function isMobile() {
    return window.innerWidth < 700;
  }

  let FRONT = 5.5;
  let CURVE_AMPLITUDE = 19;
  let CURVE_PERIOD = 5.2;

  function applyResponsiveTuning() {
    if (isMobile()) {
      FRONT = 3.6;
      CURVE_AMPLITUDE = 12;
      CURVE_PERIOD = 4.4;
    } else {
      FRONT = 5.5;
      CURVE_AMPLITUDE = 19;
      CURVE_PERIOD = 5.2;
    }
  }

  const TOP_Y = 11;      // vh% — vanishing point
  const BOTTOM_Y = 112;  // vh% — near foreground, allowed to exceed 100 so it exits past the viewer
  const WIDE_WIDTH = 36; // vw% at closeness = 1 — narrower path, more cream space around it
  const MIN_WIDTH = 1.2; // vw% floor near the vanishing point

  function curveWorldX(u) {
    return Math.sin((u / CURVE_PERIOD) * Math.PI * 2) * CURVE_AMPLITUDE;
  }

  function sampleAt(u, camera) {
    const depth = u - camera;
    const c = closeness(depth);
    const screenY = TOP_Y + (BOTTOM_Y - TOP_Y) * c;
    const screenX = 50 + curveWorldX(u) * c;
    const width = Math.max(WIDE_WIDTH * c, MIN_WIDTH);
    return { depth, c, screenX, screenY, width };
  }

  // Build marker DOM elements once.
  const markers = STORY_STOPS.map((stop, i) => {
    const el = document.createElement('div');
    el.className = 'road-marker ' + (i % 2 === 0 ? 'side-right' : 'side-left');
    el.innerHTML =
      '<span class="marker-dot"></span>' +
      '<span class="marker-label"><span class="marker-num">' + stop.num + '</span>' +
      '<span class="marker-title">' + stop.title + '</span></span>';
    markersHost.appendChild(el);
    return el;
  });

  function renderBody(stop) {
    let html = stop.paragraphs.map((p) => {
      if (p && p.list) {
        return '<ul>' + p.list.map((li) => '<li>' + li + '</li>').join('') + '</ul>';
      }
      return '<p>' + p + '</p>';
    }).join('');

    if (stop.insight) {
      html += '<div class="story-insight">' +
        '<span class="story-insight-icon">' + (stop.insight.icon || '✦') + '</span>' +
        '<div><p class="story-insight-title">' + stop.insight.title + '</p>' +
        '<p class="story-insight-body">' + stop.insight.body + '</p></div>' +
        '</div>';
    }

    if (stop.features && stop.features.length) {
      html += '<div class="story-features">' + stop.features.map((f) =>
        '<div class="story-feature">' +
        '<span class="story-feature-icon">' + f.icon + '</span>' +
        '<div><p class="story-feature-title">' + f.title + '</p>' +
        '<p class="story-feature-body">' + f.body + '</p></div>' +
        '</div>'
      ).join('') + '</div>';
    }

    bodyEl.innerHTML = html;
  }

  function openLightbox(src, alt) {
    if (!lightboxEl) return;
    lightboxImgEl.src = src;
    lightboxImgEl.alt = alt || '';
    lightboxEl.classList.add('is-open');
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
  }

  if (lightboxEl) {
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) closeLightbox();
    });
    lightboxCloseEl.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function buildPhotoEl(photo, tiltClass) {
    const fig = document.createElement('button');
    fig.type = 'button';
    fig.className = 'story-photo' + (photo.wide ? ' story-photo--wide' : '') + (tiltClass ? ' ' + tiltClass : '');
    fig.setAttribute('aria-label', 'Zvětšit fotku: ' + (photo.alt || ''));
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || '';
    fig.appendChild(img);
    fig.addEventListener('click', function () {
      openLightbox(photo.src, photo.alt);
    });
    return fig;
  }

  function renderPhotos(stop) {
    if (!photosEl) return;
    photosEl.innerHTML = '';
    if (!stop.images || !stop.images.length) return;

    if (stop.images.length === 2) {
      // Before/after pair — keep the two photos grouped together with a
      // connecting arrow so the comparison is obvious at a glance.
      const pair = document.createElement('div');
      pair.className = 'story-photo-pair';
      pair.dataset.side = stop.images[0].side || 'left';
      pair.appendChild(buildPhotoEl(stop.images[0], 'story-photo--tilt-left'));
      const arrow = document.createElement('span');
      arrow.className = 'story-photo-pair-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      pair.appendChild(arrow);
      pair.appendChild(buildPhotoEl(stop.images[1], 'story-photo--tilt-right'));
      photosEl.appendChild(pair);
    } else {
      stop.images.forEach(function (photo) {
        const tiltClass = photo.side === 'right' ? 'story-photo--tilt-right' : 'story-photo--tilt-left';
        const fig = buildPhotoEl(photo, tiltClass);
        fig.dataset.side = photo.side;
        photosEl.appendChild(fig);
      });
    }
  }

  let currentIndex = -1;
  let smoothedCamera = 0;
  let targetCamera = 0;
  let smoothedTextOffset = 0;
  let lastRawScrolled = 0;
  const SMOOTH = 0.1;

  // ---- scroll model ----
  // A single page scroll drives everything. For each stop we reserve a "hold"
  // range of raw scroll pixels equal to how much its text overflows the
  // visible body viewport (1 raw px of scroll = 1px of text reveal). While in
  // a stop's hold range the road camera stays pinned exactly on that stop; the
  // text scrolls up inside its clipped box instead. Once the text is fully
  // read, scrolling resumes moving the camera toward the next stop.
  // No lingering travel/fade after the last stop — once its text is fully
  // read, the sticky road releases immediately and the page scrolls straight
  // into the next section.
  const TAIL_UNITS = 0;
  let PX_PER_UNIT = 900;
  let maxOffset = [];
  let holdStart = [];
  let holdEnd = [];
  let segments = [];
  let totalRawPx = 0;

  function measureAndBuild() {
    // Mobile gets extra scroll distance per stop — on a short viewport the
    // 1.1x factor alone still made stops flip past too quickly to read.
    PX_PER_UNIT = window.innerHeight * (isMobile() ? 1.7 : 1.1);

    const heights = [];
    const viewports = [];
    for (let i = 0; i < total; i++) {
      const stop = STORY_STOPS[i];
      headingEl.textContent = stop.title;
      renderBody(stop);
      bodyEl.style.transform = 'translateY(0px)';
      viewports.push(bodyViewportEl.clientHeight);
      heights.push(bodyEl.scrollHeight);
    }

    maxOffset = heights.map((h, i) => Math.max(0, h - viewports[i]));
    holdStart = new Array(total);
    holdEnd = new Array(total);
    segments = [];

    let raw = 0;
    for (let i = 0; i < total; i++) {
      const hp = maxOffset[i];
      holdStart[i] = raw;
      holdEnd[i] = raw + hp;
      segments.push({ kind: 'hold', rawStart: raw, rawEnd: raw + hp, cam: i });
      raw += hp;

      if (i < total - 1) {
        segments.push({ kind: 'travel', rawStart: raw, rawEnd: raw + PX_PER_UNIT, camStart: i, camEnd: i + 1 });
        raw += PX_PER_UNIT;
      }
    }

    const tailLen = PX_PER_UNIT * TAIL_UNITS;
    segments.push({ kind: 'travel', rawStart: raw, rawEnd: raw + tailLen, camStart: total - 1, camEnd: (total - 1) + TAIL_UNITS });
    raw += tailLen;

    totalRawPx = raw;
    wrap.style.height = (totalRawPx + window.innerHeight) + 'px';
  }

  function cameraFromRaw(raw) {
    const clamped = Math.min(Math.max(raw, 0), totalRawPx);
    for (let s = 0; s < segments.length; s++) {
      const seg = segments[s];
      if (clamped <= seg.rawEnd || s === segments.length - 1) {
        if (seg.kind === 'hold') return seg.cam;
        const span = seg.rawEnd - seg.rawStart;
        const frac = span > 0 ? (clamped - seg.rawStart) / span : 0;
        return seg.camStart + (seg.camEnd - seg.camStart) * Math.min(Math.max(frac, 0), 1);
      }
    }
    return 0;
  }

  function textOffsetFor(i, raw) {
    const max = maxOffset[i] || 0;
    if (max <= 0) return 0;
    if (raw <= holdStart[i]) return 0;
    if (raw >= holdEnd[i]) return max;
    return max * (raw - holdStart[i]) / (holdEnd[i] - holdStart[i]);
  }

  function currentRawScrolled() {
    const rect = wrap.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    return Math.min(Math.max(-rect.top, 0), Math.max(scrollable, 0));
  }

  function buildRoadPaths(camera) {
    const SAMPLES = 44;
    const uStart = Math.max(camera - 0.85, 0);
    const uEnd = camera + FRONT;
    const left = [];
    const right = [];
    const center = [];

    for (let s = 0; s <= SAMPLES; s++) {
      const u = uStart + ((uEnd - uStart) * s) / SAMPLES;
      const pt = sampleAt(u, camera);
      const halfW = pt.width / 2;
      left.push([pt.screenX - halfW, pt.screenY]);
      right.push([pt.screenX + halfW, pt.screenY]);
      center.push([pt.screenX, pt.screenY]);
    }

    let d = 'M ' + left.map((p) => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' L ');
    d += ' L ' + right.slice().reverse().map((p) => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' L ');
    d += ' Z';
    ribbon.setAttribute('d', d);

    const cd = 'M ' + center.map((p) => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' L ');
    centerline.setAttribute('d', cd);

    const strokeW = Math.max(0.5 * sampleAt(camera, camera).c, 0.12);
    centerline.setAttribute('stroke-width', strokeW.toFixed(2));
    centerline.setAttribute('stroke-dasharray', (strokeW * 2.2).toFixed(2) + ' ' + (strokeW * 2.6).toFixed(2));
    centerline.setAttribute('stroke-dashoffset', (-(camera * 14) % 20).toFixed(2));
  }

  // Marker *labels* stay legible only for the one or two stops nearest the
  // viewer, even though the road ribbon itself renders much further ahead.
  // depth > 0 = still approaching (far), depth ~ 0 = arrived, depth < 0 = passed.
  const LABEL_APPEAR_START = 1.9; // starts fading in from here (far)
  const LABEL_HOLD_START = 1.1;   // fully visible from here down to 0 and slightly past

  function markerOpacityFromDepth(depth) {
    if (depth <= -0.55 || depth >= LABEL_APPEAR_START) return 0;
    if (depth < 0) return 1 + depth / 0.55; // passed: fades out as it recedes behind
    if (depth < LABEL_HOLD_START) return 1; // arrived, fully readable
    return (LABEL_APPEAR_START - depth) / (LABEL_APPEAR_START - LABEL_HOLD_START);
  }

  function render() {
    const camera = smoothedCamera;

    buildRoadPaths(camera);

    let bestIndex = 0;
    let bestAbsDepth = Infinity;

    for (let i = 0; i < total; i++) {
      const pt = sampleAt(i, camera);
      const marker = markers[i];
      const opacity = markerOpacityFromDepth(pt.depth);

      if (opacity <= 0.01) {
        marker.style.opacity = 0;
      } else {
        marker.style.opacity = opacity;
        const dotScale = Math.max(Math.min(pt.c, 1.2), 0.6);
        marker.style.left = pt.screenX.toFixed(2) + '%';
        marker.style.top = pt.screenY.toFixed(2) + '%';
        marker.style.transform = 'translate(-50%, -50%) scale(' + dotScale.toFixed(2) + ')';
      }

      const absDepth = Math.abs(pt.depth);
      if (absDepth < bestAbsDepth) {
        bestAbsDepth = absDepth;
        bestIndex = i;
      }
    }

    if (bestIndex !== currentIndex) {
      currentIndex = bestIndex;
      renderBody(STORY_STOPS[bestIndex]);
      renderPhotos(STORY_STOPS[bestIndex]);
      progressEl.textContent = STORY_STOPS[bestIndex].num + ' / ' + total;
      headingEl.textContent = STORY_STOPS[bestIndex].title;
      smoothedTextOffset = 0;
    }

    const targetTextOffset = textOffsetFor(bestIndex, lastRawScrolled);
    smoothedTextOffset += (targetTextOffset - smoothedTextOffset) * SMOOTH;
    if (Math.abs(targetTextOffset - smoothedTextOffset) < 0.5) smoothedTextOffset = targetTextOffset;
    bodyEl.style.transform = 'translateY(-' + smoothedTextOffset.toFixed(1) + 'px)';

    const activeDepth = sampleAt(bestIndex, camera).depth;
    const activeOpacity = markerOpacityFromDepth(activeDepth);
    textEl.style.opacity = activeOpacity;
    if (photosEl) photosEl.style.opacity = activeOpacity;
  }

  function tick() {
    lastRawScrolled = currentRawScrolled();
    targetCamera = cameraFromRaw(lastRawScrolled);
    smoothedCamera += (targetCamera - smoothedCamera) * SMOOTH;
    if (Math.abs(targetCamera - smoothedCamera) < 0.001) smoothedCamera = targetCamera;
    render();
    requestAnimationFrame(tick);
  }

  function resetAndSnap() {
    currentIndex = -1;
    smoothedTextOffset = 0;
    lastRawScrolled = currentRawScrolled();
    targetCamera = cameraFromRaw(lastRawScrolled);
    smoothedCamera = targetCamera;
    render();
  }

  let resizeTimer = null;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      applyResponsiveTuning();
      measureAndBuild();
      resetAndSnap();
    }, 150);
  }

  applyResponsiveTuning();
  measureAndBuild();
  resetAndSnap();
  window.addEventListener('resize', handleResize);
  requestAnimationFrame(tick);

  // Re-measure once webfonts finish loading — the initial pass can run before
  // Sora is applied, which under- or over-estimates how tall each stop's text
  // is and bakes a wrong scroll length into the page.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      applyResponsiveTuning();
      measureAndBuild();
      resetAndSnap();
    });
  }
})();
