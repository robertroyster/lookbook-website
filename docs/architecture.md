# Architecture

## Project Structure

```
lookbook-_website/
├── index.html              # Main landing page (263 lines)
├── css/
│   └── styles.css          # All styling (1020 lines)
├── js/
│   └── main.js             # JavaScript (89 lines)
├── assets/                 # Local assets (currently empty)
├── docs/                   # Documentation
│   ├── README.md
│   ├── architecture.md
│   ├── css-design-system.md
│   ├── javascript.md
│   ├── deployment.md
│   ├── image-guidelines.md
│   └── marketing/
├── .wrangler/              # Cloudflare local state (gitignored)
└── node_modules/           # Dependencies (gitignored)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | Vanilla CSS3 |
| Scripts | Vanilla JavaScript |
| Hosting | Cloudflare Pages |
| Media Storage | Cloudflare R2 |
| Version Control | Git/GitHub |

## Design Principles

1. **Zero dependencies** - No frameworks, no build tools, no npm packages at runtime
2. **Progressive enhancement** - Core content works without JS
3. **Mobile-first** - Base styles for mobile, breakpoints add complexity
4. **Performance** - Small bundle, CDN delivery, optimized media

## Key Files

### index.html
The single-page landing site with these sections:
1. Sticky navigation
2. Hero with phone mockup video
3. Social proof strip
4. "The PDF Problem" section
5. "The Aha" comparison
6. Dual use cases (QR vs Online)
7. How it works (3 steps)
8. Live example embed
9. FAQ (native `<details>` elements)
10. Book demo CTA
11. Final CTA
12. Footer

### css/styles.css
Complete design system including:
- CSS custom properties (colors, spacing, typography)
- Component styles (buttons, cards, sections)
- Responsive breakpoints
- Animations

### js/main.js
Minimal enhancements:
- Scroll-triggered fade-in animations
- Smooth scroll for anchor links
- IntersectionObserver for performance

## External Services

### Cloudflare R2
Media assets hosted at:
```
https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/
```

Current files:
- `hero-demo.mp4` - Hero section video
- `hero-poster.jpg` - Video poster fallback

### Live Demo
Product demo embedded from:
```
https://lookbook.menu/browse/beautiful
```

## Git Repository

- **Remote:** https://github.com/robertroyster/lookbook-website
- **Main branch:** main
- **Auto-deploy:** Cloudflare Pages watches main branch
