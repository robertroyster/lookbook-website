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

### Marketing Docs
- [Brand & Messaging](./marketing/slogans%20and%20such.md) - Core positioning, taglines, sales language
- [Marketing Gaps](./marketing/marketing%201-2.md) - Improvement suggestions

## Project Overview

LookbookMenu is a **marketing website + Try-It flow** that promotes a visual menu product for restaurants. The architecture is hybrid:

- **Landing page** (`index.html`): Pure HTML, CSS, and JavaScript — no build step
- **Try-It page** (`try.html` + `src/`): Vue 3 SPA with Vite build
- **Hosting:** Cloudflare Pages
- **Media:** Cloudflare R2 for video/image storage

## Key Stats

| Metric | Value |
|--------|-------|
| index.html | ~16KB (452 lines) |
| css/styles.css | ~7KB (632 lines) |
| js/main.js | ~4KB (337 lines) |
| js/content.js | ~4KB (132 lines) |
| Try-It Vue SPA | ~1200 lines (component + styles) |
| Runtime deps | Vue 3, Vue Router 4 |
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
