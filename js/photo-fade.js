(function () {
  var INTERVAL = 2000;

  document.querySelectorAll('.photo-fade').forEach(function (fade) {
    var imgs = fade.querySelectorAll('.photo-fade-img');
    if (imgs.length < 2) return;

    var index = 0;
    setInterval(function () {
      imgs[index].classList.remove('is-active');
      index = (index + 1) % imgs.length;
      imgs[index].classList.add('is-active');
    }, INTERVAL);
  });
})();
