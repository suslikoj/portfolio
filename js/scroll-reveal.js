(function () {
  // Scroll-driven reveal, checked on scroll/resize rather than via
  // IntersectionObserver. IntersectionObserver callbacks can be throttled
  // or delayed indefinitely while a tab/preview is considered backgrounded
  // by the browser, which left this section invisible in some environments
  // even though the user was actively looking at the page.
  const band = document.querySelector('.work-band');
  const workSection = band ? (band.closest('.work') || band) : null;
  const projectTargets = Array.from(document.querySelectorAll('.project'));

  const BAND_REVEAL_MS = 1100;
  const MEDIA_RATIO = 0.1;
  const TEXT_RATIO = 0.2;

  let bandRevealed = false;
  let projectsEnabled = false;

  function visibleRatio(el) {
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0) return 0;
    const visible = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
    return Math.max(0, visible) / rect.height;
  }

  function check() {
    if (!bandRevealed && workSection) {
      if (visibleRatio(band) >= 0.15) {
        bandRevealed = true;
        workSection.classList.add('in-view');
        setTimeout(() => { projectsEnabled = true; check(); }, BAND_REVEAL_MS);
      }
    } else if (!workSection) {
      projectsEnabled = true;
    }

    if (!projectsEnabled) return;

    let pending = false;
    projectTargets.forEach(project => {
      const mediaIn = project.classList.contains('media-in');
      const textIn = project.classList.contains('text-in');
      if (mediaIn && textIn) return;

      const ratio = visibleRatio(project);
      if (!mediaIn && ratio >= MEDIA_RATIO) project.classList.add('media-in');
      if (!textIn && ratio >= TEXT_RATIO) project.classList.add('text-in');

      if (!project.classList.contains('media-in') || !project.classList.contains('text-in')) {
        pending = true;
      }
    });

    if (!pending && projectsEnabled) {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  check();
})();
