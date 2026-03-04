# Architecture

## Project Structure

```
lookbook-_website/
├── index.html              # Landing page (452 lines)
├── try.html                # Try-It page shell — mounts Vue app (136 lines)
├── css/
│   └── styles.css          # Landing page styles (632 lines)
├── js/
│   ├── main.js             # Landing page JS (337 lines)
│   └── content.js          # Centralized content config (132 lines)
├── src/                    # Vue application (Try-It flow)
│   ├── main.js             # Vue app bootstrap
│   ├── App.vue             # Root component (router-view)
│   ├── router/
│   │   └── index.js        # Route: /try → TryIt.vue
│   └── views/
│       └── TryIt.vue       # Multi-step form (~1200 lines w/ styles)
├── assets/                 # Local assets (currently .gitkeep only)
├── docs/                   # Documentation
├── package.json            # Vue, Vue Router, Vite
├── vite.config.js          # Vite config
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

### Try-It Page (Vue SPA)
- `try.html` loads Vue app from `src/main.js`
- Vue Router handles `/try` route
- Multi-step form with file upload, validation, API integration
- Requires `npm run build` (Vite) for production

### Build Script
```bash
npm run build
# 1. Vite builds Vue app → dist/
# 2. copy-static copies index.html, css/, js/, assets/ into dist/
```

## Key Files

### index.html (Landing Page)
Sections:
1. Sticky navigation (with contact info)
2. Hero (title, subtitle, CTAs, photo strip, phone mockup video)
3. Why section ("The table decides")
4. Who It's For (Busy operators, Design-forward teams)
5. How It Works (3 steps: AI Try-It, Photo Manager, Easy edits)
6. Live Example (embedded iframe)
7. Analytics ("Know what guests crave")
8. Features Strip (6 features with checkmarks)
9. FAQ (6 questions, native `<details>` elements)
10. Try It CTA
11. Footer

### js/content.js
Centralized content configuration. All text on the landing page can be edited here without touching HTML. The `CONTENT` object covers: meta, nav, hero, why, who, how-it-works, live example, analytics, features, FAQ, try-it, footer, contact info, and links.

### js/main.js
7 features (see `docs/javascript.md` for details):
1. Content loading from `content.js`
2. Scroll-triggered fade-in animations
3. Auto-add fade-in classes
4. URL parameter forwarding to /try links
5. Smooth scrolling for anchor links
6. Scroll-spy for active nav highlighting
7. GA4 custom event tracking

### try.html + src/views/TryIt.vue
Multi-step Try-It form:
- Step 1: Restaurant info (name, address, city, state, zip)
- Step 2: Contact info (email, mobile)
- Step 3: Menu input (PDF upload, PDF URL, or website URL)
- Processing state with progress bar
- Success state with QR code, shareable link, category summary
- Attribution tracking integration

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
