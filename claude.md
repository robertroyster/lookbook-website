# Claude Code Instructions

## Before Exploring the Codebase

**Always read the documentation first** to reduce token usage:

1. Start with `docs/README.md` for an overview
2. Check relevant docs based on the task:
   - `docs/architecture.md` - Project structure, tech stack
   - `docs/css-design-system.md` - Styling, colors, components
   - `docs/javascript.md` - Animations, content system, tracking
   - `docs/deployment.md` - Cloudflare Pages & R2
   - `docs/image-guidelines.md` - Asset specs
   - `docs/lookbook transfer.md` - Google Ads tracking integration
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
| Live Demo | https://lookbook.menu/beautiful?v=3 |
| Try-It Page | /try |
| Contact Phone | 919-816-2113 |
| Contact Email | info@lookbookmenu.com |
| GitHub Repo | https://github.com/robertroyster/lookbook-website |
| R2 Hero Assets | https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/ |
| R2 Stock Photos | https://r2.lookbookmenu.com/_stock/ |
| Admin API | https://lookbook-admin-api.robert-royster.workers.dev/api/ |
| GA4 Tag | G-DMCKQMZL1X |

## Commit Style

```bash
git commit -m "$(cat <<'EOF'
Short description of change

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

- Keep messages concise (1-2 sentences)
- Focus on "why" not "what"
- Always include Co-Authored-By tag when Claude helps

## Code Patterns

**DO:**
- Keep the landing page vanilla (HTML, CSS, JS only)
- Mobile-first CSS (base styles for mobile, breakpoints add complexity)
- Use CSS custom properties for colors/spacing
- Use semantic HTML elements
- Use native elements when possible (`<details>` for FAQ, not JS)
- Keep JS minimal and dependency-free on the landing page
- Edit text in `js/content.js` (not directly in HTML)

**DON'T:**
- Add npm dependencies to the landing page
- Over-engineer simple features
- Use jQuery or animation libraries
- Add comments unless logic is non-obvious

## Architecture Notes

- **Hybrid site:** Landing page is static HTML; Try-It page is a Vue 3 SPA
- **Content system:** All landing page copy lives in `js/content.js` → injected by `loadContent()` in `main.js`
- **Tracking:** GA4 + custom attribution tracking on both pages
- **Build:** `npm run build` (Vite for Vue app, then copies static files to dist/)

## Common Tasks

### Update Landing Page Copy
Edit `js/content.js` — all text is centralized there.

### Add a New Section
1. Add HTML section in `index.html` following existing patterns
2. Add content fields in `js/content.js`
3. Add `loadContent()` logic in `js/main.js`
4. Add styles in `css/styles.css`
5. Add section link to nav if needed

### Update CTAs
- Primary CTA links to: `/try`
- Live example links to: `https://lookbook.menu/beautiful?v=3`
- Demo booking uses mailto: `mailto:info@lookbookmenu.com?subject=...`

### Add Media Assets
1. Upload to appropriate R2 bucket
2. Reference with full URL
3. Follow naming conventions in `docs/image-guidelines.md`

### Add Animations
- Add `.fade-in` class to element (JS auto-adds to common elements)
- Element will fade in when scrolled into view

## Things to Avoid

- **No new dependencies on landing page** - Keep it dependency-free
- **No over-engineering** - Simple solutions only
- **No framework patterns on landing page** - No components, no state management
- **No unused code** - Delete it, don't comment it out
- **No backwards-compat hacks** - Just change things directly

## Key Project Info

- **Landing page:** Vanilla HTML, CSS, JS (452 + 632 + 337 lines)
- **Content config:** `js/content.js` (132 lines)
- **Try-It page:** Vue 3 + Vue Router SPA (~1200 lines)
- **Hosting:** Cloudflare Pages (auto-deploys from main)
- **Media:** Cloudflare R2 (two buckets)
- **Build:** Vite (for Try-It page only)
- **Analytics:** GA4 + custom attribution tracking
