/* ========================================
   LookbookMenu — Main JavaScript
   Subtle scroll animations, no dependencies
   ======================================== */

(function () {
  'use strict';

  // ---------- Load content from content.js ----------

  function loadContent() {
    if (typeof CONTENT === 'undefined') return;

    var set = function (selector, value) {
      var el = document.querySelector(selector);
      if (el && value != null) el.innerHTML = value;
    };

    var setHref = function (selector, value) {
      var el = document.querySelector(selector);
      if (el && value) el.href = value;
    };

    // Meta
    document.title = CONTENT.siteTitle;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = CONTENT.siteDescription;

    // Nav
    set('.nav-brand', CONTENT.navBrand);
    set('.nav-cta', CONTENT.navCta);
    setHref('.nav-cta', CONTENT.links.tryIt);

    // Hero
    set('.hero-title', CONTENT.heroTitle);
    set('.hero-subtitle', CONTENT.heroSubtitle);
    set('.hero-proof', CONTENT.heroProof);
    var heroCtas = document.querySelectorAll('.hero-ctas .btn');
    if (heroCtas[0]) { heroCtas[0].innerHTML = CONTENT.heroCta1; heroCtas[0].href = CONTENT.links.liveExample; }
    if (heroCtas[1]) { heroCtas[1].innerHTML = CONTENT.heroCta2; heroCtas[1].href = CONTENT.links.tryIt; }

    // Why
    set('.why .section-title', CONTENT.whyTitle);
    var whyBody = document.querySelector('.why-body');
    if (whyBody && CONTENT.whyBody) {
      whyBody.innerHTML = CONTENT.whyBody.map(function (p) { return '<p>' + p + '</p>'; }).join('')
        + '<p class="why-closer">' + CONTENT.whyCloser + '</p>';
    }
    var whyBullets = document.querySelector('.why-bullets');
    if (whyBullets && CONTENT.whyBullets) {
      whyBullets.innerHTML = CONTENT.whyBullets.map(function (b) { return '<li>' + b + '</li>'; }).join('');
    }

    // Who
    set('.who .section-title', CONTENT.whoTitle);
    var whoCards = document.querySelectorAll('.who-card');
    if (whoCards[0]) {
      whoCards[0].querySelector('.who-card-title').innerHTML = CONTENT.whoCard1Title;
      whoCards[0].querySelector('p').innerHTML = CONTENT.whoCard1Text;
    }
    if (whoCards[1]) {
      whoCards[1].querySelector('.who-card-title').innerHTML = CONTENT.whoCard2Title;
      whoCards[1].querySelector('p').innerHTML = CONTENT.whoCard2Text;
    }
    set('.who-closer', CONTENT.whoCloser);

    // Live Example
    set('.live-example .section-title', CONTENT.exampleTitle);
    set('.live-example .section-subtitle', CONTENT.exampleSubtitle);
    set('.example-callout', CONTENT.exampleCallout);
    var exampleCtas = document.querySelectorAll('.example-ctas .btn');
    if (exampleCtas[0]) { exampleCtas[0].innerHTML = CONTENT.exampleCta1; exampleCtas[0].href = CONTENT.links.tryIt; }
    if (exampleCtas[1]) exampleCtas[1].innerHTML = CONTENT.exampleCta2;

    // How It Works
    set('.how-it-works .section-title', CONTENT.howTitle);
    var stepCards = document.querySelectorAll('.step-card');
    CONTENT.howSteps.forEach(function (step, i) {
      if (stepCards[i]) {
        stepCards[i].querySelector('.step-title').innerHTML = step.title;
        stepCards[i].querySelector('.step-desc').innerHTML = step.desc;
      }
    });
    set('.how-closer', CONTENT.howCloser);

    // Analytics
    set('.analytics .section-title', CONTENT.analyticsTitle);
    set('.analytics-intro', CONTENT.analyticsIntro);
    var analyticsList = document.querySelector('.analytics-list');
    if (analyticsList && CONTENT.analyticsItems) {
      analyticsList.innerHTML = CONTENT.analyticsItems.map(function (item) {
        return '<li><strong>' + item.label + '</strong> \u2014 ' + item.detail + '</li>';
      }).join('');
    }
    set('.analytics-closer', CONTENT.analyticsCloser);

    // Features
    var featuresList = document.querySelector('.features-list');
    if (featuresList && CONTENT.features) {
      featuresList.innerHTML = CONTENT.features.map(function (f) {
        return '<li><strong>' + f.title + '</strong> ' + f.desc + '</li>';
      }).join('');
    }

    // FAQ
    set('.faq .section-title', CONTENT.faqTitle);
    var faqList = document.querySelector('.faq-list');
    if (faqList && CONTENT.faqs) {
      faqList.innerHTML = CONTENT.faqs.map(function (faq) {
        return '<details><summary>' + faq.q + '</summary><p>' + faq.a + '</p></details>';
      }).join('');
    }

    // Try It
    set('.try-it .section-title', CONTENT.tryTitle);
    set('.try-it .section-subtitle', CONTENT.trySubtitle);
    var tryCta = document.querySelector('.try-it-actions .btn');
    if (tryCta) { tryCta.innerHTML = CONTENT.tryCta; tryCta.href = CONTENT.links.tryIt; }

    // Footer
    set('.footer-brand', CONTENT.footerBrand);
    set('.footer-tagline', CONTENT.footerTagline);
    set('.footer-note', CONTENT.footerNote);
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
      '.section-title',
      '.why-body',
      '.why-bullets',
      '.who-card',
      '.step-card',
      '.analytics-list',
      '.features-list li',
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('fade-in');
      });
    });
  }

  // ---------- Pass URL params to /try links ----------
  // Forwards affiliate and tracking params to the try page

  function forwardUrlParams() {
    const params = window.location.search;
    if (!params) return;

    document.querySelectorAll('a[href^="/try"]').forEach((link) => {
      const url = new URL(link.href, window.location.origin);
      const currentParams = new URLSearchParams(params);
      currentParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      link.href = url.pathname + url.search;
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

  // ---------- Scroll-spy for active nav highlighting ----------

  function initScrollSpy() {
    var navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!navLinks.length) return;

    var linkById = new Map(
      navLinks
        .map(function (a) {
          var id = decodeURIComponent(a.getAttribute('href') || '').slice(1);
          return [id, a];
        })
        .filter(function (pair) { return !!pair[0]; })
    );

    var sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(function (sec) { return linkById.has(sec.id); });

    if (!sections.length) return;

    function setActive(id) {
      navLinks.forEach(function (a) { a.classList.remove('active'); });
      var activeLink = linkById.get(id);
      if (activeLink) activeLink.classList.add('active');
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .map(function (e) { return { id: e.target.id, top: e.boundingClientRect.top }; })
          .sort(function (a, b) { return a.top - b.top; });

        if (visible.length) {
          setActive(visible[0].id);
        } else {
          var y = window.scrollY;
          var current = sections[0].id;
          for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= y + 120) current = sections[i].id;
          }
          setActive(current);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: '-20% 0px -65% 0px'
      }
    );

    sections.forEach(function (sec) { observer.observe(sec); });

    setActive(sections[0].id);
  }

  // ---------- GA4 custom event tracking ----------

  function initGA4Tracking() {
    if (typeof gtag !== 'function') return;

    // Track "See a live example" clicks as view_lookbook_menu
    document.querySelectorAll('a[href*="lookbook.menu"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtag('event', 'view_lookbook_menu', {
          'event_category': 'engagement',
          'event_label': 'Lookbook Menu Viewed',
          'value': 1
        });
      });
    });

    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtag('event', 'phone_click', {
          'event_category': 'conversion',
          'event_label': 'Phone Number Clicked',
          'phone_number': '919-816-2113',
          'value': 1
        });
      });
    });

    // Track "Try It" CTA clicks
    document.querySelectorAll('a[href^="/try"]').forEach(function (link) {
      link.addEventListener('click', function () {
        gtag('event', 'button_click', {
          'event_category': 'engagement',
          'event_label': 'Try It Now',
          'button_text': link.textContent.trim(),
          'value': 1
        });
      });
    });
  }

  // ---------- Init ----------

  document.addEventListener('DOMContentLoaded', function () {
    loadContent();
    forwardUrlParams();
    autoAddFadeIn();
    initScrollAnimations();
    initSmoothScroll();
    initScrollSpy();
    initGA4Tracking();
  });
})();
