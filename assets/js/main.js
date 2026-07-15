// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Tap-to-spin for the hero cube (hover already handles desktop)
  var cubeStage = document.querySelector('.cube-stage');
  if (cubeStage) {
    cubeStage.addEventListener('click', function () {
      cubeStage.classList.toggle('spinning');
    });
    cubeStage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cubeStage.classList.toggle('spinning');
      }
    });
  }

  // Gentle draw-in for the hero chart lines (respects reduced motion)
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    var paths = document.querySelectorAll('.hero-chart .tfr-line');
    paths.forEach(function (path, i) {
      var length = path.getTotalLength ? path.getTotalLength() : 800;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect(); // force reflow
      path.style.transition = 'stroke-dashoffset 1.6s ease ' + (i * 0.15) + 's';
      requestAnimationFrame(function () {
        path.style.strokeDashoffset = '0';
      });
    });
  }
});
