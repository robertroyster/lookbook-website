/* ========================================
   LookbookMenu — Main JavaScript
   Subtle scroll animations, no dependencies
   ======================================== */

(function () {
  'use strict';

  // ---------- Fade-in on scroll ----------
  // Adds .visible class to .fade-in elements when they enter viewport

  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }

  // ---------- Auto-add fade-in classes ----------
  // Automatically applies fade-in to key sections for convenience

  function autoAddFadeIn() {
    const selectors = [
      '.problem-text',
      '.section-title',
      '.aha-body',
      '.aha-tagline',
      '.step-card',
      '.dish-card',
      '.quote',
      '.use-case',
      '.cta-title',
      '.cta-subtitle',
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('fade-in');
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // skip empty anchors

        // Handle #top specially - scroll to top of page
        if (targetId === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ---------- Init ----------

  document.addEventListener('DOMContentLoaded', function () {
    autoAddFadeIn();
    initScrollAnimations();
    initSmoothScroll();
  });
})();
