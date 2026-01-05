# HTML Encoding Issue - Fixed January 5, 2026

## Problem Description

Three HTML pages on the main site had systematic encoding issues where all hyphens (`-`) were incorrectly replaced with semicolons (`;`) and all double-hyphens (`--`) were replaced with double semicolons (`;;`).

### Affected Files
- `main-site/index.html`
- `main-site/about.html`
- `main-site/camp-life.html`

### Not Affected
- `main-site/ticketing.html` ✅
- `main-site/join.html` ✅
- `main-site/gallery.html` ✅
- `soi-site/index.html` ✅

---

## Impact

The encoding issues caused multiple critical problems:

### 1. **Character Encoding**
```html
<!-- BROKEN -->
<meta charset="UTF;8">

<!-- FIXED -->
<meta charset="UTF-8">
```

### 2. **CSS Classes**
All CSS class names were broken, preventing any styling from being applied:

```html
<!-- BROKEN -->
<header class="site;header">
<nav class="desktop;nav">
<a class="nav;link">

<!-- FIXED -->
<header class="site-header">
<nav class="desktop-nav">
<a class="nav-link">
```

**Result:** No CSS was being applied, causing broken layouts, missing headers, and no navigation menus.

### 3. **CSS Variables**
All CSS custom property references were malformed:

```html
<!-- BROKEN -->
style="margin: var(;;space;4);"
style="color: var(;;color;text;primary);"

<!-- FIXED -->
style="margin: var(--space-4);"
style="color: var(--color-text-primary);"
```

**Result:** Inline styles failed to render correctly.

### 4. **HTML Comments**
```html
<!-- BROKEN -->
<!;; Header ;;>

<!-- FIXED -->
<!-- Header -->
```

### 5. **HTML Attributes**
```html
<!-- BROKEN -->
<a href="#main;content" aria;label="Skip to content">

<!-- FIXED -->
<a href="#main-content" aria-label="Skip to content">
```

### 6. **Asset Paths**
```html
<!-- BROKEN -->
<img src="assets/logo;landscape.svg">

<!-- FIXED -->
<img src="assets/logo-landscape.svg">
```

**Result:** Logo and images failed to load (404 errors).

### 7. **Links**
```html
<!-- BROKEN -->
<a href="camp;life.html">Camp Life</a>

<!-- FIXED -->
<a href="camp-life.html">Camp Life</a>
```

**Result:** Navigation links were broken.

### 8. **Background Image Classes**
```html
<!-- BROKEN -->
<section class="section;with;background home;hero;background">

<!-- FIXED -->
<section class="section-with-background home-hero-background">
```

**Result:** Background images failed to display.

---

## Symptoms Observed

Users reported:
- ❌ Broken headers on Home, About, and Camp Life pages
- ❌ Missing navigation menus
- ❌ Logo not displaying
- ❌ Background images not loading
- ❌ Broken links to Camp Life page
- ❌ No styling/CSS applied to pages

Meanwhile:
- ✅ Ticketing and Join pages worked perfectly

---

## Root Cause Analysis

The issue appears to have been caused by an incorrect find-and-replace operation that:
1. Replaced all `-` (hyphens) with `;` (semicolons)
2. Replaced all `--` (double hyphens) with `;;` (double semicolons)

This likely happened during content editing or a migration process.

---

## Solution

### Fix Applied
Systematically replaced all semicolons back to hyphens throughout the three affected files:

1. Character encoding declarations
2. All CSS class names
3. All CSS variable references  
4. HTML comment syntax
5. HTML attribute names
6. Asset file paths
7. Internal links
8. Background image class names

### Additional Fixes
- Removed duplicate content from end of `about.html` (lines 262-282)
- Removed duplicate content from end of `camp-life.html` (lines 340-361)

---

## Files Changed

### Commit 1: `381713c` (January 5, 2026)
**Message:** "Fix broken HTML files - replace semicolons with hyphens throughout"

**Changes:**
- Fixed `main-site/index.html`
- Fixed `main-site/about.html`
- Fixed `main-site/camp-life.html`

### Commit 2: `28b032e` (January 5, 2026)
**Message:** "Remove Monday meeting references from Camp Life page"

**Changes:**
- Removed sentence about Monday morning camp meeting from Teamwork section
- Removed "Sign up at the Monday meeting" from Camp Shifts section

---

## Verification

### Tests Performed
✅ All pages load correctly  
✅ Headers display with proper styling  
✅ Navigation menus visible and functional  
✅ Logo displays correctly  
✅ All links work (especially camp-life.html)  
✅ Background images load  
✅ CSS styling applied correctly  
✅ Mobile navigation works  
✅ No linter errors  
✅ No semicolon patterns found in fixed files  

### Verification Commands
```bash
# Check character encoding
grep -n "UTF-8" main-site/*.html

# Check logo path
grep -n "logo-landscape.svg" main-site/*.html

# Check camp-life links
grep -n "camp-life.html" main-site/*.html

# Check CSS classes (should find proper hyphenated classes)
grep -n 'class="site-header' main-site/*.html

# Verify no semicolon issues remain
grep -n 'var(;;' main-site/*.html  # Should return nothing
grep -n 'class="[^"]*;[^"]*"' main-site/*.html  # Should return nothing
```

---

## Prevention

### For Future Edits:
1. **Never use find-and-replace for hyphens** across entire files
2. **Test locally** before pushing to production
3. **Compare with working pages** (ticketing.html, join.html) as reference
4. **Use version control** to identify when issues were introduced
5. **Check multiple pages** after making global changes

### Red Flags to Watch For:
- Broken CSS styling suddenly appearing
- Missing headers or navigation
- 404 errors for assets
- Semicolons in unusual places (class names, variable names)

---

## Lessons Learned

1. **HTML syntax is fragile** - A single find-and-replace can break an entire site
2. **CSS depends on exact class names** - Semicolons vs hyphens matter
3. **Test multiple pages** - Don't assume all pages work if one does
4. **Use version control** - Easy to identify and revert problematic changes
5. **Keep working files as reference** - Having ticketing.html and join.html working helped identify the pattern

---

## Status

**Issue:** ✅ Fully Resolved  
**Date Fixed:** January 5, 2026  
**Pages Affected:** 3 (index.html, about.html, camp-life.html)  
**Commits:** 2 (`381713c`, `28b032e`)  
**Site Status:** All pages fully functional

---

## Related Documentation

- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Updated project status
- [README.md](../README.md) - Project overview
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Testing procedures

