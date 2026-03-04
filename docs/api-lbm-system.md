# Restaurant Week Frontend Integration

## Overview

The Restaurant Week sites (apexrestaurantweek.com, morrisvillerestaurantweek.com) pull menu data from the LookBook Menu API. This document describes how to fetch and display restaurant menus with images, PDFs, and coursed meal support.

## Base URL

```
https://lookbook-admin-api.robert-royster.workers.dev
```

**No authentication required** - all RW endpoints are public.

## R2 Storage URL

All images and PDFs are served from Cloudflare R2:

```
https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev
```

---

## Live Events

| Event | Slug | Dates | Restaurants | Site |
|-------|------|-------|-------------|------|
| Apex Restaurant Week | `apex-restaurant-week` | Feb 23 – Mar 1, 2026 | 23 | apexrestaurantweek.com |
| Morrisville Restaurant Week 2026 | `morrisville-restaurant-week-2026` | Mar 1 – Mar 7, 2026 | 86 | morrisvillerestaurantweek.com |

Both events use the same API and data structure. The only difference is the `eventSlug` parameter.

---

## API Endpoints

### 1. List All Restaurants for an Event

```
GET /api/rw/events/{eventSlug}
```

Returns event details with a summary list of all participating restaurants. Use this for the restaurant listing/grid page.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `eventSlug` | Event URL slug | `apex-restaurant-week`, `morrisville-restaurant-week-2026` |

**Examples:**
```bash
# Apex Restaurant Week (23 restaurants)
curl https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/apex-restaurant-week

# Morrisville Restaurant Week (86 restaurants)
curl https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/morrisville-restaurant-week-2026
```

**Response:**
```json
{
  "event": {
    "id": "evt_1c855d6b",
    "slug": "apex-restaurant-week",
    "name": "Apex Restaurant Week",
    "description": "February 23 – March 1, 2026",
    "start_date": "2026-02-23",
    "end_date": "2026-03-01",
    "region": "Apex",
    "website_url": "https://apexrestaurantweek.com",
    "logo_url": null,
    "status": "active",
    "market_name": "ARW - Apex Restaurant Week"
  },
  "restaurants": [
    {
      "id": "237f95f7f7a143b6ef554702d711a819",
      "slug": "ruckus-pizza-costco",
      "name": "Ruckus Pizza - Costco",
      "description": "Local pizza and American cuisine",
      "cuisine_type": "Pizza",
      "price_tier": "$$",
      "address": "1055 Pine Plaza Dr",
      "city": "Apex",
      "state": "NC",
      "zip": "27523",
      "hero_image_url": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/ruckus/images/hero.jpg",
      "website": "https://www.ruckuspizza.com/",
      "phone": "919-446-6333",
      "is_featured": true,
      "display_order": 1
    }
  ]
}
```

---

### 2. Get Restaurant Detail with Menus

```
GET /api/rw/events/{eventSlug}/restaurants/{restaurantSlug}
```

Returns full restaurant details including menus with item images, hero images, and PDF link.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `eventSlug` | Event URL slug | `apex-restaurant-week`, `morrisville-restaurant-week-2026` |
| `restaurantSlug` | Restaurant name slugified | `ruckus-pizza-costco`, `sushi-iwa-morrisville` |

**Examples:**
```bash
# Apex restaurant
curl https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/apex-restaurant-week/restaurants/ruckus-pizza-costco

# Morrisville restaurant
curl https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/morrisville-restaurant-week-2026/restaurants/ruckus-pizza-park-west
```

