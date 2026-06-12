/* =====================================================================
   slides-script.js — client-side slide navigation
===================================================================== */

(function () {
  'use strict';

  const slides        = document.querySelectorAll('.slide');
  const totalEl       = document.getElementById('totalSlides');
  const currentEl     = document.getElementById('currentSlide');
  const progressFill  = document.getElementById('progressFill');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fsIcon        = document.getElementById('fsIcon');
  const dotsContainer = document.getElementById('slideDots');

  let current = 0;
  const total = slides.length;

  if (totalEl) totalEl.textContent = total;

  /* ── SVG icons ─────────────────────────────────────────────────── */
  const ICON_EXPAND =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>' +
    '</svg>';

  const ICON_COMPRESS =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>' +
    '</svg>';

  /* ── Dot navigation ─────────────────────────────────────────────── */
  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(index) {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.slide-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ── Core navigation ────────────────────────────────────────────── */
  function goTo(index, direction) {
    if (index < 0 || index >= total) return;
    if (index === current) return;

    const dir = direction !== undefined ? direction : (index > current ? 1 : -1);

    // Slide out current
    const outgoing = slides[current];
    outgoing.style.transition = 'opacity .35s ease, transform .35s ease';
    outgoing.style.opacity    = '0';
    outgoing.style.transform  = dir > 0 ? 'translateX(-40px)' : 'translateX(40px)';

    setTimeout(() => {
      outgoing.classList.remove('active');
      outgoing.style.transition = '';
      outgoing.style.opacity    = '';
      outgoing.style.transform  = '';
    }, 350);

    current = index;

    // Slide in incoming
    const incoming = slides[current];
    incoming.style.transition = 'none';
    incoming.style.opacity    = '0';
    incoming.style.transform  = dir > 0 ? 'translateX(40px)' : 'translateX(-40px)';
    incoming.classList.add('active');

    // Force reflow, then animate in
    incoming.getBoundingClientRect();
    incoming.style.transition = 'opacity .35s ease, transform .35s ease';
    incoming.style.opacity    = '1';
    incoming.style.transform  = 'translateX(0)';

    // Staggered entrance for child items
    triggerChildAnimations(incoming);

    if (currentEl)     currentEl.textContent = current + 1;
    if (progressFill)  progressFill.style.width = ((current + 1) / total * 100) + '%';
    if (prevBtn)       prevBtn.disabled = current === 0;
    if (nextBtn)       nextBtn.disabled = current === total - 1;
    updateDots(current);
  }

  /* ── Staggered child animations ─────────────────────────────────── */
  function triggerChildAnimations(slideEl) {
    const animatables = slideEl.querySelectorAll(
      '.grid-card, .list-item, .timeline-item, .stat-item, .cta-card'
    );
    animatables.forEach((el, i) => {
      el.style.animation = 'none';
      el.getBoundingClientRect(); // reflow
      el.style.animation = '';
      el.style.animationDelay = (i * 70) + 'ms';
      el.classList.remove('item-animated');
      // Trigger re-animation by toggling class
      void el.offsetWidth;
      el.classList.add('item-animated');
    });
  }

  /* ── Initialize ─────────────────────────────────────────────────── */
  // Set first slide visible without animation
  slides[0].classList.add('active');
  slides[0].style.opacity   = '1';
  slides[0].style.transform = 'translateX(0)';
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = total <= 1;
  if (progressFill) progressFill.style.width = (1 / total * 100) + '%';
  triggerChildAnimations(slides[0]);

  /* ── Button listeners ───────────────────────────────────────────── */
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1, -1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1,  1));

  /* ── Keyboard navigation ────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1,  1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1, -1);
  });

  /* ── Touch / swipe support ──────────────────────────────────────── */
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goTo(current + 1,  1); // swipe left → next
      else         goTo(current - 1, -1); // swipe right → prev
    }
  }, { passive: true });

  /* ── Fullscreen ─────────────────────────────────────────────────── */
  const container = document.getElementById('presentationContainer');

  function updateFsIcon(isFs) {
    if (!fsIcon) return;
    fsIcon.innerHTML = isFs ? ICON_COMPRESS : ICON_EXPAND;
  }

  // Initialize icon
  if (fsIcon) fsIcon.innerHTML = ICON_EXPAND;

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        (container || document.documentElement).requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  document.addEventListener('fullscreenchange', () => {
    updateFsIcon(!!document.fullscreenElement);
  });

  /* ── Keyboard shortcut hint ─────────────────────────────────────── */
  const hint = document.getElementById('keyboardHint');
  if (hint) {
    // Only show once per session
    if (!sessionStorage.getItem('cp_hint_seen')) {
      hint.classList.add('visible');
      setTimeout(() => {
        hint.classList.remove('visible');
        sessionStorage.setItem('cp_hint_seen', '1');
      }, 3500);
    }
  }

})();