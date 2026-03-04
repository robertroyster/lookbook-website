# Deployment

## Hosting Stack

| Service | Purpose |
|---------|---------|
| Cloudflare Pages | Static site hosting |
| Cloudflare R2 | Media storage (videos, images) |
| GitHub | Source code repository |

## Cloudflare Pages

### Setup
The site auto-deploys from the GitHub repository:
- **Repository:** https://github.com/robertroyster/lookbook-website
- **Branch:** main
- **Build command:** `npm run build`
- **Output directory:** `dist/`

### Build Process

```bash
npm run build
# 1. vite build — compiles Vue app (try.html + src/) → dist/
# 2. copy-static — copies index.html, css/, js/, assets/ → dist/
```

### Deploy Process
1. Push changes to `main` branch
2. Cloudflare Pages detects the push
3. Runs build command
4. Files are deployed to global CDN
5. Site is live within seconds

### Local Development
```bash
# Landing page — no build needed
open index.html

# Try-It page — needs Vite dev server
npm install
npm run dev

# Or use any static server for landing page only
npx serve .
python -m http.server 8000
```

## Cloudflare R2

### Bucket Details
Media assets are stored in R2 with public access:

```
Hero assets:  https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/
Stock photos: https://r2.lookbookmenu.com/_stock/
```

### Current Assets

**Hero (R2 /assets/):**
| File | Purpose |
|------|---------|
| `hero-demo.mp4` | Autoplay video in phone mockup |
| `hero-poster.jpg` | Video poster/fallback image |

**Stock photos (r2.lookbookmenu.com/_stock/):**
| File | Purpose |
|------|---------|
| `appetizers_01.jpg` | Photo strip dish image |
| `entrees_02.jpg` | Photo strip dish image |
| `appetizers_04.jpg` | Photo strip dish image |
| `burgers_01.jpg` | Photo strip dish image |

### Adding New Assets
1. Upload to R2 bucket
2. Reference in HTML:
```html
<img src="https://r2.lookbookmenu.com/_stock/filename.jpg">
```

### Local R2 Emulation
The `.wrangler/` directory contains Miniflare state for local R2 testing. This is gitignored.

## Analytics & Tracking

### GA4
- Tag ID: `G-DMCKQMZL1X`
- Loaded on both `index.html` and `try.html`
- Custom events: `view_lookbook_menu`, `phone_click`, `button_click`

### Attribution Tracking
- Custom script on both pages captures GCLID/UTM params
- Posts to admin API: `https://lookbook-admin-api.robert-royster.workers.dev/api/public/attribution`
- Stores visitor/session IDs in localStorage
- See `docs/lookbook transfer.md` for full integration details

## Domain Configuration

Domain settings are managed in Cloudflare Pages dashboard. The site can be accessed via:
- Cloudflare Pages subdomain (auto-generated)
- Custom domain (if configured)

## Performance Features

Built-in via Cloudflare:
- Global CDN distribution
- Automatic HTTPS
- HTTP/2 and HTTP/3
- Brotli compression
- Edge caching

## Git Workflow

```bash
# Make changes
git add <files>
git commit -m "Description"
git push origin main

# Cloudflare auto-deploys
```