**Response:**
```json
{
  "restaurant": {
    "id": "237f95f7f7a143b6ef554702d711a819",
    "slug": "ruckus-pizza-costco",
    "name": "Ruckus Pizza - Costco",
    "description": "Local pizza and American cuisine",
    "cuisine": ["Pizza", "American"],
    "cityState": "Apex, NC",
    "address": {
      "line1": "1055 Pine Plaza Dr",
      "city": "Apex",
      "state": "NC",
      "zip": "27523",
      "lat": 35.7472707,
      "lng": -78.8292365
    },
    "phone": "919-446-6333",
    "websiteUrl": "https://www.ruckuspizza.com/",
    "reservationUrl": null,
    "priceTiers": [
      { "label": "Lunch", "price": 15, "enabled": true },
      { "label": "Dinner", "price": 30, "enabled": true }
    ],
    "images": {
      "hero": ["https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/ruckus/images/hero.jpg"],
      "logo": null
    },
    "menuPdfs": {
      "lunch": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/rw/arw-2026/ruckus-pizza-costco-lunch.pdf",
      "dinner": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/rw/arw-2026/ruckus-pizza-costco-dinner.pdf"
    },
    "menus": [
      {
        "id": "lunch",
        "name": "Lunch",
        "price": 15,
        "items": [
          {
            "name": "Meatloaf",
            "description": "All beef homemade meatloaf with mashed potatoes",
            "dietary": "",
            "imageUrl": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/ruckus/images/lunch__meatloaf.jpg",
            "kicker": "",
            "kickerSlug": "",
            "kickerOrder": 0
          }
        ]
      },
      {
        "id": "dinner",
        "name": "Dinner",
        "price": 30,
        "items": [
          {
            "name": "Nacho Appetizer",
            "description": "Served with queso, chili, pico, guac",
            "dietary": "",
            "imageUrl": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/ruckus/images/dinner__nacho_appetizer.jpg",
            "kicker": "Course 1",
            "kickerSlug": "course_1",
            "kickerOrder": 1
          },
          {
            "name": "Gorgonzola Steak",
            "description": "8oz filet with gorgonzola cream sauce",
            "dietary": "",
            "imageUrl": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/ruckus/images/dinner__gorgonzola_steak.jpg",
            "kicker": "Course 2",
            "kickerSlug": "course_2",
            "kickerOrder": 2
          },
          {
            "name": "Two Beignets",
            "description": "Lightly fried with powdered sugar",
            "dietary": "",
            "imageUrl": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/_stock/dessert-1.jpg",
            "kicker": "Course 3",
            "kickerSlug": "course_3",
            "kickerOrder": 3
          }
        ]
      }
    ],
    "lookbookUrl": "https://lookbook.menu/ruckus/costco"
  },
  "event": {
    "slug": "apex-restaurant-week",
    "name": "Apex Restaurant Week",
    "startDate": "2026-02-23",
    "endDate": "2026-03-01"
  }
}
```

---

## Images

### Restaurant Hero Image

Each restaurant can have a hero image for cards and detail pages.

**In event list response:** `hero_image_url`
**In restaurant detail response:** `images.hero[0]`

```javascript
// Event list usage
const heroUrl = restaurant.hero_image_url || '/fallback.jpg'

// Restaurant detail usage
const heroUrl = restaurant.images?.hero?.[0] || '/fallback.jpg'
```

### Menu Item Images

Each menu item includes an `imageUrl` field with a full URL to the item's image.

**Image sources (in priority order):**
1. Uploaded food photo for this item
2. Stock image fallback (e.g., `_stock/burger-1.jpg`)
3. Brand placeholder

```javascript
// Display item image with fallback
<img
  src={item.imageUrl || '/images/placeholder-food.jpg'}
  alt={item.name}
  loading="lazy"
/>
```

**Note:** `imageUrl` may be `null` if no image is available. Always provide a fallback.

### Menu PDFs (Restaurant Week Only)

For Restaurant Week events, we store original menu PDFs for reference - one per menu type (lunch, dinner). This is **not** used for regular LookBook menus - we always replace PDFs with structured menu data.

**Response field:** `menuPdfs` - object with menu type keys

```json
{
  "menuPdfs": {
    "lunch": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/rw/arw-2026/ruckus-lunch.pdf",
    "dinner": "https://pub-ed2976f5bd484b6580754e1d1fef1856.r2.dev/rw/arw-2026/ruckus-dinner.pdf"
  }
}
```

**Usage:**

```javascript
// Show PDF download for each menu
{restaurant.menuPdfs && Object.entries(restaurant.menuPdfs).map(([menuType, url]) => (
  <a key={menuType} href={url} target="_blank" rel="noopener">
    Download {menuType} Menu PDF
  </a>
))}
```

**Storage:** `rw_event_leads.menu_pdfs_json` - JSON object per restaurant per event

---

## Menu Item Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Item name |
| `description` | string | Item description |
| `dietary` | string | Dietary tags: `V` (vegetarian), `VG` (vegan), `GF` (gluten-free) |
| `imageUrl` | string \| null | Full URL to item image (R2 storage). `null` if no image available. |
| `kicker` | string | Course label displayed above name (e.g., "Course 1"). Empty if not a coursed menu. |
| `kickerSlug` | string | Slugified kicker for CSS/analytics (e.g., "course_1") |
| `kickerOrder` | number | Numeric sort order (1, 2, 3...). 0 if not coursed. |

## Displaying Coursed Menus

### Detection Logic

```javascript
// Check if menu has coursed items
const isCoursedMenu = menu.items.some(item => item.kicker && item.kicker.length > 0)
```

### Rendering Pattern (Vue)

