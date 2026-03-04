# JavaScript

## Landing Page: js/main.js (337 lines)

Zero external dependencies. Wrapped in an IIFE, runs on `DOMContentLoaded`.

### Initialization Order

```javascript
document.addEventListener('DOMContentLoaded', function () {
  loadContent();
  forwardUrlParams();
  autoAddFadeIn();
  initScrollAnimations();
  initSmoothScroll();
  initScrollSpy();
  initGA4Tracking();
});
```

## Features

### 1. Content Loading (`loadContent`)

Reads the global `CONTENT` object from `js/content.js` and injects text into the DOM. This keeps all copy in one editable file.

Covers: meta tags, nav, hero, why, who, how-it-works, live example, analytics, features, FAQ, try-it, and footer sections.

Uses helper functions `set(selector, value)` and `setHref(selector, value)` for null-safe DOM updates.

### 2. URL Parameter Forwarding (`forwardUrlParams`)

Forwards query parameters (e.g., `?ref=SLR`, `?gclid=xxx`) from the landing page to all `/try` links, preserving attribution and tracking across page navigation.

### 3. Auto-add Fade-in Classes (`autoAddFadeIn`)

Automatically applies `.fade-in` to key elements:

```javascript
const selectors = [
  '.section-title',
  '.why-body',
  '.why-bullets',
  '.who-card',
  '.step-card',
  '.analytics-list',
  '.features-list li',
];
```

### 4. Scroll-triggered Fade-in (`initScrollAnimations`)

Uses IntersectionObserver to add `.visible` class when elements enter viewport:

```javascript
const observer = new IntersectionObserver(callback, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
});
```

Elements unobserved after animation (animate once only).

### 5. Smooth Scroll (`initSmoothScroll`)

Intercepts anchor link clicks. Special handling for `#top` (scrolls to page top). Uses native `scrollIntoView({ behavior: 'smooth' })`.

### 6. Scroll-spy (`initScrollSpy`)

Highlights the active nav link based on which section is in view. Uses IntersectionObserver with multiple thresholds (`[0.1, 0.25, 0.5]`) and offset margins. Falls back to `offsetTop` comparison when no section is intersecting.

Active link gets `.active` class with an orange underline indicator.

### 7. GA4 Custom Event Tracking (`initGA4Tracking`)

Tracks three event types (requires `gtag` to be defined):

| Event | Trigger | Category |
|-------|---------|----------|
| `view_lookbook_menu` | Click any `lookbook.menu` link | engagement |
| `phone_click` | Click any `tel:` link | conversion |
| `button_click` | Click any `/try` link | engagement |

## Content System: js/content.js (132 lines)

Global `CONTENT` object with all landing page text. Edit here to update copy without touching HTML.

Key sections: `siteTitle`, `heroTitle`, `heroSubtitle`, `whyTitle`, `whyBody[]`, `whyBullets[]`, `whoTitle`, `howSteps[]`, `analyticsItems[]`, `features[]`, `faqs[]`, `tryTitle`, `footerBrand`, contact info, and link URLs.

## CSS Integration

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

## Try-It Page: src/views/TryIt.vue

Separate Vue 3 component with its own logic:
- Multi-step form with validation
- File upload (drag & drop, 5MB limit)
- API integration with admin backend
- Attribution tracking via `window.LookBookTracking`
- QR code display and clipboard copy on success

## No External JS Dependencies

- No jQuery
- No animation libraries
- Landing page uses native browser APIs only
- Try-It page uses Vue 3 + Vue Router (installed via npm)
