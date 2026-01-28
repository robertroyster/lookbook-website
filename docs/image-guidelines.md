# Image Guidelines

This document explains how to add, update, and name images for the LookbookMenu website.

---

## Folder Structure

All images live in `/assets/` with the following subfolders:

```
assets/
├── dishes/          # Food photography for the preview section
├── mockups/         # Phone mockups, device frames
├── icons/           # UI icons, logos
└── og/              # Open Graph / social sharing images
```

---

## Naming Conventions

### Dish Images

Use lowercase, hyphen-separated names that describe the dish:

```
dish-truffle-pasta.jpg
dish-wagyu-tartare.jpg
dish-citrus-salad.jpg
dish-lava-cake.jpg
```

**Pattern:** `dish-[descriptive-name].[ext]`

### Mockups & UI

```
phone-mockup.png
hero-background.jpg
logo-dark.svg
logo-light.svg
```

### Social/OG Images

```
og-default.jpg
og-twitter.jpg
```

---

## Recommended Specifications

### Dish Photos

| Property | Recommendation |
|----------|----------------|
| Format | JPG (photos) or WebP |
| Dimensions | 800 x 800px (square) or 800 x 600px (4:3) |
| File size | Under 150KB (optimize for web) |
| Style | Clean background, good lighting, appetizing |

### Hero/Background Images

| Property | Recommendation |
|----------|----------------|
| Format | JPG or WebP |
| Dimensions | 1920 x 1080px minimum |
| File size | Under 300KB |

### Icons/Logos

| Property | Recommendation |
|----------|----------------|
| Format | SVG (preferred) or PNG |
| Dimensions | Variable (SVG scales) |

---

## How to Update Images in HTML

### 1. Dish Preview Cards

In `index.html`, find the `.dish-card` elements (around line 113-128):

```html
<div class="dish-card">
  <div class="dish-image" style="background-image: url('assets/dishes/dish-truffle-pasta.jpg')"></div>
  <span class="dish-name">Truffle Pasta</span>
</div>
```

**To update:**
1. Add your image to `/assets/dishes/`
2. Update the `style="background-image: url('...')"` path
3. Update the `.dish-name` text to match

### 2. Phone Mockup (Hero)

The phone mockup in the hero section can display actual dish cards. Update the `.phone-card` elements or replace with actual images.

### 3. Adding New Images via CSS

For background images used in CSS, update `/css/styles.css`:

```css
.hero {
  background-image: url('../assets/hero-background.jpg');
}
```

---

## Optimization Tips

1. **Compress images** before adding — use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
2. **Use WebP** where possible for smaller file sizes
3. **Provide fallbacks** for older browsers if using WebP
4. **Lazy load** images below the fold (add `loading="lazy"` attribute)

---

## Current Placeholder Images

The website currently uses CSS-generated placeholders for:

- Phone mockup dish cards (`.phone-card`)
- Dish preview strip (`.dish-image`)

These need to be replaced with actual food photography before launch.
