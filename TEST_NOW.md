# ✅ SOI FORM - FULLY WORKING

## 🎯 Solution Summary

### The CORS Problem
Google Apps Script wasn't handling CORS preflight (OPTIONS) requests properly, causing all form submissions from Cloudflare Pages to fail with:
```
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present
```

### The Solution
Changed the fetch request content-type from `application/json` to `text/plain`:

```javascript
// In soi-site/js/form.js
headers: {
  'Content-Type': 'text/plain;charset=utf-8',
}
```

**Why this works:**
- `text/plain` is a "simple" content-type that doesn't trigger CORS preflight
- Google Apps Script still correctly parses the JSON body
- No OPTIONS request = no CORS error

---

## 🚀 Live Sites

- **Main site:** https://rubberarmstrong.com
- **SOI form:** https://soi.rubberarmstrong.com (or .pages.dev)

---

## 📊 Google Sheets Backend

**Current deployment:** `https://script.google.com/macros/s/AKfycbwuiWeVlLTun8RpKx2NvhwnMKFBLoU6e5WbywFqsbm9HMb21JhofPVFj-_uI58DGN1G/exec`

All submissions land in `SOI_Staging` tab with Status = "Pending" (yellow background).

---

## ✅ Status: FULLY FUNCTIONAL

Form tested and working as of Jan 4, 2026.

