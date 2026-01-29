# CSS Design System

All styles are in `css/styles.css` (1020 lines).

## Color Palette

Warm, restaurant-friendly aesthetic:

```css
--bg: #fff7ed              /* Warm cream background */
--surface: #ffffff         /* White surfaces */
--ink: #1f160f             /* Warm dark brown/black */
--muted: rgba(31,22,15,.68)/* Muted text */
--accent: #f97316          /* Bright orange (primary) */
--accent-2: #f59e0b        /* Warm amber (secondary) */
```

## Spacing Scale

Rem-based for consistency:

```css
--space-xs: 0.5rem    /* 8px */
--space-sm: 1rem      /* 16px */
--space-md: 2rem      /* 32px */
--space-lg: 4rem      /* 64px */
--space-xl: 6rem      /* 96px */
--space-2xl: 10rem    /* 160px */
```

## Typography

- **Font:** Inter + system fallbacks
- **Weights:** 500, 600, 650, 700
- **Sizing:** Fluid with `clamp()` for responsive scaling

Example fluid title:
```css
font-size: clamp(2rem, 5vw, 3.5rem);
```

## Components

### Buttons

Three variants:

```css
.btn-primary   /* Orange gradient, shadow */
.btn-secondary /* Frosted glass (backdrop blur) */
.btn-large     /* Larger padding for prominent CTAs */
```

Hover effect: `translateY(-2px)` with enhanced shadow.

### Cards

Frosted glass pattern used throughout:

```css
.step-card     /* How-it-works steps */
.dual-use-card /* QR vs Online cards */
.use-case      /* Use case examples */
.dish-card     /* Menu item placeholders */
```

Common card properties:
- `background: rgba(255,255,255,0.7)`
- `backdrop-filter: blur(10px)`
- `border-radius: var(--radius-lg)`
- Hover: `translateY(-4px)` lift effect

### Section Titles

```css
.section-title /* Large heading with gradient underline */
```

Features:
- Responsive font size via `clamp()`
- Decorative gradient bar below text
- Centered alignment

## Responsive Breakpoints

Mobile-first approach:

| Breakpoint | Changes |
|------------|---------|
| Base | Vertical stacking, full-width |
| 640px+ | Button rows become horizontal |
| 768px+ | Hero side-by-side, grids expand, nav links visible |
| 1024px+ | Larger phone mockup (300x600 vs 260x520) |

## Special Effects

### Warm Background Glow
Body has layered radial gradients creating a warm ambient glow.

### Frosted Glass
Heavy use of `backdrop-filter: blur()` for modern premium feel.

### Phone Mockup
iOS-style design:
- Notch at top
- Rounded corners (40px outer, 32px inner)
- Shadow with blurred gradient halo
- Video scaled with `scale(1.15) translateY(-6%)` for proper framing

### Animations

```css
.fade-in         /* Scroll-triggered fade + slide up */
@keyframes shimmer /* Pulsing placeholder effect */
```

Default transition: `0.15s ease`

## Container

Max-width wrapper:
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-sm);
}
```