```vue
<template>
  <div class="menu-items">
    <div v-for="item in menu.items" :key="item.name" class="menu-item">
      <!-- Item image -->
      <img
        v-if="item.imageUrl"
        :src="item.imageUrl"
        :alt="item.name"
        class="item-image"
        loading="lazy"
      />
      <div class="item-content">
        <!-- Show kicker above name for coursed menus -->
        <div v-if="item.kicker" class="item-kicker">{{ item.kicker }}</div>
        <div class="item-name">{{ item.name }}</div>
        <div v-if="item.description" class="item-description">{{ item.description }}</div>
        <span v-if="item.dietary" class="dietary-badge">{{ item.dietary }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
}

.item-kicker {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
}

.item-description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.dietary-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 6px;
  background: var(--color-success-light);
  border-radius: 4px;
  margin-top: 4px;
}
</style>
```

### React Example

```jsx
function MenuItem({ item }) {
  return (
    <div className="menu-item">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-image"
          loading="lazy"
        />
      )}
      <div className="item-content">
        {item.kicker && <div className="item-kicker">{item.kicker}</div>}
        <div className="item-name">{item.name}</div>
        {item.description && <div className="item-description">{item.description}</div>}
        {item.dietary && <span className="dietary-badge">{item.dietary}</span>}
      </div>
    </div>
  )
}

function MenuSection({ menu }) {
  return (
    <div className="menu-section">
      <h3>{menu.name} - ${menu.price}</h3>
      {menu.items.map((item, i) => (
        <MenuItem key={i} item={item} />
      ))}
    </div>
  )
}
```

## Sorting Items

Items are returned in display order. For coursed menus, items are grouped by `kickerOrder`:

```javascript
// Optional: Group items by course
const groupedByCourse = menu.items.reduce((acc, item) => {
  const course = item.kicker || 'Menu'
  if (!acc[course]) acc[course] = []
  acc[course].push(item)
  return acc
}, {})

// Result: { "Course 1": [...], "Course 2": [...], "Course 3": [...] }
```

## Fetching All Restaurants for an Event

```
GET https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/{eventSlug}
```

Returns event details with a list of all restaurants (without full menu data). Use this for the restaurant listing page, then fetch individual restaurant details when user clicks.

## Error Handling

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 404 | Event or restaurant not found |
| 500 | Server error |

```javascript
async function fetchRestaurant(eventSlug, restaurantSlug) {
  const url = `https://lookbook-admin-api.robert-royster.workers.dev/api/rw/events/${eventSlug}/restaurants/${restaurantSlug}`

  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Restaurant not found')
    }
    throw new Error('Failed to fetch restaurant')
  }

  return res.json()
}
```

## CORS

The API returns proper CORS headers. You can call it directly from the browser.

## Caching

Consider caching responses for 5-15 minutes during the event to reduce API calls:

```javascript
// Simple in-memory cache
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function fetchWithCache(url) {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const data = await fetch(url).then(r => r.json())
  cache.set(url, { data, timestamp: Date.now() })
  return data
}
```

## LookBook URL

Each restaurant response includes `lookbookUrl` which links to the full interactive menu on lookbook.menu with swipeable images:

```html
<a :href="restaurant.lookbookUrl" target="_blank" rel="noopener">
  View Full Menu on LookBook
</a>
```

---

## Storage Reference

All assets are stored in Cloudflare R2 and served via the public URL.

### Menu Item Images (in menu JSON)

Each item in the menu JSON has these image fields:

```json
{
  "name": "Salmon",
  "image": "images/dinner__salmon.jpg",
  "expectedImage": "dinner__salmon.jpg",
  "placeholder": "placeholder.png",
  "stock_image_path": "_stock/fish-1.jpg"
}
```

| Field | Description |
|-------|-------------|
| `image` | Actual uploaded photo (relative to brand folder) |
| `expectedImage` | Expected filename based on naming convention |
| `placeholder` | Brand placeholder fallback |
| `stock_image_path` | Stock image fallback |

**Resolution order:** `image` → `stock_image_path` → `placeholder`

### R2 Storage Paths

| Asset Type | Storage Path | Example |
|------------|--------------|---------|
| Menu item photo | `{brand}/images/{category}__{item}.jpg` | `ruckus/images/dinner__salmon.jpg` |
| Brand placeholder | `{brand}/images/placeholder.png` | `ruckus/images/placeholder.png` |
| Stock fallback | `_stock/{name}.jpg` | `_stock/fish-1.jpg` |
| RW menu PDF | `rw/{eventTag}/{restaurantSlug}-{menuType}.pdf` | `rw/arw-2026/ruckus-pizza-costco-lunch.pdf` |
| RW event logo | `rw/{eventTag}/logo.png` | `rw/arw-2026/logo.png` |
| RW hero image | `rw/{eventTag}/{slug}-hero.jpg` | `rw/arw-2026/ruckus-pizza-hero.jpg` |

**Event tags:**
| Event | Tag |
|-------|-----|
| Apex Restaurant Week | `arw-2026` |
| Morrisville Restaurant Week | `mrw` |

**Note:** The API returns fully-constructed URLs - no URL building needed on the frontend.

