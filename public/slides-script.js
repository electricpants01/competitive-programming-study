/* =====================================================================
   slides-script.js — client-side slide navigation
   Reads translations from window.__CP_SLIDES__ injected by Astro.
===================================================================== */

(function () {
  'use strict';

  const slides = document.querySelectorAll('.slide');
  const totalEl = document.getElementById('totalSlides');
  const currentEl = document.getElementById('currentSlide');
  const progressFill = document.getElementById('progressFill');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fsIcon = document.getElementById('fsIcon');

  let current = 0;
  const total = slides.length;

  if (totalEl) totalEl.textContent = total;

  function goTo(index) {
    if (index < 0 || index >= total) return;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (currentEl) currentEl.textContent = current + 1;
    if (progressFill) progressFill.style.width = ((current + 1) / total * 100) + '%';
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
  }

  // Initialize
  goTo(0);

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
  });

  // Fullscreen
  const container = document.getElementById('presentationContainer');

  function updateFsIcon(isFs) {
    if (!fsIcon) return;
    fsIcon.innerHTML = isFs
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m10 0h3a2 2 0 0 0 2-2v-3"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m10 0h3a2 2 0 0 0 2-2v-3"/></svg>';
  }

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
})();