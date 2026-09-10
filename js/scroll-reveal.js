(function () {
  // Observe the (short) band itself, not the whole .work section — that
  // section is much taller than any viewport once all projects are in it,
  // so a ratio-based threshold on it could never be satisfied.
  const bandTargets = document.querySelectorAll('.work-band');
  const projectTargets = document.querySelectorAll('.project');

  const BAND_REVEAL_MS = 1100;

  if (!('IntersectionObserver' in window)) {
    bandTargets.forEach(el => el.classList.add('in-view'));
    projectTargets.forEach(el => el.classList.add('media-in', 'text-in'));
    return;
  }

  const MEDIA_RATIO = 0.1;
  const TEXT_RATIO = 0.2;

  function startProjectObserver() {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= MEDIA_RATIO) {
          entry.target.classList.add('media-in');
        }
        if (entry.intersectionRatio >= TEXT_RATIO) {
          entry.target.classList.add('text-in');
        }
        if (entry.target.classList.contains('media-in') && entry.target.classList.contains('text-in')) {
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: [0, MEDIA_RATIO, TEXT_RATIO, 0.75, 1] });

    projectTargets.forEach(el => projectObserver.observe(el));
  }

  if (!bandTargets.length) {
    startProjectObserver();
    return;
  }

  const bandObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target.closest('.work') || entry.target;
        section.classList.add('in-view');
        bandObserver.unobserve(entry.target);
        setTimeout(startProjectObserver, BAND_REVEAL_MS);
      }
    });
  }, { threshold: 0.15 });

  bandTargets.forEach(el => bandObserver.observe(el));
})();
