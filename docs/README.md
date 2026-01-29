# LookbookMenu Website Documentation

Technical and marketing documentation for the LookbookMenu landing page.

## Quick Links

### Technical Docs
- [Architecture](./architecture.md) - Project structure, tech stack, file organization
- [CSS Design System](./css-design-system.md) - Colors, spacing, components, responsive breakpoints
- [JavaScript](./javascript.md) - Animations and interactions
- [Deployment](./deployment.md) - Cloudflare Pages and R2 setup
- [Assets & Media](./image-guidelines.md) - Image specs, naming conventions, R2 hosting

### Marketing Docs
- [Brand & Messaging](./marketing/slogans%20and%20such.md) - Core positioning, taglines, sales language
- [Marketing Gaps](./marketing/marketing%201-2.md) - Improvement suggestions

## Project Overview

LookbookMenu is a **static marketing website** that promotes a visual menu product for restaurants. The site is built with:

- Pure HTML, CSS, and JavaScript (no frameworks)
- Cloudflare Pages for hosting
- Cloudflare R2 for video/image storage
- Zero build step required

## Key Stats

| Metric | Value |
|--------|-------|
| HTML | 12KB (263 lines) |
| CSS | 20KB (1020 lines) |
| JS | 4KB (89 lines) |
| Dependencies | 0 |
| Build step | None |

## Local Development

Simply open `index.html` in a browser. No build tools required.

For Cloudflare Workers/R2 local testing, the `.wrangler/` directory contains local state.
