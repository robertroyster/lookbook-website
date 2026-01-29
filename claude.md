# Claude Code Instructions

## Before Exploring the Codebase

**Always read the documentation first** to reduce token usage:

1. Start with `docs/README.md` for an overview
2. Check relevant docs based on the task:
   - `docs/architecture.md` - Project structure, tech stack
   - `docs/css-design-system.md` - Styling, colors, components
   - `docs/javascript.md` - Animations, interactions
   - `docs/deployment.md` - Cloudflare Pages & R2
   - `docs/image-guidelines.md` - Asset specs
   - `docs/marketing/` - Brand messaging, taglines

## Updating Documentation

When you learn something new about the codebase:
- Update the relevant markdown file in `docs/`
- Create a new file if it's a new subject
- Keep docs concise and up-to-date

## Product Context

**LookbookMenu** turns restaurant menus into visual lookbooks. Key concepts:

- **The Problem:** PDFs and text menus don't sell food visually
- **The Solution:** A swipeable, visual menu that works like a fashion lookbook
- **Two Use Cases:**
  1. **QR Code** - In-restaurant discovery, upsells existing diners
  2. **Online Link** - Drives new visits by "selling the visit" before guests arrive
- **Key Differentiator:** No app download, no tutorial, no learning curve
- **Target Customer:** Restaurant owners who have beautiful food but ugly menus

## Key URLs

| Purpose | URL |
|---------|-----|
| Live Demo | https://lookbook.menu/browse/beautiful |
| Contact Email | info@lookbookmenu.com |
| GitHub Repo | https://github.com/robertroyster/lookbook-website |
| R2 Media Bucket | https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/ |

## Commit Style

```bash
git commit -m "$(cat <<'EOF'
Short description of change

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

- Keep messages concise (1-2 sentences)
- Focus on "why" not "what"
- Always include Co-Authored-By tag when Claude helps

## Code Patterns

**DO:**
- Keep it vanilla (HTML, CSS, JS only)
- Mobile-first CSS (base styles for mobile, breakpoints add complexity)
- Use CSS custom properties for colors/spacing
- Use semantic HTML elements
- Use native elements when possible (`<details>` for FAQ, not JS)
- Keep JS minimal and dependency-free

**DON'T:**
- Add npm dependencies or frameworks
- Over-engineer simple features
- Add build steps or transpilation
- Use jQuery or animation libraries
- Add comments unless logic is non-obvious

## Common Tasks

### Add a New Section
1. Add HTML section in `index.html` following existing patterns
2. Use existing CSS classes (`.section-title`, `.container`, etc.)
3. Add section link to nav if needed

### Update CTAs
- Primary CTA links to: `https://lookbook.menu/browse/beautiful`
- Demo booking uses mailto: `mailto:info@lookbookmenu.com?subject=...`

### Add Media Assets
1. Upload to R2 bucket `/assets/` folder
2. Reference with full URL: `https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/filename.jpg`
3. Follow naming conventions in `docs/image-guidelines.md`

### Add Animations
- Add `.fade-in` class to element (JS auto-adds to common elements)
- Element will fade in when scrolled into view

## Things to Avoid

- **No new dependencies** - Keep the site dependency-free
- **No build tools** - No webpack, vite, etc.
- **No over-engineering** - Simple solutions only
- **No framework patterns** - No components, no state management
- **No unused code** - Delete it, don't comment it out
- **No backwards-compat hacks** - Just change things directly

## Key Project Info

- **Stack:** Vanilla HTML, CSS, JS (no frameworks)
- **Hosting:** Cloudflare Pages (auto-deploys from main)
- **Media:** Cloudflare R2
- **Build:** None required (static files)
- **CSS:** 1020 lines, custom design system
- **JS:** 89 lines, IntersectionObserver animations
