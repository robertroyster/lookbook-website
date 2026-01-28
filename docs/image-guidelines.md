# Image Guidelines

This document explains how to add, update, and name images for the LookbookMenu website.

---

## Expected Assets & Specifications

The following table lists all required assets with their exact names and specs.

### Hero Section (R2-hosted)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `hero-demo.mp4` | Video | 390 x 844px | 5MB | Phone screen demo, vertical aspect, looping |
| `hero-poster.jpg` | Image | 390 x 844px | 100KB | First-frame fallback for video |

**R2 URL pattern:** `https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/[filename]`

### Dish Images (local)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `dish-truffle-pasta.jpg` | JPG | 800 x 800px | 150KB | Square crop, clean background |
| `dish-wagyu-tartare.jpg` | JPG | 800 x 800px | 150KB | Square crop, clean background |
| `dish-citrus-salad.jpg` | JPG | 800 x 800px | 150KB | Square crop, clean background |
| `dish-lava-cake.jpg` | JPG | 800 x 800px | 150KB | Square crop, clean background |

### Branding & UI (local)

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `logo-dark.svg` | SVG | Variable | 10KB | Dark version for light backgrounds |
| `logo-light.svg` | SVG | Variable | 10KB | Light version for dark backgrounds |
| `favicon.ico` | ICO | 32 x 32px | 5KB | Browser tab icon |
| `apple-touch-icon.png` | PNG | 180 x 180px | 20KB | iOS home screen icon |

### Open Graph / Social

| File Name | Type | Dimensions | Max Size | Notes |
|-----------|------|------------|----------|-------|
| `og-default.jpg` | JPG | 1200 x 630px | 200KB | Facebook/LinkedIn sharing |
| `og-twitter.jpg` | JPG | 1200 x 600px | 200KB | Twitter card image |

---

## Folder Structure

All local images live in `/assets/` with the following subfolders:

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

## How to Update Assets

### Hero Video (R2)

The hero phone mockup displays a looping video hosted on Cloudflare R2. To update:

1. Export video at 390 x 844px (iPhone 14 Pro screen size)
2. Compress to under 5MB using HandBrake or similar
3. Export first frame as `hero-poster.jpg` for fallback
4. Upload both files to R2 bucket under `/assets/`

In `index.html`, the video is referenced at lines 54-63:

```html
<video
  class="demo-video"
  autoplay muted loop playsinline
  poster="https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/hero-poster.jpg"
>
  <source src="https://pub-614ffe037f7941e199c1fd8c74179fe6.r2.dev/assets/hero-demo.mp4" type="video/mp4">
</video>
```

### Dish Images (local)

For dish images used elsewhere on the site:

1. Add your image to `/assets/dishes/`
2. Name it following the pattern: `dish-[descriptive-name].jpg`
3. Reference via `background-image: url('assets/dishes/dish-name.jpg')`

### Adding Images via CSS

For background images in CSS, update `/css/styles.css`:

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

**Completed:**
- Hero video (`hero-demo.mp4`) — hosted on R2
- Hero poster fallback (`hero-poster.jpg`) — hosted on R2

**Still needed before launch:**
- `og-default.jpg` — Open Graph image for social sharing
- `og-twitter.jpg` — Twitter card image
- `favicon.ico` — Browser tab icon
- `apple-touch-icon.png` — iOS home screen icon
- `logo-dark.svg` / `logo-light.svg` — Brand logos (if needed)
