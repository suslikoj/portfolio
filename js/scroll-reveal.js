(function () {
  const bandTargets = document.querySelectorAll('.work');
  const projectTargets = document.querySelectorAll('.project');

  // Keep in sync with the band/title clip-path transition timing in style.css
  // (band: 1.6s, title: 1.6s + 0.5s delay -> finishes at 2.1s).
  const BAND_REVEAL_MS = 2200;

  if (!('IntersectionObserver' in window)) {
    bandTargets.forEach(el => el.classList.add('in-view'));
    projectTargets.forEach(el => el.classList.add('media-in', 'text-in'));
    return;
  }

  const MEDIA_RATIO = 0.25;
  const TEXT_RATIO = 0.5;

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
        entry.target.classList.add('in-view');
        bandObserver.unobserve(entry.target);
        setTimeout(startProjectObserver, BAND_REVEAL_MS);
      }
    });
  }, { threshold: 0.3 });

  bandTargets.forEach(el => bandObserver.observe(el));
})();
