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

  // Draggable 3D cube — drag to rotate freely, hover to auto-spin, tap to lock/unlock spin on touch
  var cubeStage = document.querySelector('.cube-stage');
  var cubeEl = cubeStage ? cubeStage.querySelector('.cube') : null;
  if (cubeStage && cubeEl) {
    var rotX = -24, rotY = 35;
    var dragging = false, lastX = 0, lastY = 0, moved = false;
    var hovering = false, spinLocked = false;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function applyRotation() {
      cubeEl.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    }

    function pointerPos(e) {
      var p = (e.touches && e.touches[0]) || e;
      return { x: p.clientX, y: p.clientY };
    }

    function startDrag(e) {
      dragging = true;
      moved = false;
      cubeStage.classList.add('dragging');
      var pos = pointerPos(e);
      lastX = pos.x; lastY = pos.y;
      if (e.type === 'touchstart') e.preventDefault();
    }

    function moveDrag(e) {
      if (!dragging) return;
      var pos = pointerPos(e);
      var dx = pos.x - lastX;
      var dy = pos.y - lastY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      rotY += dx * 0.5;
      rotX -= dy * 0.5;
      rotX = Math.max(-80, Math.min(80, rotX));
      lastX = pos.x; lastY = pos.y;
      applyRotation();
      if (e.type === 'touchmove') e.preventDefault();
    }

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      cubeStage.classList.remove('dragging');
      // A tap that didn't drag toggles a persistent auto-spin (main path for touch devices)
      if (!moved) {
        spinLocked = !spinLocked;
        cubeStage.classList.toggle('spinning', spinLocked);
      }
    }

    cubeStage.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    cubeStage.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    cubeStage.addEventListener('mouseenter', function () { hovering = true; });
    cubeStage.addEventListener('mouseleave', function () { hovering = false; });

    cubeStage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spinLocked = !spinLocked;
        cubeStage.classList.toggle('spinning', spinLocked);
      }
    });

    applyRotation();

    if (!prefersReduced) {
      (function tick() {
        if (!dragging && (hovering || spinLocked)) {
          rotY += 0.25;
          applyRotation();
        }
        requestAnimationFrame(tick);
      })();
    }
  }

  // Gentle draw-in for the hero chart lines (respects reduced motion)
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
