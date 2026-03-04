# Google Ads Tracking Integration for lookbookmenu.com

## Context

You are integrating Google Ads conversion tracking into the lookbookmenu.com marketing site. The backend infrastructure is already built and deployed on the admin-api (Cloudflare Worker). Your job is to add the frontend tracking script and wire up conversion events.

## What's Already Done (admin-api)

- ✅ Database tables: `attribution_sessions`, `conversion_events`, `conversion_actions`
- ✅ Public API: `POST /api/public/attribution` - captures GCLID/UTM params
- ✅ Public API: `GET /api/public/attribution` - retrieves attribution for visitor
- ✅ Conversion actions defined: `try_demo_started`, `try_demo_created`, `account_created`, `menu_published`, `subscription_started`

## Your Tasks

### Task 1: Add Tracking Script to All Pages

Add this script to every page on lookbookmenu.com, preferably in the `<head>` or just before `</body>`:

```html
<script>
(function() {
  'use strict';

  const API_BASE = 'https://lookbook-admin-api.robert-royster.workers.dev';
  const VISITOR_ID_KEY = 'lbm_visitor_id';
  const SESSION_ID_KEY = 'lbm_session_id';
  const ATTRIBUTION_KEY = 'lbm_attribution';

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  function getVisitorId() {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(VISITOR_ID_KEY, id);
      document.cookie = VISITOR_ID_KEY + '=' + id + '; path=/; max-age=31536000; SameSite=Lax';
    }
    return id;
  }

  function getSessionId() {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = uuid();
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  }

  function getUrlParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      gclid: params.get('gclid'),
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content')
    };
  }

  function storeAttribution(data) {
    var existing = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || '{}');
    if (data.gclid || !existing.gclid) {
      var attribution = Object.assign({}, existing, data, { updated_at: Date.now() });
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    }
  }

  function getAttribution() {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || '{}');
  }

  async function captureAttribution() {
    var params = getUrlParams();
    if (!params.gclid && !params.utm_source) return;

    var data = Object.assign({}, params, {
      landing_page: window.location.pathname,
      referrer: document.referrer,
      visitor_id: getVisitorId(),
      session_id: getSessionId()
    });

    storeAttribution(data);

    try {
      var response = await fetch(API_BASE + '/api/public/attribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      var result = await response.json();
      if (result.attribution_id) {
        storeAttribution({ attribution_id: result.attribution_id });
      }
    } catch (e) {
      console.warn('Attribution capture failed:', e);
    }
  }

  window.LookBookTracking = {
    getVisitorId: getVisitorId,
    getSessionId: getSessionId,
    getAttribution: getAttribution,

    // Call this to get attribution data to include in form submissions
    getTrackingData: function() {
      var attr = getAttribution();
      return {
        visitor_id: getVisitorId(),
        session_id: getSessionId(),
        attribution_id: attr.attribution_id || null,
        gclid: attr.gclid || null,
        utm_source: attr.utm_source || null,
        utm_medium: attr.utm_medium || null,
        utm_campaign: attr.utm_campaign || null
      };
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', captureAttribution);
  } else {
    captureAttribution();
  }
})();
</script>
```

### Task 2: Wire Up Try-It Form

When the Try-It demo form is submitted, include tracking data in the payload:

```javascript
// Before submitting the try-it form
const trackingData = window.LookBookTracking?.getTrackingData() || {};

// Include in your form submission
const payload = {
  restaurant_name: formData.restaurant_name,
  city: formData.city,
  state: formData.state,
  email: formData.email,
  // ... other form fields

  // Add tracking fields
  visitor_id: trackingData.visitor_id,
  gclid: trackingData.gclid,
  utm_source: trackingData.utm_source,
  utm_medium: trackingData.utm_medium,
  utm_campaign: trackingData.utm_campaign
};

// Submit to API
fetch('https://lookbook-admin-api.robert-royster.workers.dev/api/try/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

### Task 3: Track Form Start (Optional but Recommended)

When user starts filling out the try-it form, fire a "started" event:

```javascript
// When user focuses on first form field or clicks "Get Started"
function trackFormStart() {
  const trackingData = window.LookBookTracking?.getTrackingData() || {};

  // Just log to attribution - backend will handle conversion recording
  fetch('https://lookbook-admin-api.robert-royster.workers.dev/api/public/attribution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...trackingData,
      landing_page: window.location.pathname,
      event: 'try_demo_started'
    })
  }).catch(() => {});
}
```

## API Endpoints Available

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/public/attribution` | POST | Capture GCLID/UTM on landing |
| `/api/public/attribution` | GET | Get attribution (use X-Visitor-ID header) |
| `/api/try/create` | POST | Create try demo (accepts tracking fields) |
| `/api/try/enrich` | POST | Step 1 of try flow |

## Data Flow

```
User clicks Google Ad
    ↓
Lands on lookbookmenu.com/?gclid=xxx&utm_source=google
    ↓
tracking.js captures params → POST /api/public/attribution
    ↓
User fills try-it form
    ↓
Form submission includes gclid/visitor_id
    ↓
Backend records conversion with attribution link
    ↓
(Future) Cron uploads to Google Ads
```

## Testing

1. Visit lookbookmenu.com with test params:
   ```
   https://lookbookmenu.com/?gclid=test123&utm_source=google&utm_medium=cpc&utm_campaign=test
   ```

2. Open browser DevTools → Application → Local Storage
   - Should see `lbm_visitor_id`, `lbm_attribution`

3. Check console for any errors

4. Complete a try-it demo and verify tracking data is included

## Key Files to Modify

Based on typical Vue/Nuxt structure, you'll likely need to modify:

1. **Layout/App component** - Add tracking script globally
2. **Try-It page/component** - Wire up form submission with tracking data
3. **Any conversion points** - Account creation, etc.

## Important Notes

- The tracking script is vanilla JS - no dependencies needed
- Attribution is stored in localStorage with 90-day conceptual expiry
- GCLID is the most important field - it links back to the Google Ads click
- If user has ad blocker, tracking will fail silently (graceful degradation)
- All data is anonymous - no PII is captured

## Verification

After implementation, run this to check if data is flowing:

```bash
curl -s -H "Authorization: Bearer P9WbmcPbSiNBtF1ZdhVYg2WS5ZIa6u9UkxVlSM6v" \
  "https://lookbook-admin-api.robert-royster.workers.dev/api/admin/tracking/stats" | jq .
```

Should show `total > 0` and `withGclid > 0` after testing with `?gclid=test`.



