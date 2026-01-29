# JavaScript

All scripts in `js/main.js` (89 lines). Zero dependencies.

## Overview

The JavaScript is wrapped in an IIFE and runs on `DOMContentLoaded`. It provides three enhancements:

1. Fade-in animations on scroll
2. Auto-application of fade-in classes
3. Smooth scrolling for anchor links

## Features

### 1. Fade-in on Scroll

Uses IntersectionObserver for performance:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.15 }); // Trigger at 15% visibility
```

Elements with `.fade-in` class start invisible and slide up when scrolled into view.

### 2. Auto-add Fade-in Classes

Automatically applies `.fade-in` to key elements:

```javascript
const selectors = [
  '.problem-text',
  '.section-title',
  '.step-card',
  '.dish-card',
  '.quote',
  '.use-case',
  '.cta-title',
  '.cta-subtitle'
];
```

This avoids manually adding classes in HTML.

### 3. Smooth Scroll

Intercepts anchor link clicks:

```javascript
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
```

Special handling for `#top` scrolls to page top.

## CSS Integration

The JS works with these CSS classes:

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## No Dependencies

- No jQuery
- No animation libraries
- No framework hydration
- Uses native browser APIs only

## Performance

- IntersectionObserver is more efficient than scroll listeners
- Elements unobserved after animation (no ongoing checks)
- Minimal DOM queries (cached on load)
- Total size: ~4KB unminified
