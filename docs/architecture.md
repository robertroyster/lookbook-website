# Architecture

## Project Structure

```
lookbook-_website/
├── index.html              # Landing page (456 lines)
├── try.html                # Try-It page — standalone dark theme (769 lines)
├── faq.html                # FAQ page (201 lines)
├── pricing.html            # Pricing page (145 lines)
├── how-it-works.html       # How It Works page (198 lines)
├── analytics.html          # Analytics page (186 lines)
├── google-pipeline.html    # Google Menu Connector page (188 lines)
├── examples.html           # Examples page (125 lines)
├── css/
│   └── styles.css          # Site-wide styles (1670 lines)
├── js/
│   ├── main.js             # Landing page JS (419 lines)
│   └── content.js          # Centralized content config (138 lines)
├── src/                    # Vue application (legacy, used by Vite build)
│   ├── main.js             # Vue app bootstrap
│   ├── App.vue             # Root component
│   ├── router/
│   │   └── index.js        # Route definitions
│   └── views/
│       └── TryIt.vue       # Legacy Try-It Vue component
├── public/
│   └── asssets/             # Public assets (hero-demo.mp4)
├── assets/                 # Local assets (.gitkeep only)
├── docs/                   # Documentation
├── .claude/                # Claude Code skills & config
│   └── skills/rmd/         # /rmd skill for reading docs
├── claude.md               # Claude Code instructions
├── package.json            # Build scripts, Vue/Vite deps
├── vite.config.js          # Vite config (builds try.html only)
├── wrangler.toml           # Cloudflare config
└── .wrangler/              # Cloudflare local state (gitignored)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Landing Page | HTML5, CSS3, Vanilla JS |
| Try-It Page | Vue 3 + Vue Router 4 |
| Build Tool | Vite 5 (Try-It page only) |
| Hosting | Cloudflare Pages |
| Media Storage | Cloudflare R2 |
| Analytics | GA4 (G-DMCKQMZL1X) |
| Attribution | Custom tracking → admin API |
| Version Control | Git/GitHub |

## Design Principles

1. **Minimal dependencies** - Landing page is pure HTML/CSS/JS; only the Try-It flow uses Vue
2. **Progressive enhancement** - Core content works without JS
3. **Mobile-first** - Base styles for mobile, breakpoints add complexity
4. **Performance** - Small bundle, CDN delivery, optimized media
5. **Content-driven** - Text lives in `content.js`, not hardcoded in HTML

## Hybrid Architecture

The site uses two distinct approaches:

### Landing Page (Static)
- `index.html` + `css/styles.css` + `js/main.js` + `js/content.js`
- No build step required
- Content injected at runtime from `content.js` via `loadContent()`
- Deployed as static files

### Try-It Page (Standalone HTML)
- `try.html` is a standalone dark-theme page with split layout
- Contains form and GMC (Google Menu Connector) story
- No longer relies on Vue SPA for primary functionality

### Additional Static Pages
- `faq.html` — Grouped FAQ sections
- `pricing.html` — Pricing information
- `how-it-works.html` — How It Works breakdown
- `analytics.html` — Analytics features
- `google-pipeline.html` — Google Menu Connector landing page with nav and Calendly CTA
- `examples.html` — Example lookbooks

### Build Script
```bash
npm run build
# 1. Vite builds Vue app (try.html) → dist/
# 2. copy-static copies all static HTML, css/, js/, public/, assets/ into dist/
```

Copied files: `index.html`, `how-it-works.html`, `google-pipeline.html`, `analytics.html`, `examples.html`, `pricing.html`, `faq.html`, plus `css/`, `js/`, `public/`, `assets/` directories.

## Key Files

### index.html (Landing Page)
Sections:
1. Sticky navigation with hamburger menu (`#nav-toggle`)
2. Hero — split layout with phone mockup video (`#top`)
3. Stats bar — key metrics
4. Revenue Engine / Who section (`#why`)
5. Comparison section — problem framing (`#problem`)
6. Proof section — social proof (`#proof`)
7. How It Works — step cards (`#how`)
8. Google Menu Connector (`#gmc`)
9. Testimonials (`#testimonials`)
10. FAQ — native `<details>` elements (`#faq`)
11. Final CTA (`#try-it`)
12. More Teaser (`#more-teaser`)
13. Footer

### js/content.js
Centralized content configuration. All text on the landing page can be edited here without touching HTML. The `CONTENT` object covers: meta, nav, hero, why, who, how-it-works, live example, analytics, features, FAQ, try-it, footer, contact info, and links.

### js/main.js (419 lines)
Features (see `docs/javascript.md` for details):
1. Content loading from `content.js`
2. Scroll-triggered fade-in animations
3. Auto-add fade-in classes
4. URL parameter forwarding to /try links
5. Smooth scrolling for anchor links
6. Scroll-spy for active nav highlighting
7. GA4 custom event tracking

### try.html (769 lines)
Standalone dark-theme page with:
- Split layout: form on left, GMC story on right
- Multi-step form for restaurant onboarding
- Calendly booking integration
- Attribution tracking

## External Services

### Cloudflare R2
Media assets at two base URLs:
```
https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/   (hero video/poster)
https://r2.lookbookmenu.com/_stock/                            (stock dish photos)
```

### Admin API
```
https://lookbook-admin-api.robert-royster.workers.dev/api/
```
Used for: Try-It form submission, attribution tracking

### Live Demo
Product demo embedded from:
```
https://lookbook.menu/beautiful?v=3
```

## Git Repository

- **Remote:** https://github.com/robertroyster/lookbook-website
- **Main branch:** main
- **Auto-deploy:** Cloudflare Pages watches main branch
