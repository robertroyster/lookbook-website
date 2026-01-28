/* ========================================
   LookbookMenu — Main JavaScript
   Subtle scroll animations, no dependencies
   ======================================== */

(function () {
  'use strict';

  // ---------- Load content from content.js ----------

  function loadContent() {
    if (typeof CONTENT === 'undefined') return;

    // Helper to set innerHTML
    const set = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.innerHTML = value;
    };

    // Helper to set href
    const setHref = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.href = value;
    };

    // Meta
    document.title = CONTENT.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = CONTENT.siteDescription;

    // Nav
    set('.nav-brand', CONTENT.navBrand);
    set('.nav-cta', CONTENT.navCta);
    setHref('.nav-cta', CONTENT.links.tryIt);

    // Hero
    set('.hero-title', CONTENT.heroTitle);
    set('.hero-subtitle', CONTENT.heroSubtitle);
    set('.hero-badge', CONTENT.heroBadge);
    set('.hero-micro', CONTENT.heroMicro);

    // Hero CTAs
    const heroCtas = document.querySelectorAll('.hero-ctas .btn');
    if (heroCtas[0]) { heroCtas[0].innerHTML = CONTENT.heroCta1; heroCtas[0].href = CONTENT.links.liveExample; }
    if (heroCtas[1]) { heroCtas[1].innerHTML = CONTENT.heroCta2; heroCtas[1].href = CONTENT.links.tryIt; }

    // Problem
    set('.problem-title', CONTENT.problemTitle);
    set('.problem-text', CONTENT.problemText);

    // Aha
    set('.aha-question', `"${CONTENT.ahaQuestion}"`);
    set('.aha-answer', `"${CONTENT.ahaAnswer}"`);

    // Dual Use
    set('.dual-use .section-title', CONTENT.dualUseTitle);
    const dualCards = document.querySelectorAll('.dual-use-card');
    if (dualCards[0]) {
      dualCards[0].querySelector('.dual-use-title').innerHTML = CONTENT.dualUseCard1Title;
      dualCards[0].querySelector('.dual-use-list').innerHTML = CONTENT.dualUseCard1Items.map(i => `<li>${i}</li>`).join('');
    }
    if (dualCards[1]) {
      dualCards[1].querySelector('.dual-use-title').innerHTML = CONTENT.dualUseCard2Title;
      dualCards[1].querySelector('.dual-use-list').innerHTML = CONTENT.dualUseCard2Items.map(i => `<li>${i}</li>`).join('');
    }
    set('.dual-use-summary', CONTENT.dualUseSummary);

    // How It Works
    set('.how-it-works .section-title', CONTENT.howTitle);
    const stepCards = document.querySelectorAll('.step-card');
    CONTENT.howSteps.forEach((step, i) => {
      if (stepCards[i]) {
        stepCards[i].querySelector('.step-title').innerHTML = step.title;
        stepCards[i].querySelector('.step-desc').innerHTML = step.desc;
      }
    });

    // Live Example
    set('.live-example .section-title', CONTENT.exampleTitle);
    set('.live-example .section-subtitle', CONTENT.exampleSubtitle);
    const exampleCtas = document.querySelectorAll('.example-ctas .btn');
    if (exampleCtas[0]) { exampleCtas[0].innerHTML = CONTENT.exampleCta1; exampleCtas[0].href = CONTENT.links.tryIt; }
    if (exampleCtas[1]) exampleCtas[1].innerHTML = CONTENT.exampleCta2;

    // FAQ
    set('.faq .section-title', CONTENT.faqTitle);
    const faqList = document.querySelector('.faq-list');
    if (faqList && CONTENT.faqs) {
      faqList.innerHTML = CONTENT.faqs.map(faq =>
        `<details><summary>${faq.q}</summary><p>${faq.a}</p></details>`
      ).join('');
    }

    // Book Demo
    set('.book-demo .section-title', CONTENT.bookTitle);
    set('.book-demo .section-subtitle', CONTENT.bookSubtitle);
    set('.form-note', CONTENT.bookNote);
    const bookCtas = document.querySelectorAll('.book-demo-actions .btn');
    if (bookCtas[0]) { bookCtas[0].innerHTML = CONTENT.bookCta1; bookCtas[0].href = CONTENT.links.tryIt; }
    if (bookCtas[1]) { bookCtas[1].innerHTML = CONTENT.bookCta2; bookCtas[1].href = CONTENT.links.liveExample; }

    // Final CTA
    set('.cta-title', CONTENT.finalCtaTitle);
    const finalCtas = document.querySelectorAll('.cta-buttons .btn');
    if (finalCtas[0]) { finalCtas[0].innerHTML = CONTENT.finalCta1; finalCtas[0].href = CONTENT.links.liveExample; }
    if (finalCtas[1]) { finalCtas[1].innerHTML = CONTENT.finalCta2; finalCtas[1].href = CONTENT.links.tryIt; }

    // Footer
    set('.footer-brand', CONTENT.footerBrand);
    set('.footer-tagline', CONTENT.footerTagline);
  }

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
    loadContent();
    autoAddFadeIn();
    initScrollAnimations();
    initSmoothScroll();
  });
})();
