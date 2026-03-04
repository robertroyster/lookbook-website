# CSS Design System

All landing page styles are in `css/styles.css` (632 lines). The Try-It page has its own scoped styles in `src/views/TryIt.vue`.

## Color Palette

Warm, restaurant-friendly aesthetic:

```css
--bg: #fff7ed              /* Warm cream background */
--surface: #ffffff         /* White surfaces */
--ink: #1f160f             /* Warm dark brown/black */
--muted: rgba(31,22,15,.68)/* Muted text */
--accent: #f97316          /* Bright orange (primary) */
--accent-2: #f59e0b        /* Warm amber (secondary) */
--line: rgba(31,22,15,.10) /* Borders and dividers */
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
font-size: clamp(2.5rem, 8vw, 4.5rem);
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
.who-card      /* Who it's for cards */
```

Common card properties:
- `background: rgba(255,255,255,0.78)`
- `backdrop-filter: blur(10px)`
- `border-radius: var(--radius-lg)` (26px)
- Hover: `translateY(-2px)` lift with orange border accent

### Section Titles

```css
.section-title /* Large heading with gradient underline */
```

Features:
- Responsive font size via `clamp(1.75rem, 5vw, 2.75rem)`
- Decorative gradient bar below text (orange → amber → transparent)
- Centered alignment

### Photo Strip

Auto-scrolling dish photo carousel in the hero:

```css
.photo-strip        /* Container: frosted glass, max-width 540px */
.photo-strip-track  /* Flex row with 20s linear infinite scroll animation */
```

- Images: 120x84px with 16px border-radius
- Hover pauses animation
- Duplicated image set for seamless loop
- Uses `@keyframes strip-scroll` (translateX 0 → -50%)

### Contact Links

Repeated in header, hero, try-it section, and footer:
- Phone: `919-816-2113`
- Email: `info@lookbookmenu.com`
- Middot separator between items

## Responsive Breakpoints

Mobile-first approach:

| Breakpoint | Changes |
|------------|---------|
| Base | Vertical stacking, full-width, nav links hidden |
| 640px+ | Button rows horizontal, features 2-column grid |
| 768px+ | Hero side-by-side layout, nav links visible, steps 3-column, who 2-column, features 3-column |
| 1024px+ | Larger phone mockup (300x600), header contact info visible |

## Special Effects

### Warm Background Glow
Body has layered radial gradients creating a warm ambient glow (orange/amber tints).

### Frosted Glass
Heavy use of `backdrop-filter: blur()` for modern premium feel (nav, cards, photo strip).

### Phone Mockup
- Rounded corners (40px outer, 38px inner)
- Gradient halo glow behind device
- Video fills screen with `object-fit: cover`

### Scroll-spy Active State
```css
.nav-links a.active        /* Orange text color */
.nav-links a.active::after  /* Orange underline indicator */
```

### Animations

```css
.fade-in              /* Scroll-triggered fade + slide up */
@keyframes strip-scroll /* Photo strip auto-scroll */
```

Default transition: `0.15s ease`

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto !important; }
  .nav-links a { transition: none; }
  .photo-strip-track { animation: none; }
}
```

## Container

Max-width wrapper:
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}
```
