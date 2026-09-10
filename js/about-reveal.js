(function () {
  const section = document.querySelector('.about');
  if (!section) return;

  /* ---------- portrait: sequential stroke draw ---------- */

  const svg = document.getElementById('aboutDrawSvg');

  if (svg && 'IntersectionObserver' in window) {
    const paths = Array.from(svg.querySelectorAll('path'));
    const lengths = paths.map(p => p.getTotalLength());
    // A handful of paths (dense hair detail etc.) are wildly longer than the
    // rest, which would eat almost the whole animation if weighted linearly.
    // Log-weighting keeps the pacing visually even across all strokes.
    const weights = lengths.map(len => Math.log(len + 1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const DRAW_MS = 4200;

    paths.forEach((p, i) => {
      const len = lengths[i];
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });

    function drawPortrait() {
      let acc = 0;
      paths.forEach((p, i) => {
        const w = weights[i];
        const delay = (acc / totalWeight) * DRAW_MS;
        const dur = Math.max((w / totalWeight) * DRAW_MS, 60);
        p.style.transition = `stroke-dashoffset ${dur}ms linear ${delay}ms`;
        requestAnimationFrame(() => { p.style.strokeDashoffset = 0; });
        acc += w;
      });
    }

    const drawObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          drawPortrait();
          drawObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    drawObserver.observe(svg);
  }

  /* ---------- text: typewriter reveal ---------- */

  const typeTargets = [
    document.querySelector('.about-title'),
    ...document.querySelectorAll('.about-text p')
  ].filter(Boolean);

  if (!('IntersectionObserver' in window)) return;

  const CHAR_MS = 14;

  function toChars(el) {
    const chars = [];
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        for (const ch of node.textContent) chars.push({ ch, em: false });
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'EM') {
        for (const ch of node.textContent) chars.push({ ch, em: true });
      }
    });
    return chars;
  }

  function render(el, chars, count) {
    el.innerHTML = '';
    let buffer = '';
    let bufferEm = null;

    function flush() {
      if (!buffer) return;
      if (bufferEm) {
        const em = document.createElement('em');
        em.textContent = buffer;
        el.appendChild(em);
      } else {
        el.appendChild(document.createTextNode(buffer));
      }
      buffer = '';
    }

    for (let j = 0; j < count; j++) {
      const c = chars[j];
      if (bufferEm === null) bufferEm = c.em;
      if (c.em !== bufferEm) { flush(); bufferEm = c.em; }
      buffer += c.ch;
    }
    flush();
  }

  function typeElement(el, chars) {
    return new Promise((resolve) => {
      el.textContent = '';
      el.classList.add('typing');

      if (!chars.length) {
        el.classList.remove('typing');
        resolve();
        return;
      }

      let i = 0;
      function step() {
        i++;
        render(el, chars, i);
        if (i < chars.length) {
          setTimeout(step, CHAR_MS);
        } else {
          el.classList.remove('typing');
          resolve();
        }
      }
      step();
    });
  }

  // Clear immediately so nothing flashes fully-formed before it types in.
  const pending = typeTargets.map(el => ({ el, chars: toChars(el) }));
  pending.forEach(({ el }) => { el.textContent = ''; });

  async function runTypingSequence() {
    for (const { el, chars } of pending) {
      await typeElement(el, chars);
    }
  }

  const trigger = pending[0] && pending[0].el;

  if (trigger) {
    const typeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runTypingSequence();
          typeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    typeObserver.observe(trigger);
  }
})();
