# LookbookMenu Website Documentation

Technical and marketing documentation for the LookbookMenu landing page and Try-It flow.

## Quick Links

### Technical Docs
- [Architecture](./architecture.md) - Project structure, tech stack, file organization
- [CSS Design System](./css-design-system.md) - Colors, spacing, components, responsive breakpoints
- [JavaScript](./javascript.md) - Animations, content system, tracking
- [Deployment](./deployment.md) - Cloudflare Pages and R2 setup
- [Assets & Media](./image-guidelines.md) - Image specs, naming conventions, R2 hosting
- [Google Ads Tracking](./lookbook%20transfer.md) - Attribution & conversion tracking integration
- [API / LBM System](./api-lbm-system.md) - Restaurant Week frontend integration & API

### Marketing Docs
- [Brand & Messaging](./marketing/slogans%20and%20such.md) - Core positioning, taglines, sales language
- [Marketing Gaps](./marketing/marketing%201-2.md) - Improvement suggestions

## Project Overview

LookbookMenu is a **marketing website + Try-It flow** that promotes a visual menu product for restaurants. The architecture is hybrid:

- **Landing page** (`index.html`): Pure HTML, CSS, and JavaScript — no build step
- **Try-It page** (`try.html`): Standalone HTML page (dark theme, split layout with form)
- **Additional pages**: `faq.html`, `pricing.html`, `how-it-works.html`, `analytics.html`, `google-pipeline.html`, `examples.html`
- **Hosting:** Cloudflare Pages
- **Media:** Cloudflare R2 for video/image storage

## Key Stats

| Metric | Value |
|--------|-------|
| index.html | 456 lines |
| css/styles.css | 1670 lines |
| js/main.js | 419 lines |
| js/content.js | 138 lines |
| try.html | 769 lines (standalone, no longer Vue SPA) |
| Additional pages | faq, pricing, how-it-works, analytics, google-pipeline, examples |
| Runtime deps | Vue 3, Vue Router 4 (legacy, used minimally) |
| Dev deps | Vite 5, @vitejs/plugin-vue |

## Local Development

```bash
# Landing page — just open in browser
open index.html

# Try-It page — requires Vite dev server
npm install
npm run dev

# Production build
npm run build
```
