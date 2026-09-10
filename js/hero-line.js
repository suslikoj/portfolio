(function () {
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.hero-photo');
  if (!hero || !photo) return;

  function positionLine() {
    const heroRect = hero.getBoundingClientRect();
    const photoRect = photo.getBoundingClientRect();
    const y = photoRect.bottom - heroRect.top;
    hero.style.setProperty('--hero-line-y', `${y}px`);
  }

  window.addEventListener('load', positionLine);
  window.addEventListener('resize', positionLine);
  positionLine();
})();
