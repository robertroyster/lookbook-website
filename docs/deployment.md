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
- **Build command:** None (static files)
- **Output directory:** / (root)

### Deploy Process
1. Push changes to `main` branch
2. Cloudflare Pages detects the push
3. Files are deployed to global CDN
4. Site is live within seconds

### Local Development
No build step required. Simply:
```bash
# Open in browser
open index.html

# Or use any static server
npx serve .
python -m http.server 8000
```

## Cloudflare R2

### Bucket Details
Media assets are stored in R2 with public access:

```
Base URL: https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/
```

### Current Assets
| File | Purpose |
|------|---------|
| `hero-demo.mp4` | Autoplay video in phone mockup |
| `hero-poster.jpg` | Video poster/fallback image |

### Adding New Assets
1. Upload to R2 bucket's `/assets/` folder
2. Reference in HTML:
```html
<img src="https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/filename.jpg">
```

### Local R2 Emulation
The `.wrangler/` directory contains Miniflare state for local R2 testing. This is gitignored.

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

All commits should be descriptive. Recent commits have been co-authored with Claude Opus 4.5.
