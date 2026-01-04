# Join Page Background Image

## Fully Automated Export Workflow

### One Click, All 3 Images Exported! 🚀

**Source Image:**
- `camp_assets/images/Join-Hero.jpg`

**How to Run:**
1. **Open Photoshop** (no files need to be open)
2. **Run the script:** `File → Scripts → Browse → ExportJoinImages.jsx`
3. ✅ **Done!** Script automatically processes the image

**No prompts. No manual selection. Fully automated.**

### What the Script Does:
- Automatically opens JPG from `camp_assets/images/`
- Resizes to 2400×1200 (preserving aspect ratio)
- Exports 3 responsive sizes:
  - Mobile: 800×600
  - Tablet: 1400×800
  - Desktop: 2400×1200
- Saves as high-quality JPG (quality: 10/12)
- Cloudflare automatically converts JPG→WebP on delivery for optimal performance
- Closes file without saving
- Exports to `main-site/images/join/`
- Shows completion report

---

## Final File List (3 files total)

When complete, this folder should contain:

```
✅ Join-Hero-mobile.jpg (800×600)
✅ Join-Hero-tablet.jpg (1400×800)
✅ Join-Hero-desktop.jpg (2400×1200)
```

---

## Where This Image Appears

- **Join-Hero**: Hero section at top of Join page behind the main title and intro

---

## Image Recommendation

**Suggested concept:**
- Camp community/gathering shot showing campers working together
- Conveys: community, reliability, shared purpose
- Portrait orientation works, but landscape preferred (2400×1200)

**Alternative concepts:**
- Camp meeting moment
- Radiance Hour gathering
- Build crew working together
- Campmates around the camp setup

---

## Technical Details

- **Format:** JPG (Cloudflare auto-converts to WebP on delivery)
- **Quality:** 10/12 (maximum quality)
- **Responsive:** 3 sizes auto-load based on device screen width
- **Performance:** Background image lazy loads with parallax effect (desktop only)
- **Accessibility:** Dark overlay ensures text is readable over any image
- **Optimization:** Cloudflare Polish automatically converts JPG→WebP for browsers that support it

