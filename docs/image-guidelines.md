# Image Guidelines

This document explains how to add, update, and name images for the LookbookMenu website.

---

## Current Assets in Use

### Hero Section (R2-hosted)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `hero-demo.mp4` | Video | 390 x 844px | 5MB | Phone screen demo, vertical aspect, looping |
| `hero-poster.jpg` | Image | 390 x 844px | 100KB | First-frame fallback for video |

**R2 URL:** `https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/[filename]`

### Photo Strip (R2-hosted stock photos)

| File Name | Type | Notes |
|-----------|------|-------|
| `appetizers_01.jpg` | JPG | Used in hero photo strip |
| `entrees_02.jpg` | JPG | Used in hero photo strip |
| `appetizers_04.jpg` | JPG | Used in hero photo strip |
| `burgers_01.jpg` | JPG | Used in hero photo strip |

**R2 URL:** `https://r2.lookbookmenu.com/_stock/[filename]`

Photo strip images display at 120x84px with rounded corners. They are duplicated in the HTML for seamless infinite scroll.

### Branding & UI (needed)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `logo-dark.svg` | SVG | Variable | 10KB | Dark version for light backgrounds |
| `logo-light.svg` | SVG | Variable | 10KB | Light version for dark backgrounds |
| `favicon.ico` | ICO | 32 x 32px | 5KB | Browser tab icon |
| `apple-touch-icon.png` | PNG | 180 x 180px | 20KB | iOS home screen icon |

### Open Graph / Social (needed)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `og-default.jpg` | JPG | 1200 x 630px | 200KB | Facebook/LinkedIn sharing |
| `og-twitter.jpg` | JPG | 1200 x 600px | 200KB | Twitter card image |

---

## Folder Structure

Local images live in `/assets/` (currently only `.gitkeep`). Most images are hosted on R2.

```
assets/
├── dishes/          # Food photography
├── mockups/         # Phone mockups, device frames
├── icons/           # UI icons, logos
└── og/              # Open Graph / social sharing images
```

---

## Naming Conventions

### Stock/Dish Images
```
appetizers_01.jpg
entrees_02.jpg
burgers_01.jpg
```

**Pattern:** `[category]_[number].[ext]`

### Branding
```
logo-dark.svg
logo-light.svg
```

### Social/OG Images
```
og-default.jpg
og-twitter.jpg
```

---

## How to Update Assets

### Hero Video (R2)

The hero phone mockup displays a looping video hosted on Cloudflare R2. To update:

1. Export video at 390 x 844px (iPhone 14 Pro screen size)
2. Compress to under 5MB using HandBrake or similar
3. Export first frame as `hero-poster.jpg` for fallback
4. Upload both files to R2 bucket under `/assets/`

### Photo Strip Images

The hero photo strip uses 4 images from R2, duplicated for seamless looping. To swap:

1. Upload new images to R2 at `https://r2.lookbookmenu.com/_stock/`
2. Update the `<img>` src attributes in `index.html` (lines ~188-196)
3. Update both the original and duplicate set

### Adding Images via CSS

For background images in CSS:

```css
.some-element {
  background-image: url('../assets/dishes/dish-name.jpg');
  background-size: cover;
}
```

---

## Optimization Tips

1. **Compress images** before adding — use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
2. **Use WebP** where possible for smaller file sizes
3. **Provide fallbacks** for older browsers if using WebP
4. **Lazy load** images below the fold (add `loading="lazy"` attribute)

---

## Current Status

**In use:**
- Hero video (`hero-demo.mp4`) — hosted on R2
- Hero poster fallback (`hero-poster.jpg`) — hosted on R2
- 4 stock dish photos for photo strip — hosted on R2

**Still needed:**
- `og-default.jpg` — Open Graph image for social sharing
- `og-twitter.jpg` — Twitter card image
- `favicon.ico` — Browser tab icon
- `apple-touch-icon.png` — iOS home screen icon
- `logo-dark.svg` / `logo-light.svg` — Brand logos (if needed)
